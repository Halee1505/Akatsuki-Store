import { useState } from "react"
export default function ItemDetail() {
    const [count, setCount] = useState(1)
    const [quantity, setQuantity] = useState(10)
    const [fn,setFn] = useState("mota")
    function handleClickFn(){
        setFn(fn === "mota" ? "danhgia" : "mota")
    }
    return (
        <div className="container-fluid title">
            <div className="container">
                <div className="row d-flex justify-content-between mb-2 mt-2 align-items-center">
                    <div className="card card-body col-md-4" style={{ width: "8rem" }}>
                        <div className="card-img-top img-border mb-4" style={{ backgroundImage: "url(http://res.cloudinary.com/vitamim/image/upload/v1641982851/aootf0lsclxzlmedbvlo.jpg)" }}></div>
                        <div className="row">
                            {
                                new Array(5).fill(0).map((item, index) => {
                                    return (
                                        <button className="btn col-4" key={index}>Color</button>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className=" card card-body col-md-7 mt-4 mb-4">
                        <h5 className="card-title">Tên sản phẩm</h5>
                        <p className="card-title"><strong>Giá</strong></p>
                        <div>
                            <div className="form-group row">
                                <label htmlFor="username" className="col-sm-4 col-form-label">Size: </label>
                                <div className="col-sm-8 col-form-label d-flex justify-content-between">
                                    {
                                        ['s', 'm', 'l', 'xl', 'xxl'].map((item, index) => {
                                            return (
                                                <button className="btn col-2" key={item}>{item}</button>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="quantity" className="col-sm-4 col-form-label">Có sẵn</label>
                                <div className="col-sm-8">
                                    <input type="number" className="form-control-plaintext disable" id="quantity" value={quantity} disabled />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="count" className="col-4 col-form-label">Số lượng</label>
                                <div className="col-8 col-form-label row">
                                    <button className="btn col-3" onClick={() => { setCount(count => count > 1 ? count - 1 : count) }}>-</button>
                                    <button className="btn col-3 btn-outline-dark ml-2 mr-2 disable" disabled>{count}</button>
                                    <button className="btn col-3" onClick={() => { setCount(count => count < quantity ? count + 1 : count) }}>+</button>
                                </div>
                            </div>

                            <div className="form-group row justify-content-end col-md-11">
                                <button type="button" className="btn btn-outline-dark mr-4">Add to cart</button>
                                <button type="button" className="btn btn-dark">Buy</button>

                            </div>
                        </div>
                    </div>
                    <table className="table container-fluid">
                        <thead>
                            <tr>
                                <th scope="col" className={fn === "mota" ? "bg-secondary text-white text-center btn-lg col-6" : "text-center btn-lg col-6"} onClick={handleClickFn}>Mô Tả</th>
                                <th scope="col" className={fn === "danhgia" ? "bg-secondary text-white text-center btn-lg col-6" : "text-center btn-lg col-6"} onClick={handleClickFn}>Đánh giá</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={2}>
                                    <div className=" card card-body col-md-12 mt-4 mb-4">
                                        <h5 className="card-title">Tên sản phẩm</h5>
                                        <p className="card-title"><strong>Giá</strong></p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}
