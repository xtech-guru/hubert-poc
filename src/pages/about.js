import React from "react"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const props = {
  header: {
    title: "Über uns",
    description:
      "Ein Hallo von Hubert – dem Magazin für Holz-Kultur!</br></br>Schön, dass du da bist. Bei Hubert informieren wir dich über" +
      " die neuesten Trends rund um den Werkstoff Holz, über aktuelle Entwicklungen in der Architektur und nachhaltiges" +
      " Bauen und Wohnen. Wir liefern Interviews mit spannenden Persönlichkeiten aus der Branche und bieten Tipps und Tricks" +
      " für die ideale Pflege und Behandlung von Holz.",
  },
  content: {
    image: {
      src:
        "https://www.sorpetaler.de/wp-content/uploads/2017/10/hubert-ber-uns.png",
      alt:
        "Oben: Hubert Appelhans (ganz rechts) vor der Landschreinerei Appelhans; unten: Holz für die Fensterfertigung, Anfertigung des Glasleistenrahmens",
      width: "500",
      height: "500",
      srcSet:
        "https://www.sorpetaler.de/wp-content/uploads/2017/10/hubert-ber-uns.png 800w, https://www.sorpetaler.de/wp-content/uploads/2017/10/hubert-ber-uns-150x150.png 150w, https://www.sorpetaler.de/wp-content/uploads/2017/10/hubert-ber-uns-300x300.png 300w, https://www.sorpetaler.de/wp-content/uploads/2017/10/hubert-ber-uns-768x768.png 768w, https://www.sorpetaler.de/wp-content/uploads/2017/10/hubert-ber-uns-380x380.png 380w",
      sizes: "(max-width: 500px) 100vw, 500px",
    },
    paragraph: {
      blocks: [
        {
          descriptions: [
            "In unserem Fensterratgeber nehmen wir außerdem speziell das Thema" +
              " Fenster unter die Lupe und liefern Ratschläge und Hinweise – etwa zur" +
              " Pflege und zum Streichen von Holzfenstern.",
          ],
        },
        {
          title: "Unsere Liebe zu Holz",
          descriptions: [
            "Hubert wird herausgegeben von" +
              ' <a href="https://www.sorpetaler.de/" target="_blank" rel="noopener">' +
              "Sorpetaler Fensterbau" +
              " </a>" +
              " . Wir bauen seit jeher leidenschaftlich gerne Fenster aus Holz und" +
              " Holz-Aluminium-Fenster sowie Haustüren und Terrassentüren aus Holz und" +
              " Holz-Aluminium. Unsere Liebe zum Werkstoff Holz wollen wir mit Hubert" +
              " weitertragen. Wir wissen von vielen anderen, dass sie diese Liebe zum" +
              " Werkstoff Holz teilen. Für all jene ist das Magazin.",
            "Der Name unseres Magazins kommt dabei nicht von ungefähr:" +
              " Schreinermeister Hubert Appelhans, seines Zeichens Gründer der" +
              " Sorpetaler Fensterbau GmbH, übernahm die Landschreinerei Appelhans im" +
              " Jahr 1947 und war immer davon überzeugt, dass Holz das beste und" +
              " schönste Material für Fenster ist.",
            " In unserem Fensterratgeber nehmen wir außerdem speziell das Thema" +
              " Fenster unter die Lupe und liefern Ratschläge und Hinweise – etwa zur" +
              " Pflege und zum Streichen von Holzfenstern.",
            "Bei dieser Auffassung sind wir bis heute geblieben&nbsp;" +
              " <strong>#WirliebenHolz</strong>.",
          ],
        },
        {
          title: "Gefällt dir Hubert?",
          descriptions: [
            "Wir freuen uns immer sehr über Feedback. Schreib uns gerne eine" +
              " Nachricht an:" +
              ' <a href="mailto:post@hubert-magazin.de">post@hubert-magazin.de</a>',
          ],
        },
      ],
    },
  },
}

const StyledImage = styled.img`
  display: block;
  margin-left: 0;
  margin-right: 0;
  max-width: 100%;
  height: auto;
  vertical-align: middle;
  border-style: none;

  *,
  :after,
  :before {
    box-sizing: inherit;
  }

  @media (min-width: 768px) {
    margin-bottom: 20px;
    margin-right: 30px;
    margin-left: -63px;
    float: left !important;
  }

  @media (min-width: 992px) {
    margin-left: -77px;
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

const Header = ({ title, description }) => {
  return (
    <>
      <h1>{title}</h1>
      <p dangerouslySetInnerHTML={{ __html: description }} />
    </>
  )
}

const ParagraphBlock = ({ title, descriptions = [] }) => {
  return (
    <>
      {title && <h2>{title}</h2>}
      {descriptions.map((description, index) => (
        <p key={index} dangerouslySetInnerHTML={{ __html: description }} />
      ))}
    </>
  )
}

const Paragraph = ({ paragraph }) => {
  return (
    <>
      {paragraph.blocks.map((block, index) => (
        <ParagraphBlock
          key={index}
          title={block.title}
          descriptions={block.descriptions}
        />
      ))}
    </>
  )
}

const Content = ({ image, paragraph }) => {
  return (
    <>
      <StyledImage {...image} />
      <Paragraph paragraph={paragraph} />
    </>
  )
}

const AboutPage = () => {
  return (
    <Layout>
      <SEO title="About" />
      <StyledContainer>
        <StyledArticle>
          <StyledArticleContent>
            <Header
              title={props.header.title}
              description={props.header.description}
            />

            <Content
              image={props.content.image}
              paragraph={props.content.paragraph}
            />
          </StyledArticleContent>
        </StyledArticle>
      </StyledContainer>
    </Layout>
  )
}

export default AboutPage
