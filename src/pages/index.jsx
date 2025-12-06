import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Layouts from "@layouts/Layouts";

import { getSortedPostsData } from "@library/posts";
import { getSortedProjectsData } from "@library/interactive";
import { getSortedServicesData } from "@library/services";
import { getSortedTeamData } from "@library/team";

import Waves from "@components/Waves";
import Technologies from "@components/sections/Technologies";
const Testimonial2Slider = dynamic(() => import("@components/sliders/Testimonial2"), { ssr: false });
import PartnersSection from "@components/sections/Partners";

const Home = (props) => {
  return (
    <Layouts darkHeader>
      <div className="app-section-fullscreen">
        <div className="intro-summary">
          <h2 className="app-title-2">
            <Link href="/about"><span data-splitting data-app-scroll>I am a software engineer <br />passionate about utilizing technology <br />to improve people's lives.</span></Link>
          </h2>
          {/*<h5><Link href="/about"><span data-splitting data-app-scroll>I specialize in building web applications, SaaS products, and design systems</span></Link></h5>*/}
        </div>
        <Waves />
      </div>
      <Technologies bg />
      <PartnersSection paddingTop title="Projects" />
      <Testimonial2Slider />
    </Layouts>
  );
};
export default Home;

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
