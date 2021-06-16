import React from "react"
import { Link } from "gatsby"

import { container, block } from "./ShareWidget.module.scss"
import facebook_icon from "../../images/icon_facebook_share.svg"
import twitter_icon from "../../images/icon_twitter_share.svg"
import pinterest_icon from "../../images/icon_pinterest_share.svg"

export const ShareWidget = ({ author, location }) => {
  return (
    <div className={container}>
      <div>
        Von{" "}
        <Link to={`/hubert/authors/${author.slug}`} aria-label="Author">
          {author.name}
        </Link>
      </div>
      <hr />
      <div className={block}>
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
      </div>
    </div>
  )
}
