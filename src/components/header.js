import React from "react"

import HLogo from "../images/H_logo.svg"
import HUBERTLogoDesktop from "../images/HUBERT_logo_desktop.svg"

const Header = () => (
  <header class="main-header container">
    <div class="social-icons d-flex justify-content-end">
      <a
        class="hubert_fb_url"
        href="https://www.facebook.com/hubertmagazin"
        target="_blank"
      ></a>
      <a
        class="hubert_pinterest_url"
        href="https://www.pinterest.de/sorpetaler/hubert-magazin-f%C3%BCr-holzkultur/"
        target="_blank"
      ></a>
    </div>
    <nav class="navbar navbar-toggleable-sm navbar-light align-items-md-end">
      <button
        class="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#mainNavBar"
        aria-controls="mainNavBar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <a className="navbar-brand" href="https://www.sorpetaler.de/hubert/">
        <img className="hidden-md-up" src={HLogo} alt="Hubert logo" />
        <img
          className="hidden-sm-down"
          src={HUBERTLogoDesktop}
          alt="Hubert logo"
        />
        <div className="hidden-md-down">
          <h1 class="page-title">Magazin Für Holz-Kultur</h1>
        </div>
      </a>

      <div id="mainNavBar" class="collapse navbar-collapse">
        <ul class="navbar-nav mt-2 mt-md-0 ml-md-auto">
          <li class="nav-item dropdown">
            <a
              id="navbarCategoriesLink"
              class="nav-link dropdown-toggle"
              href="#"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Rubriken
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarCategoriesLink">
              <a
                class="dropdown-item"
                href="https://www.sorpetaler.de/hubert/category/allgemein/"
              >
                Allgemein
              </a>
              <a
                class="dropdown-item"
                href="https://www.sorpetaler.de/hubert/category/der-werkstoff-holz/"
              >
                Der Werkstoff Holz
              </a>
              <a
                class="dropdown-item"
                href="https://www.sorpetaler.de/hubert/category/fensterratgeber/"
              >
                Fensterratgeber
              </a>
              <a
                class="dropdown-item"
                href="https://www.sorpetaler.de/hubert/category/nachhaltig-bauen-und-sanieren/"
              >
                Nachhaltig Bauen und Sanieren
              </a>
              <a
                class="dropdown-item"
                href="https://www.sorpetaler.de/hubert/category/persoenlichkeiten/"
              >
                Persönlichkeiten
              </a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://www.sorpetaler.de/hubert/about">
              Über uns
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link no-scroll"
              href="#newsletter"
              data-toggle="collapse"
              aria-expanded="false"
              aria-controls="newsletter"
            >
              Newsletter
            </a>
          </li>
        </ul>
        <ul class="social-icons navbar-nav mt-2 mt-md-0 hidden-sm-down hidden-lg-up">
          <li class="nav-item">
            <a
              class="nav-link icon hubert_fb_url"
              href="https://www.facebook.com/hubertmagazin"
              target="_blank"
            ></a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link icon hubert_pinterest_url"
              href="https://www.pinterest.de/sorpetaler/hubert-magazin-f%C3%BCr-holzkultur/"
              target="_blank"
            ></a>
          </li>
        </ul>
      </div>
    </nav>
    <div class="menu-panel">
      <div class="collapse newsletter" id="newsletter">
        <div class="row align-items-center">
          <div class="col-md-8 text-md-right">
            Verpasse keine Neuigkeiten von Hubert. Jetzt zum Newsletter
            anmelden!
          </div>
          <div class="col-md-4">
            <div class="mailjet_widget_front_container">
              <div id="mailjet-widget-title-wrap">
                <h3>Newsletter</h3>{" "}
              </div>
              <form
                method="post"
                action=""
                id="mailjetSubscriptionForm"
                name="wp_mailjet_subscribe_widget-2"
              >
                <div class="mailjet-widget-form-group">
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
              <span class="mailjet_widget_form_message"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
)

export default Header
