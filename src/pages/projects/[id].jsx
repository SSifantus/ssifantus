import Layouts from "@layouts/Layouts";
import PageBanner from "@components/PageBanner";
import Link from "next/link";
import ImageView from "@components/ImageView";

import {useRouter} from 'next/router';

import {getSortedProjectsData, getAllProjectsIds, getProjectData} from "@library/projects";

const ProjectDetail = (props) => {

  const postData = props.data;
  let prev_id, next_id, prev_key, next_key = 0;

  props.projects.forEach(function (item, key) {
    if (item.id == postData.id) {
      prev_key = key - 1;
      next_key = key + 1;
    }
  })

  props.projects.forEach(function (item, key) {
    if (key == prev_key) {
      prev_id = item.id;
    }
    if (key == next_key) {
      next_id = item.id;
    }
  });

  return (
    <Layouts>
      <PageBanner pageTitle={postData.title} />
      <section className="app-section">
        <div className="container-md">

          {/* Image */}
          <div className="gap-bottom-80">
            <div className="project-image">
              <img src={postData.image} alt={postData.title}/>
            </div>
          </div>

          <div className="row gap-bottom-80">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-7">
              <h5 className="hide-on-mobile">{postData.title}</h5>
              <div className="app-project-summary">
                <ul>
                  <li><span>Client:</span> {postData.client}</li>
                  <li><span>Project:</span> <p>{postData.description} {postData?.type ? <>
                    <br/>{postData.type}</> : null}</p></li>
                  {/*<li><span>Launched:</span> {postData.date}</li>*/}
                </ul>
              </div>
              {postData.contentHtml != "" &&
                <>
                  <div className="app-text">
                    <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
                  </div>
                </>
              }

            </div>
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4 offset-lg-1">


            </div>
          </div>

          {typeof postData.gallery != "undefined" &&
            <>
              {/* Gallery items */}
              <div className="row gap-row gallery-items app-custom-gallery">

                {postData.gallery.items.map((item, key) => (
                  <div key={`gallery-item-${key}`} className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="gallery-item">
                      <a href={item.image} className="mfp-image">
                        <img src={item.image} alt={item.alt}/>
                      </a>
                    </div>
                  </div>
                ))}

              </div>
            </>
          }

          {typeof postData.additional != "undefined" &&
            <>
              {/* Description */}
              <div className="app-text gap-top-80">
                <h6 className="text-uppercase">{postData.additional.heading}</h6>
                <div dangerouslySetInnerHTML={{__html: postData.additional.content}}/>
              </div>
            </>
          }

        </div>
      </section>

      {/*  Navs */}
      <section className="app-section">
        <div className="container">

          {/* Navigation */}
          <div className="app-page-navigation">
            <div className="app-page-navigation-content">
              {prev_id != 0 && prev_id != undefined &&
                <Link href={`/projects/${prev_id}`} className="page-navigation__prev">
                  <span className="app-prev app-hover-2">
                    <i/>
                  </span>
                </Link>
              }
              <Link href="/projects" className="page-navigation__posts">
                <i className="fas fa-grid-4"/>
              </Link>
              {next_id != 0 && next_id != undefined &&
                <Link href={`/projects/${next_id}`} className="page-navigation__next">
                  <span className="app-next app-hover-2">
                    <i/>
                  </span>
                </Link>
              }
            </div>
          </div>

        </div>
      </section>

      <ImageView/>

    </Layouts>
  );
};
export default ProjectDetail;

export async function getStaticPaths() {
  const paths = getAllProjectsIds()

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({params}) {
  const postData = await getProjectData(params.id)
  const allProjects = await getSortedProjectsData()

  return {
    props: {
      data: postData,
      projects: allProjects
    }
  }
}
