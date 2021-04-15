import React from "react"
import Masonry from "react-masonry-component"
import styled from "styled-components"

import { ArticlePreview } from "../ArticlePreview"

const masonryOptions = {
  transitionDuration: 0,
}

const imagesLoadedOptions = { background: ".my-bg-image-el" }

export const Posts = function ({ data }) {
  return (
    <MasonryContainer>
      <Masonry
        elementType={"ul"} // default 'div'
        options={masonryOptions} // default {}
        disableImagesLoaded={false} // default false
        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        imagesLoadedOptions={imagesLoadedOptions} // default {}
      >
        {data.map(
          ({ title, featuredImage, introduction, category, slug }, index) => {
            return (
              <li key={index}>
                <ArticlePreview
                  title={title}
                  description={introduction}
                  img={featuredImage}
                  category={category}
                  slug={slug}
                />
              </li>
            )
          }
        )}
      </Masonry>
      <div>
        <button rel="next" aria-label="reload more">
          mehr Laden
        </button>
      </div>
    </MasonryContainer>
  )
}

const MasonryContainer = styled.div`
  opacity: 1;
  padding-right: 15px;
  padding-left: 15px;
  max-width: 100%;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  display: block;
  overflow: hidden;
  clear: both;
  @media (max-width: 767px) {
    margin-top: 0.875rem;
    padding: 0 20px;
  }
  ul {
    margin: 0;
    list-style: none;
    li {
      width: 100%;
      padding-bottom: 41px;
      @media (min-width: 576px) {
        display: flex;
        flex-direction: column;
        background-color: #fff;
        width: 33.333%;
        padding-bottom: 0;
      }
    }
  }

  @media (min-width: 576px) {
    width: 540px;
  }

  @media (min-width: 768px) {
    width: 720px;
  }

  @media (min-width: 992px) {
    width: 960px;
  }

  @media (min-width: 1200px) {
    width: 1140px;
  }

  > div:last-child {
    visibility: visible;
    text-align: center;
    padding: 10px 0 25px;
    display: block;
    overflow: hidden;
    clear: both;

    button {
      font-size: 15px;
      font-weight: 600;
      width: auto;
      height: 42px;
      line-height: 42px;
      background: #ed7070;
      color: #fff;
      border: none;
      border-radius: 3px;
      margin: 0 0 4px;
      padding: 0 20px;
      display: inline-block;
      position: relative;
      transition: padding 0.25s ease-in-out, width 0.25s ease-in-out;
      text-align: center;
      text-decoration: none;
      appearance: none;
      user-select: none;
      cursor: pointer;
      touch-action: manipulation;
      text-transform: none;
      overflow: visible;
      font-family: sans-serif;
    }
  }
`
