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
          <img src="https://www.sorpetaler.de/wp-content/themes/hubert/assets/images/icon_facebook_share.svg" />
        </a>
        <a
          href={`https://twitter.com/intent/tweet?text=${window.location.href}`}
          target="_blank"
        >
          <img src="https://www.sorpetaler.de/wp-content/themes/hubert/assets/images/icon_twitter_share.svg" />
        </a>
        <a
          href={`https://www.pinterest.com/pin-builder/?url=${window.location.href}`}
          target="_blank"
        >
          <img src="https://www.sorpetaler.de/wp-content/themes/hubert/assets/images/icon_pinterest_share.svg" />{" "}
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

  img {
    margin: 0;
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
