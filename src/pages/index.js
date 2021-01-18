import React from "react"
// import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import Footer from "../components/footer"
import Header from "../components/header"

import icon_arrow_blue from "../images/icon_arrow_blue.svg"
import icon_arrow_brown from "../images/icon_arrow_brown.svg"
import Posts from "../components/posts"
import { graphql } from "gatsby"

const IndexPage = ({ data }) => {
  const featuredPost = data.allWordpressPost.nodes[0]
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
        <div className="posts">
          <article
            className="main-post"
            style={{
              backgroundImage: `url(${featuredPost.featured_media.localFile.childImageSharp.fixed})`,
            }}
          >
            <div className="content">
              <div className="category-text">
                {featuredPost.categories?.[0].name}
              </div>
              <div className="h1">
                <a href={featuredPost.link}>{featuredPost.title}</a>
              </div>
              <p className="post-text">{featuredPost.excerpt}</p>
              <a className="read-more" href="<?php the_permalink(); ?>">
                <img className="hidden-md-up" src={icon_arrow_blue} />
                <img className="hidden-sm-down" src={icon_arrow_brown.svg} />
              </a>
            </div>
          </article>
          <Posts data={data.allWordpressPost.nodes.slice(0, 9)} />
        </div>

        <Footer />
      </>
    </>
  )
}
export const query = graphql`
  query indexQuery {
    allWordpressPost(filter: { status: { eq: "publish" } }) {
      nodes {
        title
        id
        link
        categories {
          name
          link
        }
        excerpt
        featured_media {
          localFile {
            childImageSharp {
              fixed(width: 340) {
                ...GatsbyImageSharpFixed_withWebp
              }
            }
          }
        }
      }
    }
  }
`
export default IndexPage
