import React from "react"
import styled from "styled-components"

const RelatedPosts = ({ title, category, posts }) => {
  return (
    <RelatedPostsContainer>
      <RelatedPostsTitle>{title}</RelatedPostsTitle>
      <RelatedPostsList>
        {posts.map(post => (
          <RelatedPost>
            <div>
              <RelatedPostImageContainer>
                <img src={post.img} />
                <PostCategory>
                  <a href="https://www.sorpetaler.de/hubert/category/nachhaltig-bauen-und-sanieren/">
                    {category}
                  </a>
                </PostCategory>
              </RelatedPostImageContainer>
              <div>
                <RelatedPostTitle>
                  <a
                    dangerouslySetInnerHTML={{ __html: post.title }}
                    href="https://www.sorpetaler.de/hubert/nachhaltig-bauen-und-sanieren/holzhaus-wettbewerb-verlaengert/"
                  ></a>
                </RelatedPostTitle>
                <RelatedPostDescription>{post.excerpt}</RelatedPostDescription>
                <a href="https://www.sorpetaler.de/hubert/nachhaltig-bauen-und-sanieren/holzhaus-wettbewerb-verlaengert/">
                  Mehr
                </a>
              </div>
            </div>
          </RelatedPost>
        ))}
      </RelatedPostsList>
    </RelatedPostsContainer>
  )
}

const ContainerWrapper = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding-right: 15px;
  padding-left: 15px;
  media (min-width: 1200px) {
    width: 1140px;
    max-width: 100%;
  }
  @media (min-width: 768px) {
    padding-right: 15px;
    padding-left: 15px;
    width: 720px;
    max-width: 100%;
  }
  @media (min-width: 576px) {
    width: 540px;
    max-width: 100%;
    padding-right: 15px;
    padding-left: 15px;
  }
`

const RelatedPostsList = styled.div`
  display: flex;
`
const RelatedPost = styled.article`
  padding-right: 30px;
  padding-bottom: 61px;
  width: 33.333%;
`
const RelatedPostTitle = styled.p`
  margin-bottom: 0.625rem;
  font-size: 1.75rem;
  font-family: GT Pressura, -apple-system, system-ui, BlinkMacSystemFont,
    Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif;
  font-weight: 700;
  line-height: 1.5;
  a {
    color: #4b3e31;
  }
`
const RelatedPostDescription = styled.p`
  color: #756b62;
  margin-bottom: 0.6875rem;
`
const RelatedPostImageContainer = styled.div`
  position: relative;
  margin-bottom: 1.25rem;
  img {
    max-width: 100%;
    height: auto;
    vertical-align: middle;
    margin-bottom: 0;
  }
`
const PostCategory = styled.div`
  position: absolute;
  bottom: 10px;
  background-color: #f86968;
  padding: 5px 17px;
  a {
    color: #fff;
  }
`
const RelatedPostsContainer = styled(ContainerWrapper)`
  width: 1140px;
  max-width: 100%;
  @media (min-width: 992px) {
    margin-top: 1.3125rem;
    padding: 0 14px;
  }
`
const RelatedPostsTitle = styled.h2`
  color: #756b62;
  font-size: 0.875rem;
  article {
    padding-right: 30px;
    padding-bottom: 61px;
    width: 33.333%;
  }
`

export default RelatedPosts
