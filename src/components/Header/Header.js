import React from "react"
import { StaticImage } from "gatsby-plugin-image"

import * as styles from "./Header.module.scss"
import { Menu } from "../Menu"
import data from "../../mocks/header.json"

export const Header = props => (
  <header className={styles.container}>
    <div className={styles.socialMediaIconButtonsWrapper}>
      <a
        className={styles.link}
        href={props.facebookUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Facebook page"
      >
        <StaticImage src="../../images/icon_facebook.svg" alt="facebook" />
      </a>
      <a
        className={styles.link}
        href={props.pinterestUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Pinterest page"
      >
        <StaticImage src="../../images/icon_pinterest.svg" alt="pinterest" />
      </a>
    </div>
    <Menu />
  </header>
)

Header.defaultProps = data
