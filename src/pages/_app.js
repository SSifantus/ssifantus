import React, {useEffect} from "react";
import Head from "next/head";
import Script from "next/script";
import {useRouter} from "next/router"
import appData from "@data/app.json";
import * as gtag from "@common/gtag";

import '../styles/scss/style.scss';
import "../styles/globals.css";

import {register} from "swiper/element/bundle";
// register Swiper custom elements
register();

function MyApp({Component, pageProps}) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url)
    }
    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events]);

  return (
    <>
      <Head>
        <title>{appData.settings.siteName}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="HandheldFriendly" content="true"/>
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content="Samantha Sifantus"/>
        <meta property="og:title" content="Samantha Sifantus / Software Engineer"/>
        <meta property="og:url" content="https://ssifantus.com"/>
        <meta property="og:description" content="Samantha Sifantus / Software Engineer"/>
        <meta property="og:image" content="/images/og-image.jpg"/>
      </Head>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
