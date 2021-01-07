import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Nav: React.FC = () => {
  return (
    <>
      <StyledNav>
        <StyledLink exact activeClassName="active" to="/">
          Home
        </StyledLink>
        <StyledLink exact activeClassName="active" to="/staking">
          Staking
        </StyledLink>
      </StyledNav>
      <ExternalLink href="https://trade.stablex.finance.com">
        Swap(New!)
      </ExternalLink>
    </>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  @media (max-width: 850px) {
    a:first-child {
      display: none;
    }
  }
`

const ExternalLink = styled.a`
  font-weight: 700;
  padding-left: 16px;
  padding-right: 16px;
  color: #888583;
  text-decoration: none;
  @media (max-width: 850px) {
    a:first-child {
      display: none;
    }
  }
`
const StyledLink = styled(NavLink)`
  color: ${(props) => props.theme.colors.grey[400]};
  font-weight: 700;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: #333;
  }
  &.active {
    color: ${(props) => props.theme.colors.grey[600]};
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
