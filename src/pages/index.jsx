import React from "react";
import Layouts from "@layouts/Layouts";
import dynamic from "next/dynamic";

import { getSortedPostsData } from "@library/posts";
import { getSortedProjectsData } from "@library/interactive";
import { getSortedServicesData } from "@library/services";
import { getSortedTeamData } from "@library/team";

import Waves from "@components/Waves";
import Services3Section from "@components/sections/Services3";
import Team2Section from "@components/sections/Team2"
import PricingSection from "@components/sections/Pricing"
import CallToAction2Section from "@components/sections/CallToAction2"
import PartnersSection from "@components/sections/Partners"

const Hero2Slider = dynamic( () => import("@components/sliders/Hero2"), { ssr: false } );
const Hero3Slider = dynamic( () => import("@components/sliders/Hero3"), { ssr: false } );
const Testimonial2Slider = dynamic( () => import("@components/sliders/Testimonial2"), { ssr: false } );
const HistorySlider = dynamic( () => import("@components/sliders/History"), { ssr: false } );
const LatestPostsSlider = dynamic( () => import("@components/sliders/LatestPosts"), { ssr: false } );

const Home3 = (props) => {
  return (
    <Layouts darkHeader>
      <div className="app-section-fullscreen">
        <Waves />
      </div>
    </Layouts>
  );
};
export default Home3;

export async function getStaticProps() {
  const allPosts = getSortedPostsData();
  const allServices = getSortedServicesData();
  const allProjects = getSortedProjectsData();
  const allTeam = getSortedTeamData();

  return {
    props: {
      posts: allPosts,
      projects: allProjects,
      services: allServices,
      team: allTeam
    }
  }
}
