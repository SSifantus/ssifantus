import { sliderProps } from "@common/sliderProps";
import { Swiper, SwiperSlide } from "swiper/react";

import Data from '@data/sliders/testimonial';

const TestimonialSlider = () => {
  return (
    <>
        {/*  Reviews */}
        <section className="app-section gap-bottom-140">
            <div className="container">

                {/* Reviews */}
                <div className="app-reviews">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">

                            {/* Heading */}
                            <div className="app-reviews-titles">
                                <h2 className="app-title-2">
                                    <span data-splitting data-app-scroll>{Data.title}</span>
                                </h2>
                                <div className="app-reviews-summary">
                                    <span className="label app-text-black">
                                        <span data-splitting data-app-scroll>{Data.rating.value}</span>
                                    </span>
                                    <span className="app-stars">
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="fas fa-star" />
                                        <i className="far fa-star" />
                                    </span>
                                    <span className="label">
                                        <span data-splitting data-app-scroll>{Data.rating.label}</span>
                                    </span>
                                </div>
                            </div>

                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">

                            {/* Reviews swiper */}
                            <div className="app-reviews-carousel">
                                <Swiper
                                    {...sliderProps.testimonialSlider}
                                    className="swiper-container js-reviews-carousel"
                                >
                                    {Data.items.map((item, key) => (
                                    <SwiperSlide key={`tts-slide-${key}`} className="swiper-slide app-reviews-item">
                                        <div className="text">
                                            <div data-splitting>
                                                <p dangerouslySetInnerHTML={{__html: "“"+item.text+"”"}} />
                                            </div>
                                        </div>
                                        <span className="title">
                                            <span data-splitting>{item.name}</span>
                                        </span>
                                        <span className="subtitle">
                                            <span data-splitting>{item.role}</span>
                                        </span>
                                        <div className="app-stars stars--small">
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                            <i className="fas fa-star" />
                                        </div>
                                    </SwiperSlide>
                                    ))}
                                </Swiper>

                                {/* navs */}
                                <div className="js-reviews-carousel-navs">
                                    <div className="app-prev js-reviews-carousel-prev app-hover-2">
                                        <i />
                                    </div>
                                    <div className="app-next js-reviews-carousel-next app-hover-2">
                                        <i />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </>
  );
};
export default TestimonialSlider;
