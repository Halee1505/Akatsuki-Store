import Header from "../components/header";
import Cart from "../components/cart";
import Bill from "../components/bill";
import CartOption from "../components/cartoption";
import CartFooter from "../components/cartfooter";
import React from "react";
import { useContext,useState } from "react";
import CartContext from "../context/cartcontext";
export default function CartPage() {
    const CartState = useContext(CartContext);
    const [totalPrice, setTotalPrice] = useState(0);
    return (
        <React.Fragment>
            <Header />
            <div className="container title">
                <div className="row">
                    <div className="col-md-2">
                        <CartOption />
                    </div>
                    <div className="col-md-10">
                        {
                            CartState.CartOption === "donmua" ?
                                <Bill />
                                : CartState.CartOption === "giohang" ?
                                    <Cart onChangeTotal={total=>setTotalPrice(total)} />
                                    : null
                        }
                    </div>
                </div>
                {
                    CartState.CartOption === "giohang" ?
                        <CartFooter totalPrice={totalPrice} />
                        : null
                }
            </div>

        </React.Fragment>
    );
}
