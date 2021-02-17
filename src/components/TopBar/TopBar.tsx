import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'
import title from '../../assets/img/title.png'

import AccountButton from './components/AccountButton'
import Nav from './components/Nav'

interface TopBarProps {
  isDark: boolean
  toogleTheme: (isDark: boolean) => void
  onPresentMobileMenu: () => void
}

const TopBar: React.FC<TopBarProps> = ({
  isDark,
  toogleTheme,
  onPresentMobileMenu,
}) => {
  return (
    <StyledTopBar>
      <StyledTopBarInner>
        <StyledLogoWrapper>
          <Link to="/">
            <img src={title} height="36" />
          </Link>
        </StyledLogoWrapper>
        <Nav />
        <StyledAccountButtonWrapper>
          <AccountButton />
        </StyledAccountButtonWrapper>
      </StyledTopBarInner>
    </StyledTopBar>
  )
}

const Menu = styled.div`
  margin: 0 auto;
  width: 82px;
  color: white;
  font-size: 17px;
  padding: 3px 3px 3px 3px;
  font-weight: 700;
  background: #47d3db;
  border-radius: 20px;
  display: nones;
  display: none;
  @media (max-width: 850px) {
    display: block;
  }
`

const StyledLogoWrapper = styled.div`
  font-family: 'Quicksand', sans-serif;
  @media (max-width: 420px) {
    width: auto;
  }
  img {
    position: relative;
    top: 4px;
  }
  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.text};
    font-size: 20px;
    font-weight: 900;
  }
  padding-right: 24px;
`
const StyledTopBar = styled.div`
  display: flex;
`

const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  height: ${(props) => props.theme.topBarSize}px;
  padding: 0 20px 0 20px;
  width: 100%;
  @media (min-width: 600px) {
    padding: 0 80px 0 80px;
  }

  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`
const StyledNavWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  @media (max-width: 400px) {
    display: none;
  }
`

const StyledAccountButtonWrapper = styled.div`
  @media (max-width: 850px) {
    display: none;
  }
  margin-left: auto;
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: 196px;
  @media (max-width: 400px) {
    justify-content: center;
    width: auto;
  }
`
const StyledAccountMenuWrapper = styled.div`
  @media (mim-width: 850px) {
    display: none;
  }
  align-items: center;
  display: flex;
  justify-content: flex-end;
  width: 0;
  @media (max-width: 400px) {
    justify-content: center;
    width: auto;
  }
`

const StyledMenuButton = styled.button`
  background: none;
  border: 0;
  margin: 0;
  outline: 0;
  padding: 0;
  display: none;
  @media (max-width: 400px) {
    align-items: center;
    display: flex;
    height: 44px;
    justify-content: center;
    width: 44px;
  }
`

const StyledMoonButtonWrapper = styled.div`
  padding: 0 20px;
`

const StyledMoonButtonWrapper2 = styled.div`
  display: none;
  @media (max-width: 850px) {
    display: block;
  }
`

export default TopBar
