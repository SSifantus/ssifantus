import dynamic from "next/dynamic";
import PageBanner from "@components/PageBanner";
import Layouts from "@layouts/Layouts";
import Link from "next/link";

import {getSortedTeamData} from "@library/team";

import CallToActionSection from "@components/sections/CallToAction";
import PartnersSection from "@components/sections/Partners"
const Testimonial2Slider = dynamic(() => import("@components/sliders/Testimonial2"), {ssr: false});

const Team = (props) => {
  return (
    <Layouts>
      <PageBanner pageTitle={"About"} pageDesc={"Meet our creativity company family."}/>

      {/*  Team */}
      <section className="app-section gap-top-140 gap-bottom-140">
        <div className="container">

          {/* Team items */}
          <div className="row gap-row align-center">

            {props.team.map((item, key) => (
              <div key={`team-item-${key}`} className="col-xs-12 col-sm-12 col-md-6 col-lg-3">
                <div className="app-team-two">
                  <div className="app-team-two-item">
                    <div className="image app-hover-3 app-hover-black-30" data-app-overlay data-app-scroll>
                      <Link href={`/team/${item.id}`}>
                        <img src={item.image} alt={item.name}/>
                      </Link>
                      <div className="app-social-2">
                        <ul>
                          {item.social.map((link, link_key) => (
                            <li key={`team-item-${key}-link-${link_key}`}>
                              <a key={`teamsocial-item-${link_key}`} className="app-social-link app-hover-2"
                                 href={link.link} title={link.title} target="_blank">
                                <i aria-hidden="true" className={link.icon}/>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="desc">
                      <h5 className="title">
                        <Link href={`/team/${item.id}`} className="app-lnk">
                          <span data-splitting data-app-scroll>{item.name}</span>
                        </Link>
                      </h5>
                      <div className="app-subtitle-1">
                        <span data-splitting data-app-scroll>{item.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Button */}
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 align-center align-self-center">
              <Link className="app-btn-circle app-hover-2" href={'/contact'}>
                <i className="arrow">
                  <span/>
                </i>
              </Link>
            </div>

          </div>

        </div>
      </section>

      <CallToActionSection/>
      <Testimonial2Slider/>

      <PartnersSection paddingTop/>

    </Layouts>
  );
};
export default Team;

export async function getStaticProps() {
  const allTeam = getSortedTeamData();

  return {
    props: {
      team: allTeam
    }
  }
}
