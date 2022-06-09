import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import React from 'react'
import { useState } from 'react'
// let loged = sessionStorage.getItem("login")
let loged = Cookies.get("email")
export default function Header() {
    const [popup, setPopup] = useState(false)
    const scrollToTop = (x) => {
        window.scrollTo({
            top: x,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
               in place of 'smooth' */
        });
    };
    return (
        <React.Fragment>
            <div className="header desktop">
                <Link to="/"><img src="src/logo.png" className="header__logo" id='header__logo' alt="logo" /></Link>
                <div className="header__function">
                    <div className="header__function__item hover_underline"><a href="/#newProduct">HOME</a>
                        <div className="underline"></div>
                    </div>
                    <div className="header__function__item hover_underline"><a href="/#newProduct">NEW PRODUCT</a>
                        <div className="underline"></div>
                    </div>
                    <div className="header__function__item hover_underline"><a href="/#news">ADVERTIDEMENT</a>
                        <div className="underline"></div>
                    </div>
                    <div className="header__function__item hover_underline"><a href="/#special">SPECIAL</a>
                        <div className="underline"></div>
                    </div>
                    <div className="header__function__item hover_underline"><a href="/#contact">CONTACT</a>
                        <div className="underline"></div>
                    </div>
                </div>
                <div className="header__user d-flex align-items-end">
                    <div className="header__user__search">
                        <input type="text" className="header__user__search__input" id="search" placeholder="Search" />
                        <label htmlFor="search"><i
                            className="fa-solid fa-magnifying-glass fa-2x header__user__item hover__input"></i></label>
                    </div>

                    {
                        loged ?
                            <>
                                <Link to="/user"><i className="fa-solid fa-user fa-2x header__user__item"></i></Link>
                                <Link to="/cart"><i className="fa-solid fa-cart-shopping fa-2x header__user__item"></i></Link>
                                <Link to="/wish-list"><i className="fa-regular fa-heart fa-2x header__user__item"></i></Link>
                            </>
                            :
                            <ul className="nav d-flex align-items-end">
                                <li className="nav-item"><a href="login" className="nav-link p-0 text-muted btn-lg">Login</a></li>
                                <li className="nav-item"><a href="#b" className="nav-link p-0 text-muted btn-lg">/</a></li>
                                <li className="nav-item"><a href="signup" className="nav-link p-0 text-muted btn-lg">Signup</a></li>

                            </ul>
                    }
                </div>
            </div>
            <div className='mobile fixed-top'>
                <nav className="navbar navbar-light bg-white">
                    <Link to="/"><img src="src/logo.png" className="header__logo" alt="logo" /></Link>
                    <button type="button" className="btn btn-outline-dark" onClick={() => { setPopup(true) }}>
                        <i className="fa-solid fa-bars"></i>
                    </button>


                    <div className={popup ? "navbar__overlay navbar__active" : "navbar__overlay"} onClick={() => { setPopup(false) }}>
                        <div className={popup ? "navbar__overlay__list navbar__active" : "navbar__overlay__list"}>
                            <i className="fa-solid fa-xmark rounded-circle border border-dark" ></i>
                            {
                                loged ?

                                    <div className='navbar__icon'>
                                        <Link to="/user"><i className="fa-solid fa-user fa-2x header__user__item"></i></Link>
                                        <Link to="/cart"><i className="fa-solid fa-cart-shopping fa-2x header__user__item"></i></Link>
                                        <Link to="/wish-list"><i className="fa-regular fa-heart fa-2x header__user__item"></i></Link>
                                    </div>
                                    :
                                    <div className="navbar__icon">
                                        <a href="login" className="nav-link p-0 text-muted btn-lg">Login</a>
                                        <a href="#b" className="nav-link p-0 text-muted btn-lg ml-1 mr-1">/</a>
                                        <a href="signup" className="nav-link p-0 text-muted btn-lg">Signup</a>
                                    </div>
                            }
                            <hr className="my-4" />

                            <img src="src/logo.png" className="header__logo" id='header__logo' alt="logo" />

                            <ul>
                                <li className="navbar__overlay__list__item"><Link onClick={()=>scrollToTop(0)} to="/" className="navbar__overlay__list__item__link">HOME</Link></li>
                                <li className="navbar__overlay__list__item"><Link onClick={()=>scrollToTop(1870)} to="/" className="navbar__overlay__list__item__link">NEW PRODUCT</Link></li>
                                <li className="navbar__overlay__list__item"><Link onClick={()=>scrollToTop(5400)} to="/" className="navbar__overlay__list__item__link">ADVERTIDEMENT</Link></li>
                                <li className="navbar__overlay__list__item"><Link onClick={()=>scrollToTop(5900)} to="/" className="navbar__overlay__list__item__link">SPECIAL</Link></li>
                                <li className="navbar__overlay__list__item"><Link onClick={()=>scrollToTop(10000)} to="/"  className="navbar__overlay__list__item__link">CONTACT</Link></li>
                            </ul>
                        </div>
                    </div>

                </nav>
            </div>
        </React.Fragment>
        
    )
    
}
