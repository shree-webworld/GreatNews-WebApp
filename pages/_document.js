import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      })

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html>
        <Head>
        <meta charSet="UTF-8"/>
        <meta name="description" content="This is a news website, contains news from renowned platforms like Inshorts, Google News, etc."/>
        <meta name="keywords" content="News,Inshorts, Google News,Breaking News, Headlines"/>
        <meta name="author" content="Shreedhar Sawant"/>

        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Bebas+Neue&family=Montserrat:wght@500&family=Open+Sans:wght@500&family=Oswald:wght@600&family=Playfair+Display:ital,wght@1,600&family=Raleway:ital,wght@0,600;1,500&family=Roboto:ital@1&family=Source+Sans+Pro:ital,wght@0,600;1,600&display=swap" rel="stylesheet"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
