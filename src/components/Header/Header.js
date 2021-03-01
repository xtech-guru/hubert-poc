import React from "react"
import styled from "styled-components"

import data from "../../mocks/header.json"
import { Menu } from "../Menu"

export const Header = props => (
  <HeaderWrapper>
    <SocialMediaIconButtonsWrapper>
      <a className="hubert_fb_url" href={props.facebookUrl} target="_blank" />
      <a
        className="hubert_pinterest_url"
        href={props.pinterestUrl}
        target="_blank"
      />
    </SocialMediaIconButtonsWrapper>
    <Menu />
  </HeaderWrapper>
)

Header.defaultProps = data

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
