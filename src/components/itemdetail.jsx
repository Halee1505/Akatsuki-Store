import { useState, useEffect, useContext } from "react";
import userContext from "../context/usercontext";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Rating from "react-rating";
let loged = Cookies.get("email");

export default function ItemDetail() {
  const UserContext = useContext(userContext);
  // get User
  useEffect(() => {
    axios
      .get("http://localhost/api/customer/read_single.php?cid=" + loged)
      .then((res) => {
        UserContext.setUserWishlist(
          res.data.wishlist !== null ? JSON.parse(res.data.wishlist) : []
        );
      });
  }, [UserContext.clickBtn]);
  // get clothes
  const [Clothes, setClothes] = useState([]);
  const clothes_id = useLocation().pathname.split("/")[2];
  useEffect(() => {
    axios
      .get("http://localhost/api/clothes/read_single.php?id=" + clothes_id)
      .then((res) => {
        setClothes(res.data);
      });
  }, [UserContext.clickBtn]);

  // get rating
  const [rating, setRating] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost/api/ratings/read.php?clothes_id=" + clothes_id)
      .then((res) => {
        setRating(res.data);
      });
  }, [UserContext.clickBtn]);

  // caculate
  const [count, setCount] = useState(1);
  const [countcolor, setCountColor] = useState(0);
  const [countsize, setCountSize] = useState(0);
  const [fn, setFn] = useState("mota");
  function handleClickFn() {
    setFn(fn === "mota" ? "danhgia" : "mota");
  }

  // add wishlist
  let isInWishList = UserContext.userWishlist.findIndex(
    (item) => item.id === clothes_id
  );
  function addToWishList() {
    let wishlist = UserContext.userWishlist;
    if (UserContext.userWishlist.length !== 0) {
      if (isInWishList !== -1) {
        wishlist.splice(isInWishList, 1);
      } else {
        wishlist.push(Clothes[0]);
      }
    } else {
      wishlist.push(Clothes[0]);
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
        console.log(res.data);
        UserContext.setClickBtn(!UserContext.clickBtn);
      });
  }

  // upload cart
  console.log(Clothes);
  console.log(count);
  console.log(countcolor);
  console.log(countsize);
  console.log(UserContext.userCart);
  function addToCart() {
    let isInCart = UserContext.userCart.findIndex(
      (item) =>
        JSON.parse(item.cart_item).id === Clothes[0].id &&
        item.size === "classifycolor" + countcolor + "-" + countsize &&
        item.color === "color" + countcolor
    );

    if (isInCart !== -1) {
      let cartItem = {
        user_id: loged,
        cart_item: JSON.stringify(Clothes[0]),
        color: "color" + countcolor,
        size: "classifycolor" + countcolor + "-" + countsize,
        count: Number(count) + Number(UserContext.userCart[isInCart].count),
        index_color: countcolor,
        status: "cart",
      };
      axios
        .put(
          "http://localhost/api/cart/update.php?id=" +
            UserContext.userCart[isInCart].id,
          cartItem
        )
        .then((res) => {
          alert("Cập nhật giỏ hàng thành công");
          UserContext.setClickBtn(!UserContext.clickBtn);
        });
    } else {
      let cartItem = {
        user_id: loged,
        cart_item: JSON.stringify(Clothes[0]),
        color: "color" + countcolor,
        size: "classifycolor" + countcolor + "-" + countsize,
        count: count,
        index_color: countcolor,
        status: "cart",
      };
      axios
        .post("http://localhost/api/cart/create.php", cartItem)
        .then((res) => {
          alert("Thêm vào giỏ thành công");
          UserContext.setClickBtn(!UserContext.clickBtn);
        });
    }
  }

  return (
    <div className="container-fluid">
      <div className="container">
        {Clothes.map((item, index) => {
          return (
            <div className="row d-flex justify-content-between mb-2 mt-2 align-items-center">
              <div className="detail__wrap">
                <div
                  className="card card-body img-card"
                  
                >
                  <div
                    id="carouselExampleIndicators"
                    className="carousel slide"
                    style={{ width: "100%", marginLeft: "0px", marginTop: "0px" }}
                    data-ride="carousel"
                  >
                    <ol className="carousel-indicators">
                      {item.color.map((color, index) => {
                        return (
                          <button
                            key={index}
                            type="button"
                            data-target="#carouselExampleIndicators"
                            data-slide-to={index}
                            style={{
                              height: "1.4vw",
                              width: "1.4vw",
                              backgroundColor: color["color" + index],
                            }}
                            className={
                              index === 0 ? "active btn btn-dark" : "btn btn-dark"
                            }
                          ></button>
                        );
                      })}
                    </ol>
                    <div className="carousel-inner">
                      {item.color.map((color, index) => {
                        return (
                          <div
                            key={index}
                            className={
                              index === 0
                                ? "carousel-item active"
                                : "carousel-item"
                            }
                          >
                            <div
                              className="bg-secondary mt-2 preview-img"
                              style={{
                                backgroundImage:
                                  "url(" + color["url" + index] + ")",
                              }}
                            ></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className=" card card-body detail-card">
                <h5 className="card-title">{item.name.toUpperCase()}</h5>

                <div className="product__content__item__rate">
                  <p>{rating.avg_ratings}</p>
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
                    initialRating={rating.avg_ratings}
                  />
                </div>

                <div className="card-price">
                  <p>Giá: </p>
                  <p>{item.price}.000<i class="fa-solid fa-dong-sign"></i></p>
                </div>

                <p className="card-text">Type: {item.type}</p>
                <p className="card-text">Gender: {item.gender}</p>
                <div>
                  <div className="form-group row mt-2 mb-2 color">
                    
                    <label
                      htmlFor="username"
                      className="col-sm-4 col-form-label"
                    >
                      <p className="tag">Color:{" "}</p>
                    </label>
                    {item.color.map((color, index) => {
                      return (
                        <button
                          key={index}
                          type="button"
                          // data-target="#carouselExampleIndicators"
                          // data-slide-to={index}
                          style={{
                            height: "1.4vw",
                            width: "1.4vw",
                            backgroundColor: color["color" + index],
                            marginRight: "1.5vw",
                          }}
                          className={
                            index === 0 ? "active btn btn-dark" : "btn btn-dark"
                          }
                          onClick={() => {
                            setCountColor(index);
                          }}
                        ></button>
                      );
                    })}
                  </div>
                  <div className="form-group row size">
                    <label
                      htmlFor="username"
                      className="col-sm-3 col-form-label"
                    >
                      <p className="tag">Size:{" "}</p>
                    </label>
                    {item.color.length !== 0 ? (
                      <div className="row col-sm-8 d-flex justify-content-evenly">
                        {Object.keys(item.color[countcolor]).length - 2 >= 2 &&
                        (Object.keys(item.color[countcolor]).length - 2) % 2 ===
                          0
                          ? new Array(
                              (Object.keys(item.color[countcolor]).length - 2) /
                                2
                            )
                              .fill(0)
                              .map((e, index) => {
                                return (
                                  <button
                                    key={index}
                                    className={
                                      countsize === index
                                        ? "btn btn-dark"
                                        : "btn"
                                    }
                                    
                                    onClick={() => {
                                      setCountSize(index);
                                    }}
                                  >
                                    {
                                      item.color[countcolor][
                                        "classifycolor" +
                                          countcolor +
                                          "-" +
                                          index
                                      ]
                                    }
                                  </button>
                                );
                              })
                          : ""}
                      </div>
                    ) : (
                      <div className="row d-flex justify-content-between">
                        {item.color.length !== 0
                          ? item.color[countcolor][
                              "countcolor" + countcolor + "-" + countsize
                            ]
                          : 0}
                      </div>
                    )}
                  </div>
                  <div className="form-group row">
                    <label
                      htmlFor="quantity"
                      className="col-sm-6 col-form-label"
                    >
                      <p className="tag">Có sẵn:{" "}</p>
                    </label>
                    <div className="col-sm-">
                      {item.color.length !== 0
                        ? item.color[countcolor][
                            "countcolor" + countcolor + "-" + countsize
                          ]
                        : 0}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="count" className="col-4 col-form-label">
                      <p className="tag">Số lượng:{" "}</p>
                    </label>
                    <div className="col-7 col-form-label row">
                      <button
                        className="btn col-2"
                        onClick={() => {
                          setCount((count) => (count > 1 ? count - 1 : count));
                        }}
                      >
                        -
                      </button>
                      <button
                        className="btn col-3 btn-outline-dark ml-2 mr-2 disable"
                        disabled
                      >
                        {count}
                      </button>
                      <button
                        className="btn col-2"
                        onClick={() => {
                          setCount((count) =>
                            count <
                            Number(
                              item.color[countcolor][
                                "countcolor" + countcolor + "-" + countsize
                              ]
                            )
                              ? count + 1
                              : count
                          );
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="form-group row justify-content-end col-md-12 button-group">
                    {isInWishList !== -1 ? (
                      <button
                        type="button"
                        className="btn btn-outline-dark"
                        onClick={addToWishList}
                      >
                        Remove from wishlist
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-outline-dark ml-3"
                        onClick={addToWishList}
                      >
                        <div className="button-mod">
                          <p>Add to wishlist</p>  
                          <i className="fa-regular fa-heart cart-icon__item"></i>
                        </div>
                        
                      </button>
                    )}
                    <button
                      type="button"
                      className="btn btn-dark mr-4"
                      onClick={addToCart}
                    >
                      <div className="button-mod">
                          <p>Add to cart</p>  
                          <i className="fa-solid fa-cart-shopping cart-icon__item"></i>
                        </div>
                    </button>
                  </div>
                </div>
              </div>
              </div>
              
              
              <table className="table container-fluid">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className={
                        fn === "mota"
                          ? "bg-secondary text-white text-center btn-lg col-6"
                          : "text-center btn-lg col-6"
                      }
                      onClick={handleClickFn}
                    >
                      Mô Tả
                    </th>
                    <th
                      scope="col"
                      className={
                        fn === "danhgia"
                          ? "bg-secondary text-white text-center btn-lg col-6"
                          : "text-center btn-lg col-6"
                      }
                      onClick={handleClickFn}
                    >
                      Đánh giá
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {fn === "mota" ? (
                      <td colSpan={2}>
                        <div className="card card-body col-md-12 mt-4 mb-4">
                          <h5 className="card-title">
                            Tên sản phẩm: {item.name}
                          </h5>
                          <p>{item.description}</p>
                        </div>
                      </td>
                    ) : (
                      <td colSpan={2}>
                        <div className=" card card-body col-md-12 mt-4 mb-4 row">
                          <h5 className="card-title">
                            ĐÁNH GIÁ SẢN PHẨM
                          </h5>
                          <div>
                            <div className="container">
                              <div className="row">
                                <div
                                  className="col-md-12 row"
                                  style={{
                                    backgroundColor:"rgb(248, 234, 234)",
                                    margin:"0px 0 10px 0px",
                                    padding:"10px",
                                    borderRadius:"5px",
                                  }}
                                >
                                  <p className="col-md-12">
                                      <div className="star__and__star">
                                        <p className="current__star">{rating.avg_ratings}</p>
                                        <p className="five__star">trên 5 sao</p>
                                        <Rating
                                          fullSymbol={
                                            <i
                                              className="fas fa-star"
                                              style={{ color: "#ffd724" }}
                                            ></i>
                                          }
                                          emptySymbol={
                                            <i
                                              className="fas fa-star"
                                              style={{ color: "#e1e1e1" }}
                                            ></i>
                                          }
                                          fractions={1}
                                          readonly
                                          stop={5}
                                          start={0}
                                          step={1}
                                          initialRating={rating.avg_ratings}
                                        />
                                      </div>
                                  </p>
                                  <br />
                                  
                                </div>
                                {!rating.message ? (
                                  rating.data.map((e, index) => {
                                    return (
                                      <div
                                        className="col-md-11 row mt-2"
                                        style={{
                                          backgroundColor:"rgb(248, 234, 234)",
                                          margin:"10px 0 10px 50px",
                                          padding:"10px",
                                          borderRadius:"5px",
                                        }}
                                      >
                                        <div className="col-md-2 d-flex justify-content-center align-items-center comment__mobile">
                                          <div
                                            style={{
                                              width: "5.5vw",
                                              height: "5.5vw",
                                              borderRadius: "50%",
                                              backgroundImage: `url(${e.avatar})`,
                                              backgroundSize: "cover",
                                              backgroundPosition: "center",
                                              backgroundRepeat: "no-repeat",
                                            }}
                                          ></div>
                                        </div>
                                        <div className="col-md-10">
                                          <strong>{e.fullname}</strong>
                                          <br />
                                          <Rating
                                            fullSymbol={
                                              <i
                                                className="fas fa-star"
                                                style={{ color: "#ffd724" }}
                                              ></i>
                                            }
                                            emptySymbol={
                                              <i
                                                className="fas fa-star"
                                                style={{ color: "#e1e1e1" }}
                                              ></i>
                                            }
                                            fractions={1}
                                            readonly
                                            stop={5}
                                            start={0}
                                            step={1}
                                            initialRating={e.star}
                                          />
                                          <p>Đánh giá: {e.comment}</p>
                                        </div>
                                      </div>
                                    );
                                  })
                                ) : (
                                  <h1>No rating</h1>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}
