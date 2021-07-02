import React, { useCallback, useMemo, useState } from "react"
import Masonry from "react-masonry-component"

import { container } from "./Posts.module.scss"
import { ArticlePreview } from "../ArticlePreview"

const masonryOptions = { transitionDuration: 0, columnWidth: 1 }
const imagesLoadedOptions = { background: ".my-bg-image-el" }
const paginationSize = 12

export const Posts = function ({ data }) {
  const [articles, setArticles] = useState(data.slice(0, paginationSize))
  const [layoutComplete, setlayoutComplete] = useState(false)

  const hasMore = useMemo(() => data.length > articles.length, [
    data,
    articles.length,
  ])

  const loadMore = useCallback(() => {
    setArticles(prevState => {
      const newPage = data.slice(
        prevState.length,
        prevState.length + paginationSize
      )

      return prevState.concat(newPage)
    })
  }, [data, setArticles])

  return (
    <div className={container}>
      <Masonry
        elementType={"ul"} // default 'div'
        options={masonryOptions} // default {}
        disableImagesLoaded={false} // default false
        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        imagesLoadedOptions={imagesLoadedOptions} // default {}
        onLayoutComplete={() => setlayoutComplete(true)}
      >
        {layoutComplete &&
          articles.map(
            ({ title, featuredImage, introduction, category, slug }, index) => {
              return (
                <li key={index}>
                  <ArticlePreview
                    title={title}
                    description={introduction.childMarkdownRemark.html}
                    img={featuredImage}
                    category={category}
                    slug={slug}
                  />
                </li>
              )
            }
          )}
      </Masonry>

      {hasMore && (
        <div>
          <button rel="next" aria-label="reload more" onClick={loadMore}>
            mehr Laden
          </button>
        </div>
      )}
    </div>
  )
}
