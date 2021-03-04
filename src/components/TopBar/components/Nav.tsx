import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <>
      <StyledNav>
        <ExternalLink href="https://trade.stablex.finance">Swap</ExternalLink>
        <StyledLink exact activeClassName="active" to="/staking">
          Pool
        </StyledLink>
        <ExternalLink
          href="https://exchange.pancakeswap.finance/?_gl=1*2camhd*_ga*MTk5ODAyNTk4My4xNjExODI4OTcx*_ga_334KNG3DMQ*MTYxMzYyNDE1MS4zNC4wLjE2MTM2MjQxNTIuMA..#/swap?outputCurrency=0x0da6ed8b13214ff28e9ca979dd37439e8a88f6c4"
          target="_blank"
        >
          Buy STAX
        </ExternalLink>
        <ExternalLink
          href="https://pancakeswap.info/token/0x0da6ed8b13214ff28e9ca979dd37439e8a88f6c4"
          target="_blank"
        >
          Transaction History
        </ExternalLink>
      </StyledNav>
    </>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
`

const ExternalLink = styled.a`
  font-weight: 500;
  padding-left: 16px;
  padding-right: 16px;
  color: ${(props) => props.theme.colors.text};
  text-decoration: none;
`
const StyledLink = styled(NavLink)`
  color: ${(props) => props.theme.colors.text};
  font-weight: 500;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.text};
  }
  &.active {
    font-weight: 700;
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`

const StyledAbsoluteLink = styled.a`
  color: ${(props) => props.theme.colors.grey[400]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: #452a7a;
  }
  &.active {
    color: ${(props) => props.theme.colors.grey[600]};
  }
  @media (max-width: 400px) {
    padding-left: ${(props) => props.theme.spacing[2]}px;
    padding-right: ${(props) => props.theme.spacing[2]}px;
  }
`

export default Nav
