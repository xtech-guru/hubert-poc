import React from "react"
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
  }

  * {
    box-sizing: border-box;
  }

  h1 {
    font-size: 3rem;
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
`
