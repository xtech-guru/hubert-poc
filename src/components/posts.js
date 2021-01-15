import React from "react"
import GatsbyImage from "gatsby-image"

const Posts = function ({ data }) {
  return (
    <div
      id="ajax-load-more"
      className="ajax-load-more-wrap default alm-0"
      data-alm-id="0"
      data-canonical-url="https://www.sorpetaler.de/hubert/"
      data-slug="home"
      data-post-id="0"
      data-total-posts="126"
    >
      <div className="alm-masonry container" style={{ opacity: 1 }}>
        <div
          className="alm-listing alm-ajax"
          data-repeater="default"
          data-post-type="post"
          data-order="DESC"
          data-orderby="date"
          data-offset="0"
          data-posts-per-page="12"
          data-lang="de"
          data-scroll="true"
          data-scroll-distance="150"
          data-scroll-container="grid .post-list"
          data-max-pages="0"
          data-pause-override="false"
          data-pause="false"
          data-button-label="mehr Laden"
          data-transition="masonry"
          data-masonry-selector=".grid-item"
          data-images-loaded="false"
          style={{ position: "relative", height: 2360.17 }}
        >
          {data.map(post => {
            return (
              <article className="grid-item card">
                <div>
                  <div className="image-container">
                    {post.featured_media.localFile.childImageSharp.fixed && (
                      <GatsbyImage
                        className="card-img-top img-fluid"
                        fixed={
                          post.featured_media.localFile.childImageSharp.fixed
                        }
                      />
                    )}
                    <div className="category-text">
                      <a href={post.categories?.[0].link}>
                        {post.categories?.[0].name}
                      </a>
                    </div>
                  </div>
                  <div className="card-block">
                    <p className="card-title">
                      <a className="card-title_link" href={post.link}>
                        {post.title}
                      </a>
                    </p>
                    <p className="card-text">{post.excerpt}</p>
                    <a
                      className="read-more"
                      href="https://www.sorpetaler.de/hubert/nachhaltig-bauen-und-sanieren/die-schoensten-holzhaeuser-gewinner/"
                    >
                      Mehr
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
      <div className="alm-btn-wrap" style={{ visibility: "visible" }}>
        <button className="alm-load-more-btn more" rel="next">
          mehr Laden
        </button>
      </div>
    </div>
  )
}

export default Posts
