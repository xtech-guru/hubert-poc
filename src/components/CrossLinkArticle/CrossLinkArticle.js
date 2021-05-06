import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import cross_link_icon from "../../images/icon_arrow_blue.svg"

export function CrossLinkArticle({ introduction, link, image }) {
  return (
    <CrossLinkArticleWrapper>
      <div>
        <div>
          <GatsbyImage image={getImage(image)} alt="article image" />
        </div>
        <div>
          <div>{introduction}</div>
          {/* //TODO: change to GatsbyImage (Static) */}
          <img src={cross_link_icon} alt="icon_arrow_right" />
          <Link to={link}>
            <span>Mehr erfahren</span>
          </Link>
        </div>
      </div>
    </CrossLinkArticleWrapper>
  )
}

const CrossLinkArticleWrapper = styled.div`
  background-color: #f4efea;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 30px 20px;
  @media (min-width: 768px) {
    margin-right: -63px;
    margin-left: -63px;
    padding-top: 40px;
    padding-bottom: 40px;
    padding-left: 63px;
    padding-right: 63px;
  }

  @media (min-width: 992px) {
    margin-right: -233px;
    margin-left: -77px;
    padding-left: 77px;
    padding-right: 233px;
  }

  > div {
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;

    > div {
      flex: 0 0 50%;
      max-width: 50%;
      position: relative;
      width: 100%;
      min-height: 1px;

      padding-right: 15px;
      padding-left: 15px;

      :first-child {
        height: auto;

        .gatsby-image-wrapper {
          max-width: 100%;
          height: auto;
          vertical-align: middle;
          border-style: none;
        }
      }

      :last-child {
        font-family: Merriweather, Georgia, Times New Roman, Times, serif;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #4b3e31;

        @media (min-width: 768px) {
          margin-top: 0 !important;
        }

        > div {
          font-size: 1.125rem;
          margin-bottom: 20px;
        }

        > img {
          width: 20px;
          height: 18px;
          vertical-align: middle;
          border-style: none;
        }

        > a {
          color: #71b3e7;
          touch-action: manipulation;
          text-decoration: none;
          background-color: transparent;

          :hover {
            text-decoration: underline;
            outline-width: 0;
          }

          span {
            margin-left: 0.5rem !important;
          }
        }
      }
    }
  }
`
