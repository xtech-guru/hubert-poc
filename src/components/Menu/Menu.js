import React, { useCallback } from "react"
import { Link } from "gatsby"

import * as styles from "./Menu.module.scss"
import data from "../../mocks/menu.json"
import headerLogoSm from "../../images/H_logo.svg"
import headerLogoLg from "../../images/HUBERT_logo_desktop.svg"

const MenuItem = ({ content, route, type, selected, items = [], onClick }) => {
  return (
    <li
      selected={selected}
      type={type}
      className={
        selected && type === "collapse" ? styles.menuItemSelected : null
      }
    >
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
    </li>
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
  const isVisible = !!menuItemsSelectStatus[props.menuItems[2].content]
  const toggleCollapse = useCallback(() => {
    setIsCollapsed(prevState => !prevState)
  }, [])

  return (
    <>
      <nav className={styles.navbar}>
        <button
          type="button"
          aria-label="navbar button"
          onClick={toggleCollapse}
        >
          <span />
        </button>
        <div className={styles.menu}>
          <Link to={props.logo.url} aria-label="Logo">
            <img src={headerLogoSm} alt="Hubert logo" width={40} height={27} />
            <img src={headerLogoLg} alt="Hubert logo" width={150} height={44} />
            <div className={styles.pageTitle}>
              <h1>{props.logo.content}</h1>
            </div>
          </Link>

          <div
            className={isCollapsed ? styles.collpasedMenuList : styles.menuList}
          >
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
        </div>
      </nav>

      <div
        className={` ${styles.form}  ${
          isVisible ? styles.visibleForm : styles.invisibleForm
        }`}
      >
        <div>
          <div>
            <div>{props.form.description}</div>
            <div>
              <div>
                <div>
                  <h2>{props.form.title}</h2>
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
      </div>
    </>
  )
}

Menu.defaultProps = data
