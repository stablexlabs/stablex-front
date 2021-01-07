// @ts-nocheck
import React from 'react'
import styled from 'styled-components'
import Button from '../../components/Button'
import Container from '../../components/Container'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'
import FarmCards from '../Farms/components/FarmCards'
// import Promo from '../../assets/promo.png'

const Home: React.FC = () => {
  const [currentTime, setCurrentTime] = React.useState(
    Date.parse(new Date()) / 1000,
  )

  const endTime = 1602853200
  const seconds = (endTime - currentTime) % 60
  const minutes = ((endTime - currentTime) % 3600) / 60
  const hours = ((endTime - currentTime) % (3600 * 24)) / 3600
  const days = (endTime - currentTime) / (3600 * 24)

  const tick = () => {
    setCurrentTime(currentTime + 1)
  }

  React.useEffect(() => {
    // 执行定时
    let timerID = setInterval(() => tick(), 1000)
    // 卸载组件时进行清理
    return () => clearInterval(timerID)
  })

  return (
    <Page>
      <Spacer />
      <Container>
    
         <Spacer />{' '}
         <StyledInfo>
           <a
            target="_blank" 
            href="https://trade.stablex.finance?ref=homepage"
          >
            ➡️ Try the new swap!{' '}
          </a>
          <br />
          
          <a
            target="_blank"
            href="https://exchange.pancakeswap.finance/#/add/ETH/0x0Da6Ed8B13214Ff28e9Ca979Dd37439e8a88F6c4"
          >
            ➡️ Add STAX Liquidity{' '}
          </a>
          <br />
          <a
            target="_blank"
            href="https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x0da6ed8b13214ff28e9ca979dd37439e8a88f6c4"
          >
            ➡️ Buy STAX{' '}
          </a>
        </StyledInfo>
        
        <Spacer />{' '}
        <Balances />
        <Spacer />{' '}
       
        <FarmCards removed={false} />
      </Container>
      <Spacer size="lg" />
    </Page>
  )
}

const Title = styled.div`
  color: ${(props) => props.theme.colors.primary};
  line-height: 60px;
  font-size: 20px;
`
const Countdown = styled.div`
  display: inline-block;
  width: 80px;
  border-radius: 12.8px;
  font-family: monospace;
  font-size: 58px;
  color: ${(props) => props.theme.colors.primary};
  letter-spacing: 0;

  margin-left: 10px;
  text-shadow: 0 2px 21px rgba(10, 16, 128, 0.08);
  @media (max-width: 768px) {
    width: auto;
    font-size: 40px;
  }
`

const Blank = styled.div`
  height: 100px;
  font-size: 60px;
  @media (max-width: 500px) {
    height: 60px;
  }
`

const StyledInfo = styled.h3`
  color: ${(props) => props.theme.colors.primary};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
  a {
    color: #333;
  }
  > b {
    color: ${(props) => props.theme.colors.primary};
  }
`

export default Home
