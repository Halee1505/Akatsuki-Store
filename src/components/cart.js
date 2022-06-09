import React from "react"

export default function Cart() {
    return (
        <div className="container-fuild">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Index</th>

                                    <th scope="col" colSpan={2}>Product</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <th scope="row"><img style={{ height: "30px" }} src="src/card.png" alt="" /></th>
                                    <th scope="row">Hihe</th>
                                    <th scope="row">1</th>
                                    <th scope="row">1</th>
                                    <th scope="row">1</th>
                                    <th scope="row"><a href="#" className="badge badge-danger">Delete</a></th>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>


    )
}