import axios from "axios";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("http://localhost/api/cart/read_cart_user.php").then((res) => {
      setOrders(res.data);
    });
  }, []);

  console.log(orders);

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-light justify-content-between">
        <a className="navbar-brand"></a>
        <form className="form-inline">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Tìm kiếm theo mã đơn hàng"
            aria-label="Search"
            style={{ width: "20vw" }}
          />
          <button className="btn btn-outline-dark my-2 my-sm-0" type="button">
            Search
          </button>
        </form>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <table className="table">
              <thead className="table-light">
                <tr>
                  <th scope="col">Mã đơn hàng</th>
                  <th scope="col">Tên khách hàng</th>
                  <th scope="col">Email</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col">Địa chỉ</th>
                  <th scope="col">Tổng tiền</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {orders
                  .filter((o) => o.status !== "cart")
                  .map((order) => (
                    <tr>
                      <th scope="row">{order.id}</th>
                      <td>{order.fullname}</td>
                      <td>{order.username}</td>
                      <td>{order.phone}</td>
                      <td>
                        {order.street}-{order.district}-{order.city}
                      </td>
                      <td>{JSON.parse(order.cart_item).price * order.count}</td>
                      <td>{order.status}</td>
                      <td>
                        <Link
                          to={`/admin/order-detail?id=${order.id}`}
                          style={{ cursor: "pointer" }}
                        >
                          <button className="btn btn-dark">Chi tiết</button>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
