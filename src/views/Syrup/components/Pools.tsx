import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'

import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import { getContract } from '../../../utils/erc20'
import useSushi from '../../../hooks/useSushi'
import { getPools } from '../../../sushi/utils'

import PoolCard from '../components/PoolCard'
import { sousChefTeam } from '../../../sushi/lib/constants'

interface SyrupRowProps {
  sousId: number
  tokenName: string
  projectLink: string
  multi: string
}

const SyrupRow: React.FC<SyrupRowProps> = ({
  sousId,
  tokenName,
  projectLink,
  multi,
}) => {
  const { ethereum } = useWallet()

  const syrup = useMemo(() => {
    return getContract(
      ethereum as provider,
      '0x0Da6Ed8B13214Ff28e9Ca979Dd37439e8a88F6c4',
    )
  }, [ethereum])

  return (
    <StyledCardWrapper>
      <PoolCard syrup={syrup} {...{ sousId, tokenName, projectLink, multi }} />
    </StyledCardWrapper>
  )
}

const Pools: React.FC = () => {
  const sushi = useSushi()
  const pools = getPools(sushi) || sousChefTeam

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <StyledFarm>
      <StyledCardsWrapper>
        {pools.map((pool, index) => (
          <SyrupRow {...pool} />
        ))}
      </StyledCardsWrapper>
    </StyledFarm>
  )
}

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  @media (max-width: 800px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: 350px;
  position: relative;
  flex-direction: column;
  margin: 16px 0;
`

export default Pools
