// @ts-nocheck
import React from 'react'
import styled from 'styled-components'
import Container from '../../components/Container'
import Page from '../../components/Page'
import Spacer from '../../components/Spacer'
import Balances from './components/Balances'
import FarmCards from '../Farms/components/FarmCards'
import Pools from '../Syrup/components/Pools'
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
      <Container size="lg">
        <LargeOnly>
          <Spacer size="lg" />
          <Spacer size="sm" />
        </LargeOnly>
        <Balances />

        <Spacer size="lg" />
        <Spacer size="sm" />
        <Title>Pools</Title>
        <FarmCards removed={false} />

        <Spacer size="lg" />
        <Spacer size="sm" />
        <Title>Staking</Title>
        <Pools />
      </Container>
      <Spacer size="lg" />
    </Page>
  )
}

const Title = styled.div`
  color: ${(props) => props.theme.colors.primary};
  line-height: 30px;
  font-size: 18px;
  font-weight: 500;
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

const LargeOnly = styled.div`
  @media (max-width: 500px) {
    display: none;
  }
`

export default Home
