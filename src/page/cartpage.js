import Header from "../components/header";
import Cart from "../components/cart";
import Bill from "../components/bill";
import CartOption from "../components/cartoption";
import CartFooter from "../components/cartfooter";
import React from "react";
import { useContext } from "react";
import CartContext from "../context/context";
export default function CartPage() {
    const CartState = useContext(CartContext);
    return (
        <React.Fragment>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <CartOption />
                    </div>
                    <div className="col-md-8">
                        {
                            CartState.CartOption === "donmua" ?
                                <Bill />
                                : CartState.CartOption === "giohang" ?
                                    <Cart />
                                    : null
                        }
                    </div>
                </div>
                {
                    CartState.CartOption === "giohang" ?
                        <CartFooter />
                        : null
                }
            </div>

        </React.Fragment>
    );
}
