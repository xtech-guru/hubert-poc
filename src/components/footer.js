// import { Link } from "gatsby"
import React from "react"
import letter from "../images/letter.svg"
import close from "../images/close.svg"
import arrowDown from "../images/arrow-down.svg"

const Header = () => {
  return (
    <footer class="main-footer">
      <div class="footer1 bg-body-light">
        <div class="container">
          <div class="row mb-12">
            <div class="footer-item col-sm-12 mt-5 col-lg-4">
              <h6 class="header">Hubert Magazin</h6>
              <p>
                Hubert ist das neue Online-Magazin für Holz-Kultur, das
                hochwertige und mitreißende Beiträge rund um den Baustoff Holz
                liefert. Hubert wird herausgegeben von Sorpetaler Fensterbau.
              </p>
              <div>
                <a href="https://www.sorpetaler.de/hubert/about">
                  Mehr erfahren
                </a>
              </div>
              <div>
                <a href="mailto:post@hubert-magazin.de">
                  post@hubert-magazin.de
                </a>
              </div>
            </div>
            <div class="footer-item col-sm-12 mt-5 col-lg-4">
              <h6 class="header">Folge uns</h6>
              <ul class="list-unstyled">
                <li>
                  <a
                    href="https://www.facebook.com/hubertmagazin"
                    target="_blank"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.pinterest.de/sorpetaler/hubert-magazin-f%C3%BCr-holzkultur/"
                    target="_blank"
                  >
                    Pinterest
                  </a>
                </li>
              </ul>
            </div>
            <div class="footer-item col-sm-12 my-5 col-lg-4">
              <h6 class="header">newsletter</h6>
              <p>
                Verpasse keine Neuigkeiten von Hubert. Jetzt zum Newsletter
                anmelden!
              </p>

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

      <hr class="hidden-lg-up" />

      <div class="footer-bottom bg-body-dark py-5 text-center">
        <div class="container">
          <div class="d-flex justify-content-center">
            <div class="mx-2">©2017 Hubert</div>
            <div class="mx-2">|</div>
            <div class="mx-2">
              <a href="https://www.sorpetaler.de/hubert/impressum">Impressum</a>
            </div>
            <div class="hidden-sm-down ml-2 mr-0">|</div>
            <div class="col-sm-12 pl-0 col-md-3 col-lg-2">
              Powered by
              <a href="https://www.sorpetaler.de/" target="_blank">
                Sorpetaler
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="newsletter-popup">
        <div className="popup-header">
          <div className="container">
            <div className="row">
              <div className="header-text col-11 offset-1">
                <img src={letter} alt="letter icon" />
                <p>Nichts verpassen!</p>
              </div>
            </div>
          </div>
          <div className="close-icon">
            <img src={close} alt="close icon" />
          </div>
          <span className="minimise-icon">
            <img src={arrowDown} alt="minimise icon" />
          </span>
        </div>
        <div class="container">
          <div class="popup-content row">
            <div class="popup-text col-6 offset-1">
              <p>
                Du willst regelmäßig die neuesten Hubert-Artikel erhalten? Dann
                melde dich jetzt für unseren Newsletter an.
              </p>
            </div>
            <div class="popup-form col-4 offset-1">
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
    </footer>
  )
}

export default Header
