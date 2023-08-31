import React, {useEffect} from "react";
import dynamic from "next/dynamic";
import Layouts from "@layouts/Layouts";
import {getSortedTeamData} from "@library/team";
import {getSortedServicesData} from "@library/services";
import {circleText} from "@common/utilits";

import PageBanner from "@components/PageBanner";
import PartnersSection from "@components/sections/Partners";
import Technologies from "@components/sections/Technologies";
const Testimonial2Slider = dynamic(() => import("@components/sliders/Testimonial2"), {ssr: false});

const About = (props) => {
  useEffect(() => {
    circleText();
  }, []);

  return (
    <Layouts>
      <PageBanner pageTitle={"About"} />
      <section className="app-section gap-top-70">
        <div className="container">

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
                  {item.bio !== "" &&
                    <div dangerouslySetInnerHTML={{__html : item.bio}} />
                  }
                  <div className="row">
                    {item.languages?.length > 0 &&
                      <div className="col-xs-12 col-sm-4 tech">
                        <h6>Technologies</h6>
                        <ul>
                          {item.languages.map((tech, i) => (
                            <li key={`tech-item-${i}`}>
                              {tech.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    }
                    {item.roles?.length > 0 &&
                      <div className="col-xs-12 col-sm-6 tech">
                        <h6>Roles</h6>
                        <ul>
                          {item.roles.map((role, i) => (
                            <li key={`role-item-${i}`}>
                              {role}
                            </li>
                          ))}
                        </ul>
                      </div>
                    }
                  </div>
                </div>
              </div>
              </>
            ))}
        </div>
      </section>
      <Technologies/>
      <Testimonial2Slider/>
      <PartnersSection paddingTop title="Past projects" />
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
