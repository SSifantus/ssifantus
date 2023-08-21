import {useEffect} from "react";
import dynamic from "next/dynamic";
import Layouts from "@layouts/Layouts";
import {getSortedTeamData} from "@library/team";
import {getSortedServicesData} from "@library/services";
import {circleText} from "@common/utilits";

import PageBanner from "@components/PageBanner";
import Link from "next/link";

const HistorySlider = dynamic(() => import("@components/sliders/History"), {ssr: false});
const Testimonial2Slider = dynamic(() => import("@components/sliders/Testimonial2"), {ssr: false});

const About = (props) => {
  useEffect(() => {
    circleText();
  }, []);

  return (
    <Layouts>
      <PageBanner pageTitle={"About"} />
      <section className="app-section gap-top-70 gap-bottom-80">
        <div className="container-md">

            {props.team.map((item, key) => (
              <>
              <div key={`team-item-${key}`} className="row gap-row">
                <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                  <div className="app-team-two-item">
                    <div className="image" data-app-overlay data-app-scroll>
                      <img src={item.image} alt={item.name}/>
                    </div>
                  </div>
                </div>
                <div className="bio col-xs-12 col-sm-12 col-md-9 col-lg-9">
                  {item.bio != "" &&
                    <span data-splitting data-app-scroll><div dangerouslySetInnerHTML={{__html : item.bio}} /></span>
                  }
                  <div className="row">
                    {item.languages?.length > 0 &&
                      <div className="col-xs-12 col-sm-4 tech">
                        <ul>
                          {item.languages.map((tech, key) => (
                            <li key={`tech-item-${key}`}>
                              {tech.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    }
                    {item.roles?.length > 0 &&
                      <div className="col-xs-12 col-sm-6 tech">
                        <ul>
                          {item.roles.map((role, key) => (
                            <li key={`tech-item-${key}`}>
                              {role}
                            </li>
                          ))}
                        </ul>
                      </div>
                    }
                  </div>
                </div>
              </div>
              <div className="row">
                {typeof item.icons != "undefined" &&
                  <div className="social-share app-post-socials app-social-2 align-center">
                    <ul>
                      {item.icons.map((lang, key) => (
                        <li key={`teamsocial-item-${key}`}>
                          <a className="app-social-link app-hover-2" href={lang.link} title={lang.title} target="_blank">
                            <i aria-hidden="true" className={lang.icon} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                }
              </div>
              </>
            ))}
        </div>
      </section>
      <Testimonial2Slider/>
    </Layouts>
  );
};
export default About;

export async function getStaticProps() {
  const allTeam = getSortedTeamData();
  const allServices = getSortedServicesData();

  return {
    props: {
      team: allTeam,
      services: allServices
    }
  }
}
