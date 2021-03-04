// @ts-nocheck
import BigNumber from 'bignumber.js'
import React, { useEffect, useState, useCallback } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import styled, { keyframes } from 'styled-components'
import { useWallet } from 'use-wallet'
import Button from '../../../components/Button'
import { useHistory } from 'react-router-dom'
import GenericCard from '../../../components/GenericCard'
import useEarnings from '../../../hooks/useEarnings'
import useStakedBalance from '../../../hooks/useStakedBalance'
import { Farm } from '../../../contexts/Farms'
import { useTokenBalance2, useBnbPrice } from '../../../hooks/useTokenBalance'
import useFarms from '../../../hooks/useFarms'
import useSushi from '../../../hooks/useSushi'
import useAllStakedValue, {
  StakedValue,
} from '../../../hooks/useAllStakedValue'
import { getEarned, getMasterChefContract } from '../../../sushi/utils'
import { bnToDec } from '../../../utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { forShowPools } from '../../../sushi/lib/constants'

import useModal from '../../../hooks/useModal'
import AccountModal from '../../../components/TopBar/components/AccountModal.tsx'
import WalletProviderModal from '../../../components/WalletProviderModal'

interface FarmWithStakedValue extends Farm, StakedValue {
  apy: BigNumber
}

interface FarmCardsProps {
  removed: boolean
}

const FarmCards: React.FC<FarmCardsProps> = ({ removed }) => {
  const [farms] = useFarms()
  const { account } = useWallet()
  const stakedValue = useAllStakedValue()

  const sushiIndex = farms.findIndex(
    ({ tokenSymbol }) => tokenSymbol === 'STAX',
  )

  const sushiPrice =
    sushiIndex >= 0 && stakedValue[sushiIndex]
      ? stakedValue[sushiIndex].tokenPriceInWeth
      : new BigNumber(0)

  const BLOCKS_PER_YEAR = new BigNumber(10512000)
  const SUSHI_PER_BLOCK = new BigNumber(2)

  const [onPresentAccountModal] = useModal(<AccountModal />)
  const [onPresentWalletProviderModal] = useModal(
    <WalletProviderModal />,
    'provider',
  )

  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])

  const realFarms = !removed
    ? farms.filter((farm) => farm.multiplier != '0X')
    : farms.filter((farm) => farm.multiplier == '0X')
  const realStakedValue = stakedValue.slice(0)
  const bnbPrice = useBnbPrice()

  const rows = realFarms.reduce<FarmWithStakedValue[][]>(
    (farmRows, farm, i) => {
      let apy

      if (farm.pid !== 0) {
        apy = realStakedValue[i]
          ? sushiPrice
              .times(SUSHI_PER_BLOCK)
              .times(BLOCKS_PER_YEAR)
              .times(realStakedValue[i].poolWeight)
              .div(realStakedValue[i].tokenAmount)
              .div(2)
              .times(bnbPrice)
          : null
      } else if (farm.pid == 0) {
        apy =
          realStakedValue[i] && !removed
            ? sushiPrice
                .times(SUSHI_PER_BLOCK)
                .times(BLOCKS_PER_YEAR)
                .times(realStakedValue[i].poolWeight)
                .div(realStakedValue[i].totalWethValue)
            : null
      } else {
        apy = null
      }
      const farmWithStakedValue = {
        ...farm,
        ...realStakedValue[i],
        apy: apy,
      }
      const newFarmRows = [...farmRows]
      if (newFarmRows[newFarmRows.length - 1].length === 4) {
        newFarmRows.push([farmWithStakedValue])
      } else {
        newFarmRows[newFarmRows.length - 1].push(farmWithStakedValue)
      }
      return newFarmRows
    },
    [[]],
  )

  return (
    <StyledCards>
      {!!rows[0].length ? (
        <StyledRow>
          {rows.map((farmRow) =>
            farmRow.map((farm, j) => (
              <FarmCard
                farm={farm}
                stakedValue={realStakedValue[j]}
                removed={removed}
                key={j}
              />
            )),
          )}
        </StyledRow>
      ) : (
        <StyledLoadingWrapper>
          <FContent>
            {forShowPools.map((pool, index) => (
              <GenericCard
                key={index}
                title={pool.symbol}
                multiplier={pool.multiplier}
                ctaText="Unlock Wallet"
                ctaHandler={handleUnlockClick}
                staxEarned={0}
                isRunning={true}
                informations={{
                  'Your Stake': '0.000',
                  APY: '0.000',
                  Liquidity: '0.000',
                }}
              />
            ))}
          </FContent>
        </StyledLoadingWrapper>
      )}
    </StyledCards>
  )
}

const FContent = styled.div`
  display: flex;
  margin-bottom: 24px;
  flex-flow: row wrap;
  justify-content: space-around;
  @media (max-width: 500px) {
    justify-content: left;
  }
  * {
    box-sizing: border-box;
  }
`

const CardImage = styled.div``

const Lable = styled.div`
  line-height: 1.5rem;
  color: ${(props) => props.theme.colors.secondary};
  > span {
    float: left;
  }
  .right {
    float: right;
    color: ${(props) => props.theme.colors.primary};
    font-weight: 900;
  }
`

const FCard = styled.div`
  position: relative;
  height: 309px;
  padding: 20px;
  justify-content: center;
  flex-direction: column;
  justify-content: space-around;
  display: flex;
  width: 100%;
  * {
    box-sizing: border-box;
  }
  img {
    height: 80px;
    width: 80px;
  }
  @media (max-width: 500px) {
    margin: 10px;
  }
`

interface FarmCardProps {
  farm: FarmWithStakedValue
  removed: boolean
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, stakedValue, removed }) => {
  const totalValue1 =
    useTokenBalance2(
      '0x55d398326f99059ff775485246999027b3197955',
      farm.lpTokenAddress,
    ) * 2
  let totalValue =
    useTokenBalance2(
      '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      farm.lpTokenAddress,
    ) *
    useBnbPrice() *
    2

  if (farm.pid !== 0) {
    totalValue = farm.tokenAmount?.times(2)
  }

  const [startTime, setStartTime] = useState(1600783200)
  const [harvestable, setHarvestable] = useState(0)

  // setStartTime(1600695000)

  const { account } = useWallet()
  const { lpTokenAddress } = farm
  const sushi = useSushi()

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { days, hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    const paddedDays = days < 10 ? `${days}` : days
    return (
      <span style={{ width: '100%' }}>
        {paddedDays} days {paddedHours}:{paddedMinutes}:{paddedSeconds}
      </span>
    )
  }
  const history = useHistory()
  const earnings = useEarnings(farm.pid)
  const stakedBalance = useStakedBalance(farm.pid)
  useEffect(() => {
    async function fetchEarned() {
      if (sushi) return
      const earned = await getEarned(
        getMasterChefContract(sushi),
        lpTokenAddress,
        account,
      )
      setHarvestable(bnToDec(earned))
    }
    if (sushi && account) {
      fetchEarned()
    }
  }, [sushi, lpTokenAddress, account, setHarvestable])
  const poolActive = true // startTime * 1000 - Date.now() <= 0
  return (
    <GenericCard
      title={farm.lpToken.toUpperCase().replace('PANSTAX', '')}
      multiplier={`x${farm.multiplier.replace('X', '')}`}
      isRunning={true}
      staxEarned={getBalanceNumber(earnings)}
      ctaText={'Select'}
      ctaHandler={() => history.push(`/farms/${farm.id}`)}
      informations={{
        'Your Stake': getBalanceNumber(stakedBalance),
        APY: farm.apy
          ? `${farm.apy
              .times(new BigNumber(100))
              .toNumber()
              .toLocaleString('en-US')
              .slice(0, -1)}%`
          : 'Loading ...',
        Liquidity: parseInt(totalValue).toLocaleString(),
      }}
    />
  )
}

const RainbowLight = keyframes`

	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCards = styled.div`
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`
export default FarmCards
