import React from "react"

import * as styles from "./Header.module.scss"
import { Menu } from "../Menu"
import data from "../../mocks/header.json"

export const Header = props => (
  <header className={styles.container}>
    <div className={styles.socialMediaIconButtonsWrapper}>
      <a
        className={`${styles.fb} ${styles.link}`}
        href={props.facebookUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Facebook page"
      />
      <a
        className={`${styles.pinterest} ${styles.link}`}
        href={props.pinterestUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Pinterest page"
      />
    </div>
    <Menu />
  </header>
)

Header.defaultProps = data
