import Document, {Head, Html, Main, NextScript} from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8"/>
          <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>

          <link rel="shortcut icon" href="/favicon/favicon.ico" type="image/x-icon"/>
          <link rel="icon" href="/favicon/favicon.ico" type="image/x-icon"/>
          <link rel="dns-prefetch" href="//fonts.googleapis.com"/>
          <link rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600&display=swap"
                type="text/css" media="all"/>
          <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="true"/>
          <link rel="stylesheet" href="/css/vendors/bootstrap.css"/>
          <link rel="stylesheet" href="/fonts/font-awesome/css/font-awesome.css"/>
          <link rel="stylesheet" href="/css/vendors/magnific-popup.css"/>
        </Head>
        <body>
        <Main/>
        <NextScript/>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-53978CWP5N"></Script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
