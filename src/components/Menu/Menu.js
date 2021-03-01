import React from "react"
import styled from "styled-components"

import data from "../../mock/menu.json"
import headerLogoSm from "../../images/H_logo.svg"
import headerLogoLg from "../../images/HUBERT_logo_desktop.svg"

const MenuItem = ({ content, route, type, selected, items = [], onClick }) => {
  return (
    <MenuItemWrapper selected={selected} type={type}>
      <a href={route} onClick={onClick}>
        {content}
      </a>
      {!!items.length && selected && (
        <div>
          {items.map(item => (
            <a key={item.route} href={item.route}>
              {item.content}
            </a>
          ))}
        </div>
      )}
    </MenuItemWrapper>
  )
}

export const Menu = props => {
  const [menuItemsSelectStatus, setMenuItemsSelectStatus] = React.useState(
    props.menuItems.reduce((prev, item) => {
      prev[item.content] = false
      return prev
    }, {})
  )

  return (
    <>
      <NavBarWrapper>
        <button type="button">
          <span />
        </button>

        <a href={props.logo.url}>
          <img src={headerLogoSm} alt="Hubert logo" />
          <img src={headerLogoLg} alt="Hubert logo" />
          <div>
            <h1>{props.logo.content}</h1>
          </div>
        </a>

        <div>
          <ul>
            {props.menuItems.map(item => (
              <MenuItem
                key={item.content}
                content={item.content}
                route={item.route}
                type={item.type}
                items={item.items}
                selected={menuItemsSelectStatus[item.content]}
                onClick={() => {
                  setMenuItemsSelectStatus(prevState => ({
                    ...prevState,
                    [item.content]: !prevState[item.content],
                  }))
                }}
              />
            ))}
          </ul>
        </div>
      </NavBarWrapper>

      <FormWrapper
        visible={!!menuItemsSelectStatus[props.menuItems[2].content]}
      >
        <div>
          <div>
            <div>{props.form.description}</div>
            <div>
              <div>
                <div id="mailjet-widget-title-wrap">
                  <h3>{props.form.title}</h3>
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
                  <input type="submit" value={props.form.submitButtonContent} />
                </form>
                <span />
              </div>
            </div>
          </div>
        </div>
      </FormWrapper>
    </>
  )
}

const NavBarWrapper = styled.nav`
  position: relative;
  display: flex;
  justify-content: space-between;

  font-family: "GT Pressura", -apple-system, system-ui, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 700;
  text-transform: uppercase;

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-end !important;
  }

  & button {
    position: absolute;
    right: 0;
    color: #9d958e;
    align-self: flex-start;
    padding: 0.25rem 0.75rem;
    font-size: 1.25rem;
    line-height: 1;
    background: transparent;
    border: 1px solid transparent;

    span {
      background-size: auto;
      display: inline-block;
      width: 1.5em;
      height: 1.5em;
      vertical-align: middle;
      content: "";
      background: no-repeat 50%;
    }
  }

  a {
    color: #9d958e;
    font-size: 1rem;
    display: inline-block;
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    margin-right: 1rem;
    line-height: inherit;
    white-space: nowrap;
    touch-action: manipulation;
    text-decoration: none !important;
    background-color: transparent;
    cursor: pointer;

    img:first-child {
      @media (min-width: 768px) {
        display: none !important;
        vertical-align: middle;
        border-style: none;
      }
    }

    img:nth-child(2) {
      margin: 0;
      vertical-align: middle;
      border-style: none;

      @media (max-width: 767px) {
        display: none !important;
      }
    }

    div {
      padding-top: 10px;
      padding-left: 15px;

      h1 {
        font-size: 1rem;
        font-weight: 700;
        text-transform: uppercase;
        font-family: GT Pressura, -apple-system, system-ui, BlinkMacSystemFont,
          Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif;
        line-height: 1.1;
        color: #9d958e;
        margin-bottom: 0.5rem;
      }
    }
  }

  & div {
    display: none;

    @media (min-width: 768px) {
      display: flex !important;
    }
  }

  & ul {
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem !important;
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;

    @media (min-width: 768px) {
      flex-direction: row;
      margin-top: 0 !important;
      margin-left: auto !important;
    }

    & li {
      position: relative;
      display: list-item;
      text-align: -webkit-match-parent;
      margin-bottom: 0;

      :first-child {
        > a::after {
          display: inline-block;
          width: 0;
          height: 0;
          margin-left: 0.3em;
          vertical-align: middle;
          content: "";
          border-top: 0.3em solid;
          border-right: 0.3em solid transparent;
          border-left: 0.3em solid transparent;
        }
      }

      & a {
        color: #9d958e;
        display: block;
        padding: 0.5em 1em;
        touch-action: manipulation;
        text-decoration: none;
        background-color: transparent;
        margin: 0;

        @media (min-width: 768px) {
          padding-right: 0.5rem;
          padding-left: 0.5rem;
        }
      }

      & div {
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1000;
        float: left;
        min-width: 10rem;
        padding: 0.5rem 0;
        margin: 0.125rem 0 0;
        font-size: 1rem;
        color: #4b3e31;
        text-align: left;
        list-style: none;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid rgba(0, 0, 0, 0.15);

        & a {
          display: block;
          width: 100%;
          padding: 3px 1.5rem;
          clear: both;
          font-weight: 400;
          color: #4b3e31;
          text-align: inherit;
          white-space: nowrap;
          background: none;
          border: 0;
          touch-action: manipulation;
          text-decoration: none;
        }
      }
    }
  }
`

const MenuItemWrapper = styled.li`
  ${props =>
    props.selected && props.type === "collapse"
      ? `background: #f86968;
         transition: background-color 1s ease, color 1s ease;
         a {
           color: #fff !important;
         }
        `
      : ""}
`

const FormWrapper = styled.div`
  display: ${props => (props.visible ? "block" : "none")};
  background: #f86968;
  color: #fff;

  > div {
    display: block;

    > div {
      display: flex;
      flex-wrap: wrap;
      margin: 0;
      padding: 50px 46px;
      align-items: center !important;

      @media (min-width: 576px) {
        margin-right: -15px;
        margin-left: -15px;
      }

      @media (min-width: 768px) {
        margin-right: -15px;
        margin-left: -15px;
      }

      @media (min-width: 992px) {
        margin-right: -15px;
        margin-left: -15px;
      }

      @media (min-width: 1200px) {
        margin-right: -15px;
        margin-left: -15px;
      }

      > div:first-child {
        position: relative;
        width: 100%;
        min-height: 1px;

        @media (min-width: 768px) {
          text-align: right !important;
        }

        @media (min-width: 768px) {
          flex: 0 0 66.6666666667%;
          max-width: 66.6666666667%;
        }

        @media (min-width: 576px) {
          padding-right: 15px;
          padding-left: 15px;
        }

        @media (min-width: 768px) {
          text-align: right !important;
          flex: 0 0 66.6666666667%;
          max-width: 66.6666666667%;
          padding-right: 15px;
          padding-left: 15px;
        }

        @media (min-width: 992px) {
          padding-right: 15px;
          padding-left: 15px;
        }

        @media (min-width: 1200px) {
          padding-right: 15px;
          padding-left: 15px;
        }
      }

      > div:nth-child(2) {
        position: relative;
        width: 100%;
        min-height: 1px;

        @media (min-width: 576px) {
          padding-right: 15px;
          padding-left: 15px;
        }

        @media (min-width: 768px) {
          flex: 0 0 33.3333333333%;
          max-width: 33.3333333333%;
          padding-right: 15px;
          padding-left: 15px;
        }

        @media (min-width: 992px) {
          padding-right: 15px;
          padding-left: 15px;
        }

        @media (min-width: 1200px) {
          padding-right: 15px;
          padding-left: 15px;
        }

        > div {
          margin-bottom: 20px;

          & form {
            > div {
              margin-bottom: 10px;
            }
          }
        }
      }
    }
  }
`

Menu.defaultProps = data
