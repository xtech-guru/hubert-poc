const contentful = require("contentful-management")
const axios = require("axios")
const TurndownService = require("turndown")
const { richTextFromMarkdown } = require("@contentful/rich-text-from-markdown")
const ShortcodeParser = require("meta-shortcodes")

require("dotenv/config")

/**
 * Main WordPress endpoint.
 */
const WORD_PRESS_ENDPOINT = `https://www.sorpetaler.de/wp-json/wp/v2/`

/**
 * http client instance for making http requests
 * @type {AxiosInstance}
 */
const httpClient = axios.create({
  baseURL: WORD_PRESS_ENDPOINT,
  auth: {
    username: process.env.WORDPRESS_USERNAME,
    password: process.env.WORDPRESS_PASSWORD,
  },
})

const logSeparator = `-------`

const BODY_IMAGE_REGEX = /<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/g

/**
 * Contentful API requirements
 */
const ctfData = {
  accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONEMENT_ID,
  spaceId: process.env.CONTENTFUL_SPACE_ID,
}

/**
 * Creation of Contentful Client
 */
const ctfClient = contentful.createClient({
  accessToken: ctfData.accessToken,
})

/**
 * Markdown / Content conversion functions.
 */
const turndownService = new TurndownService({
  codeBlockStyle: "fenced",
})

/**
 * Convert HTML codeblocks to Markdown codeblocks.
 */
turndownService.addRule("fencedCodeBlock", {
  filter: function (node, options) {
    return (
      options.codeBlockStyle === "fenced" &&
      node.nodeName === "PRE" &&
      node.firstChild &&
      node.firstChild.nodeName === "CODE"
    )
  },
  replacement: function (content, node, options) {
    let className = node.firstChild.getAttribute("class") || ""
    let language = (className.match(/language-(\S+)/) || [null, ""])[1]

    return (
      "\n\n" +
      options.fence +
      language +
      "\n" +
      node.firstChild.textContent +
      "\n" +
      options.fence +
      "\n\n"
    )
  },
})

/**
 * Convert inline HTML images to inline markdown image format.
 */
turndownService.addRule("replaceWordPressImages", {
  filter: ["img"],
  replacement: function (content, node) {
    const assetUrl = contentfulDataByTypeKey.assetsArray.filter(asset => {
      const assetFileName = asset.split("/").pop()
      const nodeFileName = node.getAttribute("src").split("/").pop()

      return assetFileName === nodeFileName
    })[0]

    return `![${node.getAttribute("alt")}](${assetUrl})`
  },
})

const wordPressPagesLengthByEndpointName = {
  posts: 2,
  categories: 1,
  users: 1,
  media: 16,
}

/**
 * contentful data by wordPress id
 * @type {{avatarAssets: {}, assets: {}, categories: {}, authors: {}}}
 */
let contentfulDataByTypeKey = {
  linkBlocks: {},
  linkBlockAssets: {},
  avatarAssets: {},
  assets: {},
  assetsArray: [],
  categories: {},
  authors: {},
}

/**
 * fetch data from WordPress endpoints
 * @type {{categories: {}, media: {}, posts: {}, users: {}}}
 */
/*
let wordPressData = {
  posts: {},
  categories: {},
  users: {},
  media: {},
  linkBlocks: [],
}
*/
let wordPressData = {
  posts: [
    {
      id: 11928,
      date: "2020-07-06T12:08:55",
      date_gmt: "2020-07-06T10:08:55",
      guid: {
        rendered: "https://www.sorpetaler.de/?p=11928",
        raw: "https://www.sorpetaler.de/?p=11928",
      },
      modified: "2020-10-29T14:34:22",
      modified_gmt: "2020-10-29T13:34:22",
      password: "",
      slug: "was-macht-ein-restaurator",
      status: "publish",
      type: "post",
      link:
        "https://www.sorpetaler.de/hubert/der-werkstoff-holz/was-macht-ein-restaurator/",
      title: {
        raw: "Video: Was macht eigentlich ein Restaurator?",
        rendered: "Video: Was macht eigentlich ein Restaurator?",
      },
      content: {
        raw:
          'In unserer neuen Reihe "Was macht eigentlich ein...?" schauen wir uns Holzberufe genauer an und sprechen mit Menschen, die bei ihrer Arbeit jeden Tag mit dem Werkstoff Holz zu tun haben. Den Auftakt unserer Reihe macht das Gespr\u00e4ch mit Michael H\u00fcndgen, das wir bereits im letzten Jahr gef\u00fchrt haben. Michael H\u00fcndgen ist Restaurator und Denkmalpfleger in Meerbusch und hat sich mit Leib und Seele dem Holz verschrieben.\r\n<h2>Welche Aufgaben \u00fcbernimmt ein Restaurator?</h2>\r\nAls Restaurator k\u00fcmmert sich Michael H\u00fcndgen um die Instandsetzung unterschiedlichster Bauteile wie Treppen, Fu\u00dfb\u00f6den, Wandvert\u00e4felungen oder Decken insbesondere in denkmalgesch\u00fctzten Geb\u00e4uden. Einen besonderen Schwerpunkt seiner Arbeit bildet die Sanierung von Au\u00dfenbauteilen wie Fenster, Fensterl\u00e4den, Haust\u00fcren oder Dachgauben. Bei der Sanierung denkmalgesch\u00fctzter Geb\u00e4ude steht er dabei in engem Kontakt zur Denkmalbeh\u00f6rde, mit der er gemeinsam ein Sanierungskonzept entwickelt. [float-left]<img class="alignnone wp-image-11940" src="https://www.sorpetaler.de/wp-content/uploads/2020/07/alte-fenster-restaurieren.jpg" alt="Ein Haus mit alten Holzfenstern" width="450" height="677" />[/float-left]Daf\u00fcr schaut er sich den Zustand der Bauteile, die instand gesetzt werden sollen, genau an: Wie stark sind die Bauteile besch\u00e4digt? Was davon l\u00e4sst sich erhalten, was vielleicht nicht? Lohnt sich eine Instandsetzung oder muss das Bauteil doch durch ein dem Original nachempfundenes neues Bauteil ersetzt werden? Grunds\u00e4tzlich gilt bei der Denkmalsanierung, dass so viel Originalsubstanz wie m\u00f6glich erhalten werden soll. Im Umkehrschluss hei\u00dft das: Ausgetauscht beziehungsweise durch Neues ersetzt wird in der Regel nur das, was sich gar nicht mehr erhalten l\u00e4sst.\r\n<blockquote>"Holz ist der\u00a0sch\u00f6nste Werkstoff, den die Natur je geschaffen hat."</blockquote>\r\n<h2>Welche Rolle spielt Holz f\u00fcr einen Restaurator?</h2>\r\nNaturgem\u00e4\u00df geh\u00f6rt Holz zu den wichtigsten Baustoffen f\u00fcr einen Restaurator, da in alten Geb\u00e4uden Kunststoffe noch nicht vorkamen. In der Regel handelt es sich dabei um einheimische H\u00f6lzer wie Eiche, L\u00e4rche oder Kiefer. Tropenh\u00f6lzer finden sich entsprechend kaum in alten H\u00e4usern. Abgesehen davon sind sie, so Michael H\u00fcndgen, aufgrund ihrer h\u00e4ufig unsicheren Herkunft und der langen Transportwege richtiggehend verp\u00f6nt unter Restauratoren. Denn das eint viele unter ihnen: ein \u00f6kologisches Bewusstsein und eine ressourcenschonende Herangehensweise an ihre Arbeit. F\u00fcr \u00d6kologie, Ressourcenschonung und Klimaschutz steht Holz als nachwachsender, CO2-neutraler Baustoff wie kein anderer. Au\u00dferdem ist es laut Michael H\u00fcndgen "der sch\u00f6nste Werkstoff, den die Natur je geschaffen hat."\r\n<blockquote>"Holz ist die Zukunft."</blockquote>\r\nIm Sinne der Nachhaltigkeit - aber auch, um Bauteile m\u00f6glichst originalgetreu aufzuarbeiten - setzen Restauratoren zudem h\u00e4ufig auf Altholz, das zum Beispiel aus H\u00e4usern stammt, die abgerissen werden mussten. Das k\u00f6nnen Fu\u00dfbodendielen sein, Fensterholz, Balken oder altes M\u00f6belholz. Auch neue M\u00f6bel aus Altholz fertigen viele Restauratoren.\r\n\r\nGrunds\u00e4tzlich gilt die Leidenschaft und Liebe von Restauratoren nat\u00fcrlich dem Alten. Die Entwicklung bei Neubauten sieht Michael H\u00fcndgen dennoch sehr positiv: Dass ein regelrechter Holzhaus-Boom entstanden ist und Holz auch in anderen Bereichen neuer H\u00e4user wieder verst\u00e4rkt zum Einsatz kommt, sind f\u00fcr ihn ein richtiger und wichtiger Trend. "Holz ist die Zukunft", so Michael H\u00fcndgen.\r\n\r\n&nbsp;\r\n<div class="video-container-wrapper">\r\n<div class="video-container"><iframe src="https://www.youtube.com/embed/PiGaazRU_uE?rel=0" width="560" height="315" frameborder="0" allowfullscreen="allowfullscreen"></iframe></div>\r\n</div>\r\n&nbsp;\r\n\r\nIm Video beschreibt Michael H\u00fcndgen ausf\u00fchrlich, womit er in seiner t\u00e4glichen Arbeit zu tun hat. Dabei geht er auch darauf ein, wie bei einem denkmalgesch\u00fctzten Haus der Prozess eigentlich abl\u00e4uft, bis entschieden wird, ob ein Bauteil restauriert werden kann oder durch ein neues ersetzt werden muss.\r\n\r\n<em>Beitragsbild von\u00a0<a href="https://unsplash.com/@ivybarn?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Ivy Barn</a>; Bild im Text von\u00a0<a href="https://unsplash.com/@anniespratt?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Annie Spratt</a>\u00a0(beides via\u00a0<a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>)</em>\r\n\r\n[text-with-link link-text="Jetzt lesen" link-url="https://www.sorpetaler.de/hubert/fensterratgeber/denkmalschutz-was-es-bei-holzfenstern-zu-beachten-gilt/" image="https://www.sorpetaler.de/wp-content/uploads/2020/07/holzfenster-denkmalschutz-vorgaben.jpg"] Wann m\u00fcssen Fenster in denkmalgesch\u00fctzten Geb\u00e4uden ausgetauscht werden? Wann restauriert? Welche Vorgaben gibt es in Bezug auf die W\u00e4rmed\u00e4mmwerte? Und wie kann man sich das f\u00f6rdern lassen? In unserem Artikel "Denkmalschutz: Was es bei Holzfenstern zu beachten gilt" liefern wir Antworten.[/text-with-link]',
        rendered:
          '<p>In unserer neuen Reihe &#8220;Was macht eigentlich ein&#8230;?&#8221; schauen wir uns Holzberufe genauer an und sprechen mit Menschen, die bei ihrer Arbeit jeden Tag mit dem Werkstoff Holz zu tun haben. Den Auftakt unserer Reihe macht das Gespr\u00e4ch mit Michael H\u00fcndgen, das wir bereits im letzten Jahr gef\u00fchrt haben. Michael H\u00fcndgen ist Restaurator und Denkmalpfleger in Meerbusch und hat sich mit Leib und Seele dem Holz verschrieben.</p>\n<h2>Welche Aufgaben \u00fcbernimmt ein Restaurator?</h2>\n<p>Als Restaurator k\u00fcmmert sich Michael H\u00fcndgen um die Instandsetzung unterschiedlichster Bauteile wie Treppen, Fu\u00dfb\u00f6den, Wandvert\u00e4felungen oder Decken insbesondere in denkmalgesch\u00fctzten Geb\u00e4uden. Einen besonderen Schwerpunkt seiner Arbeit bildet die Sanierung von Au\u00dfenbauteilen wie Fenster, Fensterl\u00e4den, Haust\u00fcren oder Dachgauben. Bei der Sanierung denkmalgesch\u00fctzter Geb\u00e4ude steht er dabei in engem Kontakt zur Denkmalbeh\u00f6rde, mit der er gemeinsam ein Sanierungskonzept entwickelt. [float-left]<img class="alignnone wp-image-11940" src="https://www.sorpetaler.de/wp-content/uploads/2020/07/alte-fenster-restaurieren.jpg" alt="Ein Haus mit alten Holzfenstern" width="450" height="677" srcset="https://www.sorpetaler.de/wp-content/uploads/2020/07/alte-fenster-restaurieren.jpg 798w, https://www.sorpetaler.de/wp-content/uploads/2020/07/alte-fenster-restaurieren-200x300.jpg 200w, https://www.sorpetaler.de/wp-content/uploads/2020/07/alte-fenster-restaurieren-768x1155.jpg 768w, https://www.sorpetaler.de/wp-content/uploads/2020/07/alte-fenster-restaurieren-681x1024.jpg 681w" sizes="(max-width: 450px) 100vw, 450px" />[/float-left]Daf\u00fcr schaut er sich den Zustand der Bauteile, die instand gesetzt werden sollen, genau an: Wie stark sind die Bauteile besch\u00e4digt? Was davon l\u00e4sst sich erhalten, was vielleicht nicht? Lohnt sich eine Instandsetzung oder muss das Bauteil doch durch ein dem Original nachempfundenes neues Bauteil ersetzt werden? Grunds\u00e4tzlich gilt bei der Denkmalsanierung, dass so viel Originalsubstanz wie m\u00f6glich erhalten werden soll. Im Umkehrschluss hei\u00dft das: Ausgetauscht beziehungsweise durch Neues ersetzt wird in der Regel nur das, was sich gar nicht mehr erhalten l\u00e4sst.</p>\n<blockquote><p>&#8220;Holz ist der\u00a0sch\u00f6nste Werkstoff, den die Natur je geschaffen hat.&#8221;</p></blockquote>\n<h2>Welche Rolle spielt Holz f\u00fcr einen Restaurator?</h2>\n<p>Naturgem\u00e4\u00df geh\u00f6rt Holz zu den wichtigsten Baustoffen f\u00fcr einen Restaurator, da in alten Geb\u00e4uden Kunststoffe noch nicht vorkamen. In der Regel handelt es sich dabei um einheimische H\u00f6lzer wie Eiche, L\u00e4rche oder Kiefer. Tropenh\u00f6lzer finden sich entsprechend kaum in alten H\u00e4usern. Abgesehen davon sind sie, so Michael H\u00fcndgen, aufgrund ihrer h\u00e4ufig unsicheren Herkunft und der langen Transportwege richtiggehend verp\u00f6nt unter Restauratoren. Denn das eint viele unter ihnen: ein \u00f6kologisches Bewusstsein und eine ressourcenschonende Herangehensweise an ihre Arbeit. F\u00fcr \u00d6kologie, Ressourcenschonung und Klimaschutz steht Holz als nachwachsender, CO2-neutraler Baustoff wie kein anderer. Au\u00dferdem ist es laut Michael H\u00fcndgen &#8220;der sch\u00f6nste Werkstoff, den die Natur je geschaffen hat.&#8221;</p>\n<blockquote><p>&#8220;Holz ist die Zukunft.&#8221;</p></blockquote>\n<p>Im Sinne der Nachhaltigkeit &#8211; aber auch, um Bauteile m\u00f6glichst originalgetreu aufzuarbeiten &#8211; setzen Restauratoren zudem h\u00e4ufig auf Altholz, das zum Beispiel aus H\u00e4usern stammt, die abgerissen werden mussten. Das k\u00f6nnen Fu\u00dfbodendielen sein, Fensterholz, Balken oder altes M\u00f6belholz. Auch neue M\u00f6bel aus Altholz fertigen viele Restauratoren.</p>\n<p>Grunds\u00e4tzlich gilt die Leidenschaft und Liebe von Restauratoren nat\u00fcrlich dem Alten. Die Entwicklung bei Neubauten sieht Michael H\u00fcndgen dennoch sehr positiv: Dass ein regelrechter Holzhaus-Boom entstanden ist und Holz auch in anderen Bereichen neuer H\u00e4user wieder verst\u00e4rkt zum Einsatz kommt, sind f\u00fcr ihn ein richtiger und wichtiger Trend. &#8220;Holz ist die Zukunft&#8221;, so Michael H\u00fcndgen.</p>\n<p>&nbsp;</p>\n<div class="video-container-wrapper">\n<div class="video-container"><iframe src="https://www.youtube.com/embed/PiGaazRU_uE?rel=0" width="560" height="315" frameborder="0" allowfullscreen="allowfullscreen"></iframe></div>\n</div>\n<p>&nbsp;</p>\n<p>Im Video beschreibt Michael H\u00fcndgen ausf\u00fchrlich, womit er in seiner t\u00e4glichen Arbeit zu tun hat. Dabei geht er auch darauf ein, wie bei einem denkmalgesch\u00fctzten Haus der Prozess eigentlich abl\u00e4uft, bis entschieden wird, ob ein Bauteil restauriert werden kann oder durch ein neues ersetzt werden muss.</p>\n<p><em>Beitragsbild von\u00a0<a href="https://unsplash.com/@ivybarn?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Ivy Barn</a>; Bild im Text von\u00a0<a href="https://unsplash.com/@anniespratt?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Annie Spratt</a>\u00a0(beides via\u00a0<a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>)</em></p>\n<p>[text-with-link link-text=&#8221;Jetzt lesen&#8221; link-url=&#8221;https://www.sorpetaler.de/hubert/fensterratgeber/denkmalschutz-was-es-bei-holzfenstern-zu-beachten-gilt/&#8221; image=&#8221;https://www.sorpetaler.de/wp-content/uploads/2020/07/holzfenster-denkmalschutz-vorgaben.jpg&#8221;] Wann m\u00fcssen Fenster in denkmalgesch\u00fctzten Geb\u00e4uden ausgetauscht werden? Wann restauriert? Welche Vorgaben gibt es in Bezug auf die W\u00e4rmed\u00e4mmwerte? Und wie kann man sich das f\u00f6rdern lassen? In unserem Artikel &#8220;Denkmalschutz: Was es bei Holzfenstern zu beachten gilt&#8221; liefern wir Antworten.[/text-with-link]</p>\n',
        protected: false,
      },
      excerpt: {
        raw:
          'Welche Aufgaben \u00fcbernimmt ein Restaurator? Welche Rolle spielt Holz dabei? Und warum ist es der "sch\u00f6nste Werkstoff, den die Natur je geschaffen hat"? Dar\u00fcber sprechen wir im Video mit dem Restaurator und Denkmalpfleger Michael H\u00fcndgen.',
        rendered:
          "Welche Aufgaben \u00fcbernimmt ein Restaurator? Welche Rolle spielt Holz dabei? Und warum ist es der &#8220;sch\u00f6nste Werkstoff, den die Natur je geschaffen hat&#8221;? Dar\u00fcber sprechen wir im Video mit dem Restaurator und Denkmalpfleger Michael H\u00fcndgen.",
        protected: false,
      },
      author: 7,
      featured_media: 11938,
      comment_status: "closed",
      ping_status: "closed",
      sticky: false,
      template: "",
      format: "standard",
      meta: [],
      categories: [90],
      tags: [],
      _links: {
        self: [{ href: "https://www.sorpetaler.de/wp-json/wp/v2/posts/11928" }],
        collection: [{ href: "https://www.sorpetaler.de/wp-json/wp/v2/posts" }],
        about: [{ href: "https://www.sorpetaler.de/wp-json/wp/v2/types/post" }],
        author: [
          {
            embeddable: true,
            href: "https://www.sorpetaler.de/wp-json/wp/v2/users/7",
          },
        ],
        replies: [
          {
            embeddable: true,
            href: "https://www.sorpetaler.de/wp-json/wp/v2/comments?post=11928",
          },
        ],
        "version-history": [
          {
            href:
              "https://www.sorpetaler.de/wp-json/wp/v2/posts/11928/revisions",
          },
        ],
        "wp:featuredmedia": [
          {
            embeddable: true,
            href: "https://www.sorpetaler.de/wp-json/wp/v2/media/11938",
          },
        ],
        "wp:attachment": [
          {
            href: "https://www.sorpetaler.de/wp-json/wp/v2/media?parent=11928",
          },
        ],
        "wp:term": [
          {
            taxonomy: "category",
            embeddable: true,
            href:
              "https://www.sorpetaler.de/wp-json/wp/v2/categories?post=11928",
          },
          {
            taxonomy: "post_tag",
            embeddable: true,
            href: "https://www.sorpetaler.de/wp-json/wp/v2/tags?post=11928",
          },
        ],
        curies: [
          { name: "wp", href: "https://api.w.org/{rel}", templated: true },
        ],
      },
    },
  ],
  categories: [
    {
      id: 90,
      count: 64,
      description: "",
      link: "https://www.sorpetaler.de/hubert/category/der-werkstoff-holz/",
      name: "Der Werkstoff Holz",
      slug: "der-werkstoff-holz",
      taxonomy: "category",
      parent: 0,
      meta: [],
      _links: {
        self: [
          { href: "https://www.sorpetaler.de/wp-json/wp/v2/categories/90" },
        ],
        collection: [
          { href: "https://www.sorpetaler.de/wp-json/wp/v2/categories" },
        ],
        about: [
          {
            href: "https://www.sorpetaler.de/wp-json/wp/v2/taxonomies/category",
          },
        ],
        "wp:post_type": [
          {
            href: "https://www.sorpetaler.de/wp-json/wp/v2/posts?categories=90",
          },
        ],
        curies: [
          { name: "wp", href: "https://api.w.org/{rel}", templated: true },
        ],
      },
    },
  ],
  users: [
    {
      id: 7,
      username: "sandra",
      name: "Sandra Stein",
      first_name: "Sandra",
      last_name: "Stein",
      email: "sandra.stein86@gmail.com",
      url: "",
      description:
        "Sandra ist hauptberuflich Digital Marketing Managerin und besch\u00e4ftigt sich seit vielen Jahren mit den neuesten Trends im Internet. Seit 2016 arbeitet sie in der Baubranche. Ihr besonderes Interesse gilt dabei dem Thema nachhaltig Bauen und Leben. Weil sie so gerne spricht, ist sie unsere Hauptinterviewf\u00fchrerin.",
      link: "https://www.sorpetaler.de/hubert/author/sandra/",
      locale: "de_DE",
      nickname: "sandra",
      slug: "sandra",
      roles: ["administrator"],
      registered_date: "2016-11-20T21:34:46+00:00",
      capabilities: {
        switch_themes: true,
        edit_themes: true,
        activate_plugins: true,
        edit_plugins: true,
        edit_users: true,
        edit_files: true,
        manage_options: true,
        moderate_comments: true,
        manage_categories: true,
        manage_links: true,
        upload_files: true,
        import: true,
        unfiltered_html: true,
        edit_posts: true,
        edit_others_posts: true,
        edit_published_posts: true,
        publish_posts: true,
        edit_pages: true,
        read: true,
        level_10: true,
        level_9: true,
        level_8: true,
        level_7: true,
        level_6: true,
        level_5: true,
        level_4: true,
        level_3: true,
        level_2: true,
        level_1: true,
        level_0: true,
        edit_others_pages: true,
        edit_published_pages: true,
        publish_pages: true,
        delete_pages: true,
        delete_others_pages: true,
        delete_published_pages: true,
        delete_posts: true,
        delete_others_posts: true,
        delete_published_posts: true,
        delete_private_posts: true,
        edit_private_posts: true,
        read_private_posts: true,
        delete_private_pages: true,
        edit_private_pages: true,
        read_private_pages: true,
        delete_users: true,
        create_users: true,
        unfiltered_upload: true,
        edit_dashboard: true,
        update_plugins: true,
        delete_plugins: true,
        install_plugins: true,
        update_themes: true,
        install_themes: true,
        update_core: true,
        list_users: true,
        remove_users: true,
        promote_users: true,
        edit_theme_options: true,
        delete_themes: true,
        export: true,
        wpseo_bulk_edit: true,
        manage_ratings: true,
        wpseo_manage_options: true,
        administrator: true,
      },
      extra_capabilities: { administrator: true },
      avatar_urls: {
        24: "https://secure.gravatar.com/avatar/1bd475830113d79a6d0f79eac7fdcdc4?s=24&r=g",
        48: "https://secure.gravatar.com/avatar/1bd475830113d79a6d0f79eac7fdcdc4?s=48&r=g",
        96: "https://secure.gravatar.com/avatar/1bd475830113d79a6d0f79eac7fdcdc4?s=96&r=g",
      },
      meta: [],
      _links: {
        self: [{ href: "https://www.sorpetaler.de/wp-json/wp/v2/users/7" }],
        collection: [{ href: "https://www.sorpetaler.de/wp-json/wp/v2/users" }],
      },
    },
  ],
  media: [
    {
      id: 11938,
      date: "2020-07-06T12:02:46",
      date_gmt: "2020-07-06T10:02:46",
      guid: {
        rendered:
          "https://www.sorpetaler.de/wp-content/uploads/2020/07/alte-haeuser-restaurieren.jpg",
        raw:
          "https://www.sorpetaler.de/wp-content/uploads/2020/07/alte-haeuser-restaurieren.jpg",
      },
      modified: "2020-07-06T12:03:47",
      modified_gmt: "2020-07-06T10:03:47",
      slug: "alte-haeuser-restaurieren",
      status: "inherit",
      type: "attachment",
      link:
        "https://www.sorpetaler.de/hubert/der-werkstoff-holz/was-macht-ein-restaurator/attachment/alte-haeuser-restaurieren/",
      title: {
        raw: "Alte-Haeuser-restaurieren",
        rendered: "Alte-Haeuser-restaurieren",
      },
      author: 7,
      comment_status: "closed",
      ping_status: "closed",
      template: "",
      meta: [],
      description: {
        raw: "",
        rendered:
          '<p class="attachment"><a href=\'https://www.sorpetaler.de/wp-content/uploads/2020/07/alte-haeuser-restaurieren.jpg\'><img width="300" height="199" src="https://www.sorpetaler.de/wp-content/uploads/2020/07/alte-haeuser-restaurieren-300x199.jpg" class="attachment-medium size-medium" alt="Alte H\u00e4user in einem idyllischen Ort in Gro\u00dfbritannien" srcset="https://www.sorpetaler.de/wp-content/uploads/2020/07/alte-haeuser-restaurieren-300x199.jpg 300w, https://www.sorpetaler.de/wp-content/uploads/2020/07/alte-haeuser-restaurieren-768x510.jpg 768w, https://www.sorpetaler.de/wp-content/uploads/2020/07/alte-haeuser-restaurieren-1024x680.jpg 1024w, https://www.sorpetaler.de/wp-content/uploads/2020/07/alte-haeuser-restaurieren.jpg 1600w" sizes="(max-width: 300px) 100vw, 300px" /></a></p>\n',
      },
      caption: { raw: "", rendered: "" },
      alt_text:
        "Alte H\u00e4user in einem idyllischen Ort in Gro\u00dfbritannien",
      media_type: "image",
      mime_type: "image/jpeg",
      media_details: {
        width: 1600,
        height: 1062,
        file: "2020/07/alte-haeuser-restaurieren.jpg",
        sizes: {
          thumbnail: {
            file: "alte-haeuser-restaurieren-150x150.jpg",
            width: 150,
            height: 150,
            mime_type: "image/jpeg",
            source_url:
              "https://www.sorpetaler.de/wp-content/uploads/2020/07/alte-haeuser-restaurieren-150x150.jpg",
          },
          medium: {
            file: "alte-haeuser-restaurieren-300x199.jpg",
            width: 300,
            height: 199,
            mime_type: "image/jpeg",
            source_url:
              "https://www.sorpetaler.de/wp-content/uploads/2020/07/alte-haeuser-restaurieren-300x199.jpg",
          },
          medium_large: {
            file: "alte-haeuser-restaurieren-768x510.jpg",
            width: 768,
            height: 510,
            mime_type: "image/jpeg",
            source_url:
              "https://www.sorpetaler.de/wp-content/uploads/2020/07/alte-haeuser-restaurieren-768x510.jpg",
          },
          large: {
            file: "alte-haeuser-restaurieren-1024x680.jpg",
            width: 1024,
            height: 680,
            mime_type: "image/jpeg",
            source_url:
              "https://www.sorpetaler.de/wp-content/uploads/2020/07/alte-haeuser-restaurieren-1024x680.jpg",
          },
          employee: {
            file: "alte-haeuser-restaurieren-380x380.jpg",
            width: 380,
            height: 380,
            mime_type: "image/jpeg",
            source_url:
              "https://www.sorpetaler.de/wp-content/uploads/2020/07/alte-haeuser-restaurieren-380x380.jpg",
          },
          gallery: {
            file: "alte-haeuser-restaurieren-660x525.jpg",
            width: 660,
            height: 525,
            mime_type: "image/jpeg",
            source_url:
              "https://www.sorpetaler.de/wp-content/uploads/2020/07/alte-haeuser-restaurieren-660x525.jpg",
          },
          slide: {
            file: "alte-haeuser-restaurieren-1600x600.jpg",
            width: 1600,
            height: 600,
            mime_type: "image/jpeg",
            source_url:
              "https://www.sorpetaler.de/wp-content/uploads/2020/07/alte-haeuser-restaurieren-1600x600.jpg",
          },
          "alm-thumbnail": {
            file: "alte-haeuser-restaurieren-150x150.jpg",
            width: 150,
            height: 150,
            mime_type: "image/jpeg",
            source_url:
              "https://www.sorpetaler.de/wp-content/uploads/2020/07/alte-haeuser-restaurieren-150x150.jpg",
          },
          full: {
            file: "alte-haeuser-restaurieren.jpg",
            width: 1600,
            height: 1062,
            mime_type: "image/jpeg",
            source_url:
              "https://www.sorpetaler.de/wp-content/uploads/2020/07/alte-haeuser-restaurieren.jpg",
          },
        },
        image_meta: {
          aperture: "0",
          credit: "",
          camera: "",
          caption: "",
          created_timestamp: "0",
          copyright: "",
          focal_length: "0",
          iso: "0",
          shutter_speed: "0",
          title: "",
          orientation: "1",
          keywords: [],
        },
      },
      post: 11928,
      source_url:
        "https://www.sorpetaler.de/wp-content/uploads/2020/07/alte-haeuser-restaurieren.jpg",
      _links: {
        self: [{ href: "https://www.sorpetaler.de/wp-json/wp/v2/media/11938" }],
        collection: [{ href: "https://www.sorpetaler.de/wp-json/wp/v2/media" }],
        about: [
          { href: "https://www.sorpetaler.de/wp-json/wp/v2/types/attachment" },
        ],
        author: [
          {
            embeddable: true,
            href: "https://www.sorpetaler.de/wp-json/wp/v2/users/7",
          },
        ],
        replies: [
          {
            embeddable: true,
            href: "https://www.sorpetaler.de/wp-json/wp/v2/comments?post=11938",
          },
        ],
      },
    },
  ],
  linkBlocks: [],
}

/**
 * logger function
 * @param message
 * @param type
 */
function log(message, type) {
  if (type) {
    return console.log(`${type} created :`, message, "✓")
  }
  console.log(logSeparator, message, logSeparator)
}

/**
 * fetch data from given url
 * @param url
 * @param type
 * @returns {Promise<{data: any, success: boolean, type: *} | {success: boolean}>}
 */
function fetchData(url, type) {
  return httpClient
    .get(url)
    .then(response => ({ success: true, type, data: response.data }))
    .catch(() => ({ success: false }))
}

function getAllData(urls, type) {
  return Promise.all(urls.map(url => fetchData(url, type)))
}

/**
 * Creating all necessary endpoints for wordpress data
 * @returns {{categories: [], media: [], posts: [], users: []}}
 */
function createWordPressPromises() {
  const promises = { posts: [], categories: [], users: [], media: [] }

  for (const [k, v] of Object.entries(wordPressPagesLengthByEndpointName)) {
    for (let i = 1; i <= v; i++) {
      promises[k].push(`${k}?page=${i}&per_page=100&context=edit`)
    }
  }

  return promises
}

/**
 * merges all the returned data from responses
 * @param responses
 * @returns {*}
 */
const mergeResponses = responses => {
  return responses.reduce((previous, current) => {
    const response = {
      ...current[0],
      data: current.reduce((p, c) => p.concat(c.data), []),
    }
    previous.push(response)
    return previous
  }, [])
}

function getPostBodyImages(post) {
  const bodyImages = []

  if (post.featured_media > 0) {
    const medias = wordPressData.media

    const mediaObj = medias.filter(media => media.id === post.featured_media)[0]

    bodyImages.push({
      id: mediaObj.id,
      postId: mediaObj.post,
      link: mediaObj.source_url,
      description: mediaObj.alt_text,
      title: mediaObj.alt_text,
      featured: true,
    })
  }

  while ((foundImage = BODY_IMAGE_REGEX.exec(post.content.raw))) {
    let alt = post.id

    if (foundImage[0].includes('alt="')) {
      alt = foundImage[0].split('alt="')[1].split('"')[0] || ""
    }

    bodyImages.push({
      postId: post.id,
      link: foundImage[1],
      description: alt,
      title: alt,
      featured: false,
    })
  }
  return bodyImages
}

let linkBlockCounter = 0

/**
 * fetch, filter and save the fetched data in wordPressData object
 * @returns {Promise<void>}
 */
async function bootstrapDataForMigration() {
  const promisesByKey = createWordPressPromises()

  const promises = []

  for (const [k, v] of Object.entries(promisesByKey)) {
    promises.push(getAllData(v, k))
  }

  try {
    /*
    const responses = await Promise.all(promises)

    mergeResponses(responses).forEach(response => {
      if (response.type === "media") {
        wordPressData[response.type] = response.data.filter(media =>
          media.link.includes("hubert")
        )
      } else {
        wordPressData[response.type] = response.data
      }
    })

    const mediaIds = wordPressData.media.map(media => media.id)

    wordPressData.posts = wordPressData.posts.filter(post =>
      mediaIds.includes(post.featured_media)
    )
    */

    wordPressData.posts = wordPressData.posts.map(post => {
      const parser = ShortcodeParser()

      parser.add("float-left", function (opts, content) {
        return content
      })

      parser.add("highlight", function (opts, content) {
        return `<code>${content}</code>`
      })

      parser.add("text-with-link", function (opts, content) {
        const linkBlock = {
          id: `${post.id}-${linkBlockCounter}`,
          postId: post.id,
          linkImage: opts.image,
          linkUrl: opts["link-url"].replace(
            "https://www.sorpetaler.de/hubert",
            ""
          ),
          linkText: opts["link-text"] || opts[" link-text"],
          content,
        }

        linkBlockCounter += 1

        wordPressData.linkBlocks.push(linkBlock)

        return `link-block ${linkBlock.id} `
      })

      const content = parser.parse(post.content.raw)

      return { ...post, content: { raw: content } }
    })
  } catch (e) {
    console.log(e)
  }
}

function createAssetFields(url) {
  const fileName = url.split("/").pop()

  return {
    title: {
      "en-US": fileName,
    },
    description: {
      "en-US": "",
    },
    file: {
      "en-US": {
        fileName,
        contentType: "image/jpeg",
        upload: encodeURI(url),
      },
    },
  }
}

function createAuthorFields(author) {
  return {
    fullName: {
      "en-US": author.name,
    },
    slug: {
      "en-US": author.slug,
    },
    details: {
      "en-US": author.description,
    },
    picture: {
      "en-US": {
        sys: {
          type: "Link",
          linkType: "Asset",
          id: contentfulDataByTypeKey.avatarAssets[author.id],
        },
      },
    },
  }
}

function createCategoryFields(category) {
  return {
    title: { "en-US": category.name, "de-DE": category.name },
    slug: { "en-US": category.slug, "de-DE": category.slug },
  }
}

async function createLinkBlockFields(linkBlock, contentfulAssetId) {
  const markdownText = turndownService.turndown(linkBlock.content)
  const linkBlockText = await richTextFromMarkdown(markdownText)

  return {
    title: { "en-US": linkBlock.linkUrl },
    image: {
      "en-US": {
        sys: {
          type: "Link",
          linkType: "Asset",
          id: contentfulAssetId,
        },
      },
    },
    linkText: { "en-US": linkBlock.linkText },
    linkUrl: { "en-US": linkBlock.linkUrl },
    text: { "en-US": linkBlockText },
  }
}

async function createContentfulLinkBlocksAssets(environment) {
  const promises = []

  wordPressData.linkBlocks.forEach((linkBlock, index) => {
    if (linkBlock.linkImage) {
      const promise = new Promise(resolve => {
        let linkBlockAsset
        setTimeout(async () => {
          const fields = createAssetFields(linkBlock.linkImage)

          try {
            linkBlockAsset = await environment.createAsset({ fields })
            linkBlockAsset = await linkBlockAsset.processForAllLocales()
            linkBlockAsset = await linkBlockAsset.publish()

            contentfulDataByTypeKey.linkBlockAssets[index] =
              linkBlockAsset.sys.id
            log(linkBlockAsset.fields.file["en-US"].fileName, "LinkBlock asset")
          } catch (error) {
            throw Error(error)
          }

          resolve(linkBlockAsset)
        }, 1000 + 5000 * index)
      })

      promises.push(promise)
    }
  })

  return Promise.all(promises)
}

async function createContentfulAvatarsAssets(environment) {
  const promises = wordPressData.users.map((user, index) => {
    return new Promise(resolve => {
      let authorAsset
      setTimeout(async () => {
        const fields = createAssetFields(user.avatar_urls["96"])

        try {
          authorAsset = await environment.createAsset({ fields })
          authorAsset = await authorAsset.processForAllLocales()
          authorAsset = await authorAsset.publish()

          contentfulDataByTypeKey.avatarAssets[user.id] = authorAsset.sys.id
          log(authorAsset.fields.file["en-US"].fileName, "Avatar asset")
        } catch (error) {
          throw Error(error)
        }

        resolve(authorAsset)
      }, 1000 + 5000 * index)
    })
  })

  return Promise.all(promises)
}

async function createContentfulAuthors(environment) {
  const promises = wordPressData.users.map((user, index) => {
    return new Promise(resolve => {
      let contentfulAuthor
      setTimeout(async () => {
        const fields = createAuthorFields(user)

        try {
          contentfulAuthor = await environment.createEntry("author", { fields })
          contentfulAuthor = await contentfulAuthor.publish()

          contentfulDataByTypeKey.authors[user.id] = contentfulAuthor.sys.id
          log(contentfulAuthor.fields.slug["en-US"], "Author")
        } catch (error) {
          throw Error(error)
        }

        resolve(contentfulAuthor)
      }, 1000 + 5000 * index)
    })
  })

  return Promise.all(promises)
}

async function createContentfulCategories(environment) {
  const promises = wordPressData.categories.map((category, index) => {
    return new Promise(resolve => {
      let contentfulCategory
      setTimeout(async () => {
        const fields = createCategoryFields(category)

        try {
          contentfulCategory = await environment.createEntry("category", {
            fields,
          })
          contentfulCategory = await contentfulCategory.publish()

          contentfulDataByTypeKey.categories[category.id] =
            contentfulCategory.sys.id
          log(contentfulCategory.fields.slug["en-US"], "Category")
        } catch (error) {
          throw Error(error)
        }

        resolve(contentfulCategory)
      }, 1000 + 5000 * index)
    })
  })

  return Promise.all(promises)
}

async function createContentfulAssets(environment) {
  const contentfulAssets = []

  wordPressData.posts.forEach(post => {
    for (const [, contentImage] of getPostBodyImages(post).entries()) {
      const assetFields = createAssetFields(contentImage.link)
      contentfulAssets.push(assetFields)
    }
  })

  const promises = contentfulAssets.map(
    (asset, index) =>
      new Promise(async resolve => {
        let contentfulAsset
        setTimeout(async () => {
          try {
            contentfulAsset = await environment.createAsset({ fields: asset })
            contentfulAsset = await contentfulAsset.processForAllLocales()
            contentfulAsset = await contentfulAsset.publish()

            log(contentfulAsset.fields.file["en-US"].fileName, "Asset")

            const newAsset = {
              id: contentfulAsset.sys.id,
              fileName: contentfulAsset.fields.file["en-US"].fileName,
            }

            contentfulDataByTypeKey.assets[asset.id] = newAsset
            contentfulDataByTypeKey.assetsArray.push(newAsset.fileName)
          } catch (error) {
            throw Error(error)
          }

          resolve(contentfulAsset)
        }, 1000 + 5000 * index)
      })
  )

  return Promise.all(promises)
}

function updateContent(content) {
  return content.map(c => {
    console.log("Value: ", c.value)
    if (c.content) {
      return { ...c, content: updateContent(c.content) }
    } else if (
      typeof c.value === "string" &&
      c.value.trim().startsWith("link-block")
    ) {
      return {
        nodeType: "embedded-entry-inline", //"embedded-entry-block",
        content: [],
        data: {
          target: {
            sys: {
              id:
                contentfulDataByTypeKey.linkBlocks[
                  c.value.trim().replace("link-block ", "")
                ], // Find the entry with this ID in the includes["Entry"] object below
              type: "Link",
              linkType: "Entry",
            },
          },
        },
      }
    } else {
      return c
    }
  })
}

async function createContentfulArticles(environment) {
  const promises = []

  for (const [index, post] of wordPressData.posts.entries()) {
    const markdownContent = turndownService.turndown(post.content.raw)
    const articleContent = await richTextFromMarkdown(markdownContent)

    articleContent.content = updateContent(articleContent.content)

    const fields = {
      title: {
        "en-US": post.title.raw,
      },
      slug: {
        "en-US": post.slug,
      },
      introduction: {
        "en-US": post.excerpt.raw,
      },
      content: {
        "en-US": articleContent,
      },
      category: {
        "en-US": {
          sys: {
            type: "Category",
            linkType: "Entry",
            id: contentfulDataByTypeKey.categories[post.categories[0]],
          },
        },
      },
      author: {
        "en-US": {
          sys: {
            type: "Author",
            linkType: "Entry",
            id: contentfulDataByTypeKey.authors[post.author],
          },
        },
      },
      featuredImage: {
        "en-US": {
          sys: {
            type: "Link",
            linkType: "Asset",
            id: contentfulDataByTypeKey.assets[post.featuredImage].id,
          },
        },
      },
    }

    const promise = new Promise(resolve => {
      let contentfulArticle
      setTimeout(async () => {
        try {
          contentfulArticle = await environment.createEntry("article", {
            fields,
          })
          contentfulArticle = await contentfulArticle.publish()

          console.log(contentfulArticle.fields.slug["en-US"], "Article")
        } catch (error) {
          throw Error(error)
        }

        resolve(contentfulArticle)
      }, 1000 + 5000 * index)
    })

    promises.push(promise)
  }

  return Promise.all(promises)
}

async function createContentfulLinkBlocks(environment) {
  const promises = []

  wordPressData.linkBlocks.forEach((linkBlock, index) => {
    const promise = new Promise(resolve => {
      let contentfulLinkBlock
      setTimeout(async () => {
        const fields = await createLinkBlockFields(
          linkBlock,
          contentfulDataByTypeKey.linkBlockAssets[index]
        )

        try {
          contentfulLinkBlock = await environment.createEntry("linkBlock", {
            fields,
          })
          contentfulLinkBlock = await contentfulLinkBlock.publish()

          log(contentfulLinkBlock.fields.title["en-US"], "Link Block")

          contentfulDataByTypeKey.linkBlocks[linkBlock.id] =
            contentfulLinkBlock.sys.id
        } catch (error) {
          throw Error(error)
        }

        resolve(contentfulLinkBlock)
      }, 1000 + 5000 * index)
    })
    promises.push(promise)
  })

  return Promise.all(promises)
}

async function migrateContent() {
  try {
    log("Fetching data from WordPress")
    await bootstrapDataForMigration()
    log("WordPress Data fetched ✓")

    const contentfulSpace = await ctfClient.getSpace(ctfData.spaceId)
    const environment = await contentfulSpace.getEnvironment(
      ctfData.environment
    )

    log("Creating contentful link blocks assets")
    await createContentfulLinkBlocksAssets(environment)
    log("Contentful link blocks assets created✓")

    log("Creating contentful link blocks")
    await createContentfulLinkBlocks(environment)
    log("Contentful link blocks created✓")

    log("Creating contentful authors avatars")
    await createContentfulAvatarsAssets(environment)
    log("Contentful authors avatars created✓")

    log("Creating contentful authors")
    await createContentfulAuthors(environment)
    log("Contentful authors created ✓")

    log("Creating contentful categories")
    await createContentfulCategories(environment)
    log("Contentful categories created ✓")

    log("Creating contentful assets")
    await createContentfulAssets(environment)
    log("Contentful assets created ✓")

    log("Creating contentful articles")
    await createContentfulArticles(environment)
    log("Contentful articles created ✓")
    console.log("Done ✓✓✓")
  } catch (e) {
    console.log(e)
  }
}

migrateContent()
