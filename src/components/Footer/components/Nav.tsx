import React from 'react'
import styled from 'styled-components'
import github from '../../../assets/img/github.png'
import twitter from '../../../assets/img/twitter.png'
import medium from '../../../assets/img/medium.png'
import telegram from '../../../assets/img/telegram.png'
import Spacer from '../../Spacer'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <WrappedContent>
        <div>
          <StyledLink href="#" target="_blank">
            Documentation
          </StyledLink>
          <StyledLink href="https://medium.com/stablexswap" target="_blank">
            About
          </StyledLink>
        </div>
        <Spacer />
        <CopyRight>© {new Date().getFullYear()} StableX</CopyRight>
      </WrappedContent>
      <WrappedContent>
        <StyledLink target="_blank" href="https://t.me/stablexfinance">
          <img src={telegram} width="20" />
        </StyledLink>
        <StyledLink target="_blank" href="https://medium.com/stablexswap">
          <img src={medium} width="20" />
        </StyledLink>
        <StyledLink target="_blank" href="https://github.com/stablexlabs">
          <img src={github} width="20" />
        </StyledLink>
        <StyledLink target="_blank" href="https://twitter.com/stablexswap">
          <img src={twitter} width="20" />
        </StyledLink>
      </WrappedContent>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  width: 100%;
  justify-content: space-between;
`

const StyledLink = styled.a`
  color: ${(props) => props.theme.colors.text};
  padding-right: ${(props) => props.theme.spacing[4]}px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.grey[500]};
  }
`

const WrappedContent = styled.div`
  display: block;

  color: ${(props) => props.theme.colors.text};
`

const CopyRight = styled.div``
export default Nav
