import Link from "next/link";
import Isotope from "isotope-layout";
import { useEffect, useRef, useState } from "react";
import appData from "@data/app.json";
import ImageView from "@components/ImageView";

const ProjectsGrid = ({ projects, layout, cols, sideFilter, masonry, galleryMode }) => {
    // Isotope
    const isotope = useRef();
    const [filterKey, setFilterKey] = useState("*");
    const hasInitialized = useRef(false);

    useEffect(() => {
        const imageLoadHandlers = [];

        const initializeIsotope = () => {
            if (hasInitialized.current || isotope.current) return;

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

            hasInitialized.current = true;

            // Initialize filter nav active width
            let filterNavActive = document.querySelectorAll('.app-filter-nav-active');
            filterNavActive.forEach((item) => {
                const activeItem = item.parentNode.querySelector('.item--active');
                if (activeItem) {
                    item.style.width = activeItem.parentNode.offsetWidth + 6 + 'px';
                }
            });

            // Recalculate layout after a brief delay to ensure DOM is ready
            setTimeout(() => {
                if (isotope.current) {
                    isotope.current.layout();
                }
            }, 100);
        };

        const initIsotope = () => {
            const container = document.querySelector(".app-portfolio-items");
            if (!container || hasInitialized.current) return;

            // Wait for images to load before initializing Isotope
            const images = container.querySelectorAll("img");
            const totalImages = images.length;

            if (totalImages === 0) {
                // No images, initialize immediately
                initializeIsotope();
                return;
            }

            let loadedImages = 0;
            let isInitializing = false;

            const checkImagesLoaded = () => {
                if (isInitializing) return;
                loadedImages++;
                if (loadedImages === totalImages && !hasInitialized.current) {
                    // All images loaded, initialize Isotope
                    isInitializing = true;
                    initializeIsotope();
                }
            };

            // Check if images are already loaded
            images.forEach((img) => {
                if (img.complete && img.naturalHeight !== 0) {
                    // Image already loaded
                    checkImagesLoaded();
                } else {
                    // Wait for image to load
                    const loadHandler = () => checkImagesLoaded();
                    const errorHandler = () => checkImagesLoaded();
                    img.addEventListener("load", loadHandler);
                    img.addEventListener("error", errorHandler);
                    imageLoadHandlers.push({ img, loadHandler, errorHandler });
                }
            });
        };

        // Small delay to ensure DOM is ready
        const timeoutId = setTimeout(initIsotope, 100);

        return () => {
            clearTimeout(timeoutId);
            // Clean up image load event listeners
            imageLoadHandlers.forEach(({ img, loadHandler, errorHandler }) => {
                img.removeEventListener("load", loadHandler);
                img.removeEventListener("error", errorHandler);
            });
            imageLoadHandlers.length = 0;
            if (isotope.current) {
                isotope.current.destroy();
                isotope.current = null;
                hasInitialized.current = false;
            }
        };
    }, []);

    useEffect(() => {
        if (isotope.current) {
            filterKey === "*"
                ? isotope.current.arrange({ filter: `*` })
                : isotope.current.arrange({ filter: `.${filterKey}` });
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
        case "1":
            columns = 'col-xs-12 col-sm-12 col-md-12 col-lg-12';
            break;
        case "2":
            columns = 'col-xs-12 col-sm-12 col-md-6 col-lg-6';
            break;
        case "3":
            columns = 'col-xs-12 col-sm-12 col-md-6 col-lg-4';
            break;
        default:
            columns = 'col-xs-12 col-sm-12 col-md-6 col-lg-6';
    }

    if (layout === "list") {
        columns = 'col-xs-12 col-sm-12 col-md-12 col-lg-12';
    }

    return (
        <>
            <section className="app-section">
                <div className="container">
                    <div className={sideFilter ? "app-portfolio portfolio--side" : "app-portfolio"}>
                        <div className="row">
                            <div
                                className={!sideFilter ? "col-xs-12 col-sm-12 col-md-12 col-lg-12" : "col-xs-12 col-sm-12 col-md-12 col-lg-3"}>
                                <div className="app-filter-container">
                                    <h2 className="section-title hide-on-mobile">Work</h2>
                                    <div
                                        className={!sideFilter ? "app-filter js-app-filter filter--default" : "app-filter js-app-filter"}>
                                        {!sideFilter &&
                                            <div className="app-filter-nav-active" />
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

                                <div className="row app-portfolio-items">

                                    {projects.map((item, key) => (
                                        <div key={`projects-item-${key}`} className={`${columns} app-portfolio-col ${item.category_slug}`}>
                                            {layout === "grid" &&
                                                <div className="app-portfolio-item">
                                                    <div className={masonry ? "image" : "image image-square"} data-app-overlay data-app-scroll>
                                                        <Link href={galleryMode ? item.image : `/interactive/${item.id}`}>
                                                            <img src={item.image} alt={item.title} />
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
                                                        <Link href={`/interactive/${item.id}`}>
                                                            <img src={item.image} alt={item.title} />
                                                        </Link>
                                                    </div>
                                                    <div className="desc">
                                                        <div className="text">
                                                            <div data-splitting data-app-scroll>
                                                                <span>{item.category}</span>
                                                            </div>
                                                        </div>
                                                        <h5 className="title">
                                                            <Link className="app-lnk" href={`/interactive/${item.id}`}>
                                                                <span data-splitting data-app-scroll>{item.title}</span>
                                                            </Link>
                                                        </h5>
                                                        <div className="app-text">
                                                            <div>
                                                                <ul data-splitting="" data-app-scroll="">
                                                                    <li key={`projects-list-item-${key}-attr-1`}>
                                                                        <strong>Project Type</strong>
                                                                        <br /> {item.type}
                                                                    </li>
                                                                    <li key={`projects-list-item-${key}-attr-2`}>
                                                                        <strong>Team</strong>
                                                                        <br /> {item.team}
                                                                    </li>
                                                                    <li key={`projects-list-item-${key}-attr-3`}>
                                                                        <strong>Date</strong>
                                                                        <br /> {item.date}
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

            <ImageView />
        </>
    );
};
export default ProjectsGrid;
