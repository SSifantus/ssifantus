import React from "react";
import Head from "next/head";
import appData from "@data/app.json";

import '../styles/scss/style.scss';
import "../styles/globals.css";

import {register} from "swiper/element/bundle";
// register Swiper custom elements
register();

function MyApp({Component, pageProps}) {
  return (
    <>
      <Head>
        <title>{appData.settings.siteName}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="HandheldFriendly" content="true"/>
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content="Samantha Sifantus"/>
        <meta property="og:title" content="Samantha Sifantus"/>
        <meta property="og:url" content="https://ssifantus.com"/>
        <meta property="og:description" content="Samantha Sifantus / Software Engineer"/>
        <meta property="og:image" content="/images/og-image.jpg"/>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
