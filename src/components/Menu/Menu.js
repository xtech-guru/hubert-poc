import React, { useCallback } from "react"
import styled from "styled-components"
import { Link } from "gatsby"

import data from "../../mocks/menu.json"
import headerLogoSm from "../../images/H_logo.svg"
import headerLogoLg from "../../images/HUBERT_logo_desktop.svg"
import burger_menu_icon from "../../images/burger_menu.svg"

const MenuItem = ({ content, route, type, selected, items = [], onClick }) => {
  return (
    <MenuItemWrapper selected={selected} type={type}>
      <Link to={route} onClick={onClick} aria-label="Menu">
        {content}
      </Link>
      {!!items.length && selected && (
        <div>
          {items.map(item => (
            <Link key={item.route} to={item.route} aria-label="Menu-item">
              {item.content}
            </Link>
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

  const [isCollapsed, setIsCollapsed] = React.useState(false)

  const toggleCollapse = useCallback(() => {
    setIsCollapsed(prevState => !prevState)
  }, [])

  return (
    <>
      <NavBarWrapper>
        <button
          type="button"
          aria-label="navbar button"
          onClick={toggleCollapse}
        >
          <span />
        </button>
        <MenuWrapper>
          <Link to={props.logo.url} aria-label="Logo">
            <img src={headerLogoSm} alt="Hubert logo" width={40} height={27} />
            <img src={headerLogoLg} alt="Hubert logo" width={150} height={44} />
            <div className="page-title">
              <h1>{props.logo.content}</h1>
            </div>
          </Link>

          <StyledMenuList isCollapsed={isCollapsed}>
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
          </StyledMenuList>
        </MenuWrapper>
      </NavBarWrapper>

      <FormWrapper
        visible={!!menuItemsSelectStatus[props.menuItems[2].content]}
      >
        <div>
          <div>
            <div>{props.form.description}</div>
            <div>
              <div>
                <div>
                  <h3>{props.form.title}</h3>
                </div>
                <form
                  method="post"
                  action=""
                  name="wp_mailjet_subscribe_widget-2"
                >
                  <div>
                    <label>
                      <input
                        type="email"
                        name="subscription_email"
                        required="required"
                        placeholder="* ihre@email.com"
                        aria-label="subscription email"
                      />
                    </label>
                    <label>
                      <input
                        type="hidden"
                        name="subscription_locale"
                        value="de_DE"
                        aria-label="subscription locale"
                      />
                    </label>
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
                    value={props.form.submitButtonContent}
                    aria-label="subscription submit button"
                  />
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

const MenuWrapper = styled.div`
  @media (min-width: 768px) {
    display: flex;
    flex: 1;
    justify-content: space-between;
  }
`
const StyledMenuList = styled.div`
  ${({ isCollapsed }) =>
    `
    display : ${isCollapsed ? "block" : "none"} ;
    @media (min-width: 768px) {
      display: flex !important;
      align-items:center
    }
  `}
`

const NavBarWrapper = styled.nav`
  padding-top: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  font-family: "GT Pressura", -apple-system, system-ui, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-weight: 700;
  text-transform: uppercase;

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: flex-end !important;
    justify-content: space-between;
  }

  button {
    outline: none;
    position: absolute;
    right: 0;
    color: #9d958e;
    align-self: flex-start;
    padding: 0.25rem 0.75rem;
    font-size: 1.25rem;
    line-height: 1;
    background: transparent;
    border: 1px solid transparent;
    @media (min-width: 768px) {
      display: none;
    }
    span {
      display: inline-block;
      width: 1.5em;
      height: 1.5em;
      vertical-align: middle;
      content: "";
      background-image: url(${burger_menu_icon});
      background-position: center;
      background-size: auto;
      background-repeat: no-repeat;
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
        margin-top: 0;
      }
    }
  }

  & .page-title {
    display: none;

    @media (min-width: 992px) {
      display: block;
    }
  }

  > div {
    > div {
      @media (min-width: 768px) {
        align-items: flex-end;
      }
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
        padding: 0.5em 0em;
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
      ? `
  @media (min-width: 768px) {
    background: #f86968;
    transition: background-color 1s ease, color 1s ease;
    a {
      color: #fff !important;
    }
  }
`
      : ""}
`

const FormWrapper = styled.div`
  overflow: hidden;
  max-height: ${props => (props.visible ? "350px;" : "0px;")}
  background: #f86968;
  color: #fff;
  transition: max-height .5s ease;

  > div {
    display: block;

    > div {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      margin: 0;
      padding: 50px 46px;
      align-items: center !important;
      
      > div {
        position: relative;
        min-height: 1px;
        padding-right: 15px;
        padding-left: 15px;

        :first-child {
          @media (min-width: 768px) {
            text-align: right !important;
            flex: 0 0 66.6666666667%;
            max-width: 66.6666666667%;
          }

        }

        :nth-child(2) {

          @media (min-width: 768px) {
            flex: 0 0 33.3333333333%;
            max-width: 33.3333333333%;
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
  }
`

Menu.defaultProps = data
