import CartContext from "./cartcontext";
import { useState } from "react";

export default function CartState({ children }) {
    const [CartOption, setCartOption] = useState("giohang");
    const [billOption, setBillOption] = useState("tatca");
  return (
    <CartContext.Provider
        value={{
            CartOption,
            billOption,
            setCartOption,
            setBillOption,
        }}
        >
        {children}
    </CartContext.Provider>
  );
}