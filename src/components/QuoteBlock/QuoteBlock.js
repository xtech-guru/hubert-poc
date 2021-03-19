import styled from "styled-components"
import React from "react"

const QuoteBlockWrapper = styled.div`
  padding: 15px 0;
  font-family: GT Pressura, -apple-system, system-ui, BlinkMacSystemFont,
    Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif;
  font-size: 30px;
  line-height: 36px;
  font-weight: 700;
  color: #f86968;
  border-top: 3px solid #ffd0d0;
  border-bottom: 3px solid #ffd0d0;
  margin: 0 0 1rem;

  @media (min-width: 768px) {
    margin-right: -63px;
    margin-left: -63px;
  }

  @media (min-width: 992px) {
    margin-right: -77px;
    margin-left: -77px;
  }

  p {
    margin: 0;
  }
`

export function QuoteBlock({ content }) {
  return (
    <QuoteBlockWrapper>
      <p>{content}</p>
    </QuoteBlockWrapper>
  )
}
