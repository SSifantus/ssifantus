import Head from 'next/head';
import Link from "next/link";
import appData from "@data/app.json";
import {useRouter} from 'next/router';

const PageBanner = ({pageTitle, pageDesc}) => {
  const headTitle = `${appData.settings.siteName} - ${pageTitle}`;
  const {asPath} = useRouter();

  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      {/*  Intro */}
      <section className="app-section app-intro">
        <div className="container">
          {pageDesc != "" &&
            <div className="app-subtitle-2  app-text-white">
              <span>{pageDesc}</span>
            </div>
          }
        </div>
      </section>
    </>
  );
};
export default PageBanner;
