import { useState } from "react"
export default function ListItem() {
    const [count, setCount] = useState(1)
    const [quantity, setQuantity] = useState(10)
    const [fn, setFn] = useState("mota")
    function handleClickFn() {
        setFn(fn === "mota" ? "danhgia" : "mota")
    }
    return (
        <div className="bg-white title">
        <div className="newProduct__title">
            <div className="newProduct__title__left">
                <div className="header__logoText">NEW PRODUCT</div>
            </div>
            <div className="newProduct__title__right desktop">
                <div className="newProduct__item hover_underline">All <div className="underline"></div>
                </div>
                <div className="newProduct__item hover_underline">Men's <div className="underline"></div>
                </div>
                <div className="newProduct__item hover_underline">Wommen's <div className="underline"></div>
                </div>
                <div className="newProduct__item hover_underline">Kid's <div className="underline"></div>
                </div>
                <div className="newProduct__item hover_underline">Accessories <div className="underline"></div>
                </div>
                <div className="newProduct__item hover_underline">Cosmetics <div className="underline"></div>
                </div>
            </div>
            <div className="newProduct__title__right mobile ">
                <div className="input-group mt-3">
                    <select className="custom-select" defaultValue="">
                        <option value="">All</option>
                        <option value="1">Men's</option>
                        <option value="2">Wommen's</option>
                        <option value="3">Kid's</option>
                        <option value="4">Accessories</option>
                        <option value="5">Cosmetics</option>
                    </select>
                </div>

            </div>
        </div>
        <div className="newProduct__content">
                 <div className="row d-flex justify-content-around mb-2 mt-2 align-items-center">
                     {
                        new Array(5).fill(0).map((item, index) => {
                            return (
                                <div className="card" style={{width:"14rem"}}>
                                    <img className="card-img-top" src="..." alt="Card image cap"/>
                                        <div className="card-body">
                                            <h5 className="card-title">Card title</h5>
                                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                            <a href="#" className="btn btn-primary">Go somewhere</a>
                                        </div>
                                </div>
                            )
                        })
                    }
                </div>
        </div>
    </div>
        // <div className="container-fluid title">
        //     <div className="container">
                
        //         <div className="row d-flex justify-content-between mb-2 mt-2 align-items-center">
        //             {
        //                 new Array(5).fill(0).map((item, index) => {
        //                     return (
        //                         <div className="card" style={{width:"14rem"}}>
        //                             <img className="card-img-top" src="..." alt="Card image cap"/>
        //                                 <div className="card-body">
        //                                     <h5 className="card-title">Card title</h5>
        //                                     <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        //                                     <a href="#" className="btn btn-primary">Go somewhere</a>
        //                                 </div>
        //                         </div>
        //                     )
        //                 })
        //             }
        //         </div>
        //     </div>
        // </div>

    )
}
