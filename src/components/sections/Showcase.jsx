import Data from "@data/sections/showcase.json";
import Link from "next/link";
import { useEffect } from "react";

import { showcaseHover } from "@common/utilits";

const ShowcaseSection = ( { projects } ) => {
	useEffect(() => {
		showcaseHover();
	}, []);

    return (
        <>
            {/*  Showcase */}
			<section className="app-section gap-bottom-140" style={{"borderBottom": "1px solid #555"}}>
				<div className="container">

					{/* Heading */}
					<div className="app-heading gap-bottom-40">
						<div className="app-subtitle-1">
							<span>{Data.subtitle}</span>
						</div>
						<h2 className="app-title-2">
							<span>{Data.title}</span>
						</h2>
					</div>

					{/* Showcase */}
					<div className="app-showcase gap-bottom-40">
						<div className="img-circle app-circle-move" />

						{/* Showcase items */}
						<div className="app-showcase-items">
                            {projects.slice(0, Data.numOfItems).map((item, key) => (
							<div key={`showcase-item-${key}`} className="app-showcase-item">
								<div className="category">
									<a href={`/projects/${item.id}`}>
										<span data-splitting data-app-scroll>
											<span>{item.category}</span>
										</span>
									</a>
								</div>
								<h3 className="title">
									<a href={`/projects/${item.id}`}>
										<span className="app-lnk" data-splitting data-app-scroll>{item.title}</span>
									</a>
								</h3>
								<div className="image" data-app-overlay data-app-scroll>
									<span className="img" style={{"backgroundImage": "url(" + item.image + ")"}} />
								</div>
							</div>
                            ))}
						</div>
                        
					</div>

					{/* Button */}
					<Link className="app-btn app-hover-btn" href={Data.button.link}>
						<i className="arrow">
							<span />
						</i>
						<span>{Data.button.label}</span>
					</Link>

				</div>
			</section>
        </>
    );
};

export default ShowcaseSection;
