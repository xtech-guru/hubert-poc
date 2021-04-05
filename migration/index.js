const contentful = require("contentful-management")
const axios = require("axios")
const TurndownService = require("turndown")
const { richTextFromMarkdown } = require("@contentful/rich-text-from-markdown")

require("dotenv/config")

const logSeparator = `-------`

const BODY_IMAGE_REGEX = /<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/g

/**
 * Main WordPress endpoint.
 */
const WORD_PRESS_ENDPOINT = `https://www.sorpetaler.de/wp-json/wp/v2/`

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
let wordPressData = {
  posts: {},
  categories: {},
  users: {},
  media: {},
}

/*
let wordPressData = {
  posts: [
    {
      id: 12053,
      date: "2020-10-29T14:44:55",
      date_gmt: "2020-10-29T13:44:55",
      guid: {
        rendered: "https://www.sorpetaler.de/?p=12053",
      },
      modified: "2020-10-30T10:19:21",
      modified_gmt: "2020-10-30T09:19:21",
      slug: "die-schoensten-holzhaeuser-gewinner",
      status: "publish",
      type: "post",
      link:
        "https://www.sorpetaler.de/hubert/nachhaltig-bauen-und-sanieren/die-schoensten-holzhaeuser-gewinner/",
      title: {
        rendered: "Die schönsten Holzhäuser &#8211; Gewinner stehen fest",
      },
      content: {
        rendered:
          '<p>Bis zum 30. Juni konnten Studierende, Architekt*innen oder Bauherr*innen ihre Entwürfe für ein besonderes Holzhaus beim Wettbewerb &#8220;Die schönsten Holzhäuser 2020&#8221; von Sorpetaler Fensterbau einreichen. Nach der Sommerpause hat sich die Jury beraten und die drei besten Entwürfe gekürt. Welche das sind und warum gerade diese überzeugt haben, verraten wir hier.</p>\n<h2>1. Platz: Wohnhaus vis-à-vis von luna productions</h2>\n<p>Das Wohnhaus <em>via-à-vis</em> im schweizerischen Deitingen ist modern und traditionell zugleich. Das Gebäude, das in zwei Gebäudeteilen mit zwei Etagen jeweils zwei Wohnungen mit 2,5 bzw. 5 Zimmern beherbergt, spiegelt mit seiner Kombination aus Holz und Beton die Strömungen zeitgenössischer Architektur wider. Und fügt sich gleichzeitig mit seinem Erscheinungsbild wie selbstverständlich in seine dörfliche Umgebung ein.</p>\n<blockquote><p>Wir haben den Anspruch, beim Eingriff in bestehende Situationen nicht nur auf die Bedürfnisse des Einzelnen zu achten, sondern mit unserer Intervention die Situation so zu verbessern, dass eine lebendige Nachbarschaft entstehen kann.</p></blockquote>\n<p>Dieser Ansatz ist es auch, der die Architekten angetrieben hat. Nadja und Lukas Frei (beide Anfang 30) von luna productions wünschen sich &#8220;mehr Baukultur im Dorf&#8221;, die neue Bauten nicht losgelöst von der Umgebung, rein funktional oder wirtschaftlich in der Blick nimmt. Im Gegenteil: Das Architektenpaar betrachtet ein Gebäude nicht bloß als die Verwirklichung individueller Ideen, sondern immer als Teil eines Ganzen, einer Gemeinschaft. [float-left]<img class="alignnone" src="https://www.sorpetaler.de/wp-content/uploads/2020/10/schoenste-holzhaeuser-vis-a-vis-luna-productions-2.png" alt="Das Holzhaus vis-à-vis von luna productions aus der Schweiz mit einem Kirschbaum als tragendem Element" width="400" height="677" />[/float-left]&#8221;Entwerfen wir einen Kindergarten, reden wir mit der Lehrperson, den Eltern und den Kindern; bauen wir im Dorf, studieren wir das Dorf und interessieren uns für die Sicht der Nachbarn ebenso wie für die des Bauherrn. Wir haben den Anspruch, beim Eingriff in bestehende Situationen nicht nur auf die Bedürfnisse des Einzelnen zu achten, sondern mit unserer Intervention die Situation so zu verbessern, dass eine lebendige Nachbarschaft entstehen kann&#8221;, so Nadja und Lukas.</p>\n<p>Genau das ist ihnen dabei aus Sicht der Jury gelungen. Das neue Haus schließt eine Lücke zwischen der gegenüber liegenden Schreinerei (daher übrigens auch der Name <em>vis-à-vis</em>, französisch für gegenüber) und den umliegenden Wohnbauten. Es entsteht ein gemeinsamer Hof als &#8220;Begegnungsraum für die ganze Nachbarschaft&#8221;, wie Nadja und Lukas es beschreiben. Interessant ist auch der Materialmix, der den klassischen Holzbau weiterentwickelt. Die Außenwände bestehen aus Kalksandstein &#8211; verkleidet mit Holz, der Erschließungsbereich in der Mitte, der beide Gebäudeteile miteinander verbindet, ist aus rohem Beton. Im Inneren wiederum hat luna productions auf eine nichttragende Holzständerkonstruktion gesetzt, die sich wechselnden Bedürfnissen ihrer Bewohner*innen anpassen kann.</p>\n<p>Auch bei den Themen Wohngesundheit und Regionalität hat das Wohnhaus gepunktet. So haben die Architekten beispielsweise auf heimische Rohstoffe mit kurzen Transportwegen und auf schadstoffarme Anstriche gesetzt. Viele Materialien blieben roh. Die unbehandelte, sägerauhe Fichtenfassade etwa darf natürlich altern. Insgesamt haben die beiden jungen Architekten ein sehr stimmiges Gebäude entwickelt, bei dessen Planung sehr feinfühlig und differenziert unterschiedlichste Aspekte berücksichtigt und miteinander in Einklang gebracht wurden. Ein verdienter erster Platz!</p>\n<h2>2. Platz: Haus H. von Eva Miclavcic und Eugen Happacher</h2>\n<p>Haus H. ist ein Einfamilienhaus in Südtirol, das Eva Miclavcic und Eugen Happacher, heute 29 Jahre alt, noch während ihres Studiums an der Akademie der Bildenden Künste München entwerfen durften. Bauherr war ein Ehepaar, das biologische Landwirtschaft betreibt.</p>\n<blockquote><p>Ziel war es, ein kleines, einfaches und nachhaltiges Gebäude zu entwickeln, das durch ein zurückhaltendes Äußeres, großzügige Räume und raffinierte Details sich selbstverständlich in die Landschaft einfügt.</p></blockquote>\n<p>Dabei standen die Planer vor der Herausforderung, das Wohnhaus in eine traditionelle Umgebung mit bereits bestehenden Wirtschaftsgebäuden einzubetten. &#8220;Ziel war es, ein kleines, einfaches und nachhaltiges Gebäude zu entwickeln, das durch ein zurückhaltendes Äußeres, großzügige Räume und raffinierte Details sich selbstverständlich in die Landschaft einfügt und den Bogen von traditioneller bis hin zu moderner Bauweise spannt&#8221;, beschreiben es Eva und Eugen in ihrer Bewerbung. Was sofort ins Auge sticht: Optisch fällt das Wohnhaus neben den landwirtschaftlichen Gebäuden kaum auf &#8211; bis auf die Fassade vielleicht, die auf den Fotos noch ganz frisch wirkt. Ansonsten aber fügt es sich unglaublich natürlich in seine Umgebung ein.[float-left]<img class="alignnone" src="https://www.sorpetaler.de/wp-content/uploads/2020/10/schoenste-holzhaeuser-haus-h-eugen-happacher.png" alt="Zweiter Platz beim Wettbewerb Die schönsten Holzhäuser: Haus H in Südtirol von Eva Miclavcic und Eugen Happacher" width="500" height="677" />[/float-left]</p>\n<p>&#8220;Das Gebäude besticht durch seine Einfachheit und Klarheit. Im gewohnten Blick seiner Umgebung eher schlicht und unauffällig. Dies allerdings nur auf den ersten Blick!&#8221;, drückt es Joachim Kranendonck von der Jury der &#8220;Schönsten Holzhäuser&#8221; aus. Denn auf den zweiten Blick offenbaren sich viele moderne Elemente, die den aktuellen Zeitgeist widerspiegeln. Etwa die großzügigen Holzfensterflächen, die den Bewohnern des Hauses ein unglaubliches Bergpanorama eröffnen. Die Lärchenlattung der Fassade in drei verschiedenen Breiten, die sich selbst bei der Haustür fortsetzt. Oder aber auch die großen, luftigen Räume im Inneren.</p>\n<p>Der zeitgenössische Ansatz zeigt sich ebenfalls beim Thema Nachhaltigkeit: Architekten und Bauherren setzten konsequent auf Holzsorten, die in der Region vorkommen und ließen sie von ansässigen Firmen verbauen. &#8220;Auf aus fossilen Materialien hergestellte Baustoffe wurde so weit wie möglich verzichtet. Die Dämmung der Bodenplatte erfolgte durch recycelbaren Glasschaumschotter und die der Fassade und des Daches aus Holzfaserdämmplatten&#8221;, heißt es in der Bewerbung weiter. Kombiniert mit einem klugen und klaren Entwurf macht dies das Haus H. zu einem würdigen Zweitplatzierten.</p>\n<h2>3. Platz: Umweltbildungszentrum Kienbergpark von KolbRipke</h2>\n<p>Das Umweltbildungszentrum, das im Kienbergpark in Berlin Marzahn-Hellersdorf entstanden ist, macht auf besondere Weise deutlich, welche Wandelbarkeit der Werkstoff Holz in sich birgt. Das Zentrum- der Name verrät es schon &#8211; bietet Kitas und Schulen, Jugendlichen, Familien oder anderen Interessierten vielfältige Veranstaltungen und Angebote rund um die Themen Umwelt und Nachhaltigkeit. [float-left]<img class="alignnone" src="https://www.sorpetaler.de/wp-content/uploads/2020/10/schoenste-holzhaeuser-umweltbildungszentrum-kienbergpark-kolbripke.png" alt="Platz 3 des Wettbewerbs Die schönsten Holzhäuser: Das Umweltbildungszentrum Kienbergpark von KolpRipke Architekten in Berlin" width="500" height="677" />[/float-left]Umgeben von Gärten, Wiesen, Wäldern und dem Wuhleteich bildet es einen vorbildlichen Raum für Umweltbildung.</p>\n<p>Insofern ist es nur stimmig, dass die Planer von KolbRipke Gesellschaft von Architekten mbH aus Berlin für dieses Gebäude auf den natürlichen Werkstoff Holz gesetzt haben. Um eine kurze Bauzeit und eine möglichst große Flexibilität gewährleisten zu können, entschieden sie sich für Holz-Raummodule in Holzrahmenbauweise, die zu einem großen Grad vorgefertigt wurden. Aneinandergereiht ergeben die einzelnen Module mit zwischengeschalteten Licht- und Erschließungsfugen das längliche Gebäude. Ein extensiv begrüntes Dach vervollständigt den nachhaltigen Charakter des Umweltbildungszentrums, sodass es sich trotz der modernen Architektur harmonisch in den umliegenden Park einfügt.</p>\n<blockquote><p>Das Objekt besticht auf Anhieb durch seine klare Konstruktion, eine Aneinanderreihung von Raummodulen in Holzrahmenbauweise.</p></blockquote>\n<p>Im Inneren des Gebäudes steht Wandelbarkeit im Mittelpunkt. Getrennte Räume entstanden durch den Einsatz von leichten Trennwänden, Ausstellungs- und Seminarbereich können mittels Faltschiebewänden flexibel umgestaltet werden. Denkbar wäre selbst der Einsatz des gesamten Gebäudes an einem anderen Ort. &#8220;Das Gebäude stellt einen Prototypen dar, der zeigen soll, was mit einem Holzmodulbau möglich ist. Die leichte Abbaubarkeit und der einfache Transport eröffnen die Chance, dieses System für vielfältigste andere Nutzungen einzusetzen&#8221;, schließen die Architekten von KolbRipke. [float-left]<img class="alignnone" src="https://www.sorpetaler.de/wp-content/uploads/2020/10/schoenste-holzhaeuser-umweltbildungszentrum-kienbergpark-kolbripke-skizze.png" alt="Skizze des Umweltbildungszentrum Kienbergpark von KolbRipke Architekten" width="450" height="677" />[/float-left]Gerade dieses hohe Maß an Flexibilität kombiniert mit sleeker Architektur hat die Jury des Wettbewerbs besonders überzeugt. &#8220;Das Objekt besticht auf Anhieb durch seine klare Konstruktion, eine Aneinanderreihung von Raummodulen in Holzrahmenbauweise. Diese Konstruktion lässt eine offene und flexible Grundrissgestaltung zu. Sowohl der hohe Anteil an Vorfertigung als auch klare und einfache Detaillösungen machen das Gebäude zu einem äußerst wirtschaftlichen Element. Ein schönes Beispiel dafür, was Holzbau leisten kann&#8221;, heißt es von Seiten der Experten. Herzlichen Glückwunsch zum dritten Platz!</p>\n<h2>Neues E-Book mit den Top 10 Holzhaus-Entwürfen</h2>\n<p>Die vorgestellten drei Entwürfe erhalten als Gewinner des Wettbewerbs &#8220;Die schönsten Holzhäuser&#8221; Preisgelder in Höhe von 1.500, 1.000 und 500 Euro. Darüber hinaus finden sie herausgehobene Erwähnung in der zweiten Auflage des E-Books &#8220;Die schönsten Holzhäuser&#8221;, die Anfang 2021 erscheinen wird. Neben den Gewinner-Einsendungen nimmt das neue E-Book sieben weitere Holzhausentwürfe in den Blick, die die Jury aus unterschiedlichen Gründen für erwähnenswert hielt.</p>\n<p>Die erste Auflage des E-Books &#8220;Die schönsten Holzhäuser&#8221; kannst du dir <a href="https://www.sorpetaler.de/wp-content/uploads/2020/02/ebook-die-schoensten-holzhaeuser-2019.pdf">hier</a> kostenfrei herunterladen.</p>\n<p><em>Bildmaterial: luna productions/Mark Drotsky &#8211; Eugen Happacher &#8211; Hanns Joosten &#8211; KolbRipke</em></p>\n<p>[text-with-link link-text=&#8221;Jetzt lesen&#8221; link-url=&#8221;https://www.sorpetaler.de/hubert/nachhaltig-bauen-und-sanieren/hausbau-mit-holz/&#8221; image=&#8221;https://www.sorpetaler.de/wp-content/uploads/2019/10/hausbau-mit-holz-klimaschutz.jpg&#8221;] Der Holzhaus-Bau entwickelt sich zu einem echten Trend. Doch nicht nur kurze Bauzeiten und große Flexibilität machen den Werkstoff Holz zu einem beliebten Material für neue Häuser. In unserem Artikel &#8220;Hausbau mit Holz &#8211; ein echter Klimaretter&#8221; zeigen wir auf, welchen Effekt die Entscheidung für ein Holzhaus auf unsere Umwelt haben kann.[/text-with-link]</p>\n',
        protected: false,
      },
      excerpt: {
        rendered:
          "Die Gewinner des Wettbewerbs &#8220;Die schönsten Holzhäuser 2020&#8221; stehen fest. Hier stellen wir ihre Entwürfe vor und erläutern, warum gerade diese die Jury am meisten überzeugt haben.",
        protected: false,
      },
      author: 7,
      featured_media: 12107,
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
            href: "https://www.sorpetaler.de/wp-json/wp/v2/posts/12053",
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
            href: "https://www.sorpetaler.de/wp-json/wp/v2/comments?post=12053",
          },
        ],
        "version-history": [
          {
            href:
              "https://www.sorpetaler.de/wp-json/wp/v2/posts/12053/revisions",
          },
        ],
        "wp:featuredmedia": [
          {
            embeddable: true,
            href: "https://www.sorpetaler.de/wp-json/wp/v2/media/12107",
          },
        ],
        "wp:attachment": [
          {
            href: "https://www.sorpetaler.de/wp-json/wp/v2/media?parent=12053",
          },
        ],
        "wp:term": [
          {
            taxonomy: "category",
            embeddable: true,
            href:
              "https://www.sorpetaler.de/wp-json/wp/v2/categories?post=12053",
          },
          {
            taxonomy: "post_tag",
            embeddable: true,
            href: "https://www.sorpetaler.de/wp-json/wp/v2/tags?post=12053",
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
      _links: {},
    },
  ],
  users: [
    {
      id: 7,
      name: "Sandra Stein",
      url: "",
      description:
        "Sandra ist hauptberuflich Digital Marketing Managerin und beschäftigt sich seit vielen Jahren mit den neuesten Trends im Internet. Seit 2016 arbeitet sie in der Baubranche. Ihr besonderes Interesse gilt dabei dem Thema nachhaltig Bauen und Leben. Weil sie so gerne spricht, ist sie unsere Hauptinterviewführerin.",
      link: "https://www.sorpetaler.de/hubert/author/sandra/",
      slug: "sandra",
      avatar_urls: {
        24: "https://secure.gravatar.com/avatar/1bd475830113d79a6d0f79eac7fdcdc4?s=24&r=g",
        48: "https://secure.gravatar.com/avatar/1bd475830113d79a6d0f79eac7fdcdc4?s=48&r=g",
        96: "https://secure.gravatar.com/avatar/1bd475830113d79a6d0f79eac7fdcdc4?s=96&r=g",
      },
    },
  ],
  media: [
    {
      id: 12107,
      date: "2020-10-30T10:16:43",
      date_gmt: "2020-10-30T09:16:43",
      guid: {
        rendered:
          "https://www.sorpetaler.de/wp-content/uploads/2020/10/schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade.jpg",
      },
      modified: "2020-10-30T10:17:03",
      modified_gmt: "2020-10-30T09:17:03",
      slug: "schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade",
      status: "inherit",
      type: "attachment",
      link:
        "https://www.sorpetaler.de/hubert/nachhaltig-bauen-und-sanieren/die-schoensten-holzhaeuser-gewinner/attachment/schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade/",
      title: {
        rendered: "Schoenste-Holzhaeuser-vis-a-vis-luna-productions_Fassade",
      },
      author: 7,
      comment_status: "closed",
      ping_status: "closed",
      template: "",
      meta: [],
      description: {
        rendered:
          '<p class="attachment"><a href=\'https://www.sorpetaler.de/wp-content/uploads/2020/10/schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169.jpg\'><img width="300" height="230" src="https://www.sorpetaler.de/wp-content/uploads/2020/10/schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169-300x230.jpg" class="attachment-medium size-medium" alt="Wettbewerb &quot;Die schönsten Holzhäuser: Gewinnerentwurf Wohnhaus &quot;vis-à-vis&quot; von luna productions" srcset="https://www.sorpetaler.de/wp-content/uploads/2020/10/schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169-300x230.jpg 300w, https://www.sorpetaler.de/wp-content/uploads/2020/10/schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169-768x588.jpg 768w, https://www.sorpetaler.de/wp-content/uploads/2020/10/schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169-1024x783.jpg 1024w" sizes="(max-width: 300px) 100vw, 300px" /></a></p>\n',
      },
      caption: {
        rendered: "",
      },
      alt_text:
        'Wettbewerb "Die schönsten Holzhäuser: Gewinnerentwurf Wohnhaus "vis-à-vis" von luna productions',
      media_type: "image",
      mime_type: "image/jpeg",
      media_details: {
        width: 1800,
        height: 1377,
        file:
          "2020/10/schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169.jpg",
        sizes: {
          thumbnail: {
            file:
              "schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169-150x150.jpg",
            width: 150,
            height: 150,
            mime_type: "image/jpeg",
            source_url:
              "https://www.sorpetaler.de/wp-content/uploads/2020/10/schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169-150x150.jpg",
          },
          medium: {
            file:
              "schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169-300x230.jpg",
            width: 300,
            height: 230,
            mime_type: "image/jpeg",
            source_url:
              "https://www.sorpetaler.de/wp-content/uploads/2020/10/schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169-300x230.jpg",
          },
          medium_large: {
            file:
              "schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169-768x588.jpg",
            width: 768,
            height: 588,
            mime_type: "image/jpeg",
            source_url:
              "https://www.sorpetaler.de/wp-content/uploads/2020/10/schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169-768x588.jpg",
          },
          large: {
            file:
              "schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169-1024x783.jpg",
            width: 1024,
            height: 783,
            mime_type: "image/jpeg",
            source_url:
              "https://www.sorpetaler.de/wp-content/uploads/2020/10/schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169-1024x783.jpg",
          },
          employee: {
            file:
              "schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169-380x380.jpg",
            width: 380,
            height: 380,
            mime_type: "image/jpeg",
            source_url:
              "https://www.sorpetaler.de/wp-content/uploads/2020/10/schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169-380x380.jpg",
          },
          gallery: {
            file:
              "schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169-660x525.jpg",
            width: 660,
            height: 525,
            mime_type: "image/jpeg",
            source_url:
              "https://www.sorpetaler.de/wp-content/uploads/2020/10/schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169-660x525.jpg",
          },
          slide: {
            file:
              "schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169-1800x600.jpg",
            width: 1800,
            height: 600,
            mime_type: "image/jpeg",
            source_url:
              "https://www.sorpetaler.de/wp-content/uploads/2020/10/schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169-1800x600.jpg",
          },
          "alm-thumbnail": {
            file:
              "schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169-150x150.jpg",
            width: 150,
            height: 150,
            mime_type: "image/jpeg",
            source_url:
              "https://www.sorpetaler.de/wp-content/uploads/2020/10/schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169-150x150.jpg",
          },
          full: {
            file:
              "schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169.jpg",
            width: 1800,
            height: 1377,
            mime_type: "image/jpeg",
            source_url:
              "https://www.sorpetaler.de/wp-content/uploads/2020/10/schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169.jpg",
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
      post: 12053,
      source_url:
        "https://www.sorpetaler.de/wp-content/uploads/2020/10/schoenste-holzhaeuser-vis-a-vis-luna-productions_fassade-e1604049455169.jpg",
      _links: {
        self: [
          {
            href: "https://www.sorpetaler.de/wp-json/wp/v2/media/12107",
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
            href: "https://www.sorpetaler.de/wp-json/wp/v2/comments?post=12107",
          },
        ],
      },
    },
  ],
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
  return axios
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
      promises[k].push(`${WORD_PRESS_ENDPOINT}${k}?page=${i}&per_page=100`)
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

  while ((foundImage = BODY_IMAGE_REGEX.exec(post.content.rendered))) {
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

function createAvatarAssetFields(url) {
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
        const fields = createAvatarAssetFields(user.avatar_urls["96"])

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
      const assetFields = {
        title: {
          "en-US": contentImage.title,
        },
        description: {
          "en-US": contentImage.description,
        },
        file: {
          "en-US": {
            contentType: "image/jpeg",
            fileName: contentImage.link.split("/").pop(),
            upload: encodeURI(contentImage.link),
          },
        },
      }
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

async function createContentfulArticles(environment) {
  const promises = []

  for (const [index, post] of wordPressData.posts.entries()) {
    const markdownContent = turndownService.turndown(post.content.rendered)
    const articleContent = await richTextFromMarkdown(markdownContent)

    const fields = {
      title: {
        "en-US": post.title.rendered,
      },
      slug: {
        "en-US": post.slug,
      },
      introduction: {
        "en-US": post.excerpt.rendered,
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
