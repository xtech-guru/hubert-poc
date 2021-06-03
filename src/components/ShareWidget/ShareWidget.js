import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import facebook_icon from "../../images/icon_facebook_share.svg"
import twitter_icon from "../../images/icon_twitter_share.svg"
import pinterest_icon from "../../images/icon_pinterest_share.svg"

export const ShareWidget = ({ author, location }) => {
  return (
    <WidgetWrapper>
      <div>
        Von{" "}
        <Link to={`/hubert/authors/${author.slug}`} aria-label="Author">
          {author.name}
        </Link>
      </div>
      <hr />
      <SocialMediaBlock>
        <span>Teilen</span>
        <a
          aria-label="Facebbok"
          href={`https://www.facebook.com/sharer/sharer.php?u=${location.href}`}
          target="_blank"
          rel="noreferrer"
        >
          <img src={facebook_icon} alt="facebook" />
        </a>
        <a
          aria-label="Twitter"
          href={`https://twitter.com/intent/tweet?text=${location.href}`}
          target="_blank"
          rel="noreferrer"
        >
          <img src={twitter_icon} alt="twitter" />
        </a>
        <a
          aria-label="Pinterest"
          href={`https://www.pinterest.com/pin-builder/?url=${location.href}`}
          target="_blank"
          rel="noreferrer"
        >
          <img src={pinterest_icon} alt="pinterest" />
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
  }
`

const WidgetWrapper = styled.div`
  display: flex;
  justify-content: space-between !important;
  font-family: Merriweather;
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
  align-items: center;
  color: #c7bcb2;
  text-transform: uppercase;
  font-size: 14px;
  margin: 0;
  > div {
    a {
      text-decoration: underline;
    }
  }

  a {
    color: #c7bcb2;
    text-decoration: underline;
  }
  hr {
    @media (max-width: 767px) {
      width: 100%;
    }
  }
`
