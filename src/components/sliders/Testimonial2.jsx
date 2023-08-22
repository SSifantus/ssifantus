import { sliderProps } from "@common/sliderProps";
import { Swiper, SwiperSlide } from "swiper/react";

import Data from '@data/sliders/testimonial2';

const Testimonial2Slider = () => {
  return (
    <>
        {/*  Reviews */}
        <section className="app-section app-section-bg">
            <div className="container">

                {/* Reviews */}
                <div className="app-reviews gap-80">
                    <div style={{"backgroundImage": "url("+Data.bg_image+")", "backgroundPosition": "center center", "backgroundRepeat": "no-repeat", "backgroundSize": "cover", "position": "absolute", "left": "0", "top": "0", "width": "100%", "height": "100%", "opacity": "0.24"}} />
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                            {/* Reviews swiper */}
                            <div className="app-reviews-carousel reviews--full align-center">
                                <Swiper
                                    {...sliderProps.testimonialSlider}
                                    className="swiper-container js-reviews-carousel"
                                >
                                    <div className="swiper-wrapper">
                                        {Data.items.map((item, key) => (
                                        <SwiperSlide key={`tst2-slide-${key}`} className="swiper-slide app-reviews-item">
                                            <div className="text">
                                                <div data-splitting>
                                                    <p dangerouslySetInnerHTML={{__html: "“"+item.text+"”"}} />
                                                </div>
                                            </div>
                                            <span className="title">
                                                <span data-splitting>{item.name}</span>
                                            </span>
                                            <span className="subtitle">
                                                <span data-splitting>, {item.role}</span>
                                            </span>
                                        </SwiperSlide>
                                        ))}
                                    </div>
                                </Swiper>

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
export default Testimonial2Slider;
