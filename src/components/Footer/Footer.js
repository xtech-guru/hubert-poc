import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

export function Footer() {
  return (
    <FooterContainer>
      <div>
        <div>
          <div>
            <div>
              <StyledTitle>Hubert Magazin</StyledTitle>
              <StyledParagraph>
                Hubert ist das neue Online-Magazin für Holz-Kultur, das
                hochwertige und mitreißende Beiträge rund um den Baustoff Holz
                liefert. Hubert wird herausgegeben von Sorpetaler Fensterbau.
              </StyledParagraph>
              <div>
                <Link to="/about" aria-label="About">
                  Mehr erfahren
                </Link>
              </div>
              <div>
                <Link
                  to="mailto:post@hubert-magazin.de"
                  aria-label="Contact-us"
                >
                  post@hubert-magazin.de
                </Link>
              </div>
            </div>
            <div>
              <StyledTitle>Folge uns</StyledTitle>
              <StyledList>
                <li>
                  <Link
                    to="https://www.facebook.com/hubertmagazin"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                  >
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://www.pinterest.de/sorpetaler/hubert-magazin-f%C3%BCr-holzkultur/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Pinterest"
                  >
                    Pinterest
                  </Link>
                </li>
              </StyledList>
            </div>
            <div>
              <StyledTitle>newsletter</StyledTitle>
              <StyledParagraph>
                Verpasse keine Neuigkeiten von Hubert. Jetzt zum Newsletter
                anmelden!
              </StyledParagraph>

              <div>
                <div>
                  <h3>Newsletter</h3>
                </div>

                <form
                  method="post"
                  action=""
                  name="wp_mailjet_subscribe_widget-2"
                >
                  <div>
                    <input
                      type="email"
                      name="subscription_email"
                      required="required"
                      placeholder="* ihre@email.com"
                      aria-label="subscription email"
                    />
                    <input
                      type="hidden"
                      name="subscription_locale"
                      value="de_DE"
                      aria-label="subscription locale"
                    />
                    <label>
                      <input
                        type="hidden"
                        name="action"
                        value="send_mailjet_subscription_form"
                      />
                    </label>
                  </div>
                  <input
                    type="hidden"
                    name="widget_id"
                    value="wp_mailjet_subscribe_widget-2"
                  />
                  <input
                    type="submit"
                    value="Registrieren"
                    aria-label="subscription submit button"
                  />
                </form>
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>

      <StyledHr />

      <div>
        <div>
          <div>
            <div>©2017 Hubert</div>
            <div>|</div>
            <div>
              <Link to="/impressum" aria-label="Impressum">
                Impressum
              </Link>
            </div>
            <div>|</div>
            <div>
              Powered by&nbsp;
              <Link to="/" aria-label="Home">
                Sorpetaler
              </Link>
            </div>
          </div>
        </div>
      </div>
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
  font-size: 0.75rem;
  color: #fff;
  display: block;
  line-height: 18px;
  > div:first-child {
    background-color: #f86968;

    > div {
      position: relative;
      margin-left: auto;
      margin-right: auto;
      padding-right: 15px;
      padding-left: 15px;
      max-width: 100%;

      @media (min-width: 576px) {
        width: 540px;
      }

      @media (min-width: 768px) {
        width: 720px;
      }

      @media (min-width: 992px) {
        width: 960px;
      }

      @media (min-width: 1200px) {
        width: 1140px;
      }

      > div {
        display: flex;
        flex-wrap: wrap;
        margin-right: -15px;
        margin-left: -15px;

        > div {
          position: relative;
          width: 100%;
          min-height: 1px;
          padding-right: 15px;
          padding-left: 15px;
          margin-top: 3rem !important;

          @media (min-width: 576px) {
            flex: 0 0 100%;
            max-width: 100%;
          }

          @media (min-width: 992px) {
            flex: 0 0 33.3333333333%;
            max-width: 33.3333333333%;
          }
        }

        > div:first-child {
          div {
            a {
              color: #fff;
              text-decoration: underline;
              touch-action: manipulation;
            }
          }
        }
        > div:last-child {
          margin-top: 3rem !important;
          margin-bottom: 3rem !important;
        }
      }
    }
  }

  > div:last-child {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
    text-align: center !important;
    background-color: #f86968;
    color: #fff;

    > div {
      position: relative;
      margin-left: auto;
      margin-right: auto;
      padding-right: 15px;
      padding-left: 15px;

      @media (min-width: 576px) {
        width: 540px;
        max-width: 100%;
      }

      @media (min-width: 768px) {
        width: 720px;
        max-width: 100%;
      }

      @media (min-width: 992px) {
        width: 960px;
        max-width: 100%;
      }

      @media (min-width: 1200px) {
        width: 1140px;
        max-width: 100%;
      }

      > div {
        width: 100%;
        display: flex !important;
        justify-content: center !important;
        margin-right: -15px;
        margin-left: -15px;
        flex-wrap: wrap;

        & a {
          color: #fff;
          text-decoration: none;
        }

        > div:nth-child(-n + 3) {
          margin-right: 0.5rem !important;
          margin-left: 0.5rem !important;
        }

        > div:nth-child(4) {
          margin-left: 0.5rem !important;
          margin-right: 0 !important;
        }

        > div:last-child {
          position: relative;
          width: 100%;
          min-height: 1px;
          margin-left: -15px !important;
          padding-left: 0 !important;
          padding-right: 15px;

          @media (min-width: 576px) {
            flex: 0 0 100%;
            max-width: 100%;
          }

          @media (min-width: 768px) {
            flex: 0 0 25%;
            max-width: 25%;
          }

          @media (min-width: 992px) {
            flex: 0 0 16.6666666667%;
            max-width: 16.6666666667%;
          }
        }
      }
    }
  }
`
const StyledTitle = styled.h6`
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  font-family: GT Pressura, -apple-system, system-ui, BlinkMacSystemFont,
    Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif;
  margin-top: 0;
`
const StyledHr = styled.hr`
  margin: 0;
  padding: 0;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  box-sizing: content-box;
  height: 0;
  overflow: visible;

  @media (min-width: 992px) {
    display: none !important;
  }
`
const StyledParagraph = styled.p`
  margin-top: 0;
  margin-bottom: 1rem;
`
const StyledList = styled.ul`
  margin: 0;
  padding-left: 0;
  list-style: none;
  a {
    color: #fff;
    text-decoration: underline;
    touch-action: manipulation;
  }
`
