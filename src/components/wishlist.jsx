import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
let loged = Cookies.get("email");

export default function Wishlist() {
  const [clickBtn, setClickBtn] = useState(false);

  const [user, setUser] = useState(null);
  const [userWishlist, setUserWishlist] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost/api/customer/read_single.php?cid=" + loged)
      .then((res) => {
        setUser(res.data);
        setUserWishlist(
          res.data.wishlist !== null ? JSON.parse(res.data.wishlist) : []
        );
      });
  }, [clickBtn]);
  console.log(user);
  console.log(userWishlist);

  function removeItem(clothes_id) {
    let isInWishList = userWishlist.findIndex((item) =>item.id == clothes_id);
    let wishlist = userWishlist;
    if (userWishlist.length !== 0) {
      if (isInWishList !== -1) {
        wishlist.splice(isInWishList, 1);
      }
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
        setClickBtn(!clickBtn);
      });
  }

  return (
    <div className="container-fluid title">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    Index
                  </th>
                  <th scope="col" className="text-center">
                    Product
                  </th>
                  <th scope="col" className="text-center">
                    Price
                  </th>
                  <th scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {userWishlist.map((item, index) => {
                  return (
                    <tr>
                      <th scope="row" className="text-center">
                        <p
                          className="d-flex align-items-center justify-content-center mb-0"
                          style={{ height: "70px" }}
                        >
                          {index + 1}
                        </p>
                      </th>
                      <th
                        scope="row"
                        className="d-flex align-items-center"
                        style={{ width: "45vw" }}
                      >
                        <img
                          style={{ height: "70px" }}
                          src={item.color[0]["url0"]}
                          alt=""
                        />
                        <strong
                          style={{
                            width: "60%",
                            marginLeft: "10px",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.name}
                        </strong>
                      </th>
                      <th scope="row" className="text-center">
                        {item.price}
                      </th>
                      <th scope="row" className="text-center">
                        <Link to={`/itemdetail/${item.id}`}>
                        <p className="badge badge-dark mr-2">View detail</p>
                        </Link>
                        <p
                          className="badge badge-danger"
                          onClick={() => {
                            removeItem(item.id);
                          }}
                        >
                          Remove
                        </p>
                      </th>
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
