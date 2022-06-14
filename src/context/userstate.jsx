import UserContext from "./usercontext";
import { useState } from "react";

export default function UserState({ children }) {
    const [user, setUser] = useState({});
  return (
    <UserContext.Provider
        value={{
            user,
            setUser
        }}
        >
        {children}
    </UserContext.Provider>
  );
}