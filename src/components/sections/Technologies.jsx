import Data from "@data/sections/technologies.json";
import React from "react";

const Technologies = ({bg}) => {
  return (
    <>
      <section className={`app-section app-section-${bg ? "bg" : ""} gap-bottom-80`}>
        <div className="container">
          <div className="row">

            <div className="social-share app-post-socials app-social-2 align-center">
              <ul>
               {Data.items.map((item, i) => (
                  <li key={`icon-item-${i}`}>
                    <a className="app-social-link" title={item.label}>
                      <i aria-hidden="true" className={item.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Technologies;
