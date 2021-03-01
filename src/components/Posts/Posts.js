import React from "react"
import Masonry from "react-masonry-component"
import { ArticlePreview } from "../ArticlePreview"

const masonryOptions = {
  transitionDuration: 0,
}

const imagesLoadedOptions = { background: ".my-bg-image-el" }

export const Posts = function ({ data }) {
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
        {data.map(({ title, img, link, excerpt, categories }) => {
          return (
            <li className="grid-item card">
              <ArticlePreview
                title={title}
                description={excerpt}
                img={img}
                category={categories[0]}
                link={link}
              />
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
