import Layouts from "@layouts/Layouts";
import PageBanner from "@components/PageBanner";
import Link from "next/link";
import ImageView from "@components/ImageView";

import {useRouter} from 'next/router';

import {getSortedProjectsData, getAllProjectsIds, getProjectData} from "@library/interactive";

const ProjectDetail = (props) => {

  const postData = props.data;
  let prev_id, next_id, prev_key, next_key = 0;

  props.projects.forEach(function (item, key) {
    if (item.id === postData.id) {
      prev_key = key - 1;
      next_key = key + 1;
    }
  })

  props.projects.forEach(function (item, key) {
    if (key === prev_key) {
      prev_id = item.id;
    }
    if (key === next_key) {
      next_id = item.id;
    }
  });

  const media = postData?.video ?? <img src={postData.image} alt={postData.title}/>;

  return (
    <Layouts>
      <PageBanner pageTitle={postData.title} />
      <section className="app-section">
        <div className="container-md">

          <div className="gap-bottom-60">
            <div className="project-image">
              {postData?.link ? (
                <Link href={postData.link} target="_blank">{media}</Link>
              ) : media}
            </div>
          </div>

          <div className="row gap-bottom-60">
            <div className="col-sm-7 col-md-7">
              <h5 className="hide-on-mobile">{postData.title}</h5>
              <div className="app-project-summary">
                <ul>
                  <li><span>Project:</span> <p>{postData.description}</p></li>
                  <li><span>Client:</span> {postData.client} {postData?.type ? <>
                    <br/>{postData.type}</> : null}</li>
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
            <div className="col-sm-5 col-md-5">
              {postData.roles?.length > 0 ? (
                <div className="project-roles">
                  <h6>Project Role</h6>
                  <ul>
                    {postData.roles.map((item, i) => (
                      <li key={`role-item-${i}`}>{item}</li>
                    ))}
                  </ul></div>)
                 : null}
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
        <div className="container-fluid">
          <div className="app-page-navigation projects">
            <div className="app-page-navigation-content">
              {prev_id !== 0 && prev_id !== undefined &&
                <Link href={`/interactive/${prev_id}`} className="page-navigation__prev">
                  <span className="app-prev-arrow">
                    <i/>
                  </span>
                </Link>
              }
              <Link href="/interactive" className="page-navigation__posts">
                <i className="fas fa-grid-4"/>
              </Link>
              {next_id !== 0 && next_id !== undefined &&
                <Link href={`/interactive/${next_id}`} className="page-navigation__next">
                  <span className="app-next-arrow">
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
