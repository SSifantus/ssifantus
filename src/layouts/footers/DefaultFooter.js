import appData from "@data/app.json";
import {useEffect} from "react";
import ImageView from "@components/ImageView";
import {footerSticky} from "@common/utilits";
import Link from "next/link";

const DefaultFooter = () => {
  useEffect(() => {
    footerSticky();
  }, []);

  return (
    <>
      {/* Footer */}
      <footer className="app-footer">
        <div className="footer--default">
          <div className="container-fluid">

            <div className="row">
              <div className="col-6 align-self-center">

                {/* Copyright */}
                <div className="copyright">
                  <Link href="/">
                    <div dangerouslySetInnerHTML={{__html: appData.footer.copy}}/>
                  </Link>
                </div>

              </div>
              <div className="col-6 align-right">

                {/* Social */}
                <div className="app-social-1 app-social-active">
                  <ul>
                    {appData.social.map((item, key) => (
                      <li key={`fsocial-item-${key}`}>
                        <a className="app-social-link app-hover-2" href={item.link} title={item.title} target="_blank">
                          <i className={item.icon}></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

          </div>
        </div>
      </footer>

      <ImageView/>
    </>
  );
};
export default DefaultFooter;
