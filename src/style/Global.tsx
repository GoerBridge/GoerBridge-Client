import { createGlobalStyle } from 'styled-components'
import { PancakeTheme } from '@pancakeswap/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Roboto';
    color:#1a0c2e
  }
  body {
    // background-color: #f1f3fb;
    background-image: url('/images/background/bg.jpeg');
    background-repeat: no-repeat;
background-position: center center;
background-attachment: fixed;
background-size: cover;
    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
