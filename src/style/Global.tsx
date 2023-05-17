import { createGlobalStyle } from 'styled-components'
import { PancakeTheme } from '@pancakeswap/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Roboto';
  }
  body {
    // background-color: #f1f3fb;
    background: linear-gradient(rgb(243,241,241) 0%,rgb(253 250 250) 31.77%);

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
