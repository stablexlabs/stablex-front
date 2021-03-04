import { createGlobalStyle } from 'styled-components'
import { ThemeType } from '../../theme'
import InterFonts from '../../assets/fonts/Inter-VariableFont.ttf'
import RobotoMono from '../../assets/fonts/RobotoMono.ttf'

const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
  @font-face {
    font-family: Inter;
    src: url(${InterFonts});
  }

  @font-face {
    font-family: 'Roboto Mono';
    src: url(${RobotoMono});
  }

  body {
    background-color: ${props => props.theme.colors.bg};
    margin: 0;
    font-family: Inter;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-repeat: no-repeat;
    background-position-y:50px;
    background-position-x:center;
    @media (max-width: 500px) {
      height: 100vh;
    }
  }

  code {
    font-family: 'Roboto Mono';
  }
`

export default GlobalStyle

