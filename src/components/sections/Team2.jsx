import React from "react";
import Data from "@data/sections/team2.json";
import Link from "next/link";

const Team2Section = ({team}) => {
  return (
    <>
      <section className="app-section gap-top-90 gap-bottom-90">
        <div className="container home-intro">

          <div className="row gap-row">
            <div className="col-xs-12 col-sm-12 col-md-1 col-lg-1"></div>
            <div className="col-xs-12 col-sm-12 col-md-11 col-lg-7">
              <div className="app-heading">
                <h2 className="app-title-2">
                  <span data-splitting data-app-scroll dangerouslySetInnerHTML={{__html: Data.title}}/>
                </h2>
              </div>
              <h5><span data-splitting data-app-scroll dangerouslySetInnerHTML={{__html: Data.subtitle}}/></h5>
            </div>


            {team.slice(0, Data.numOfItems).map((item, key) => (

              <div key={`team2-item-${key}`} className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                <div className="app-team-two">
                  <div className="app-team-two-item">
                    <div className="image app-hover-3 app-hover-black-30" data-app-overlay data-app-scroll>
                      <Link href={`/about`}>
                        <img src={item.image} alt={item.name}/>
                      </Link>
                      <div className="app-social-2">
                        <ul>
                          {item.social.map((social, social_key) => (
                            <li key={`team2-item-${key}-social-${social_key}`}>
                              <a className="app-social-link app-hover-2" href={social.link} title={social.title}
                                 target="_blank">
                                <i aria-hidden="true" className={social.icon}/>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            ))}

          </div>

        </div>
      </section>
    </>
  );
};

export default Team2Section;
