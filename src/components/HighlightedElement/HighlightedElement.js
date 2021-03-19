import styled from "styled-components"
import { Link } from "gatsby"
import React from "react"

const HighlightedElementWrapper = styled.div`
  margin-left: 30px;
  margin-bottom: 20px;
  float: right;
  background-color: #f4efea;
  padding: 20px;

  > p {
    font-family: GT Pressura, -apple-system, system-ui, BlinkMacSystemFont,
      Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif;
    font-weight: 700;
    color: #9d958e;
    text-transform: uppercase;
    line-height: 1.25;
    margin: 0;

    @media (min-width: 992px) {
      max-width: 163px;
    }

    > a {
      touch-action: manipulation;
      color: #0275d8;
      text-decoration: none;
      background-color: transparent;

      :hover {
        color: #014c8c;
        text-decoration: underline;
      }
    }
  }
`

export function HighlightedElement({ content, link }) {
  return (
    <HighlightedElementWrapper>
      <p>
        {content}
        <Link to={link}>Webseite</Link>.
      </p>
    </HighlightedElementWrapper>
  )
}
