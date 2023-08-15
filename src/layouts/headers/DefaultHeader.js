import Link from "next/link";
import {useEffect, useState} from "react";
import appData from "@data/app.json";
import {headerSticky} from "@common/utilits";

const DefaultHeader = ({darkHeader, cartButton}) => {
  const navItems = [];

  appData.header.menu.forEach((item, index) => {
    let s_class1 = 'dropdown-link';

    if (item.children != 0) {
      s_class1 += 'menu-item-has-children';
    }
    let newobj = Object.assign({}, item, {"classes": s_class1});
    navItems.push(newobj);
  });

  const [desktopMenu, desktopMenuToggle] = useState(false);

  const clickedDesktopMenu = (e) => {
    e.preventDefault();
    desktopMenuToggle(!desktopMenu);

    const menuPopup = document.querySelector('.app-menu-popup');
    const menuContainer = document.querySelector('.app-menu-container');
    const menuBody = document.querySelector('body');
    const menuHeader = document.querySelector('.app-header');
    const menuButton = document.querySelector('.app-menu-btn');

    if (desktopMenu) {
      menuBody.classList.remove('app--noscroll');
      menuHeader.classList.remove('header--active');
      menuPopup.classList.remove('menu--ready');
      menuContainer.classList.add('app--noscroll');
      menuButton.parentNode.classList.add('app--notouch');
      let timer1 = setTimeout(function () {
        menuPopup.classList.remove('menu--open');
      }, 300);
      let timer2 = setTimeout(function () {
        menuButton.parentNode.classList.remove('app--notouch');
        menuPopup.classList.remove('menu--visible');
      }, 1600);
    } else {
      menuBody.classList.add('app--noscroll');
      menuHeader.classList.add('header--active');
      menuPopup.classList.add('menu--visible');
      menuPopup.classList.add('menu--open');
      menuButton.parentNode.classList.add('app--notouch');
      let timer3 = setTimeout(function () {
        menuButton.parentNode.classList.remove('app--notouch');
        menuContainer.classList.remove('app--noscroll');
        menuPopup.classList.add('menu--ready');
      }, 600);
    }

  }
  const clickedMobileMenuItemParent = (e) => {
    e.preventDefault();
    e.target.parentNode.classList.toggle('opened');
  }

  useEffect(() => {
    headerSticky();
  }, []);

  return (
    <>
      {/* Header */}
      <header className="app-header">
        <div className="header--builder">
          <div className="container">
            <div className="row">
              <div className="col-4 col-xs-4 col-sm-4 col-md-4 col-lg-3 align-self-center">

                {/* Logo */}
                <div className="app-logo-image">
                  <Link href="/">
                    <img src={appData.header.logo.image} alt={appData.header.logo.alt}/>
                    <img className="logo--white" src={appData.header.logo.image_white} alt={appData.header.logo.alt}/>
                  </Link>
                </div>

              </div>
              <div className="col-4 col-xs-4 col-sm-4 col-md-4 col-lg-6 align-self-center align-center">

                {/* Menu Hamburger */}
                <a href="#" className={desktopMenu ? "app-menu-btn btn--active" : "app-menu-btn"}
                   onClick={(e) => clickedDesktopMenu(e)}><span/></a>

                <div className="app-menu-popup align-left">
                  <div className="app-menu-overlay"/>
                  <div className="app-menu-overlay-after"/>

                  <div className="app-menu-container app--noscroll">
                    <div className="container">
                      <div className="app-menu">
                        <ul className="app-menu-nav">
                          {navItems.map((item, key) => (
                            <li key={`header-nav-item-${key}`} className={item.classes}>
                              <Link
                                className={item.children ? "app-lnk lnk--active app-dropdown-toggle" : "app-lnk lnk--active"}
                                onClick={item.children != 0 ? (e) => clickedMobileMenuItemParent(e) : ""}
                                href={item.link}>{item.label}</Link>
                              {item.children &&
                                <i className="icon fas fa-chevron-down"/>
                              }
                              {item.children != 0 &&
                                <ul className="sub-menu">
                                  {item.children.map((subitem, key) => (
                                    <li key={`header-nav-sub-item-${key}`}>
                                      <Link className="app-lnk lnk--active" href={subitem.link}>{subitem.label}</Link>
                                    </li>
                                  ))}
                                </ul>
                              }
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className="col-4 col-xs-4 col-sm-4 col-md-4 col-lg-3 align-self-center align-right">

                {/* Button */}
                <Link className="app-head-btn app-hover-btn" href={appData.header.button.link}>
                  <span>
                    <span className="app-lnk lnk--active">{appData.header.button.label}</span>
                  </span>
                  <i className="arrow">
                    <span/>
                  </i>
                </Link>

              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default DefaultHeader;
