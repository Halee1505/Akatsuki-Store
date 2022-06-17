import Cookies from "js-cookie";
import { useState, useEffect, useContext } from "react";
import userContext from "../context/usercontext";
import axios from "axios";
import { Link } from "react-router-dom";
let loged = Cookies.get("email");

export default function Cart({onChangeTotal}) {
  const UserContext = useContext(userContext);
  useEffect(() => {
    axios
      .get("http://localhost/api/customer/read_single.php?cid=" + loged)
      .then((res) => {
        UserContext.setUserCart(
          res.data.cart !== null ? JSON.parse(res.data.cart) : []
        );
      });
  }, [UserContext.clickBtn]);

    function removeItem(cart) {
        let isInCart = UserContext.userCart.findIndex(
            (item) =>
              item.clothes.id === cart.clothes.id &&
              item.countsize === cart.countsize &&
              item.countcolor === cart.countcolor
          );
          console.log(UserContext.userCart)
          console.log(cart)
          console.log(isInCart);
        let delcCart = UserContext.userCart;
        if (UserContext.userCart.length !== 0) {
            if (isInCart !== -1) {
                delcCart.splice(isInCart, 1);
            }
        }
        const data = {
            cart: JSON.stringify(delcCart),
        };
        axios
            .put("http://localhost/api/customer/update_cart.php?cid=" + loged, data)
            .then((res) => {
                console.log(res.data);
                UserContext.setClickBtn(!UserContext.clickBtn);
            });
    }

    const totalPrice = UserContext.userCart.reduce((acc, item) => {
        return acc + item.clothes.price * item.count;
    }, 0);
    onChangeTotal(totalPrice);
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
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {UserContext.userCart.map((cart, index) => {
                  return (
                    <tr key={index}>
                      <td scope="row">{index + 1}</td>
                      <td scope="row">
                        <img
                          style={{ height: "5vw" }}
                          src={cart.clothes.color[cart.indexColor]["url"+cart.indexColor]}
                          alt=""
                        />
                      </td>
                      <td scope="row">{cart.clothes.name}</td>
                      <td scope="row" className="d-flex justify-content-around">
                        <div
                          style={{
                            height: "1.6vw",
                            width: "1.6vw",
                            backgroundColor: cart.clothes.color[cart.indexColor][cart.countcolor]
                          }}
                        ></div>
                        <div
                          style={{
                            // height: "1vw",
                            // width: "1vw",
                            whiteSpace: "nowrap",
                          }}
                        >Size: {cart.clothes.color[cart.indexColor][cart.countsize]}</div>
                      </td>
                      <td scope="row">{cart.clothes.price}</td>
                      <td scope="row">{cart.count}</td>
                      <td scope="row">
                        {Number(cart.clothes.price) * Number(cart.count)}
                      </td>
                      <td scope="row">
                        <div className="badge badge-danger"
                        style={{
                            cursor: "pointer",
                        }}
                            onClick={() => removeItem(cart)}
                        >Delete</div>
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
