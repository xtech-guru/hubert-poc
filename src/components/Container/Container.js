import React from "react"
import styled from "styled-components"

const StyledContainer = styled.div`
  margin: 30px 0 60px;

  @media (min-width: 768px) {
    margin-top: 60px;
  }

  * {
    box-sizing: inherit;
  }
`

export const Container = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>
}
