import React from "react"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const props = {
  title: "Impressum",
  companyInformation: {
    bio:
      "Hubert, das Online-Magazin f&uuml;r Holzkultur wird herausgegeben von:",
    address:
      "Sorpetaler Fensterbau GmbH<br />" + " Selbecke 6<br />D-59846 Sundern",
    phoneNumber: "Telefon: +49 2393 91 92 0",
    email: "Email: info@sorpetaler.de",
    authorizedRepresentative:
      "Vertretungsberechtigter Gesch&auml;ftsf&uuml;hrer: Eduard Appelhans" +
      " (V.i.S.d. &sect;55 RStV)",
  },
  companyRegistrationInformation: {
    ustidnr: "UStIDNr.: DE232573200",
    registerCourt: "Registergericht: Arnsberg",
    registerNumber: "Registernummer: HRB 10599",
  },
  paragraphs: [
    {
      title: "Bildnachweise",
      description:
        "Sorpetaler Fensterbau GmbH <br />" +
        " Dipl.Des. Stefanie Schenk-Busse <br />" +
        " RSA &ndash; Rinsdorf Str&ouml;cker Architekten GmbH" +
        " <br /> materio GmbH",
    },
    {
      title: "Rechtlicher Hinwei",
      description:
        "&copy; Alle auf dieser Website ver&ouml;ffentlichten Texte und" +
        " Bilder sind nach deutschem Recht urheberrechtlich gesch&uuml;tzt." +
        " Sie d&uuml;rfen ohne Erlaubnis weder kopiert noch anderweitig" +
        " genutzt werden.",
    },
  ],
}

const StyledContainer = styled.div`
  margin: 30px 0 60px;

  @media (min-width: 768px) {
    margin-top: 60px;
  }

  * {
    box-sizing: inherit;
  }

  user agent stylesheet div {
    display: block;
  }
`

const StyledArticle = styled.article`
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

const StyledArticleContent = styled.div`
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

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <StyledContainer>
      <StyledArticle>
        <StyledArticleContent>
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
        </StyledArticleContent>
      </StyledArticle>
    </StyledContainer>
  </Layout>
)

export default AboutPage
