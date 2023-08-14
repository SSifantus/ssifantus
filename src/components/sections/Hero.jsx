import { useState, useEffect } from "react";

import Data from "@data/sections/hero.json";

import 'splitting/dist/splitting.css'
import 'splitting/dist/splitting-cells.css'
import Splitting from 'splitting'
import ScrollOut from 'scroll-out'

const HeroSection = () => {
	useEffect(() => {
		Splitting({ by: 'lines' });
		ScrollOut({targets: '[data-app-scroll]', once: true});
	
		const allWrap = document.querySelectorAll(".word");
		allWrap.forEach((item) => {
		  if ( !item.parentNode.classList.contains('span') ) {
			let wrapper = document.createElement('span');
			wrapper.classList.add('span');
			item.parentNode.insertBefore(wrapper, item);
			wrapper.appendChild(item);
		  }
		});
	
		const allOverlays = document.querySelectorAll("[data-app-overlay]");
		allOverlays.forEach((item) => {
		  let overlay = document.createElement("div");
		  overlay.classList.add('app-overlay');
		  item.appendChild(overlay);
		});
	}, []);

	const [mute, setMute] = useState(false);

	const clickedMuteHeroVideo = (e) => {
		e.preventDefault();
    	setMute(!mute);
	};

    return (
        <>
            {/*  Hero */}
			<section className="app-section app-hero">
				<div className="image">
					<video autoPlay muted={!mute} loop playsInline id="heroVideo">
						<source src={Data.video} type="video/mp4" />
					</video>
					<div className="ovrl" style={{"opacity": "0.25"}} />
				</div>
				<div className="container">
					<h1 className="title app-text-white">
						<span data-splitting data-app-scroll>
                            <span dangerouslySetInnerHTML={{__html: Data.title.text}} />
                            <span className="app-sep word">
								<i className="sep-img" style={{"backgroundImage": "url("+Data.title.icon+")"}} />
							</span>
						</span>
					</h1>
					<div className="text">
						<div className="subtitle app-text-white">
							<div data-splitting data-app-scroll>
                                <div dangerouslySetInnerHTML={{__html: Data.subtitle}} />
                            </div>
						</div>
					</div>
					<a href="#" className={mute ? "app-play-btn active" : "app-play-btn"} onClick={(e) => clickedMuteHeroVideo(e) }>
						<span className="play-circles" />
						<span className="play-lines">
							<span />
							<span />
							<span />
							<span />
						</span>
					</a>
				</div>
			</section>
        </>
    );
};

export default HeroSection;
