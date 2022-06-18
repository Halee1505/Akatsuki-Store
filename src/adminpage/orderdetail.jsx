import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Popup from "reactjs-popup";

export default function OrderDetail() {
  const history = useLocation().search.split("=")[1];
  const [order, setOrder] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [cartItem, setCartItem] = useState({});
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost/api/cart/read_single_cart.php?id=" + history)
      .then((res) => {
        setOrder(res.data);
      });
  }, []);

  useEffect(() => {
    if (order.length !== 0) {
      axios
        .get(
          "http://localhost/api/customer/read_single.php?cid=" +
            order[0].user_id
        )
        .then((res) => {
          setCustomer(res.data);
        });
      setCartItem(JSON.parse(order[0].cart_item));
      setStatus(order[0].status);
    }
  }, [order]);
  function ChangeStatus(stt) {
    let update = order[0];
    console.log(update);
    console.log(stt);
    update["status"] = stt;
    axios
      .put("http://localhost/api/cart/update.php?id=" + order[0].id, update)
      .then((res) => {
        setStatus(stt);
      });
  }
  function removeItem(cart) {
    axios
      .get("http://localhost/api/cart/delete.php?id=" + cart)
      .then((res) => {
        window.location.href = "/admin/manage-orders"
      });
  }
  console.log(order);
  console.log(customer);
  console.log(cartItem);
  return (
    <div className="container-fluid title">
      {Object.keys(cartItem).length !== 0 ? (
        <div className="container">
          <div className="row">
            <div
              className="col-md-6 card card-body col-md-4 mb-4 mt-4"
              style={{ width: "18rem", height: "20rem" }}
            >
              <label
                htmlFor="avt"
                className="card-img-top img-border mb-4"
                style={{
                  height: "100%",
                  backgroundImage:
                    "url(" +
                    cartItem.color[order[0].index_color][
                      "url" + order[0].index_color
                    ] +
                    ")",
                }}
              ></label>
              <hr className="my-4" />
            </div>
            <div className=" col-md-6 row d-flex justify-content-between mb-2 mt-2 align-items-center">
              <div className=" card card-body col-md-12 mt-4 mb-4">
                <h5 className="card-title">ORDER DETAIL</h5>
                <form>
                  <div className="form-group row">
                    <h4>Tên sản phẩm: {cartItem.name}</h4>
                  </div>
                  <div className="form-group row">
                    <h5>Đơn giá: {cartItem.price}</h5>
                  </div>
                  <div className="form-group row">
                    <h4>Số lượng: {order[0].count}</h4>
                  </div>
                  <div className="form-group row">
                    <h5 className="mb-0 mr-2">Thành tiền: </h5>
                    <h5 className="mb-0">
                      {cartItem.price * order[0].count}vnđ
                    </h5>
                  </div>
                  <div className="row d-flex justify-content-center align-items-center">
                    <h5 className=" col-md-4 mb-0 mr-2">Trạng thái: </h5>
                    <h5 className="col-md-5 mb-0">{status}</h5>
                    <Popup
                      trigger={
                        <button
                          type="button"
                          className="col-md-2 p-2 btn btn-dark"
                        >
                          Cập nhật
                        </button>
                      }
                      position="right bottom"
                    >
                      <div className=" card card-body p-3">
                        <div
                          className="card card-body p-1 mb-1"
                          onClick={() => ChangeStatus("chờ xác nhận")}
                        >
                          <h6 className="mb-0">Chờ xác nhận</h6>
                        </div>
                        <div
                          className="card card-body p-1 mb-1"
                          onClick={() => ChangeStatus("chờ lấy hàng")}
                        >
                          <h6 className="mb-0">Chờ lấy hàng</h6>
                        </div>
                        <div
                          className="card card-body p-1 mb-1"
                          onClick={() => ChangeStatus("đang giao")}
                        >
                          <h6 className="mb-0">Đang giao</h6>
                        </div>
                      </div>
                    </Popup>
                  </div>
                  <div className="row d-flex justify-content-end align-items-center  mt-3">
                    <button
                      className="btn btn-danger" type="button"
                      onClick={() => {
                        removeItem(order[0].id);
                      }}
                    >
                      Xóa đơn hàng
                    </button>
                  </div>
                </form>
              </div>
              <div className=" card card-body col-md-7 mt-4 mb-4">
                <h5 className="card-title">THÔNG TIN KHÁCH HÀNG</h5>
                <form>
                  <div className="form-group row">
                    <h4>Tên: {customer.fullname}</h4>
                  </div>
                  <div className="form-group row">
                    <h5>Email: {customer.username}</h5>
                  </div>
                  <div className="form-group row">
                    <h4>Số điện thoại: {customer.phone}</h4>
                  </div>
                  <div className="form-group row">
                    <h5 className="mb-0 mr-2">Địa chỉ: </h5>
                    <h5 className="mb-0">
                      {customer.street}-{customer.district}-{customer.city}
                    </h5>
                  </div>
                  <div className="form-group row justify-content-around"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
