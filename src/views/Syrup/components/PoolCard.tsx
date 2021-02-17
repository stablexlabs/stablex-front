import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'
import Button from '../../../components/Button'
import HarvestButton from './HarvestButton'
import Card from '../../../components/Card'
import CardIcon from '../../../components/CardIcon'
import IconButton from '../../../components/IconButton'
import { AddIcon } from '../../../components/icons'
import Label from '../../../components/Label'
import Value from '../../../components/Value'

import { useSousAllowance } from '../../../hooks/useAllowance'
import { useSousApprove } from '../../../hooks/useApprove'
import {
  useSousEarnings,
  useSousLeftBlocks,
  useSousLeftBlocksStatus,
} from '../../../hooks/useEarnings'
import useModal from '../../../hooks/useModal'
import useStake, { useSousStake } from '../../../hooks/useStake'
import {
  useSousStakedBalance,
  useSousTotalStaked,
} from '../../../hooks/useStakedBalance'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useUnstake, { useSousUnstake } from '../../../hooks/useUnstake'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { useSousReward } from '../../../hooks/useReward'

import SmallValue from './Value'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'

import WalletProviderModal from '../../../components/WalletProviderModal'
import AccountModal from '../../../components/TopBar/components/AccountModal'
import Spacer from '../../../components/Spacer'

interface HarvestProps {
  syrup: Contract
  tokenName: string
  sousId: number
  projectLink: string
  multi: string
}

const PoolCard: React.FC<HarvestProps> = ({
  syrup,
  sousId,
  tokenName,
  projectLink,
  multi,
}) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const [requestedUnstake, setRequestedUnstake] = useState(false)
  const { account } = useWallet()
  const allowance = useSousAllowance(syrup, sousId)
  console.log(syrup)
  const { onApprove } = useSousApprove(syrup, sousId)
  const leftBlockText = useSousLeftBlocks(sousId)
  const stakingStatus = useSousLeftBlocksStatus(sousId)

  console.log(stakingStatus)
  const tokenBalance = useTokenBalance(syrup.options.address)
  const stakedBalance = useSousStakedBalance(sousId)
  const totalStaked = useSousTotalStaked(sousId)
  const earnings = useSousEarnings(sousId)

  const { onStake } = useSousStake(sousId)
  const { onUnstake } = useSousUnstake(sousId)

  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useSousReward(sousId)

  const [onPresentDeposit] = useModal(
    <DepositModal max={tokenBalance} onConfirm={onStake} tokenName={'STAX'} />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={onUnstake}
      tokenName={'STAX'}
    />,
  )

  const handleUnstake = useCallback(async () => {
    try {
      setRequestedUnstake(true)
      const txHash = await onUnstake()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedUnstake(false)
      }
    } catch (e) {
      console.log(e)
    }
  }, [onUnstake, setRequestedUnstake])

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.log(e)
    }
  }, [onApprove, setRequestedApproval])

  const [onPresentAccountModal] = useModal(<AccountModal />)
  const [onPresentWalletProviderModal] = useModal(
    <WalletProviderModal />,
    'provider',
  )
  const handleUnlockClick = useCallback(() => {
    onPresentWalletProviderModal()
  }, [onPresentWalletProviderModal])

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <Title finished={leftBlockText === 'Finished'}>
              {tokenName} Pool
            </Title>
            <Multiplier>{multi}</Multiplier>
          </StyledCardHeader>
          <StyledCardContent>
            {stakingStatus === 3 && <Label text={'Campaign over'} />}
            {stakingStatus !== 3 && (
              <Value
                value={getBalanceNumber(earnings)}
                color="rgba(255, 255, 255, 0.5)"
              />
            )}
            {stakingStatus !== 3 && (
              <>
                <Spacer size="sm" />
                <Label text={`STAX earned`} />
              </>
            )}

            {/*            {
              account && harvest && leftBlockText==='Finished' &&
              <HarvestButton
                disabled={!earnings.toNumber() || pendingTx}
                text={pendingTx ? 'Collecting' : 'Harvest'}
                onClick={async () => {
                  setPendingTx(true)
                  await onReward()
                  setPendingTx(false)
                }}
              />
            }*/}
          </StyledCardContent>

          <StyledCardActions>
            {!account && (
              <Button
                onClick={handleUnlockClick}
                size="md"
                text="Unlock Wallet"
              />
            )}
            {account &&
              (!allowance.toNumber() && stakingStatus === 1 ? (
                <Label text="Temporarily unavailable, please simply HODL for Flex Staking Rewards" />
              ) : (
                // <Button
                //   disabled={leftBlockText==='Finished' ||  requestedApproval}
                //   onClick={handleApprove}
                //   text={`Approve STAX`}
                // />
                <>
                  {stakingStatus === 3 && (
                      <Label text="Funds have been manually distributed, Please check the distribution stats here:" />
                    ) && (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://tinyurl.com/2wstax"
                      >
                        Link To Google Sheets
                      </a>
                    )}
                  {/* {stakingStatus===3 &&
                <Button
                  disabled={stakedBalance.eq(new BigNumber(0)) || requestedUnstake}
                  text="Unstake STAX"
                  onClick={onUnstake}
                />} */}
                  {stakingStatus === 1 && (
                    <IconButton
                      disabled={leftBlockText === 'Finished'}
                      onClick={onPresentDeposit}
                    >
                      <AddIcon />
                    </IconButton>
                  )}
                </>
              ))}
          </StyledCardActions>

          <StyledLabel
            text="Your Stake"
            value={getBalanceNumber(stakedBalance)}
          />

          <StyledCardFooter>
            <StyledLabel
              text="Total STAX staked:"
              value={getBalanceNumber(totalStaked)}
            />
          </StyledCardFooter>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  )
}

const Multiplier = styled.div`
  line-height: 60px;
  padding: 0 12px;
  font-size: 24px;
  color: ${(props) => props.theme.colors.secondary};
  font-weight: 900;
  top: 20px;
`

const StyledCardFooter = styled.div`
  border-top: 1px solid rgb(118 69 217 / 0.2);
  width: 100%;
  box-sizing: border-box;
  font-size: 14px;
`

const StyledCardContent = styled.div`
  text-align: center;
  padding: 10px 20px;
  img {
    width: 60px;
    padding: 15px;
  }
`
interface StyledButtonProps {
  finished?: boolean
}

const Title = styled.div<StyledButtonProps>`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 20px;
  font-weight: 900;
  line-height: 60px;
`

const StyledCardHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 24px;
  box-sizing: border-box;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
`

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`

interface StyledLabelProps {
  value: number
  text: string
}

const StyledLabel: React.FC<StyledLabelProps> = ({ value, text }) => {
  return (
    <StyledValue>
      <p>{text}</p>
      <SmallValue value={value} />
    </StyledValue>
  )
}

const CardContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 0;
  width: 100%;
`

const StyledValue = styled.div`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 16px;
  font-weight: 900;
  display: flex;
  justify-content: space-between;
  line-height: 30px;
  width: 100%;
  padding: 0 24px;
  box-sizing: border-box;
`

export default PoolCard
