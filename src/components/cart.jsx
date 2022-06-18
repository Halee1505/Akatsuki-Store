import Cookies from "js-cookie";
import { useState, useEffect, useContext } from "react";
import userContext from "../context/usercontext";
import CartContext from "../context/cartcontext"
import axios from "axios";
let loged = Cookies.get("email");

export default function Cart({ onChangeTotal }) {
  const UserContext = useContext(userContext);
  const CartState = useContext(CartContext);
  // console.log(JSON.parse(UserContext.userCart[0].cart_item));

  function removeItem(cart) {
    axios
      .get("http://localhost/api/cart/delete.php?id=" + cart.id)
      .then((res) => {
        console.log(res.data);
        UserContext.setClickBtn(!UserContext.clickBtn);
      });
  }
  function CheckOut(cart) {
      let cartItem = cart;
      cartItem["status"]="chờ xác nhận";
      axios
        .put(
          "http://localhost/api/cart/update.php?id=" +
            cart.id,
          cartItem
        )
        .then((res) => {
          alert("Cập nhật giỏ hàng thành công");
          CartState.setCartOption("donmua")
          UserContext.setClickBtn(!UserContext.clickBtn);
        });
  }

  const totalPrice = UserContext.userCart.reduce((acc, item) => {
    return acc + JSON.parse(item.cart_item).price * item.count;
  }, 0);
  onChangeTotal(totalPrice);
  console.log(UserContext.userCart);
  return (
    <div className="container-fuild">
      <div className="container">
        <div className="row">
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
                  <th scope="col">Total</th>
                  <th scope="col" colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody>
                {UserContext.userCart.filter(cart=>cart.status === "cart").map((cart, index) => {
                  return (
                    <tr key={index}>
                      <td scope="row">{index + 1}</td>
                      <td scope="row">
                        <img
                          style={{ height: "5vw" }}
                          src={
                            JSON.parse(cart.cart_item).color[cart.index_color][
                              "url" + cart.index_color
                            ]
                          }
                          alt="aa"
                        />
                      </td>
                      <td scope="row"
                        title={JSON.parse(cart.cart_item).name}
                      >
                        <p
                          style={{
                            width : "16vw",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            cursor: "pointer",
                          }}
                        >
                          {JSON.parse(cart.cart_item).name}
                        </p>
                      </td>
                      <td scope="row" className="d-flex justify-content-around">
                        <div
                          style={{
                            height: "1.6vw",
                            width: "1.6vw",
                            backgroundColor: JSON.parse(cart.cart_item).color[
                              cart.index_color
                            ][cart.color],
                          }}
                        ></div>
                        <div
                          style={{
                            whiteSpace: "nowrap",
                          }}
                        >
                          Size:
                          {
                            JSON.parse(cart.cart_item).color[cart.index_color][
                              cart.size
                            ]
                          }
                        </div>
                      </td>
                      <td scope="row">{JSON.parse(cart.cart_item).price}</td>
                      <td scope="row">{cart.count}</td>
                      <td scope="row">
                        {Number(JSON.parse(cart.cart_item).price) *
                          Number(cart.count)}
                      </td>
                      <td scope="row">
                        <div
                          className="badge badge-danger"
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => removeItem(cart)}
                        >
                          Delete
                        </div>
                      </td>
                      <td scope="row">
                        <div
                          className="badge badge-dark"
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={() => CheckOut(cart)}
                        >
                          Mua hàng
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
