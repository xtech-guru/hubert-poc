import React from "react"
import Layout from "../components/layout"

const ArticleTemplate = ({ pageContext }) => {
  return (
    <Layout>
      <div className="article">
        <ArticleContent
          title={pageContext.data.article.header.title}
          content={pageContext.data.article.content}
          category={pageContext.data.article.header.category_text}
          introduction={pageContext.data.article.header.introduction}
          author={pageContext.data.article.author}
          rating={pageContext.data.article.rating}
        />
        <ArticleComments />
        <RecommendedPosts
          title={pageContext.data.article.related_posts.title}
          category={pageContext.data.article.header.category_text}
          posts={pageContext.data.article.related_posts.posts}
        />
      </div>
    </Layout>
  )
}

const ArticleContent = ({
  content,
  title,
  category,
  introduction,
  author,
  rating,
}) => {
  return (
    <article className="container post-12053 post type-post status-publish format-standard has-post-thumbnail hentry category-nachhaltig-bauen-und-sanieren">
      <header className="padded-content">
        <span className="category-text">
          <a href="https://www.sorpetaler.de/hubert/category/nachhaltig-bauen-und-sanieren/">
            {category}
          </a>
        </span>
        <div className="h1">
          <a
            dangerouslySetInnerHTML={{ __html: title }}
            href="https://www.sorpetaler.de/hubert/nachhaltig-bauen-und-sanieren/die-schoensten-holzhaeuser-gewinner/"
          ></a>
        </div>
        <p className="introduction">{introduction}</p>
        <hr />
        <div className="mx-0 px-0 row d-flex justify-content-between align-items-center">
          <div className="col-sm-12 col-md-auto pl-0">
            <p className="author">
              Von{" "}
              <a
                href="https://www.sorpetaler.de/hubert/author/sandra/"
                rel="author"
              >
                {author.name}
              </a>
            </p>
          </div>
          <hr className="px-0 hidden-md-up col-sm-12" />
          <div className="share col-sm-12 col-md-auto pr-0 pl-0">
            <span>Teilen</span>
            <a
              href="http://www.facebook.com/sharer.php?u=https%3A%2F%2Fwww.sorpetaler.de%2Fhubert%2Fnachhaltig-bauen-und-sanieren%2Fdie-schoensten-holzhaeuser-gewinner%2F&p[title]=Die sch%C3%B6nsten Holzh%C3%A4user %E2%80%93 Gewinner stehen fest"
              target="_blank"
            >
              <img src="https://www.sorpetaler.de/wp-content/themes/hubert/assets/images/icon_facebook_share.svg" />
            </a>
            <a
              href="http://twitter.com/share?text=Die sch%C3%B6nsten Holzh%C3%A4user %E2%80%93 Gewinner stehen fest&url=https%3A%2F%2Fwww.sorpetaler.de%2Fhubert%2Fnachhaltig-bauen-und-sanieren%2Fdie-schoensten-holzhaeuser-gewinner%2F"
              target="_blank"
            >
              <img src="https://www.sorpetaler.de/wp-content/themes/hubert/assets/images/icon_twitter_share.svg" />
            </a>
            <a
              href="http://pinterest.com/pin/create/button/?url=https%3A%2F%2Fwww.sorpetaler.de%2Fhubert%2Fnachhaltig-bauen-und-sanieren%2Fdie-schoensten-holzhaeuser-gewinner%2F&media=https%3A%2F%2Fwww.sorpetaler.de%2Fwp-content%2Fuploads%2F2020%2F10%2Fschoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169.jpg&description=Die sch%C3%B6nsten Holzh%C3%A4user %E2%80%93 Gewinner stehen fest"
              target="_blank"
            >
              <img src="https://www.sorpetaler.de/wp-content/themes/hubert/assets/images/icon_pinterest_share.svg" />
            </a>
          </div>
        </div>
        <hr className="hidden-sm-down" />
      </header>
      <div className="mt-3">
        <img
          className="article-image img-fluid img-responsive"
          src="https://www.sorpetaler.de/wp-content/uploads/2020/10/schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169.jpg"
        />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="content padded-content"
      ></div>

      <div className="rating padded-content">
        <hr />
        <div className="row">
          <div className="rating-title col-sm-6">{rating.title}</div>
          <div className="col-sm-6">
            <div className="rating-widget">
              <div className="rating-widget_title hidden-sm-down">RATE</div>
              <div>
                <div
                  id="post-ratings-12053"
                  className="post-ratings"
                  data-nonce="3a4ad085c5"
                >
                  <img
                    id="rating_12053_1"
                    src="https://www.sorpetaler.de/wp-content/plugins/wp-postratings/images/heart/rating_1_off.gif"
                    alt="1 Star"
                    title="1 Star"
                    onmouseover="current_rating(12053, 1, '1 Star');"
                    onmouseout="ratings_off(0, 0, 0);"
                    onclick="rate_post();"
                    onkeypress="rate_post();"
                    style={{ cursor: "pointer", border: "0px" }}
                  />
                  (No Ratings Yet)
                  <br />
                  <span
                    className="post-ratings-text"
                    id="ratings_12053_text"
                  ></span>
                </div>
                <div
                  id="post-ratings-12053-loading"
                  className="post-ratings-loading"
                >
                  <img
                    src="https://www.sorpetaler.de/wp-content/plugins/wp-postratings/images/loading.gif"
                    width="16"
                    height="16"
                    className="post-ratings-image"
                  />
                  Loading...
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>

      <div className="author-block padded-content">
        <div className="row d-flex align-items-center">
          <div className="avatar col-sm-12 col-md-auto">
            <a
              href="https://www.sorpetaler.de/hubert/author/sandra/"
              rel="author"
            >
              <img src="https://secure.gravatar.com/avatar/1bd475830113d79a6d0f79eac7fdcdc4?s=96&r=g" />
            </a>
          </div>

          <div className="col-sm-12 col-md">
            <div className="author-block_name">
              <a
                href="https://www.sorpetaler.de/hubert/author/sandra/"
                rel="author"
              >
                {author.name}
              </a>
            </div>
            <div>
              <div className="author-block_description col-sm-12">
                {author.description}
                <div className="read-more col-sm-12 col-md-auto px-0">
                  <a
                    href="https://www.sorpetaler.de/hubert/author/sandra/"
                    rel="author"
                  >
                    Mehr
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

const ArticleComments = () => {
  return (
    <div className="show-comments">
      <div className="container">
        <div className="padded-content">
          <a
            className="show-comments_number d-flex justify-content-between"
            data-toggle="collapse"
            href="#showComments"
            aria-expanded="false"
            aria-controls="showComments"
          >
            <div>Keine Kommentare</div>
            <div className="icon"></div>
          </a>
          <div className="collapse" id="showComments">
            <section id="comments" className="comments"></section>
          </div>
        </div>
      </div>
    </div>
  )
}

const RecommendedPosts = ({ title, category_text, posts }) => {
  return (
    <div className="posts">
      <div className="container">
        <h2 className="related-posts_title mb-sm-3 mb-md-4">{title}</h2>
        <div className="grid post-list">
          {posts.map(post => (
            <article className="grid-item card">
              <div>
                <div className="image-container">
                  <img
                    className="card-img-top img-fluid"
                    src="https://www.sorpetaler.de/wp-content/uploads/2020/05/afz-assessment-foerderzentrum-neuwied_waechter-architekten.jpg"
                  />
                  <div className="category-text">
                    <a href="https://www.sorpetaler.de/hubert/category/nachhaltig-bauen-und-sanieren/">
                      {category_text}
                    </a>{" "}
                  </div>
                </div>
                <div className="card-block">
                  <p className="card-title">
                    <a
                      dangerouslySetInnerHTML={{ __html: post.title }}
                      className="card-title_link"
                      href="https://www.sorpetaler.de/hubert/nachhaltig-bauen-und-sanieren/holzhaus-wettbewerb-verlaengert/"
                    ></a>
                  </p>
                  <p className="card-text">{post.text}</p>
                  <a
                    className="read-more"
                    href="https://www.sorpetaler.de/hubert/nachhaltig-bauen-und-sanieren/holzhaus-wettbewerb-verlaengert/"
                  >
                    Mehr
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ArticleTemplate
