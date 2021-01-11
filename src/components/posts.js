import React from "react"

const Posts = function ({ data }) {
  return (
    <div
      id="ajax-load-more"
      class="ajax-load-more-wrap default alm-0"
      data-alm-id="0"
      data-canonical-url="https://www.sorpetaler.de/hubert/"
      data-slug="home"
      data-post-id="0"
      data-total-posts="126"
    >
      <div class="alm-masonry container" style={{ opacity: 1 }}>
        <div
          class="alm-listing alm-ajax"
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
              <article class="grid-item card">
                <div>
                  <div class="image-container">
                    <img
                      class="card-img-top img-fluid"
                      src="https://www.sorpetaler.de/wp-content/uploads/2020/10/schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169.jpg"
                    />
                    <div class="category-text">
                      <a href={post.categories?.[0].link}>
                        {post.categories?.[0].name}
                      </a>{" "}
                    </div>
                  </div>
                  <div class="card-block">
                    <p class="card-title">
                      <a class="card-title_link" href={post.link}>
                        {post.title}
                      </a>
                    </p>
                    <p class="card-text">{post.excerpt}</p>
                    <a
                      class="read-more"
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
      <div class="alm-btn-wrap" style={{ visibility: "visible" }}>
        <button class="alm-load-more-btn more" rel="next">
          mehr Laden
        </button>
      </div>
    </div>
  )
}

export default Posts
