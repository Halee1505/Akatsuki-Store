import UserContext from "./usercontext";
import { useState } from "react";

export default function UserState({ children }) {
    const [user, setUser] = useState({});
    const [wishlistCount, setWishlistCount] = useState(0);
    const [userWishlist, setUserWishlist] = useState([]);
    const [userCart, setUserCart] = useState([]);
    const [clickBtn, setClickBtn] = useState(false);

  return (
    <UserContext.Provider
        value={{
            user,
            setUser,
            wishlistCount,
            setWishlistCount,
            userWishlist,
            setUserWishlist,
            userCart,
            setUserCart,
            clickBtn,
            setClickBtn,
        }}
        >
        {children}
    </UserContext.Provider>
  );
}