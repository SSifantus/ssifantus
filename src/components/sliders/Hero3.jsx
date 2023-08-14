import { sliderProps } from "@common/sliderProps";
import { Swiper, SwiperSlide } from "swiper/react";

import Data from '@data/sliders/hero-3';
import Link from "next/link";

const Hero3Slider = ( { projects } ) => {
  return (
    <>
        {/*  Hero Carousel */}
        <section className="app-section app-section-full align-center">
            <div className="container">

                {/* Hero swiper */}
                <div className="app-hero-carousel-wrap">
                <div className="app-hero-carousel">
                    <Swiper
                        {...sliderProps.hero3Slider}
                        className="swiper-container js-hero-carousel"
                    >
                        {projects.slice(0, Data.numOfItems).map((item, key) => (
                        <SwiperSlide key={`h2s-slide-${key}`} className="swiper-slide">
                            <div className="app-hero-carousel-item">
                                <div className="slide">
                                    <Link href={`/projects/${item.id}`}>
                                        <span className="img" style={{"backgroundImage": "url("+item.image+")"}} />
                                    </Link>
                                </div>
                                <div className="titles">
                                    <div className="subtitle">
                                        <div className="text-line-inner">
                                            <span data-splitting>{item.category}</span>
                                        </div>
                                    </div>
                                    <h5 className="title">
                                        <div className="text-line-inner">
                                            <Link href={`/projects/${item.id}`}>
                                                <span data-splitting>{item.title}</span>
                                            </Link>
                                        </div>
                                    </h5>
                                </div>
                            </div>
                        </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* navs */}
                    <div className="js-hero-carousel-navs">
                        <div className="app-prev js-hero-carousel-prev app-hover-2">
                            <i />
                        </div>
                        <div className="app-next js-hero-carousel-next app-hover-2">
                            <i />
                        </div>
                    </div>

                </div>
                </div>
            </div>
        </section>
    </>
  );
};
export default Hero3Slider;
