import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
import SushiIcon from '../../../components/SushiIcon'
import useAllEarnings from '../../../hooks/useAllEarnings'
import useAllStakedValue from '../../../hooks/useAllStakedValue'
import useFarms from '../../../hooks/useFarms'
import useTokenBalance, {
  useTotalSupply,
  useBurnedBalance,
  useCakePrice,
} from '../../../hooks/useTokenBalance'
import useSushi from '../../../hooks/useSushi'

import Separator from '../../../components/Separator'
import { getSushiAddress } from '../../../sushi/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'

const PendingRewards: React.FC = () => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)

  const allEarnings = useAllEarnings()
  let sumEarning = 0
  for (let earning of allEarnings) {
    sumEarning += new BigNumber(earning)
      .div(new BigNumber(10).pow(18))
      .toNumber()
  }

  const [farms] = useFarms()
  const allStakedValue = useAllStakedValue()

  if (allStakedValue && allStakedValue.length) {
    const sumWeth = farms.reduce(
      (c, { id }, i) => c + (allStakedValue[i].totalWethValue.toNumber() || 0),
      0,
    )
  }

  useEffect(() => {
    setStart(end)
    setEnd(sumEarning)
  }, [sumEarning])

  return (
    <StyledSpan
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'right bottom',
        transition: 'transform 0.5s',
        display: 'inline-block',
      }}
    >
      <CountUp
        start={start}
        end={end}
        decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
        duration={1}
        onStart={() => {
          setScale(1.25)
          setTimeout(() => setScale(1), 600)
        }}
        separator=","
      />
    </StyledSpan>
  )
}

const Balances: React.FC = () => {
  const sushi = useSushi()
  const totalSupply = useTotalSupply()
  const sushiBalance = useTokenBalance(getSushiAddress(sushi))
  const burnedBalance = useBurnedBalance(getSushiAddress(sushi))
  const { account, ethereum }: { account: any; ethereum: any } = useWallet()
  const cakePrice = useCakePrice()

  return (
    <>
      <StyledWrapper>
        <Card>
          <CardContent>
            <StyledBalances>
              <StyledBalance>
                <Value
                  value={
                    totalSupply
                      ? `$${(
                          getBalanceNumber(totalSupply) -
                          getBalanceNumber(burnedBalance)
                        ).toLocaleString()}`
                      : '$xx,xxx,xxx'
                  }
                />
              </StyledBalance>
              <SLabel>Circ. Supply</SLabel>
            </StyledBalances>
          </CardContent>
        </Card>
        <Spacer />

        <Card>
          <CardContent>
            <StyledBalances>
              <StyledBalance>
                <div style={{ flex: 1 }}>
                  <Value
                    value={
                      totalSupply
                        ? `$${(
                            (getBalanceNumber(totalSupply) -
                              getBalanceNumber(burnedBalance)) *
                            cakePrice
                          ).toLocaleString()}`
                        : '$xx,xxx,xxx'
                    }
                  />
                </div>
              </StyledBalance>
              <SLabel>Marketcap</SLabel>
            </StyledBalances>
          </CardContent>
        </Card>
        <Spacer />
        <Card>
          <CardContent>
            <StyledBalances>
              <StyledBalance>
                <div style={{ flex: 1 }}>
                  <Value
                    value={!!account ? getBalanceNumber(sushiBalance) : 'x,xx'}
                  />
                </div>
              </StyledBalance>
            </StyledBalances>
          </CardContent>
          <SLabel>Your STAX</SLabel>
        </Card>
      </StyledWrapper>
    </>
  )
}

const RowCard = styled.div`
  width: 100%;
  box-shadow: 0px 2px 8px rgba(171, 133, 115, 0.21);
  background: #fff;
  line-height: 60px;
  padding: 0 25px;
  box-sizing: border-box;
  background: ${(props) => props.theme.colors.cardBg};
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 500px) {
    flex-direction: column;
    line-height: 40px;
    padding: 25px;
  }
`

const SLabel = styled.div`
  font-weight: normal;
  color: ${(props) => props.theme.colors.text};
  text-align: center;
`

const SLabel2 = styled.div`
  color: #7645d9;
  @media (max-width: 500px) {
    line-height: 20px;
  }
`

const Footnote = styled.div`
  font-size: 14px;
  padding: 0 20px;
  line-height: 50px;
  color: ${(props) => props.theme.colors.blue[100]};
  border-top: solid 1px #7645d938;
  padding: 0 2rem;
`
const FootnoteValue = styled.div`
  font-family: 'Roboto Mono', monospace;
  float: right;
  height: 50px;
  line-height: 50px;
  color: ${(props) => props.theme.colors.blue[100]};
`

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const StyledBalances = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex: 1;

  line-height: 60px;
`

const StyledSpan = styled.span`
  color: #ffc35c;
`

export default Balances
