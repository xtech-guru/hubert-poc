import React from "react"

import { container } from "./Container.module.scss"

export const Container = ({ children }) => {
  return <div className={container}>{children}</div>
}
