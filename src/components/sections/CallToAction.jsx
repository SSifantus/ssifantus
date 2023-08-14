import Data from "@data/sections/call-to-action.json";

const CallToActionSection = () => {
  return (
    <>
        {/*  CTA */}
        <section className="app-section gap-top-140 gap-bottom-140" style={{"backgroundImage": "url("+Data.bg_image+")", "backgroundPosition": "center center", "backgroundRepeat": "no-repeat", "backgroundSize": "cover"}}>
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">

                        {/* Heading */}
                        <div className="app-heading gap-bottom-40 app-text-white">
                            <div className="app-subtitle-1">
                                <span>{Data.subtitle}</span>
                            </div>
                            <h2 className="app-title-2">
                                <span dangerouslySetInnerHTML={{__html: Data.title}} />
                            </h2>
                        </div>

                        {/* Text */}
                        <div className="app-cta-text" dangerouslySetInnerHTML={{__html: Data.text}} />
                            
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">

                        {/* Social */}
                        <div className="app-cta-social">
                            <div className="image" style={{"backgroundImage": "url("+ Data.bg_image2 +")"}}>
                                <div className="cta-img-circle img-circle--1" />
                                <div className="cta-img-circle img-circle--2" />
                                <div className="cta-img-circle img-circle--3" />
                            </div>
                            <div className="desc">
                                <ul>
                                    {Data.social.map((item, key) => (
                                    <li key={`cta-social-item-${key}`}>
                                        <a className="app-btn btn--white btn--large btn--icon app-hover-btn" href={item.link} target="_blank">
                                            <i aria-hidden="true" className={item.icon} />
                                            <span>{item.title}</span>
                                        </a>
                                    </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    </>
  );
};

export default CallToActionSection;
