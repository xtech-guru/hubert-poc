const contentful = require("contentful-management")
const axios = require("axios")
const fs = require("fs")
const path = require("path")
const TurndownService = require("turndown")

require("dotenv/config")

console.log()
/**
 * Global variables that we're going use throughout this script
 * -----------------------------------------------------------------------------
 */

/**
 * Main WordPress endpoint.
 */
const wpEndpoint = `https://www.sorpetaler.de/wp-json/wp/v2/`

/**
 * API Endpoints that we'd like to receive data from
 * (e.g. /wp-json/wp/v2/${key})
 */
let wpData = {
  posts: [],
  categories: [],
  authors: [],
  media: [],
}

/**
 * Contentful API requirements
 */
const ctfData = {
  accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONEMENT_ID,
  spaceId: process.env.CONTENTFUL_SPACE_ID,
}
Object.freeze(ctfData)

/**
 * Creation of Contentful Client
 */
const ctfClient = contentful.createClient({
  accessToken: ctfData.accessToken,
})

/**
 * Internal: log output separator for terminal.
 */
const logSeparator = `-------`

/**
 * Object to store WordPress API data in
 */
let apiData = []

/**
 * Object to store Contentful Data in.
 */
let contentfulData = {
  authorsById: {},
  categoriesById: {},
}

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
  replacement: function (content, node, options) {
    let assetUrl = contentfulData.assets.filter(asset => {
      let assertFileName = asset.split("/").pop()
      let nodeFileName = node.getAttribute("src").split("/").pop()

      if (assertFileName === nodeFileName) {
        return asset
      }
    })[0]

    return `![${node.getAttribute("alt")}](${assetUrl})`
  },
})

/**
 * Main Migration Script.
 * -----------------------------------------------------------------------------
 */

function migrateContent() {
  let postsPromises = []
  let categoriesPromises = []
  let tagsPromises = []
  let mediaPromises = []
  let userPromises = []

  console.log(logSeparator)
  console.log(`Getting WordPress API data`)
  console.log(logSeparator)

  // Loop over our content types and create API endpoint URLs
  for (let i = 1; i <= 2; i++) {
    let wpUrl = `${wpEndpoint}posts?page=${i}&per_page=100`
    postsPromises.push(wpUrl)
  }

  for (let i = 1; i <= 1; i++) {
    let wpUrl = `${wpEndpoint}categories?page=${i}&per_page=100`
    categoriesPromises.push(wpUrl)
  }

  for (let i = 1; i <= 1; i++) {
    let wpUrl = `${wpEndpoint}tags?=page${i}&per_page=100`
    tagsPromises.push(wpUrl)
  }

  for (let i = 1; i <= 16; i++) {
    let wpUrl = `${wpEndpoint}media?page=${i}&per_page=100`
    mediaPromises.push(wpUrl)
  }

  for (let i = 1; i <= 1; i++) {
    let wpUrl = `${wpEndpoint}user?page=${i}&per_page=100`
    userPromises.push(wpUrl)
  }

  Promise.all(
    [[], [], [], [], []] || [
      getAllData(postsPromises),
      getAllData(tagsPromises),
      getAllData(categoriesPromises),
      getAllData(mediaPromises),
      getAllData(userPromises),
    ]
  )
    .then(response => {
      const data = response.reduce((previous, current) => {
        const res = {
          success: true,
          endpoint: "",
          data: current.reduce((p, c) => p.concat(c.data), []),
        }
        previous.push(res)
        return previous
      }, [])

      /*
      const filteredMedia = data[3].data.filter(post =>
        post.link.includes("hubert")
      )
       */

      //const filteredMediaIds = filteredMedia.map(media => media.id)

      /*
      apiData = [
        {
          ...data[0],
          data: data[0].data.filter(post =>
            filteredMediaIds.includes(post.featured_media)
          ),
        },
        data[1],
        data[2],
        {
          ...data[3],
          data: filteredMedia,
        },
        data[4],
      ]
      */

      apiData = [
        {
          status: "success",
          endpoint: "",
          data: [
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
                rendered:
                  "Die schönsten Holzhäuser &#8211; Gewinner stehen fest",
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
                    href:
                      "https://www.sorpetaler.de/wp-json/wp/v2/comments?post=12053",
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
                    href:
                      "https://www.sorpetaler.de/wp-json/wp/v2/media?parent=12053",
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
                    href:
                      "https://www.sorpetaler.de/wp-json/wp/v2/tags?post=12053",
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
        },
        {
          status: "success",
          endpoint: "",
          data: [
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
        },
        {
          status: "success",
          endpoint: "",
          data: [
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
              meta: [],
              _links: {
                self: [
                  {
                    href: "https://www.sorpetaler.de/wp-json/wp/v2/users/7",
                  },
                ],
                collection: [
                  {
                    href: "https://www.sorpetaler.de/wp-json/wp/v2/users",
                  },
                ],
              },
            },
          ],
        },
        {
          status: "success",
          endpoint: "",
          data: [
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
                rendered:
                  "Schoenste-Holzhaeuser-vis-a-vis-luna-productions_Fassade",
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
                    href:
                      "https://www.sorpetaler.de/wp-json/wp/v2/types/attachment",
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
                    href:
                      "https://www.sorpetaler.de/wp-json/wp/v2/comments?post=12107",
                  },
                ],
              },
            },
          ],
        },
      ]

      mapData()
    })
    .catch(reason => {
      console.log(reason)
    })
}

function getAllData(URLs) {
  return Promise.all(URLs.map(fetchData))
}

function fetchData(URL) {
  return axios
    .get(URL)
    .then(function (response) {
      return {
        success: true,
        endpoint: "",
        data: response.data,
      }
    })
    .catch(function (error) {
      return { success: false }
    })
}

/**
 * Get our entire API response and filter it down to only show content that we want to include
 */
function mapData() {
  // Get WP posts from API object

  // Loop over our conjoined data structure and append data types to each child.
  for (const [index, [key, value]] of Object.entries(Object.entries(wpData))) {
    apiData[index].endpoint = key
  }

  console.log(`Reducing API data to only include fields we want`)

  const apiUsers = getApiDataType("authors")[0]
  // Loop over users
  for (let [, userData] of Object.entries(apiUsers.data)) {
    console.log(`Parsing ${userData.slug}`)
    const authorFieldData = {
      id: userData.id,
      fullName: userData.name,
      slug: userData.slug,
      description: userData.description,
      //picture: should link to its picture
    }
    wpData.authors.push(authorFieldData)
  }

  const apiCategories = getApiDataType("categories")[0]
  // Loop over categories
  for (let [, categoryData] of Object.entries(apiCategories.data)) {
    console.log(`Parsing ${categoryData.slug}`)
    const categoryFieldData = {
      id: categoryData.id,
      title: categoryData.name,
      slug: categoryData.slug,
    }
    wpData.categories.push(categoryFieldData)
  }

  let apiPosts = getApiDataType("posts")[0]
  // Loop over posts - note: we probably /should/ be using .map() here.
  for (let [, postData] of Object.entries(apiPosts.data)) {
    console.log(`Parsing ${postData.slug}`)
    /**
     * Create base object with only limited keys
     * (e.g. just 'slug', 'categories', 'title') etc.
     *
     * The idea here is that the key will be your Contentful field name
     * and the value be the WP post value. We will later match the keys
     * used here to their Contentful fields in the API.
     */
    let fieldData = {
      id: postData.id,
      type: postData.type,
      introduction: postData.excerpt.rendered,
      title: postData.title.rendered,
      slug: postData.slug,
      content: postData.content.rendered,
      featuredImage: postData.featured_media,
      author: postData.author,
      category: postData.categories[0],
      contentImages: getPostBodyImages(postData),
    }

    wpData.posts.push(fieldData)
  }

  console.log(`...Done!`)
  console.log(logSeparator)

  writeDataToFile(wpData, "data")
  createForContentful()
}

function getPostBodyImages(postData) {
  // console.log(`- Getting content images`)
  let imageRegex = /<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/g
  let bodyImages = []

  if (postData.featured_media > 0) {
    let mediaData = getApiDataType(`media`)[0]

    let mediaObj = mediaData.data.filter(obj => {
      if (obj.id === postData.featured_media) {
        return obj
      }
    })[0]

    bodyImages.push({
      link: mediaObj.source_url,
      description: mediaObj.alt_text,
      title: mediaObj.alt_text,
      mediaId: mediaObj.id,
      postId: mediaObj.post,
      featured: true,
    })
  }

  while ((foundImage = imageRegex.exec(postData.content.rendered))) {
    let alt = postData.id

    if (foundImage[0].includes('alt="')) {
      alt = foundImage[0].split('alt="')[1].split('"')[0] || ""
    }

    bodyImages.push({
      link: foundImage[1],
      description: alt,
      title: alt,
      postId: postData.id,
      featured: false,
    })
  }
  return bodyImages
}

function getPostLabels(postItems, labelType) {
  let labels = []
  let apiTag = getApiDataType(labelType)[0]

  for (const labelId of postItems) {
    let labelName = apiTag.data.filter(obj => {
      if (obj.id === labelId) {
        return obj.name
      }
    })

    labels.push(labelName[0].name)
  }

  return labels
}

/**
 * Helper function to get a specific data tree for a type of resource.
 * @param {String} resourceName - specific type of WP endpoint (e.g. posts, media)
 */
function getApiDataType(resourceName) {
  let apiType = apiData.filter(obj => {
    if (obj.endpoint === resourceName) {
      return obj
    }
  })

  return apiType
}

/**
 * Write all exported WP data to its own JSON file.
 * @param {Object} dataTree - JSON body of WordPress data
 * @param {*} dataType - type of WordPress API endpoint.
 */
function writeDataToFile(dataTree, dataType) {
  console.log(`Writing data to a file`)

  console.log(path.join(__dirname, `/${dataType}.json`))

  fs.writeFile(
    path.join(__dirname, `/${dataType}.json`),
    JSON.stringify(dataTree, null, 2),
    err => {
      if (err) {
        console.error(err)
        return
      }
      console.log(`...Done!`)
      console.log(logSeparator)
    }
  )
}

/**
 * Create Contentful Client.
 */
function createForContentful() {
  ctfClient
    .getSpace(ctfData.spaceId)
    .then(space => space.getEnvironment(ctfData.environment))
    .then(environment => {
      createContentfulCategories(environment).then(() => {
        createContentfulAuthors(environment)
          .then(() => {
            buildContentfulAssets(environment)
          })
          .catch(error => {
            console.log(error)
            return error
          })
      })
    })
    .catch(error => {
      console.log(error)
      return error
    })
}

/**
 * Build data trees for Contentful assets.
 * @param {String} environment - name of Contentful environment.
 */
function buildContentfulAssets(environment) {
  let assetPromises = []

  console.log("Building Contentful Asset Objects")

  // For every image in every post, create a new asset.
  for (let [, wpPost] of wpData.posts.entries()) {
    for (const [, contentImage] of wpPost.contentImages.entries()) {
      let assetObj = {
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

      assetPromises.push(assetObj)
    }
  }

  let assets = []

  console.log(`Creating Contentful Assets...`)
  console.log(logSeparator)

  // getAndStoreAssets()

  createContentfulAssets(environment, assetPromises, assets).then(result => {
    console.log(`...Done!`)
    console.log(logSeparator)

    getAndStoreAssets(environment, assets)
  })
}

function createContentfulCategories(environment) {
  const apiCategories = getApiDataType("categories")[0]
  let promises = apiCategories.data.map(category => {
    let categoryFields = {
      id: category.id,
      title: {
        "en-US": category.name,
        "de-DE": category.name,
      },
      slug: {
        "en-US": category.slug,
        "de-DE": category.slug,
      },
    }

    return categoryFields
  })

  let newCategory

  return Promise.all(
    promises.map(
      (category, index) =>
        new Promise((resolve, reject) => {
          const categoryId = category.id
          delete category.id

          setTimeout(() => {
            newCategory = environment
              .createEntry("category", {
                fields: category,
              })
              .then(entry => entry.publish())
              .then(entry => {
                contentfulData.categoriesById[categoryId] = entry.sys.id
                console.log(`Success: ${entry.fields.slug["en-US"]}`)
              })
              .catch(error => {
                throw Error(error)
              })
            resolve(newCategory)
          }, 1000 + 5000 * index)
        })
    )
  )
}

function createContentfulAuthors(environment) {
  const apiAuthors = getApiDataType("authors")[0]

  let promises = apiAuthors.data.map(author => {
    let authorFields = {
      id: author.id,
      fullName: {
        "en-US": author.name,
      },
      slug: {
        "en-US": author.slug,
      },
      details: {
        "en-US": author.description,
      },
    }

    return authorFields
  })

  let newAuthor

  return Promise.all(
    promises.map(
      (author, index) =>
        new Promise((resolve, reject) => {
          const authorId = author.id
          delete author.id
          setTimeout(() => {
            newAuthor = environment
              .createEntry("author", {
                fields: author,
              })
              .then(entry => entry.publish())
              .then(entry => {
                contentfulData.authorsById[authorId] = entry.sys.id
                console.log(`Success: ${entry.fields.slug["en-US"]}`)
              })
              .catch(error => {
                throw Error(error)
              })
            resolve(newAuthor)
          }, 1000 + 5000 * index)
        })
    )
  )
}

/**
 * Fetch all published assets from Contentful and store in a variable.
 * @param {String} environment - name of Contentful Environment.
 * @param {Array} assets - Array to store assets in.
 */
function getAndStoreAssets(environment, assets) {
  console.log(`Storing asset URLs in a global array to use later`)
  // Not supported with JS? Easier to get all assets and support
  axios
    .get(
      `https://api.contentful.com/spaces/${ctfData.spaceId}/environments/${ctfData.environment}/public/assets`,
      {
        headers: {
          Authorization: `Bearer ${ctfData.accessToken}`,
        },
      }
    )
    .then(result => {
      // console.log(result)
      contentfulData.assets = []
      for (const item of result.data.items) {
        contentfulData.assets.push(item.fields.file["en-US"].url)
      }

      createContentfulPosts(environment, assets)
    })
    .catch(err => {
      console.log(err)
      return error
    })
  console.log(`...Done!`)
  console.log(logSeparator)
}

/**
 * Create a Promise to publish all assets.
 * Note that, Timeout might not be needed here, but Contentful
 * rate limits were being hit.
 * @param {String} environment - Contentful Environment
 * @param {Array} promises - Contentful Asset data trees
 * @param {Array} assets - array to store Assets in
 */
function createContentfulAssets(environment, promises, assets) {
  return Promise.all(
    promises.map(
      (asset, index) =>
        new Promise(async resolve => {
          let newAsset
          // console.log(`Creating: ${post.slug['en-GB']}`)
          setTimeout(() => {
            try {
              newAsset = environment
                .createAsset({
                  fields: asset,
                })
                .then(asset => asset.processForAllLocales())
                .then(asset => asset.publish())
                .then(asset => {
                  console.log(
                    `Published Asset: ${asset.fields.file["en-US"].fileName}`
                  )
                  assets.push({
                    assetId: asset.sys.id,
                    fileName: asset.fields.file["en-US"].fileName,
                  })
                })
            } catch (error) {
              throw Error(error)
            }

            resolve(newAsset)
          }, 1000 + 5000 * index)
        })
    )
  )
}

/**
 * For each WordPress post, build the data for a Contentful counterpart.
 * @param {String} environment - Name of Contentful Environment.
 * @param {Array} assets - array to store Assets in
 */
function createContentfulPosts(environment, assets) {
  console.log(`Creating Contentful Posts...`)
  console.log(logSeparator)

  // let postFields = {}
  /**
   * Dynamically build our Contentful data object
   * using the keys we built whilst reducing the WP Post data.alias
   *
   * Results:
   *  postTitle: {
   *    'en-GB': wpPost.postTitle
   *   },
   *  slug: {
   *    'en-GB': wpPost.slug
   *  },
   */
  let promises = []

  for (const [_, post] of wpData.posts.entries()) {
    let postFields = {}

    for (let [postKey, postValue] of Object.entries(post)) {
      // console.log(`postKey: ${postValue}`)
      if (postKey === "content") {
        postValue = turndownService.turndown(postValue)
      }

      /**
       * Remove values/flags/checks used for this script that
       * Contentful doesn't need.
       */
      let keysToSkip = ["id", "type", "category", "author", "contentImages"]

      if (!keysToSkip.includes(postKey)) {
        postFields[postKey] = {
          "en-US": postValue,
        }
      }

      if (postKey === "category") {
        postFields[postKey] = {
          "en-US": {
            sys: {
              type: "Category",
              linkType: "Entry",
              id: contentfulData.categoriesById[postValue],
            },
          },
        }
      }

      if (postKey === "author") {
        postFields[postKey] = {
          "en-US": {
            sys: {
              type: "Author",
              linkType: "Entry",
              id: contentfulData.authorsById[postValue],
            },
          },
        }
      }

      if (postKey === "featuredImage" && postValue > 0) {
        let assetObj = assets.filter(asset => {
          if (asset.fileName === post.contentImages[0].link.split("/").pop()) {
            return asset
          }
        })[0]

        postFields.featuredImage = {
          "en-US": {
            sys: {
              type: "Link",
              linkType: "Asset",
              id: assetObj.assetId,
            },
          },
        }
      }

      // No image and Contentful will fail if value is '0', so remove.
      if (postKey === "featuredImage" && postValue === 0) {
        delete postFields.featuredImage
      }
    }
    promises.push(postFields)
  }

  console.log(`Post objects created, attempting to create entries...`)
  createContentfulEntries(environment, promises).then(result => {
    console.log(logSeparator)
    console.log(`Done!`)
    console.log(logSeparator)
    console.log(`The migration has completed.`)
    console.log(logSeparator)
  })
}

/**
 * For each post data tree, publish a Contentful entry.
 * @param {String} environment - Name of Contentful Environment.
 * @param {Array} promises - data trees for Contentful posts.
 */
function createContentfulEntries(environment, promises) {
  return Promise.all(
    promises.map(
      (post, index) =>
        new Promise(async resolve => {
          let newPost

          console.log(`Attempting: ${post.slug["en-US"]}`)

          setTimeout(() => {
            try {
              newPost = environment
                .createEntry("article", {
                  fields: post,
                })
                .then(entry => entry.publish())
                .then(entry => {
                  console.log(`Success: ${entry.fields.slug["en-US"]}`)
                })
            } catch (error) {
              throw Error(error)
            }

            resolve(newPost)
          }, 1000 + 5000 * index)
        })
    )
  )
}

/**
 * Convert WordPress content to Contentful Rich Text
 * Ideally we'd be using Markdown here, but I like the RichText editor 🤡
 *
 * Note: Abandoned because it did not seem worth the effort.
 * Leaving this here in case anybody does decide to venture this way.
 *
 * @param {String} content - WordPress post content.
 */
function formatRichTextPost(content) {
  // TODO: split  at paragraphs, create a node for each.
  console.log(logSeparator)

  // turndownService.remove('code')
  let markdown = turndownService.turndown(content)

  // console.log(logSeparator)
  // console.log(markdown)

  // let imageLinks = /!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g
  // let imageRegex = /<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/g

  // while (foundImage = imageLinks.exec(markdown)) {
  // console.log(foundImage[0])
  // let alt = foundImage[0].split('alt="')[1].split('"')[0]
  // }

  /**
   * https://www.contentful.com/developers/docs/concepts/rich-text/
   */

  /**
   *     "expected": [
   "blockquote",
   "embedded-asset-block",
   "embedded-entry-block",
   "heading-1",
   "heading-2",
   "heading-3",
   "heading-4",
   "heading-5",
   "heading-6",
   "hr",
   "ordered-list",
   "paragraph",
   "unordered-list"
   ]
   */

  // let contentor = {
  //   content: [
  //     {
  //       nodeType:"paragraph",
  //       data: {},
  //       content: [
  //         {
  //           value: content,
  //           nodeType:"text",
  //           marks: [],
  //           data: {}
  //         }
  //       ]
  //     },
  //     // {
  //     //   nodeType:"paragraph",
  //     //   data: {},
  //     //   content: [
  //     //     {
  //     //       value: "lorem hello world two",
  //     //       nodeType:"text",
  //     //       marks: [],
  //     //       data: {}
  //     //     }
  //     //   ]
  //     // },
  //   ],
  //   data: {},
  //   nodeType: 'document'
  // };

  return markdown
}

migrateContent()
