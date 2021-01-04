import React from "react"
// import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import Footer from "../components/footer"
import Header from "../components/header"

import icon_arrow_blue from "../images/icon_arrow_blue.svg"
import icon_arrow_brown from "../images/icon_arrow_brown.svg"

const IndexPage = () => (
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
            <div className="category-text"></div>
            <div className="h1">
              <a href="<?php the_permalink(); ?>">Article title 1</a>
            </div>
            <p className="post-text">paragraph</p>
            <a className="read-more" href="<?php the_permalink(); ?>">
              <img className="hidden-md-up" src={icon_arrow_blue} />
              <img className="hidden-sm-down" src={icon_arrow_brown.svg} />
            </a>
          </div>
        </article>
        <div className="page-content">
          <article className="container">
            <header className="content padded-content">
              <h1>
                <a href="#">title</a>
              </h1>
            </header>
            <div className="content padded-content">
              <article className="grid-item card">
                <div>
                  <div className="image-container">
                    <img
                      className="card-img-top img-fluid"
                      src="https://www.sorpetaler.de/wp-content/uploads/2020/10/schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169.jpg"
                    />
                    <div className="category-text">category text</div>
                  </div>
                  <div className="card-block">
                    <p className="card-title">
                      <a
                        className="card-title_link"
                        href="<?php the_permalink();?>"
                      >
                        article title
                      </a>
                    </p>
                    <p className="card-text">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quae et ut nulla consequuntur error officia!
                    </p>
                    <a className="read-more" href="<?php the_permalink();?>">
                      Mehr
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </article>
          <article className="container">
            <header className="content padded-content">
              <h1>
                <a href="#">title</a>
              </h1>
            </header>
            <div className="content padded-content">
              <article className="grid-item card">
                <div>
                  <div className="image-container">
                    <img
                      className="card-img-top img-fluid"
                      src="https://www.sorpetaler.de/wp-content/uploads/2020/10/schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169.jpg"
                    />
                    <div className="category-text">category text</div>
                  </div>
                  <div className="card-block">
                    <p className="card-title">
                      <a
                        className="card-title_link"
                        href="<?php the_permalink();?>"
                      >
                        article title
                      </a>
                    </p>
                    <p className="card-text">description</p>
                    <a className="read-more" href="<?php the_permalink();?>">
                      Mehr
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </article>
          <article className="container">
            <header className="content padded-content">
              <h1>
                <a href="#">title</a>
              </h1>
            </header>
            <div className="content padded-content">
              <article className="grid-item card">
                <div>
                  <div className="image-container">
                    <img
                      className="card-img-top img-fluid"
                      src="https://www.sorpetaler.de/wp-content/uploads/2020/10/schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169.jpg"
                    />
                    <div className="category-text">category text</div>
                  </div>
                  <div className="card-block">
                    <p className="card-title">
                      <a
                        className="card-title_link"
                        href="<?php the_permalink();?>"
                      >
                        article title
                      </a>
                    </p>
                    <p className="card-text">description</p>
                    <a className="read-more" href="<?php the_permalink();?>">
                      Mehr
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </article>
          <article className="container">
            <header className="content padded-content">
              <h1>
                <a href="#">title</a>
              </h1>
            </header>
            <div className="content padded-content">
              <article className="grid-item card">
                <div>
                  <div className="image-container">
                    <img
                      className="card-img-top img-fluid"
                      src="https://www.sorpetaler.de/wp-content/uploads/2020/10/schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169.jpg"
                    />
                    <div className="category-text">category text</div>
                  </div>
                  <div className="card-block">
                    <p className="card-title">
                      <a
                        className="card-title_link"
                        href="<?php the_permalink();?>"
                      >
                        article title
                      </a>
                    </p>
                    <p className="card-text">description</p>
                    <a className="read-more" href="<?php the_permalink();?>">
                      Mehr
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </article>
        </div>
        <button>Load more</button>
      </div>
      <Footer />
    </>
  </>
)

export default IndexPage
