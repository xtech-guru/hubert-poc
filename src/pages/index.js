import React from "react"
// import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import { Footer, Header, Posts } from "../components"

import icon_arrow_blue from "../images/icon_arrow_blue.svg"
import icon_arrow_brown from "../images/icon_arrow_brown.svg"

const IndexPage = ({ data }) => {
  const articles = [...data.allContentfulArticle.nodes]
  const featuredArticle = articles[0]
  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta charset="utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="text/javascript"
          async=""
          src="https://assets.pinterest.com/js/pinit_main.js?0.24417730193079423"
        ></script>

        <link rel="dns-prefetch" href="//assets.pinterest.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//s.w.org" />
        <link
          rel="stylesheet"
          id="apsp-font-opensans-css"
          href="//fonts.googleapis.com/css?family=Open+Sans&#038;ver=4.8.15"
          type="text/css"
          media="all"
        />
        <link
          rel="stylesheet"
          id="apsp-frontend-css-css"
          href="https://www.sorpetaler.de/wp-content/plugins/accesspress-pinterest/css/frontend.css?ver=3.3.1"
          type="text/css"
          media="all"
        />
        <link
          rel="stylesheet"
          id="bwg_fonts-css"
          href="https://www.sorpetaler.de/wp-content/plugins/photo-gallery/css/bwg-fonts/fonts.css?ver=0.0.1"
          type="text/css"
          media="all"
        />
        <link
          rel="stylesheet"
          id="sumoselect-css"
          href="https://www.sorpetaler.de/wp-content/plugins/photo-gallery/css/sumoselect.min.css?ver=3.0.3"
          type="text/css"
          media="all"
        />
        <link
          rel="stylesheet"
          id="mCustomScrollbar-css"
          href="https://www.sorpetaler.de/wp-content/plugins/photo-gallery/css/jquery.mCustomScrollbar.min.css?ver=1.5.56"
          type="text/css"
          media="all"
        />
        <link
          rel="stylesheet"
          id="bwg_googlefonts-css"
          href="https://fonts.googleapis.com/css?family=Ubuntu&#038;subset=greek,latin,greek-ext,vietnamese,cyrillic-ext,latin-ext,cyrillic"
          type="text/css"
          media="all"
        />
        <link
          rel="stylesheet"
          id="bwg_frontend-css"
          href="https://www.sorpetaler.de/wp-content/plugins/photo-gallery/css/styles.min.css?ver=1.5.56"
          type="text/css"
          media="all"
        />
        <link
          rel="stylesheet"
          id="wp-postratings-css"
          href="https://www.sorpetaler.de/wp-content/plugins/wp-postratings/css/postratings-css.css?ver=1.85"
          type="text/css"
          media="all"
        />
        <link
          rel="stylesheet"
          id="sage/css-css"
          href="https://www.sorpetaler.de/wp-content/themes/hubert/dist/styles/main.css?ver=3.16.1"
          type="text/css"
          media="all"
        />
        <link
          rel="stylesheet"
          id="cmplz-cookie-css"
          href="https://www.sorpetaler.de/wp-content/plugins/complianz-gdpr/assets/css/cookieconsent.min.css?ver=4.7.2"
          type="text/css"
          media="all"
        />

        <script
          type="text/javascript"
          src="https://www.sorpetaler.de/wp-content/plugins/mailjet-for-wordpress/src/widget/js/front-widget.js?ver=4.8.15"
        ></script>
        <link
          rel="https://api.w.org/"
          href="https://www.sorpetaler.de/wp-json/"
        />
        <link
          rel="EditURI"
          type="application/rsd+xml"
          title="RSD"
          href="https://www.sorpetaler.de/xmlrpc.php?rsd"
        />
        <link
          rel="wlwmanifest"
          type="application/wlwmanifest+xml"
          href="https://www.sorpetaler.de/wp-includes/wlwmanifest.xml"
        />
      </Helmet>

      <>
        <Header />

        <PostsWrapper
          mainArticleUrl={
            featuredArticle.featuredImage?.gatsbyImageData.images.fallback.src
          }
        >
          <article>
            <div>
              <div>
                <Link to={`/categories/${featuredArticle.category.slug}`}>
                  {featuredArticle.category.title}
                </Link>
              </div>
              <div>
                <Link to={`/articles/${featuredArticle.slug}`}>
                  {featuredArticle.title}
                </Link>
              </div>
              <p>{featuredArticle.introduction}</p>
              <a>
                <img src={icon_arrow_blue} />
                <img src={icon_arrow_brown.svg} />
              </a>
            </div>
          </article>
          <Posts data={articles} />
        </PostsWrapper>
        <Footer />
      </>
    </>
  )
}

const PostsWrapper = styled.div`
  @media (min-width: 992px) {
    margin-top: 1.3125rem;
    padding: 0 14px;
  }

  > article:first-child {
    background-image: url("${props => props.mainArticleUrl}");
    padding-top: 30px;
    display: block;
    background-color: #f4efea;
    margin-bottom: 3.75rem;
    background-repeat: repeat-x;
    background-position: top;
    text-align: center;

    @media (min-width: 768px) {
      background-size: cover;
    }

    > div {
      padding: 0 15px;

      > div:first-child {
        @media (min-width: 768px) {
          margin-bottom: 1.875rem;
        }

        position: relative;
        display: inline-block;
        bottom: auto;
        background-color: #f86968;
        padding: 5px 17px;
        color: #fff;

        a {
          font-weight: 700;
          font-size: 0.875rem;
          color: #fff;
          touch-action: manipulation;
          background-color: transparent;
        }
      }

      > div:nth-child(2) {
        margin: 0 auto;
        max-width: 700px;
        text-transform: uppercase;
        font-family: GT Pressura, -apple-system, system-ui, BlinkMacSystemFont,
          Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif;
        font-weight: 700;
        line-height: 1.1;
        color: inherit;

        @media (min-width: 992px) {
          font-size: 3rem;
        }

        a {
          font-size: 3rem;
          color: #fff;
          touch-action: manipulation;
          background-color: transparent;
        }
      }

      > p {
        max-width: 700px;
        margin: 20px auto;
        line-height: 1.44;

        @media (min-width: 768px) {
          margin-bottom: 90px;
          font-size: 1.125rem;
          color: #fff;
        }
      }

      > a {
        color: #71b3e7;
        background-color: transparent;
        touch-action: manipulation;
        text-decoration: none;

        img {
          width: 36px;
          padding-bottom: 30px;

          &:first-child {
            border-style: none;
            vertical-align: middle;

            @media (min-width: 768px) {
              display: none !important;
            }
          }
        }
      }
    }
  }
`

export const query = graphql`
  query {
    allContentfulArticle {
      nodes {
        title
        introduction
        slug
        featuredImage {
          gatsbyImageData
          title
        }
        category {
          title
          slug
        }
      }
    }
  }
`

export default IndexPage
