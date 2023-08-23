import Link from "next/link";
import Isotope from "isotope-layout";
import {useEffect, useRef, useState} from "react";
import appData from "@data/app.json";
import ImageView from "@components/ImageView";

const ProjectsGrid = ({projects, layout, cols, sideFilter, masonry, galleryMode}) => {
  // Isotope
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");

  useEffect(() => {
    setTimeout(() => {
      isotope.current = new Isotope(".app-portfolio-items", {
        itemSelector: ".app-portfolio-col",
        percentPosition: true,
        masonry: {
          columnWidth: ".app-portfolio-col",
        },
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      });
    }, 1000);

    let filterNavActive = document.querySelectorAll('.app-filter-nav-active');

    filterNavActive.forEach((item) => {
      item.style.width = item.parentNode.querySelector('.item--active').parentNode.offsetWidth + 6 + 'px';
    });
  }, []);

  useEffect(() => {
    if (isotope.current) {
      filterKey === "*"
        ? isotope.current.arrange({filter: `*`})
        : isotope.current.arrange({filter: `.${filterKey}`});
    }
  }, [filterKey]);

  const handleFilterKeyChange = (key) => () => {
    setFilterKey(key);
    const filterLinks = document.querySelectorAll(".js-app-filter li");

    filterLinks.forEach((filter) => {
      const filterValue = filter.querySelector('button').getAttribute("data-filter");
      if (filterValue === key) {
        filter.querySelector('button').classList.add("item--active");
      } else {
        filter.querySelector('button').classList.remove("item--active");
      }
    });

    const activeItem = document.querySelector('.app-filter.filter--default .item--active');
    const activeFilterNav = document.querySelector('.app-filter.filter--default .app-filter-nav-active');

    if (activeFilterNav !== undefined) {
      let current_pos = activeItem.parentNode.offsetLeft;
      let current_width = activeItem.parentNode.offsetWidth;

      activeFilterNav.style.width = current_width + 6 + 'px';
      activeFilterNav.style.left = current_pos - 3 + 'px';
    }
  };

  let columns = '';

  switch (cols) {
    case "1" :
      columns = 'col-xs-12 col-sm-12 col-md-12 col-lg-12';
      break;
    case "2" :
      columns = 'col-xs-12 col-sm-12 col-md-6 col-lg-6';
      break;
    case "3" :
      columns = 'col-xs-12 col-sm-12 col-md-6 col-lg-4';
      break;
    default:
      columns = 'col-xs-12 col-sm-12 col-md-6 col-lg-6';
  }

  if (layout == "list") {
    columns = 'col-xs-12 col-sm-12 col-md-12 col-lg-12';
  }

  return (
    <>
      {/*  Projects */}
      <section className="app-section">
        <div className="container">

          {/* Projects Grid */}
          <div className={sideFilter ? "app-portfolio portfolio--side" : "app-portfolio"}>
            <div className="row">
              <div
                className={!sideFilter ? "col-xs-12 col-sm-12 col-md-12 col-lg-12" : "col-xs-12 col-sm-12 col-md-12 col-lg-3"}>

                {/* Filter projects */}
                <div className="app-filter-container">
                  <div
                    className={!sideFilter ? "app-filter js-app-filter filter--default" : "app-filter js-app-filter"}>
                    {!sideFilter &&
                      <div className="app-filter-nav-active"/>
                    }
                    <ul>
                      <li key={`categories-item-first`}>
                        <button onClick={handleFilterKeyChange("*")} className="app-filter-item item--active"
                                type="button" data-filter="*">
                          <span>All</span>
                        </button>
                      </li>
                      {appData.settings.portfolio.categories.map((item, key) => (
                        <li key={`categories-item-${key}`}>
                          <button onClick={handleFilterKeyChange(item.slug)} className="app-filter-item" type="button"
                                  data-filter={item.slug}>
                            <span>{item.label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
              <div
                className={!sideFilter ? "col-xs-12 col-sm-12 col-md-12 col-lg-12" : "col-xs-12 col-sm-12 col-md-12 col-lg-9"}>

                {/* Projects items */}
                <div className="row app-portfolio-items">

                  {projects.map((item, key) => (
                    <div key={`projects-item-${key}`} className={`${columns} app-portfolio-col ${item.category_slug}`}>
                      {layout === "grid" &&
                        <div className="app-portfolio-item">
                          <div className={masonry ? "image" : "image image-square"} data-app-scroll>
                            <Link href={galleryMode ? item.image : `/projects/${item.id}`}>
                              <img src={item.image} alt={item.title}/>
                              <div className="desc">
                                <h5 className="title">
                                  <span data-splitting data-app-scroll>{item.title}</span>
                                </h5>
                                <div className="text">
                                  <div data-splitting data-app-scroll>
                                    <span>{item.description}</span>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      }
                      {layout === "list" &&
                        <div className="app-portfolio-item app-portfolio-item-list">
                          <div className="image" data-app-overlay data-app-scroll>
                            <Link href={`/projects/${item.id}`}>
                              <img src={item.image} alt={item.title}/>
                            </Link>
                          </div>
                          <div className="desc">
                            <div className="text">
                              <div data-splitting data-app-scroll>
                                <span>{item.category}</span>
                              </div>
                            </div>
                            <h5 className="title">
                              <Link className="app-lnk" href={`/projects/${item.id}`}>
                                <span data-splitting data-app-scroll>{item.title}</span>
                              </Link>
                            </h5>
                            <div className="app-text">
                              <div>
                                <ul data-splitting="" data-app-scroll="">
                                  <li key={`projects-list-item-${key}-attr-1`}>
                                    <strong>Project Type</strong>
                                    <br/> {item.type}
                                  </li>
                                  <li key={`projects-list-item-${key}-attr-2`}>
                                    <strong>Team</strong>
                                    <br/> {item.team}
                                  </li>
                                  <li key={`projects-list-item-${key}-attr-3`}>
                                    <strong>Date</strong>
                                    <br/> {item.date}
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  ))}

                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      <ImageView/>
    </>
  );
};
export default ProjectsGrid;
