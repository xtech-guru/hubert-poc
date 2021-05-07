const contentful = require("contentful-management")
const axios = require("axios")
const TurndownService = require("turndown")

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
    const url =
      contentfulDataByTypeKey.assetsByUrl[node.getAttribute("src")].url
    const alt = node.getAttribute("alt")

    return `\n![${alt}](${url})\n`
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
  assetsByUrl: {},
  categories: {},
  authors: {},
}

/**
 * fetch data from WordPress endpoints
 * @type {{categories: {}, media: {}, posts: {}, users: {}}}
 */
let wordPressData = {
  posts: {},
  categories: {},
  users: {},
  media: {},
  linkBlocks: [],
}

/*
let wordPressData = {
  posts: [
    {
      id: 12551,
      date: "2021-04-12T13:51:25",
      date_gmt: "2021-04-12T11:51:25",
      guid: {
        rendered: "https://www.sorpetaler.de/?p=12551",
        raw: "https://www.sorpetaler.de/?p=12551",
      },
      modified: "2021-04-12T16:45:29",
      modified_gmt: "2021-04-12T14:45:29",
      password: "",
      slug: "e-book-schoenste-holzhaeuser-2020",
      status: "publish",
      type: "post",
      link:
        "https://www.sorpetaler.de/hubert/nachhaltig-bauen-und-sanieren/e-book-schoenste-holzhaeuser-2020/",
      title: {
        raw: "E-Book: Die schönsten Holzhäuser 2020",
        rendered: "E-Book: Die schönsten Holzhäuser 2020",
      },
      content: {
        raw:
          'Im letzten Jahr hat <a href="http://www.sorpetaler.de">Sorpetaler Fensterbau</a> in einem Wettbewerb nach den schönsten Holzhäusern 2020 gesucht. Drei Gewinner wurden bereits gekürt. Jetzt ist aus den interessantesten Einsendungen (darunter natürlich auch die Gewinner) ein neues E-Book entstanden. Darin enthalten sind sowohl Häuser, die noch in Planung sind, wie auch bereits fertiggestellte Häuser. Sie alle verdeutlichen, wie vielfältig und flexibel der Werkstoff Holz ist. Und welches Potenzial in ihm steckt.\r\n<h2>Modular und nachhaltig</h2>\r\nInsbesondere bei den Häusern, die sich noch in Planung befinden zeigt sich: Flexible Lösungen sind der neue Standard.[float-left]<a href="https://www.sorpetaler.de/wp-content/uploads/2021/03/sorpetaler_e-book_die-schoensten-holzhaeuser-2020.pdf" target="_blank" rel="noopener"><img class="alignnone" title="E-Book herunterladen" src="https://www.sorpetaler.de/wp-content/uploads/2021/04/sorpetaler_e-book-cover_die-schoensten-holzhaeuser-2020.jpg" alt="Cover des E-Books Die schönsten Holzhäuser 2020" width="400" height="677" /></a>[/float-left] So bietet das modulare Holzhaus von der Architektin Ines Maria Fiala ein Grundmodul mit etwa 70m², das je nach Lebensphase durch zwei Erweiterungsmodule vergrößert werden kann - etwa, wenn Nachwuchs kommt. Die Architektin hat sich dabei die Idee der <em>tiny houses </em>als Vorbild genommen. "Das Konzept des modularen Holzhauses gründet auf der gesellschaftlichen Beobachtung, dass Menschen einen bestimmten Bedarf an Platz benötigen, der sich im Laufe ihres Lebens aufgrund ihrer aktuellen Lebenslage ändert. (...) Der Platzbedarf wird allerdings nicht auf ein Minimum, sondern durch einen praktischen Grundriss auf ein Mindestmaß an Wohnqualität gebracht."\r\n<blockquote>"Am Minimum Wohnen, aber intensiver leben."</blockquote>\r\nÄhnlichen drücken es die Architektinnen Sofia Salviani de Boseck und Gabriele Kruse aus: "Am Minimum Wohnen, aber intensiver leben" - diesem Motto folgt ihr Entwurf des BauMHauses. Das Haus setzt sich aus verschiedenen Modulen zusammen, in deren Mitte sich ein Baum befindet. Das BauMHaus ist Teil der Reihe <em>Modul+</em>, die die Architektinnen insbesondere für Projekte in Afrika und Lateinamerika entwickelt haben. Dabei möchten sie nicht nur hohen Wohnkomfort auf kleinem Raum ermöglichen, sondern die Menschen vor Ort für nachhaltiges und ökologisches Bauen sensibilisieren.\r\n<h2>Wohnkonzepte der Zukunft</h2>\r\nBei der Bewertung der Einsendungen spielte auch die Frage eine Rolle, wie wir in der Zukunft leben werden. [float-left]<img class="alignnone" src="https://www.sorpetaler.de/wp-content/uploads/2021/04/schoenste-holzhaeuser_vis-a-vis_luna-productions.jpg" alt="Das schönste Holzhaus 2020: Wohnhaus vis-à-vis von luna productions aus der Schweiz" width="550" height="677" />[/float-left]Besonders hervorgetan hat sich dabei das Wohnhaus <em>vis-à-vis</em>, das mit seinem intelligenten Konzept den ersten Platz errang. Den Architekt*innen Nadja und Lukas Frei ist es gelungen eine Brücke zu schlagen zwischen modernen Wohnformen und den baulichen Traditionen des Schweizer Dorfes, in welchem das Haus steht.\r\n\r\nDer Neubau in Mischbauweise (Massiv + Holz) beherbergt mehrere Wohnungen, die sich im Inneren dank der Holzständerkonstruktion leicht an sich verändernde Bedürfnisse ihrer Bewohner*innen anpassen lassen. Architektonisch fügt sich das Haus dennoch geschmeidig in die gewachsenen Strukturen ein und bildet mit den benachbarten Häusern und der gegenüberliegenden Schreinerei einen gemeinsamen Hof, der als halb-öffentlicher Bereich ein Begegnungsort für die ganze Nachbarschaft ist.\r\n\r\nBegegnungsorte und gemeinschaftliches Leben spielten bei der Planung des Wohnquartiers <em>Auf dem Rode</em>  in Lippstadt ebenfalls eine große Rolle. [float-left]<img class="alignnone" src="https://www.sorpetaler.de/wp-content/uploads/2021/04/schoenste-holzhauser_auf-dem-rode_rsa-materio.jpg" alt="Einfamilienhäuser aus Holz im neuen Wohnquartier auf dem Rode in Lippstadt" width="500" height="677" />[/float-left]Das spannende Projekt hat es als Nicht-Wettbewerbs-Beitrag in das E-Book geschafft. Ausgestattet mit <a href="https://www.sorpetaler.de/fenster/holzfenster/">Sorpetaler Holzfenstern</a>, geplant vom Architekturbüro <a href="https://www.rsarchitekten.com/">rsa</a> und umgesetzt vom Sorpetaler-Partner <em><a href="https://www.materio.de/">materio</a>, </em>bietet<em> </em>das neue Viertel im Lippstädter Norden künftig ökologische Einfamilienhäuser, die vom Leben als junge Familie bis hin zum altersgerechten Wohnen vieles möglich machen. In ihrer Mitte entsteht dabei ein verkehrsberuhigter gemeinsamer Raum für das ganze Quartier - als Spielfläche für Kinder, Ort für Nachbarschaftsfeste oder Areal für Projekte wie Urban Gardening.\r\n<h2>"Holz ist ein Baustoff mit langer Tradition"</h2>\r\nDen Abschluss des neuen E-Books bildet ein Interview mit dem Architekten Joachim E. Kranendonck, der als Teil der Jury die Wettbewerbseinsendungen mit bewertet hat und gleichzeitig als Mitglied der Deutschen Gesellschaft für nachhaltiges Bauen (<a href="https://www.dgnb.de/de/index.php">DGNB</a>) ein Verfechter ökologischer Bauweise ist. Im Gespräch zeichnet er ein positives Bild der Entwicklungen im Holzbau und hebt die Vorteile des Werkstoffes Holz hervor.\r\n<blockquote>"Kaum ein anderer Baustoff ist so flexibel und variantenreich einzusetzen."</blockquote>\r\n"Holz ist ein Baustoff mit langer Tradition und zugleich hochmodern. Er verbindet hervorragende technische Eigenschaften mit vielfältigen Gestaltungsmöglichkeiten. Kaum ein anderer Baustoff ist so flexibel und variantenreich einzusetzen. Der Baustoff bietet genügend Entwicklungsmöglichkeiten für neue Ideen mit denen Effizienz, Nachhaltigkeit, Funktionalität und Qualität in der Architektur erreicht werden können. Und das mit einem ganz entscheidenden Merkmal: Holz wächst immer wieder nach. Die Wettbewerbsbeiträge zeigen vorbildlich die Verwendung des Baustoffes und sind ein gutes Beispiel dafür, dass sich die Gestaltungsqualität mit Holz auf höchstem Niveau erreichen lässt."\r\n\r\nDas ganze E-Book könnt ihr über diesen Link herunterladen: <a href="https://www.sorpetaler.de/wp-content/uploads/2021/03/sorpetaler_e-book_die-schoensten-holzhaeuser-2020.pdf">E-Book <em>Die schönsten Holzhäuser 2020</em></a>\r\n\r\n<em>Bildnachweise: Beitragsbild "Schwarzwaldpanorama" von Partner &amp; Partner Architekten - Foto Jan Rottler; Bilder im Text: (1) Wohnhaus vis-à-vis von luna productions - Foto Mark Drotsky (2) Wohnquartier auf dem Rode, Lippstadt - Planung: rsa, Visualisierung: loomn</em>\r\n\r\n&nbsp;',
        protected: false,
      },
      excerpt: {
        raw:
          "Welches sind die schönsten Holzhäuser 2020? Was sind überzeugende, innovative Wohnkonzepte? Und wie stehen sie in Sachen Nachhaltigkeit da? Ein neues E-Book gibt Antworten.",
        rendered:
          "Welches sind die schönsten Holzhäuser 2020? Was sind überzeugende, innovative Wohnkonzepte? Und wie stehen sie in Sachen Nachhaltigkeit da? Ein neues E-Book gibt Antworten.",
        protected: false,
      },
      author: 7,
      featured_media: 12588,
      comment_status: "closed",
      ping_status: "closed",
      sticky: false,
      template: "",
      format: "standard",
      meta: [],
      categories: [72],
      tags: [],
      _links: {
        self: [
          {
            href: "https://www.sorpetaler.de/wp-json/wp/v2/posts/12551",
          },
        ],
        collection: [
          {
            href: "https://www.sorpetaler.de/wp-json/wp/v2/posts",
          },
        ],
        about: [
          {
            href: "https://www.sorpetaler.de/wp-json/wp/v2/types/post",
          },
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
            href: "https://www.sorpetaler.de/wp-json/wp/v2/comments?post=12551",
          },
        ],
        "version-history": [
          {
            href:
              "https://www.sorpetaler.de/wp-json/wp/v2/posts/12551/revisions",
          },
        ],
        "wp:featuredmedia": [
          {
            embeddable: true,
            href: "https://www.sorpetaler.de/wp-json/wp/v2/media/12588",
          },
        ],
        "wp:attachment": [
          {
            href: "https://www.sorpetaler.de/wp-json/wp/v2/media?parent=12551",
          },
        ],
        "wp:term": [
          {
            taxonomy: "category",
            embeddable: true,
            href:
              "https://www.sorpetaler.de/wp-json/wp/v2/categories?post=12551",
          },
          {
            taxonomy: "post_tag",
            embeddable: true,
            href: "https://www.sorpetaler.de/wp-json/wp/v2/tags?post=12551",
          },
        ],
        curies: [
          {
            name: "wp",
            href: "https://api.w.org/{rel}",
            templated: true,
          },
        ],
      },
    },
  ],
  categories: [
    {
      id: 72,
      count: 21,
      description: "",
      link:
        "https://www.sorpetaler.de/hubert/category/nachhaltig-bauen-und-sanieren/",
      name: "Nachhaltig Bauen und Sanieren",
      slug: "nachhaltig-bauen-und-sanieren",
      taxonomy: "category",
      parent: 0,
      meta: [],
      _links: {
        self: [
          {
            href: "https://www.sorpetaler.de/wp-json/wp/v2/categories/72",
          },
        ],
        collection: [
          {
            href: "https://www.sorpetaler.de/wp-json/wp/v2/categories",
          },
        ],
        about: [
          {
            href: "https://www.sorpetaler.de/wp-json/wp/v2/taxonomies/category",
          },
        ],
        "wp:post_type": [
          {
            href: "https://www.sorpetaler.de/wp-json/wp/v2/posts?categories=72",
          },
        ],
        curies: [
          {
            name: "wp",
            href: "https://api.w.org/{rel}",
            templated: true,
          },
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
      id: 12588,
      date: "2021-04-12T13:45:15",
      date_gmt: "2021-04-12T11:45:15",
      guid: {
        rendered:
          "https://www.sorpetaler.de/wp-content/uploads/2021/04/schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten.jpg",
        raw:
          "https://www.sorpetaler.de/wp-content/uploads/2021/04/schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten.jpg",
      },
      modified: "2021-04-12T13:45:41",
      modified_gmt: "2021-04-12T11:45:41",
      slug:
        "schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten",
      status: "inherit",
      type: "attachment",
      link:
        "https://www.sorpetaler.de/hubert/nachhaltig-bauen-und-sanieren/e-book-schoenste-holzhaeuser-2020/attachment/schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten/",
      title: {
        raw:
          "Schoenste-Holzhaeuser_Schwarzwaldpanorama_Partner-und-Partner-Architekten",
        rendered:
          "Schoenste-Holzhaeuser_Schwarzwaldpanorama_Partner-und-Partner-Architekten",
      },
      author: 7,
      comment_status: "closed",
      ping_status: "closed",
      template: "",
      meta: [],
      description: {
        raw: "",
        rendered:
          '<p class="attachment"><a href=\'https://www.sorpetaler.de/wp-content/uploads/2021/04/schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten.jpg\'><img width="300" height="200" src="https://www.sorpetaler.de/wp-content/uploads/2021/04/schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten-300x200.jpg" class="attachment-medium size-medium" alt="Eines der schönsten Holzhäuser 2020: Das Schwarzwaldpanorama von Partner &amp; Partner Architekten" srcset="https://www.sorpetaler.de/wp-content/uploads/2021/04/schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten-300x200.jpg 300w, https://www.sorpetaler.de/wp-content/uploads/2021/04/schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten-768x512.jpg 768w, https://www.sorpetaler.de/wp-content/uploads/2021/04/schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten-1024x683.jpg 1024w, https://www.sorpetaler.de/wp-content/uploads/2021/04/schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten.jpg 1600w" sizes="(max-width: 300px) 100vw, 300px" /></a></p>\n',
      },
      caption: {
        raw: "",
        rendered: "",
      },
      alt_text:
        "Eines der schönsten Holzhäuser 2020: Das Schwarzwaldpanorama von Partner & Partner Architekten",
      media_type: "image",
      mime_type: "image/jpeg",
      media_details: {
        width: 1600,
        height: 1067,
        file:
          "2021/04/schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten.jpg",
        sizes: {
          thumbnail: {
            file:
              "schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten-150x150.jpg",
            width: 150,
            height: 150,
            mime_type: "image/jpeg",
            source_url:
              "https://www.sorpetaler.de/wp-content/uploads/2021/04/schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten-150x150.jpg",
          },
          medium: {
            file:
              "schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten-300x200.jpg",
            width: 300,
            height: 200,
            mime_type: "image/jpeg",
            source_url:
              "https://www.sorpetaler.de/wp-content/uploads/2021/04/schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten-300x200.jpg",
          },
          medium_large: {
            file:
              "schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten-768x512.jpg",
            width: 768,
            height: 512,
            mime_type: "image/jpeg",
            source_url:
              "https://www.sorpetaler.de/wp-content/uploads/2021/04/schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten-768x512.jpg",
          },
          large: {
            file:
              "schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten-1024x683.jpg",
            width: 1024,
            height: 683,
            mime_type: "image/jpeg",
            source_url:
              "https://www.sorpetaler.de/wp-content/uploads/2021/04/schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten-1024x683.jpg",
          },
          employee: {
            file:
              "schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten-380x380.jpg",
            width: 380,
            height: 380,
            mime_type: "image/jpeg",
            source_url:
              "https://www.sorpetaler.de/wp-content/uploads/2021/04/schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten-380x380.jpg",
          },
          gallery: {
            file:
              "schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten-660x525.jpg",
            width: 660,
            height: 525,
            mime_type: "image/jpeg",
            source_url:
              "https://www.sorpetaler.de/wp-content/uploads/2021/04/schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten-660x525.jpg",
          },
          slide: {
            file:
              "schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten-1600x600.jpg",
            width: 1600,
            height: 600,
            mime_type: "image/jpeg",
            source_url:
              "https://www.sorpetaler.de/wp-content/uploads/2021/04/schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten-1600x600.jpg",
          },
          "alm-thumbnail": {
            file:
              "schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten-150x150.jpg",
            width: 150,
            height: 150,
            mime_type: "image/jpeg",
            source_url:
              "https://www.sorpetaler.de/wp-content/uploads/2021/04/schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten-150x150.jpg",
          },
          full: {
            file:
              "schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten.jpg",
            width: 1600,
            height: 1067,
            mime_type: "image/jpeg",
            source_url:
              "https://www.sorpetaler.de/wp-content/uploads/2021/04/schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten.jpg",
          },
        },
        image_meta: {
          aperture: "8",
          credit: "JAN ROTTLER",
          camera: "Canon EOS 5D Mark IV",
          caption: "",
          created_timestamp: "1579594445",
          copyright: "www.janrottler.de",
          focal_length: "24",
          iso: "100",
          shutter_speed: "0.01",
          title: "",
          orientation: "1",
          keywords: [],
        },
      },
      post: 12551,
      source_url:
        "https://www.sorpetaler.de/wp-content/uploads/2021/04/schoenste-holzhaeuser_schwarzwaldpanorama_partner-und-partner-architekten.jpg",
      _links: {
        self: [
          {
            href: "https://www.sorpetaler.de/wp-json/wp/v2/media/12588",
          },
        ],
        collection: [
          {
            href: "https://www.sorpetaler.de/wp-json/wp/v2/media",
          },
        ],
        about: [
          {
            href: "https://www.sorpetaler.de/wp-json/wp/v2/types/attachment",
          },
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
            href: "https://www.sorpetaler.de/wp-json/wp/v2/comments?post=12588",
          },
        ],
      },
    },
  ],
  linkBlocks: [],
}
*/

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
  const assetsLinksByIndex = []
  const assetsIdsByIndex = []

  wordPressData.posts.forEach(post => {
    for (const [, contentImage] of getPostBodyImages(post).entries()) {
      const assetFields = createAssetFields(contentImage.link)
      contentfulAssets.push(assetFields)
      assetsLinksByIndex.push(contentImage.link)
      assetsIdsByIndex.push(contentImage.id)
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
              url: contentfulAsset.fields.file["en-US"].url,
            }

            if (assetsIdsByIndex[index]) {
              contentfulDataByTypeKey.assets[assetsIdsByIndex[index]] = newAsset
            }

            contentfulDataByTypeKey.assetsByUrl[
              assetsLinksByIndex[index]
            ] = newAsset
          } catch (error) {
            throw Error(error)
          }

          resolve(contentfulAsset)
        }, 1000 + 5000 * index)
      })
  )

  return Promise.all(promises)
}

async function createContentfulArticles(environment) {
  const promises = []

  for (const [index, post] of wordPressData.posts.entries()) {
    const content = turndownService.turndown(post.content.raw)

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
        "en-US": content,
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
            id: contentfulDataByTypeKey.assets[post.featured_media].id,
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

          log(contentfulArticle.fields.slug["en-US"], "Article")
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

async function migrateContent() {
  try {
    log("Fetching data from WordPress")
    await bootstrapDataForMigration()
    log("WordPress Data fetched ✓")

    const contentfulSpace = await ctfClient.getSpace(ctfData.spaceId)
    const environment = await contentfulSpace.getEnvironment(
      ctfData.environment
    )

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
