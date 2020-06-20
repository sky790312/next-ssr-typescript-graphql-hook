import { createGlobalStyle } from 'styled-components'
import { Color } from '@/utils/constants/Color'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    color: ${Color.defaultText};
    font-family: 'Microsoft JhengHei', sans-serif;
  }

  ul {
    margin: 0;
    padding-left: 0;

    > li {
      list-style-type: none;
    }
  }

  h1 {
    font-size: 36px;
  }

  h2 {
    font-size: 30px;
  }

  h3 {
    font-size: 24px;
  }

  h4 {
    font-size: 20px;
  }

  h5 {
    font-size: 18px;
  }

  h6 {
    font-size: 16px;
  }

  a {
    color: ${Color.primary};
  }

  img {
    width: 100%;
  }

  .container {
    padding-left: 20px;
    padding-right: 20px;
    margin: 0 auto;

    @media (min-width: 1140px) {
      width: 1140px;
    }
  }

  .text-center {
    text-align: center;
  }
`

export default GlobalStyles
