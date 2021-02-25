import React from "react"
import styled from "styled-components"

import { Layout, Seo } from "../components"
import props from "../mock/impressum.json"

const CompanyInformation = ({
  bio,
  address,
  phoneNumber,
  email,
  authorizedRepresentative,
}) => {
  return (
    <>
      {[bio, address, phoneNumber, email, authorizedRepresentative].map(
        (value, index) => (
          <p key={index} dangerouslySetInnerHTML={{ __html: value }} />
        )
      )}
    </>
  )
}

const CompanyRegistrationInformation = ({
  ustidnr,
  registerCourt,
  registerNumber,
}) => {
  return (
    <p>
      {[ustidnr, registerCourt, registerNumber].map(value => (
        <>
          <span dangerouslySetInnerHTML={{ __html: value }} />
          <br />
        </>
      ))}
    </p>
  )
}

const Paragraph = ({ title, description }) => {
  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: title }} />
      <p dangerouslySetInnerHTML={{ __html: description }} />
    </>
  )
}

const AboutPage = props => (
  <Layout>
    <Seo title="About" />
    <StyledContainer>
      <ArticleWrapper>
        <ArticleContentWrapper>
          <h1>
            <a href="https://www.sorpetaler.de/hubert/impressum/">
              {props.title}
            </a>
          </h1>

          <CompanyInformation
            bio={props.companyInformation.bio}
            email={props.companyInformation.email}
            phoneNumber={props.companyInformation.phoneNumber}
            address={props.companyInformation.address}
            authorizedRepresentative={
              props.companyInformation.authorizedRepresentative
            }
          />

          <CompanyRegistrationInformation
            ustidnr={props.companyRegistrationInformation.ustidnr}
            registerCourt={props.companyRegistrationInformation.registerCourt}
            registerNumber={props.companyRegistrationInformation.registerNumber}
          />

          {props.paragraphs.map((paragraph, index) => (
            <Paragraph
              key={index}
              title={paragraph.title}
              description={paragraph.description}
            />
          ))}
        </ArticleContentWrapper>
      </ArticleWrapper>
    </StyledContainer>
  </Layout>
)

AboutPage.defaultProps = props

export default AboutPage

const StyledContainer = styled.div`
  margin: 30px 0 60px;

  @media (min-width: 768px) {
    margin-top: 60px;
  }

  * {
    box-sizing: inherit;
  }
`

const ArticleWrapper = styled.article`
  @media (min-width: 576px) {
    width: 540px;
    max-width: 100%;
    padding-right: 15px;
    padding-left: 15px;
  }

  @media (min-width: 768px) {
    width: 720px;
    max-width: 100%;
    padding-right: 15px;
    padding-left: 15px;
  }

  @media (min-width: 992px) {
    width: 960px;
    max-width: 100%;
    padding-right: 15px;
    padding-left: 15px;
  }

  @media (min-width: 1200px) {
    width: 1140px;
    max-width: 100%;
    padding-right: 15px;
    padding-left: 15px;
  }

  display: block;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  box-sizing: inherit;
`

const ArticleContentWrapper = styled.div`
  display: block;
  margin: 0 0 20px;
  color: #756b62;

  * {
    box-sizing: inherit;
  }

  @media (min-width: 992px) {
    padding-left: 77px;
    padding-right: 233px;
  }

  @media (min-width: 768px) {
    margin-bottom: 30px;
  }
`
