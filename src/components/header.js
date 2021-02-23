import React from "react"

import HLogo from "../images/H_logo.svg"
import HUBERTLogoDesktop from "../images/HUBERT_logo_desktop.svg"

const Header = () => (
  <header className="main-header container">
    <div className="social-icons d-flex justify-content-end">
      <a
        className="hubert_fb_url"
        href="https://www.facebook.com/hubertmagazin"
        target="_blank"
      />
      <a
        className="hubert_pinterest_url"
        href="https://www.pinterest.de/sorpetaler/hubert-magazin-f%C3%BCr-holzkultur/"
        target="_blank"
      />
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
        <span className="navbar-toggler-icon" />
      </button>

      <a className="navbar-brand" href="https://www.sorpetaler.de/hubert/">
        <img className="hidden-md-up" src={HLogo} alt="Hubert logo" />
        <img
          className="hidden-sm-down"
          src={HUBERTLogoDesktop}
          alt="Hubert logo"
        />
        <div className="hidden-md-down">
          <h1 className="page-title">Magazin Für Holz-Kultur</h1>
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
              Rubriken
            </a>
            <div
              className="dropdown-menu"
              aria-labelledby="navbarCategoriesLink"
            >
              <a
                className="dropdown-item"
                href="https://www.sorpetaler.de/hubert/category/allgemein/"
              >
                Allgemein
              </a>
              <a
                className="dropdown-item"
                href="https://www.sorpetaler.de/hubert/category/der-werkstoff-holz/"
              >
                Der Werkstoff Holz
              </a>
              <a
                className="dropdown-item"
                href="https://www.sorpetaler.de/hubert/category/fensterratgeber/"
              >
                Fensterratgeber
              </a>
              <a
                className="dropdown-item"
                href="https://www.sorpetaler.de/hubert/category/nachhaltig-bauen-und-sanieren/"
              >
                Nachhaltig Bauen und Sanieren
              </a>
              <a
                className="dropdown-item"
                href="https://www.sorpetaler.de/hubert/category/persoenlichkeiten/"
              >
                Persönlichkeiten
              </a>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/about">
              Über uns
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
              Newsletter
            </a>
          </li>
        </ul>
        <ul className="social-icons navbar-nav mt-2 mt-md-0 hidden-sm-down hidden-lg-up">
          <li className="nav-item">
            <a
              className="nav-link icon hubert_fb_url"
              href="https://www.facebook.com/hubertmagazin"
              target="_blank"
            />
          </li>
          <li className="nav-item">
            <a
              className="nav-link icon hubert_pinterest_url"
              href="https://www.pinterest.de/sorpetaler/hubert-magazin-f%C3%BCr-holzkultur/"
              target="_blank"
            />
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
          <div className="col-md-4">
            <div className="mailjet_widget_front_container">
              <div id="mailjet-widget-title-wrap">
                <h3>Newsletter</h3>{" "}
              </div>
              <form
                method="post"
                action=""
                id="mailjetSubscriptionForm"
                name="wp_mailjet_subscribe_widget-2"
              >
                <div className="mailjet-widget-form-group">
                  <input
                    type="email"
                    name="subscription_email"
                    id="mailjet_widget_email"
                    required="required"
                    placeholder="* ihre@email.com"
                  />
                  <input
                    type="hidden"
                    name="subscription_locale"
                    id="mailjet_widget_locale"
                    value="de_DE"
                  />
                  <input
                    type="hidden"
                    name="action"
                    value="send_mailjet_subscription_form"
                  />
                </div>
                <input
                  type="hidden"
                  name="widget_id"
                  value="wp_mailjet_subscribe_widget-2"
                />
                <input type="submit" value="Registrieren" />
              </form>
              <span className="mailjet_widget_form_message" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
)

export default Header
