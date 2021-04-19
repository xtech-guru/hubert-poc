import { createGlobalStyle } from "styled-components"

import * as fonts from "../../fonts"

export const GlobalStyle = createGlobalStyle`

  @font-face {
    font-family: 'Merriweather';
    src: local('Merriweather Regular'), url('${fonts.MerriWeatherRegular}') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Merriweather';
    src: local('Merriweather Italic'), url('${fonts.MerriWeatherItalic}') format('truetype');
    font-weight: normal;
    font-style: italic;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'GT Pressura';
    src: local('GT Pressura Regular'), url('${fonts.GTPressuraRegular}') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'GT Pressura';
    src: local('GT Pressura Regular Italic'), url('${fonts.GTPressuraRegularItalic}') format('truetype');
    font-weight: normal;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'GT Pressura';
    src: local('GT Pressura Bold'), url('${fonts.GTPressuraBold}') format('truetype');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'GT Pressura';
    src: local('GT Pressura Bold Italic'), url('${fonts.GTPressuraBoldItalic}') format('truetype');
    font-weight: bold;
    font-style: italic;
    font-display: swap;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'GT Pressura';
    max-width: 100vw;
    overflow-x: hidden;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    -o-font-smoothing: antialiased;
  }

  * {
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6,
  .h1, .h2, .h3, .h4, .h5, .h6 {
    font-family: 'GT Pressura';
    font-weight: 700;
    line-height: 1.1;
    margin-top: 0;
    margin-bottom: .5rem;
  }

  h1,
  .h1 {
    font-size: 2rem;

    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 2.5rem;
    }

    @media (min-width: 992px) {
      font-size: 3rem;
    }
  }

  h2,
  .h2 {
    font-size: 1.375rem;

    @media (min-width: 992px) {
      font-size: 1.75rem;
    }
  }

  h1, h2,
  .h1, .h2 {
    text-transform: uppercase;
  }

  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  article {
    line-height: 24px;
    
    p {
      font-family: Merriweather;
    }
  }

  ul {
    padding: 0;
  }

  blockquote {
    margin: 0 0 1rem;
  }
`
