import Rating from "react-rating";
import { Link } from "react-router-dom";
import userContext from "../context/usercontext";
import { useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";

let loged = Cookies.get("email");

export default function ClothesCard({ item,index }) {
    const UserContext = useContext(userContext);
    function addToWishList(it) {
        let isInWishList = UserContext.userWishlist.findIndex((item) => item.id === it.id);
        let wishlist = UserContext.userWishlist;
        if (UserContext.userWishlist.length !== 0) {
          if (isInWishList !== -1) {
            wishlist.splice(isInWishList, 1);
          } else {
            wishlist.push(it);
          }
        } else {
          wishlist.push(it);
        }
        const data = {
          wishlist: JSON.stringify(wishlist),
        };
        axios
          .put(
            "http://localhost/api/customer/update_wishlist.php?cid=" + loged,
            data
          )
          .then((res) => {
            UserContext.setClickBtn(!UserContext.clickBtn);
          });
      }

  return (
    <div className="newProduct__container">

      {item.color
        .filter((e, i) => i === 0)
        .map((clothe, index) => {
          return (
            <div className="newProduct__item">
              <div
                style={{
                  backgroundImage: "url(" + clothe["url" + index] + ")",
                }}
                className="newProduct__content__item__img preview-img"
                key={index}
              >
                <div className="itemHover">
                  <i
                    className="icon cart fa-solid fa-cart-shopping"
                    title="Add to cart"
                  ></i>
                  <i
                    className="icon pay fa-solid fa-money-check"
                    title="Buy now"
                  ></i>
                  {UserContext.userWishlist.findIndex((u) => u.id === item.id) !== -1 ? (
                    <i
                      className="icon heart fa-solid fa-heart"
                      title="Remove from wishlist"
                      onClick={() => addToWishList(item)}
                    ></i>
                  ) : (
                    <i
                      className="icon heart fa-regular fa-heart"
                      title="Add to wishlist"
                      onClick={() => addToWishList(item)}
                    ></i>
                  )}
                </div>
              </div>
            </div>
            
          );
        })}
      <Link
        to={`/itemdetail/${item.id}`}
        className="newProduct__content__item text-decoration-none"
        key={index}
        title={item.name}
      >
        <p
          className="newProduct__content__item__title"
          style={{
            fontSize: "18px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {item.name}
        </p>

        <div className="newProduct__priceVsStar">
        <p className="newProduct__content__item__price">{item.price}.000<i class="fa-solid fa-dong-sign"></i></p>
          <div className="newProduct__content__item__rate">
            <Rating
              fullSymbol={
                <i className="fas fa-star" style={{ color: "#ffd724" }}></i>
              }
              emptySymbol={
                <i className="fas fa-star" style={{ color: "#e1e1e1" }}></i>
              }
              fractions={10}
              readonly
              stop={5}
              start={0}
              step={1}
              initialRating={item.ratings}
            />
          </div>
        </div>
        
      </Link>
    </div>
  );
}
