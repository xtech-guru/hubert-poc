import React from "react"
// import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import Footer from "../components/footer"
import Header from "../components/header"

import icon_arrow_blue from "../images/icon_arrow_blue.svg"
import icon_arrow_brown from "../images/icon_arrow_brown.svg"
import Posts from "../components/posts"
import { graphql } from "gatsby"

const IndexPage = ({ data }) => (
  <>
    <Helmet>
      <html lang="en" />

      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
        crossorigin="anonymous"
      />

      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        crossorigin="anonymous"
      ></script>

      <script
        type="text/javascript"
        async=""
        src="https://assets.pinterest.com/js/pinit_main.js?0.24417730193079423"
      ></script>

      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/masonry/4.2.2/masonry.pkgd.min.js"
        integrity="sha512-JRlcvSZAXT8+5SQQAvklXGJuxXTouyq8oIMaYERZQasB8SBDHZaUbeASsJWpk0UUrf89DP3/aefPPrlMR1h1yQ=="
        crossorigin="anonymous"
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
        src="https://www.sorpetaler.de/wp-includes/js/jquery/jquery.js?ver=1.12.4"
      ></script>
      <script
        type="text/javascript"
        src="https://www.sorpetaler.de/wp-includes/js/jquery/jquery-migrate.min.js?ver=1.4.1"
      ></script>
      <script
        type="text/javascript"
        src="https://www.sorpetaler.de/wp-content/plugins/photo-gallery/js/jquery.sumoselect.min.js?ver=3.0.3"
      ></script>
      <script
        type="text/javascript"
        src="https://www.sorpetaler.de/wp-content/plugins/photo-gallery/js/jquery.mobile.min.js?ver=1.3.2"
      ></script>
      <script
        type="text/javascript"
        src="https://www.sorpetaler.de/wp-content/plugins/photo-gallery/js/jquery.mCustomScrollbar.concat.min.js?ver=1.5.56"
      ></script>
      <script
        type="text/javascript"
        src="https://www.sorpetaler.de/wp-content/plugins/photo-gallery/js/jquery.fullscreen-0.4.1.min.js?ver=0.4.1"
      ></script>

      <script
        type="text/javascript"
        src="https://www.sorpetaler.de/wp-content/plugins/photo-gallery/js/scripts.min.js?ver=1.5.56"
      ></script>

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
      {/* <script>
      (function(w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s),
          dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "dataLayer", "GTM-P6DRKLV");
    </script> */}

      {/* <link rel="stylesheet" href="main.css" /> */}
    </Helmet>

    <>
      <Header />
      <div className="posts">
        <article
          className="main-post"
          style={{
            backgroundImage:
              "url(https://www.sorpetaler.de/wp-content/uploads/2019/02/holzart-bestimmen-e1551088414591.jpg)",
          }}
        >
          <div className="content">
            <div className="category-text">Allgemein</div>
            <div className="h1">
              <a href="https://www.sorpetaler.de/hubert/allgemein/holzart-bestimmen/">
                HOLZART BESTIMMEN: SO GEHT’S!
              </a>
            </div>
            <p className="post-text">
              Egal ob Schreiner, Restaurator oder ambitionierter
              Freizeithandwerker: Jeder, der mit dem natürlichen Material Holz
              arbeitet, sollte wissen, mit welcher Holzart genau er es zu tun
              hat. Lies hier mehr zur Holzbestimmung.
            </p>
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
