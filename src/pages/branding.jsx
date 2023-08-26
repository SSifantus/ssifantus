import Layouts from "@layouts/Layouts";
import dynamic from "next/dynamic";

import { getSortedDesignsData } from "@library/design";

import PageBanner from "@components/PageBanner";

const SquareGrid = dynamic( () => import("@components/SquareGrid"), { ssr: false } );

const Design = (props) => {
  return (
    <Layouts>
      <PageBanner pageTitle={"Branding"} />

      <SquareGrid projects={props.projects} cols={"5"} layout={"grid"} galleryMode />

    </Layouts>
  );
};
export default Design;

export async function getStaticProps() {
  const allProjects = getSortedDesignsData();

  return {
    props: {
      projects: allProjects
    }
  }
}
