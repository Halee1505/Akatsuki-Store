import { useState, useContext, useEffect } from "react";
import CartContext from "../context/cartcontext";
import userContext from "../context/usercontext";
import axios from "axios";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";

export default function Bill() {
  const CartState = useContext(CartContext);
  const UserContext = useContext(userContext);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  function ChangeStatus(cart, status) {
    let cartItem = cart;
    cartItem["status"] = status;
    axios
      .put("http://localhost/api/cart/update.php?id=" + cart.id, cartItem)
      .then((res) => {
        alert("Cập nhật giỏ hàng thành công");
        CartState.setCartOption("donmua");
        UserContext.setClickBtn(!UserContext.clickBtn);
      });
  }

  function SendFeedBack(clo_id, user_id, close) {
    let data = {
      star: rating,
      comment: comment,
      clothes_id: Number(clo_id),
      user_id: Number(user_id),
    };
    JSON.stringify(data);
    console.log(data);
    axios
      .post("http://localhost/api/ratings/create.php", JSON.stringify(data))
      .then((res) => {
        close();
        console.log(res.data);
      });
  }
  const [rateArray, setRateArray] = useState([]);
  useEffect(() => {
    axios.get("http://localhost/api/ratings/read_all.php").then((res) => {
      // setRateArray(res.data.data? rateArray.data.data :  []);
      setRateArray(res.data.data);
    });
  }, []);
  // console.log(rateArray);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <table className="table">
            <thead>
              <tr>
                <th
                  scope="col"
                  onClick={() => {
                    CartState.setBillOption("tất cả");
                  }}
                  className={
                    CartState.billOption === "tất cả"
                      ? "bg-secondary text-white text-center"
                      : "text-center"
                  }
                >
                  Tất cả
                </th>
                <th
                  scope="col"
                  onClick={() => {
                    CartState.setBillOption("chờ xác nhận");
                  }}
                  className={
                    CartState.billOption === "chờ xác nhận"
                      ? "bg-secondary text-white text-center"
                      : "text-center"
                  }
                >
                  Chờ xác nhận
                </th>
                <th
                  scope="col"
                  onClick={() => {
                    CartState.setBillOption("chờ lấy hàng");
                  }}
                  className={
                    CartState.billOption === "chờ lấy hàng"
                      ? "bg-secondary text-white text-center"
                      : "text-center"
                  }
                >
                  Chờ lấy hàng
                </th>
                <th
                  scope="col"
                  onClick={() => {
                    CartState.setBillOption("đang giao");
                  }}
                  className={
                    CartState.billOption === "đang giao"
                      ? "bg-secondary text-white text-center"
                      : "text-center"
                  }
                >
                  Đang giao
                </th>
                <th
                  scope="col"
                  onClick={() => {
                    CartState.setBillOption("đã giao");
                  }}
                  className={
                    CartState.billOption === "đã giao"
                      ? "bg-secondary text-white text-center"
                      : "text-center"
                  }
                >
                  Đã giao
                </th>
                <th
                  scope="col"
                  onClick={() => {
                    CartState.setBillOption("đã hủy");
                  }}
                  className={
                    CartState.billOption === "đã hủy"
                      ? "bg-secondary text-white text-center"
                      : "text-center"
                  }
                >
                  Đã hủy
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="col-md-12">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Index</th>

                <th scope="col" colSpan={2}>
                  Product
                </th>
                <th>Classify</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col" colSpan={2}>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {UserContext.userCart
                .filter((cart) => cart.status !== "cart")
                .filter(
                  (cart) =>
                    CartState.billOption === "tất cả" ||
                    cart.status === CartState.billOption
                )
                .map((cart, index) => {
                  return (
                    <tr key={index}>
                      <td scope="row">{index + 1}</td>
                      <td scope="row">
                        <img
                          style={{ height: "5vw" }}
                          src={
                            JSON.parse(cart.cart_item).color[cart.index_color].updateImg
                          }
                          alt="aa"
                        />
                      </td>
                      <td scope="row" title={JSON.parse(cart.cart_item).name}>
                        <Link
                          to={`/itemdetail/${JSON.parse(cart.cart_item).id}`}
                        >
                          <p
                            style={{
                              width: "16vw",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              textOverflow: "ellipsis",
                              cursor: "pointer",
                            }}
                          >
                            {JSON.parse(cart.cart_item).name}
                          </p>
                        </Link>
                      </td>
                      <td scope="row" className="d-flex justify-content-center">
                        <div
                          style={{
                            height: "1.6vw",
                            width: "1.6vw",
                            backgroundColor: cart.color
                          }}
                        ></div>
                        <div
                          style={{
                            whiteSpace: "nowrap",
                          }}
                        >
                          Size:
                          {
                            cart.size
                          }
                        </div>
                      </td>
                      <td scope="row">{JSON.parse(cart.cart_item).price}.000<i class="fa-solid fa-dong-sign"></i></td>
                      <td scope="row">{cart.count}</td>
                      <td scope="row">
                        {Number(JSON.parse(cart.cart_item).price) *
                          Number(cart.count)}
                      </td>
                      {cart.status === "chờ xác nhận" ? (
                        <td scope="row">
                          <div
                            className="badge badge-danger"
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              ChangeStatus(cart, "đã hủy");
                            }}
                          >
                            Huỷ đơn hàng
                          </div>
                        </td>
                      ) : cart.status === "đang giao" ? (
                        <td scope="row">
                          <div
                            className="badge badge-success"
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              ChangeStatus(cart, "đã giao");
                            }}
                          >
                            Đã nhận được hàng
                          </div>
                        </td>
                      ) : cart.status === "đã giao" ? (
                        rateArray.filter(
                          (item) =>
                            item.clothes_id === JSON.parse(cart.cart_item).id &&
                            item.user_id === cart.user_id
                        ).length === 0 ? (
                          <td scope="row">
                            <Popup
                              trigger={
                                <div
                                  className="badge badge-success"
                                  style={{
                                    cursor: "pointer",
                                  }}
                                >
                                  Đánh giá
                                </div>
                              }
                            >
                              {(close) => (
                                <div className="popup">
                                  <div className="row popup-title">
                                    <div className="row col-md-12">
                                      <div className="col-md-3 d-flex align-items-center">
                                        <h5 className="mb-0">Rate:</h5>
                                      </div>
                                      <div className="col-md-9">
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
                                          stop={5}
                                          start={0}
                                          step={1}
                                          initialRating={rating}
                                          onClick={(value) => {
                                            setRating(value);
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="row col-md-12">
                                      <div className="col-md-12 d-flex align-items-center">
                                        <h5 className="mb-0">Comment:</h5>
                                      </div>
                                      <textarea
                                        className="col-md-12"
                                        rows="4"
                                        style={{ fontSize: "1.1vw" }}
                                        onChange={(e) => {
                                          setComment(e.target.value);
                                        }}
                                      ></textarea>
                                      <div className="col-md-12 d-flex justify-content-end mt-3">
                                        <button
                                          className="btn btn-dark"
                                          type="button"
                                          onClick={() => {
                                            SendFeedBack(
                                              JSON.parse(cart.cart_item).id,
                                              cart.user_id,
                                              close
                                            );
                                          }}
                                        >
                                          Gửi
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Popup>
                          </td>
                        ) : null
                      ) : cart.status === "đã hủy" ? (
                        <td scope="row">
                          <div
                            className="badge badge-success"
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              window.location.href = `/itemdetail/${
                                JSON.parse(cart.cart_item).id
                              }`;
                            }}
                          >
                            Mua lại
                          </div>
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
