import React from "react"
import styled from "styled-components"

import { Menu } from "../Menu"

export const Header = () => (
  <HeaderWrapper>
    <SocialMediaIconButtonsWrapper>
      <a
        className="hubert_fb_url"
        href="https://www.facebook.com/hubertmagazin"
        target="_blank"
      />
      <a
        className="hubert_pinterest_url"
        href="https://www.pinterest.de/sorpetaler/hubert-magazin-f%C3%BCr-holzkultur/"
        target="_blank"
      />
    </SocialMediaIconButtonsWrapper>
    <Menu />
  </HeaderWrapper>
)

const HeaderWrapper = styled.header`
  display: block;

  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding-right: 15px;
  padding-left: 15px;

  @media (min-width: 576px) {
    width: 540px;
    max-width: 100%;
  }

  @media (min-width: 576px) {
    padding-right: 15px;
    padding-left: 15px;
  }

  @media (min-width: 768px) {
    width: 720px;
    max-width: 100%;
  }

  @media (min-width: 768px) {
    padding-right: 15px;
    padding-left: 15px;
  }

  @media (min-width: 992px) {
    width: 960px;
    max-width: 100%;
  }

  @media (min-width: 992px) {
    padding-right: 15px;
    padding-left: 15px;
  }

  @media (min-width: 1200px) {
    width: 1140px;
    max-width: 100%;
  }

  @media (min-width: 1200px) {
    padding-right: 15px;
    padding-left: 15px;
  }
`

const SocialMediaIconButtonsWrapper = styled.div`
  display: flex !important;
  justify-content: flex-end !important;
  padding: 37px 0.5rem 5px 0;
`
