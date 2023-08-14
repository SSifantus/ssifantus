import { sliderProps } from "@common/sliderProps";
import { Swiper, SwiperSlide } from "swiper/react";

import Data from '@data/sliders/hero-4';
import Link from "next/link";

const Hero4Slider = () => {
  return (
    <>
        {/*  Hero Parallax */}
        <section className="app-section">
            
            <Swiper
                {...sliderProps.hero4Slider}
                className="swiper-container app-hero-parallax js-hero-parallax"
            >
                {Data.items.map((item, key) => (
                <SwiperSlide key={`h4s-slide-${key}`} className="swiper-slide">
                <div className="app-hero-parallax-section">
                    <div className="image" data-dimg={item.image.desktop} data-mimg={item.image.mobile} />
                    <div className="container">
                        <div className="app-subtitle-1 app-text-white">
                            <span data-splitting>{item.subtitle}</span>
                        </div>
                        <div className="title app-text-white">
                            <span data-splitting dangerouslySetInnerHTML={{__html: item.title}} />
                            <span className="sep" style={{"backgroundImage": "url(/images/title_after.svg)"}} />
                        </div>
                        <div className="app-bts">
                            <Link className="app-btn btn--border app-hover-btn btn--color btn--white" href={item.button.link}>
                                <i className="arrow">
                                    <span></span>
                                </i>
                                <span>{item.button.label}</span>
                            </Link>
                        </div>
                    </div>
                </div>
                </SwiperSlide>
                ))}

                {/*navs*/}
                <div className="app-navs js-hero-parallax-navs">
                    <div className="app-prev js-hero-parallax-prev nav--white app-hover-2">
                        <i />
                    </div>
                    <div className="app-next js-hero-parallax-next nav--white app-hover-2">
                        <i />
                    </div>
                </div>
                
                {/*paginations*/}
                <div className="app-paginations-container app-paginations-container-vertical pag--white">
                    <div className="app-paginations js-hero-parallax-pagination" />
                    <div className="swiper-nav-active" />
                </div>
            </Swiper>
        </section>
    </>
  );
};
export default Hero4Slider;
