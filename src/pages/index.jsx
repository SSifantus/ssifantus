import React from "react";
import Layouts from "@layouts/Layouts";

import { getSortedPostsData } from "@library/posts";
import { getSortedProjectsData } from "@library/interactive";
import { getSortedServicesData } from "@library/services";
import { getSortedTeamData } from "@library/team";

import Waves from "@components/Waves";

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
