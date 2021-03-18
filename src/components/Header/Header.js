import React from "react"
import styled from "styled-components"

import data from "../../mocks/header.json"
import { Menu } from "../Menu"

export const Header = props => (
  <HeaderWrapper>
    <SocialMediaIconButtonsWrapper>
      <StyledLink
        href={props.facebookUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Facebook page"
      >
        {" "}
      </StyledLink>
      <StyledLink
        href={props.pinterestUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Pinterest page"
      >
        {" "}
      </StyledLink>
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
const StyledLink = styled.a`
  display: block;
  width: 24px;
  height: 24px;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
  background-repeat: no-repeat;
  background-position: 50%;
`
