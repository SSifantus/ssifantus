import Data from "@data/sections/partners.json";
import Link from "next/link";

const PartnersSection = ( { paddingTop } ) => {
  return (
    <>
        {/*  Brands */}
        <section className={paddingTop ? "app-section gap-top-80 gap-bottom-80" : "app-section"}>
            <div className="container">

                {/* Heading */}
                <div className="app-heading gap-bottom-40">
                    <div className="app-subtitle-1">
                        <span dangerouslySetInnerHTML={{__html: Data.subtitle}} />
                    </div>
                    <h2 className="app-title-2">
                        <span dangerouslySetInnerHTML={{__html: Data.title}} />
                    </h2>
                </div>

                {/* Brands items */}
                <div className="row gap-row">
                    {Data.items.map((item, key) => (
                    <div key={`partners-item-${key}`} className="col-6 col-xs-6 col-sm-6 col-md-4 col-lg-3">
                        <div className="app-brands app-hover-3 app-hover-label" data-app-overlay data-app-scroll>
                            <Link href={item.link}>
                                <span className="image">
                                    <img decoding="async" src={item.image} width="285" height="200" alt={item.alt} />
                                </span>
                                <span className="label app-white-black">{item.label}</span>
                            </Link>
                        </div>
                    </div>
                    ))}
                </div>

            </div>
        </section>
    </>
  );
};

export default PartnersSection;
