import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import React from "react";
import { useState, useContext,useEffect } from "react";
import userContext from "../context/usercontext";
import axios from "axios";
// let loged = sessionStorage.getItem("login")
let loged = Cookies.get("email");
export default function Header() {
  const UserContext = useContext(userContext);
  const [popup, setPopup] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost/api/customer/read_single.php?cid=" + loged)
      .then((res) => {
        UserContext.setUserWishlist(
          res.data.wishlist !== null ? JSON.parse(res.data.wishlist) : []
        );
      });
  }, [UserContext.clickBtn]);
  
  const scrollTo = (className) => {
    document.getElementsByClassName(className)[0].scrollIntoView({
      alignToTop: true,
      behavior: "smooth",
    });
  };
  return (
    <React.Fragment>
      <div className="header desktop">
        <Link to="/">
          <img
            src="src/logo.png"
            className="header__logo"
            id="header__logo"
            alt="logo"
          />
        </Link>
        <div className="header__function">
          <div className="header__function__item hover_underline">
            <Link to="/" onClick={() => scrollTo("title__advertisement")}>
              HOME
            </Link>
            <div className="underline"></div>
          </div>
          <div className="header__function__item hover_underline">
            <Link to="/" onClick={() => scrollTo("newProduct__title")}>
              NEW PRODUCT
            </Link>
            <div className="underline"></div>
          </div>
          <div className="header__function__item hover_underline">
            <Link to="/" onClick={() => scrollTo("specialItem")}>
              SPECIAL
            </Link>
            <div className="underline"></div>
          </div>
          <div className="header__function__item hover_underline">
            <Link to="/" onClick={() => scrollTo("discount")}>
              DISCOUNT
            </Link>
            <div className="underline"></div>
          </div>
          <div className="header__function__item hover_underline">
            <Link to="/" onClick={() => scrollTo("footer")}>
              CONTACT
            </Link>
            <div className="underline"></div>
          </div>
        </div>
        <div className="header__user d-flex align-items-end">
          <div className="header__user__search">
            <input
              type="text"
              className="header__user__search__input"
              id="search"
              placeholder="Search"
            />
            <label htmlFor="search">
              <i className="fa-solid fa-magnifying-glass fa-2x header__user__item hover__input"></i>
            </label>
          </div>

          {loged ? (
            <>
              <Link to="/user">
                <i className="fa-solid fa-user fa-2x header__user__item"></i>
              </Link>
              <Link to="/cart">
                <i className="fa-solid fa-cart-shopping fa-2x header__user__item">
                <strong 
                    style={{
                        color: "black",
                        fontSize: "1.2vw",
                        fontWeight: "bold",
                        position: "absolute",
                        marginTop: "-0.9vw",
                        marginLeft: "1.4vw",
                        backgroundColor: "white",
                        borderRadius: "50%",
                        width: "1.5vw",
                        height: "1.5vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                  >{UserContext.userWishlist.length}</strong>
                </i>
              </Link>
              <Link to="/wish-list">
                <i className="fa-regular fa-heart fa-2x"
                    style={{ color: "#ff0000" }}
                >
                  <strong 
                    style={{
                        color: "red",
                        fontSize: "1.2vw",
                        fontWeight: "bold",
                        position: "absolute",
                        marginTop: "-0.9vw",
                        marginLeft: "1.4vw",
                        backgroundColor: "white",
                        borderRadius: "50%",
                        width: "1.5vw",
                        height: "1.5vw",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                  >{UserContext.userWishlist.length}</strong>
                </i>
              </Link>
            </>
          ) : (
            <ul className="nav d-flex align-items-end">
              <li className="nav-item">
                <a href="login" className="nav-link p-0 text-muted btn-lg">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a href="#b" className="nav-link p-0 text-muted btn-lg">
                  /
                </a>
              </li>
              <li className="nav-item">
                <a href="signup" className="nav-link p-0 text-muted btn-lg">
                  Signup
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="mobile fixed-top">
        <nav className="navbar navbar-light bg-white">
          <Link to="/">
            <img src="src/logo.png" className="header__logo" alt="logo" />
          </Link>
          <div className="header__name__overlay">
            <img className="header__name" src="src/store.png" alt="" />
          </div>
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={() => {
              setPopup(true);
            }}
          >
            <i className="fa-solid fa-bars" style={{ color: "#000000" }}></i>
          </button>

          <div
            className={
              popup ? "navbar__overlay navbar__active" : "navbar__overlay"
            }
          >
            <div
              className={
                popup
                  ? "navbar__overlay__list navbar__active"
                  : "navbar__overlay__list"
              }
            >
              <i
                onClick={() => {
                  setPopup(false);
                }}
                className="fa-solid fa-xmark rounded-circle border border-dark"
                style={{ color: "#000000" }}
              ></i>
              {loged ? (
                <div className="navbar__icon">
                  <Link to="/user">
                    <i className="fa-solid fa-user fa-2x header__user__item"></i>
                  </Link>
                  <Link to="/cart">
                    <i className="fa-solid fa-cart-shopping fa-2x header__user__item"></i>
                  </Link>
                  <Link to="/wish-list">
                    <i className="fa-regular fa-heart fa-2x header__user__item"></i>
                  </Link>
                </div>
              ) : (
                <div className="navbar__icon">
                  <a href="login" className="nav-link p-0 text-muted btn-lg">
                    Login
                  </a>
                  <a
                    href="#b"
                    className="nav-link p-0 text-muted btn-lg ml-1 mr-1"
                  >
                    /
                  </a>
                  <a href="signup" className="nav-link p-0 text-muted btn-lg">
                    Signup
                  </a>
                </div>
              )}
              <hr className="my-4" />

              <img
                src="src/logo.png"
                className="header__logo"
                id="header__logo"
                alt="logo"
              />

              <ul>
                <li
                  className="navbar__overlay__list__item"
                  onClick={() => {
                    setPopup(false);
                  }}
                >
                  <Link
                    onClick={() => scrollTo("title__advertisement")}
                    to="/"
                    className="navbar__overlay__list__item__link"
                  >
                    HOME
                  </Link>
                </li>
                <li
                  className="navbar__overlay__list__item"
                  onClick={() => {
                    setPopup(false);
                  }}
                >
                  <Link
                    onClick={() => scrollTo("newProduct__title")}
                    to="/"
                    className="navbar__overlay__list__item__link"
                  >
                    NEW PRODUCT
                  </Link>
                </li>
                <li
                  className="navbar__overlay__list__item"
                  onClick={() => {
                    setPopup(false);
                  }}
                >
                  <Link
                    onClick={() => scrollTo("specialItem")}
                    to="/"
                    className="navbar__overlay__list__item__link"
                  >
                    DISCOUNT
                  </Link>
                </li>
                <li
                  className="navbar__overlay__list__item"
                  onClick={() => {
                    setPopup(false);
                  }}
                >
                  <Link
                    onClick={() => scrollTo("discount")}
                    to="/"
                    className="navbar__overlay__list__item__link"
                  >
                    SPECIAL
                  </Link>
                </li>
                <li
                  className="navbar__overlay__list__item"
                  onClick={() => {
                    setPopup(false);
                  }}
                >
                  <Link
                    onClick={() => scrollTo("footer")}
                    to="/"
                    className="navbar__overlay__list__item__link"
                  >
                    CONTACT
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </React.Fragment>
  );
}
