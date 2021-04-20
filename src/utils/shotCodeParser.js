import React from "react"
import ShortcodeParser from "meta-shortcodes"

const iconArrowBlue = require("../images/icon_arrow_blue.svg")

const parser = new ShortcodeParser()

parser.add("float-left", function (opts, content) {
  return `<div class="float-left">${content}</div>`
})

parser.add("highlight", function (opts, content) {
  return `<div class="highlight"><p>${content}</p></div>`
})

parser.add("text-with-link", function (opts, content) {
  const linkText = opts["link-text"]
  const linkUrl = opts["link-url"]

  return `<div class="text-with-link">
            <div>
                <div>
                    <img src="${opts.image}" />
                </div>
                <div>
                    <div>${content}</div>
                    <img src="${iconArrowBlue}"/>
                    <a href={${linkUrl}}>${linkText}</a>
                </div>
            </div>
          </div>`
})

export function parse(content) {
  return parser.parse(content)
}
