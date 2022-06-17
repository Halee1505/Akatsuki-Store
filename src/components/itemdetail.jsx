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
  console.log(UserContext.userCart)
  function addToCart() {
    let cartItem = {
      clothes: Clothes[0],
      count: count,
      countcolor: "color" + countcolor,
      countsize: "classifycolor" + countcolor + "-" + countsize,
      indexColor: countcolor,
    };
    let isInCart = UserContext.userCart.findIndex(
      (item) =>
        item.clothes.id === Clothes[0].id &&
        item.countsize === cartItem.countsize &&
        item.countcolor === cartItem.countcolor
    );
    let addCart = UserContext.userCart;
    if (UserContext.userCart.length !== 0) {
      if (isInCart !== -1) {
        addCart[isInCart].count += cartItem.count;
      } else {
        addCart.push(cartItem);
      }
    } else {
      addCart.push(cartItem);
    }
    const data = {
      cart: JSON.stringify(addCart),
    };
    axios
      .put("http://localhost/api/customer/update_cart.php?cid=" + loged, data)
      .then((res) => {
        alert("Thêm vào giỏ thành công");
        UserContext.setClickBtn(!UserContext.clickBtn);
      });
  }

  return (
    <div className="container-fluid title">
      <div className="container">
        {Clothes.map((item, index) => {
          return (
            <div className="row d-flex justify-content-between mb-2 mt-2 align-items-center">
              <div
                className="card card-body col-md-4"
                style={{ width: "8rem" }}
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
                              height: "22vw",
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
              <div className=" card card-body col-md-7 mt-4 mb-4">
                <h5 className="card-title">Tên sản phẩm: {item.name}</h5>
                <p className="card-title">
                  <strong>Giá: {item.price}vnd</strong>
                </p>
                <p className="card-text">Type: {item.type}</p>
                <p className="card-text">Gender: {item.gender}</p>
                <div>
                  <div className="form-group row">
                    <label
                      htmlFor="username"
                      className="col-sm-2 col-form-label"
                    >
                      Color:{" "}
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
                  <div className="form-group row">
                    <label
                      htmlFor="username"
                      className="col-sm-2 col-form-label"
                    >
                      Size:{" "}
                    </label>
                    {item.color.length !== 0 ? (
                      <div className="row col-sm-8 d-flex justify-content-between">
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
                                    style={{ width: "4vw" }}
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
                      className="col-sm-4 col-form-label"
                    >
                      Có sẵn
                    </label>
                    <div className="col-sm-8">
                      {item.color.length !== 0
                        ? item.color[countcolor][
                            "countcolor" + countcolor + "-" + countsize
                          ]
                        : 0}
                    </div>
                  </div>
                  <div className="form-group row">
                    <label htmlFor="count" className="col-4 col-form-label">
                      Số lượng
                    </label>
                    <div className="col-8 col-form-label row">
                      <button
                        className="btn col-3"
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
                        className="btn col-3"
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

                  <div className="form-group row justify-content-end col-md-11">
                    {isInWishList !== -1 ? (
                      <button
                        type="button"
                        className="btn btn-outline-dark mr-4"
                        onClick={addToWishList}
                      >
                        Remove from wishlist
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-outline-dark mr-4"
                        onClick={addToWishList}
                      >
                        Add to wishlist
                      </button>
                    )}
                    <button
                      type="button"
                      className="btn btn-outline-dark mr-4"
                      onClick={addToCart}
                    >
                      Add to cart
                    </button>
                    <button type="button" className="btn btn-dark">
                      Buy
                    </button>
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
                        <div className=" card card-body col-md-12 mt-4 mb-4">
                          <h5 className="card-title">
                            Tên sản phẩm: {item.name}
                          </h5>
                          {item.description}
                        </div>
                      </td>
                    ) : (
                      <td colSpan={2}>
                        <div className=" card card-body col-md-12 mt-4 mb-4 row">
                          <h5 className="card-title">
                            Tên sản phẩm: {item.name}
                          </h5>
                          <div>
                            <div className="container">
                              <div className="row">
                                <div
                                  className="col-md-12 row"
                                  style={{
                                    height: "6vw",
                                    border: "2px solid #000000",
                                  }}
                                >
                                  <strong className="col-md-12">
                                    {rating.avg_ratings} trên 5 sao
                                  </strong>
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
                                        style={{ color: "#f1f1f1" }}
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
                                {!rating.message ? (
                                  rating.data.map((e, index) => {
                                    return (
                                      <div
                                        className="col-md-12 row mt-2"
                                        style={{
                                          border: "2px solid #bbbbbb",
                                        }}
                                      >
                                        <div className="col-md-2 d-flex justify-content-center align-items-center">
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
                                                style={{ color: "#f1f1f1" }}
                                              ></i>
                                            }
                                            fractions={1}
                                            readonly
                                            stop={5}
                                            start={0}
                                            step={1}
                                            initialRating={e.star}
                                          />
                                          <p>{e.comment}</p>
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
