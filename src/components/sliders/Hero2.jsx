import { sliderProps } from "@common/sliderProps";
import { Swiper, SwiperSlide } from "swiper/react";

import Data from '@data/sliders/hero-2';
import Link from "next/link";

const Hero2Slider = () => {
  return (
    <>
        {/*  Hero */}
        <section className="app-section app-hero hero--two">

            {/* Hero swiper */}
            <Swiper
                {...sliderProps.hero2Slider}
                className="swiper-container js-hero-slider"
            >
                <div className="swiper-wrapper">
                    {Data.items.map((item, key) => (
                    <SwiperSlide key={`h2s-slide-${key}`} className="swiper-slide">
                        <div className="app-hero-slide-item">
                            {item.video == undefined &&
                            <div className="image" data-dimg={item.image.desktop} data-mimg={item.image.mobile}>
                                <div className="ovrl" style={{"opacity": "0.95"}} />
                            </div>
                            }
                            {item.video != undefined &&
                            <div className="image video">
                                <video autoPlay muted loop playsInline>
                                    <source src={item.video} type="video/mp4" />
                                </video>
                                <div className="ovrl" style={{"opacity": "0.95"}} />
                            </div>
                            }
                            <div className="container">
                                <div className="titles">
                                    <h1 className="title app-text-white">
                                        <span data-splitting dangerouslySetInnerHTML={{__html: item.title}} />
                                    </h1>
                                    <div className="text">
                                        <div className="subtitle app-text-white subtitle--left">
                                            <div data-splitting dangerouslySetInnerHTML={{__html: item.text}} />
                                        </div>
                                        <div className="app-bts">
                                            <Link className="app-btn btn--border btn--white btn--color app-hover-btn" href={item.button.link}>
                                                <i className="arrow">
                                                    <span />
                                                </i>
                                                <span>{item.button.label}</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    ))}
                </div>

                {/* navs */}
                <div className="app-navs js-hero-slider-navs">
                    <div className="app-prev js-hero-slider-prev nav--white app-hover-2">
                        <i />
                    </div>
                    <div className="app-paginations-container pag--white">
                        <div className="app-paginations js-hero-pagination" />
                        <div className="swiper-nav-active" />
                    </div>
                    <div className="app-next js-hero-slider-next nav--white app-hover-2">
                        <i />
                    </div>
                </div>
            </Swiper>

        </section>
    </>
  );
};
export default Hero2Slider;
