import React from "react"

import HLogo from "../images/H_logo.svg"
import HUBERTLogoDesktop from "../images/HUBERT_logo_desktop.svg"

const Header = () => (
  <header className="main-header container">
    <div className="social-icons d-flex justify-content-end">
      <a
        className="<?php echo $icon['cls']; ?>"
        href="<?php echo $icon['url']; ?>"
        target="_blank"
      ></a>
      <a
        className="<?php echo $icon['cls']; ?>"
        href="<?php echo $icon['url']; ?>"
        target="_blank"
      ></a>
      <a
        className="<?php echo $icon['cls']; ?>"
        href="<?php echo $icon['url']; ?>"
        target="_blank"
      ></a>
    </div>
    <nav className="navbar navbar-toggleable-sm navbar-light align-items-md-end">
      <button
        className="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#mainNavBar"
        aria-controls="mainNavBar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <a className="navbar-brand" href="https://www.sorpetaler.de/hubert/">
        <img className="hidden-md-up" src={HLogo} alt="" />
        <img className="hidden-sm-down" src={HUBERTLogoDesktop} alt="" />
        <div className="hidden-md-down">
          <h1 className="page-title">text</h1>
        </div>
      </a>

      <div id="mainNavBar" className="collapse navbar-collapse">
        <ul className="navbar-nav mt-2 mt-md-0 ml-md-auto">
          <li className="nav-item dropdown">
            <a
              id="navbarCategoriesLink"
              className="nav-link dropdown-toggle"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              text
            </a>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarCategoriesLink"
            >
              <a className="dropdown-item" href="#">
                category 1
              </a>
              <a className="dropdown-item" href="#">
                category 2
              </a>
              <a className="dropdown-item" href="#">
                category 3
              </a>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              nav item
            </a>
          </li>

          <li className="nav-item">
            <a
              className="nav-link no-scroll"
              href="#newsletter"
              data-toggle="collapse"
              aria-expanded="false"
              aria-controls="newsletter"
            >
              nav item 2
            </a>
          </li>
        </ul>
        <ul className="social-icons navbar-nav mt-2 mt-md-0 hidden-sm-down hidden-lg-up">
          <li className="nav-item">
            <a
              className="nav-link icon <?php echo $icon['cls']; ?>"
              href="<?php echo $icon['url']; ?>"
              target="_blank"
            >
              scoial icon
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link icon <?php echo $icon['cls']; ?>"
              href="<?php echo $icon['url']; ?>"
              target="_blank"
            >
              scoial icon 2
            </a>
          </li>
        </ul>
      </div>
    </nav>
    <div className="menu-panel">
      <div className="collapse newsletter" id="newsletter">
        <div className="row align-items-center">
          <div className="col-md-8 text-md-right">
            Verpasse keine Neuigkeiten von Hubert. Jetzt zum Newsletter
            anmelden!
          </div>
          <div className="col-md-4">side bar newsletter</div>
        </div>
      </div>
    </div>
  </header>
)

export default Header
