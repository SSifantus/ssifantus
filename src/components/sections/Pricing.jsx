import Data from "@data/sections/pricing.json";
import Link from "next/link";

const PricingSection = ( { bg, hiddenHeading } ) => {
    return (
      <>
        {/*  Pricing */}
        <section className={`app-section app-section-${bg} gap-top-140 gap-bottom-140`}>
          <div className="container">

            {hiddenHeading == undefined &&
            <>
              {/* Heading */}
              <div className="app-heading gap-bottom-40">
                <div className="app-subtitle-1">
                  <span>{Data.subtitle}</span>
                </div>
                <h2 className="app-title-2">
                  <span dangerouslySetInnerHTML={{__html: Data.title}} />
                </h2>
              </div>
            </>
            }

            {/* Pricing items */}
            <div className="row gap-row">

              {Data.items.map((item, key) => (
              <div key={`pricing-item-${key}`} className="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                <div className="app-pricing">
                  <div className={item.active == 1 ? "app-pricing-item active--default": "app-pricing-item"}>
                    { item.active == 1 &&
                    <div className="pricing--badge app-text-white">
                      <span>Recommended</span>
                    </div>
                    }
                    <div className="title">
                      <div className="name">
                        <span>{item.title}</span>
                      </div>
                      <div className="subname">
                        <span>{item.subtitle}</span>
                      </div>
                      <div className="price">
                        <span>{item.price}</span>
                      </div>
                    </div>
                    <div className="desc">
                      <div className="pricing--overlay app-hover-3 app-hover-black" />
                      <div className="image app-text-white">
                        <i aria-hidden="true" className={item.icon}></i>
                      </div>
                      <div className="list">
                        <div>
                          <ul>
                            {item.list.map((element, element_key) => (
                            <li key={`pricinglist${key}-item-${element_key}`} style={{"textDecoration": element.included == 0 ? "line-through" : "none"}}>
                              <i className="far fa-check-square" />{element.label}
                            </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <Link className="app-btn app-hover-btn btn--border btn--full btn--color" href={item.button.link}>
                        <span>{item.button.label}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              ))}

            </div>

          </div>
        </section>
    </>
    );
};

export default PricingSection;
