import React from "react"
import GatsbyImage from "gatsby-image"
import Masonry from "react-masonry-component"

const masonryOptions = {
  transitionDuration: 0,
}

const imagesLoadedOptions = { background: ".my-bg-image-el" }
const Posts = function ({ data }) {
  return (
    <div className="alm-masonry container" style={{ opacity: 1 }}>
      <Masonry
        className={"my-gallery-class"} // default ''
        elementType={"ul"} // default 'div'
        options={masonryOptions} // default {}
        disableImagesLoaded={false} // default false
        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        imagesLoadedOptions={imagesLoadedOptions} // default {}
      >
        {data.map(post => {
          return (
            <li
              className="grid-item card"
              style={{
                width: "30%",
              }}
            >
              <article>
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
              </article>
            </li>
          )
        })}
      </Masonry>
      <div className="alm-btn-wrap" style={{ visibility: "visible" }}>
        <button className="alm-load-more-btn more" rel="next">
          mehr Laden
        </button>
      </div>
    </div>
  )
}

export default Posts
