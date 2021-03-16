import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

export const ShareWidget = ({ author }) => {
  return (
    <WidgetWrapper>
      <div>
        Von <Link to={`/authors/${author.slug}`}>{author.name}</Link>
      </div>
      <hr />
      <SocialMediaBlock>
        <span>Teilen</span>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
          target="_blank"
        >
          <img
            src="https://www.sorpetaler.de/wp-content/themes/hubert/assets/images/icon_facebook_share.svg"
            alt="facebook"
          />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${window.location.href}`}
          target="_blank"
        >
          <img
            src="https://www.sorpetaler.de/wp-content/themes/hubert/assets/images/icon_twitter_share.svg"
            alt="twitter"
          />
        </a>
        <a
          href={`https://www.pinterest.com/pin-builder/?url=${window.location.href}`}
          target="_blank"
        >
          <img
            src="https://www.sorpetaler.de/wp-content/themes/hubert/assets/images/icon_pinterest_share.svg"
            alt="pinterest"
          />
          Speichern
        </a>
      </SocialMediaBlock>
    </WidgetWrapper>
  )
}

const SocialMediaBlock = styled.div`
  display: flex;
  align-items: center;
  a {
    margin-left: 30px;
    :last-child {
      display: flex;
      height: 20px;
      border-radius: 2px;
      padding: 0 4px 0 0;
      text-decoration: none;
      font: 11px/20px "Helvetica Neue", Helvetica, sans-serif;
      font-weight: bold;
      color: #fff !important;
      background-color: #e60023;
      background-size: 14px 14px;
      img {
        width: 20px;
        margin: 2px 4px;
      }
    }
  }
`

const WidgetWrapper = styled.div`
  display: flex;
  justify-content: space-between !important;
  align-items: center;
  color: #c7bcb2;
  text-transform: uppercase;
  font-size: 14px;
  margin: 0;
  a {
    color: #c7bcb2;
    text-decoration: underline;
  }
`
