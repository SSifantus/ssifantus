import Head from 'next/head';
import Link from "next/link";
import appData from "@data/app.json";
import {useRouter} from 'next/router';

const PageBanner = ({pageTitle, pageDesc}) => {
  const headTitle = `${pageTitle} / ${appData.settings.siteName}`;
  const {asPath} = useRouter();

  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      {/*  Intro */}
      <section className="app-section app-intro">
        <div className="container">
          {pageTitle?.length > 0 ?
            <h2 className="section-title hide-on-desktop">
              <span>{pageTitle}</span>
            </h2>
          : null}
        </div>
      </section>
    </>
  );
};
export default PageBanner;
