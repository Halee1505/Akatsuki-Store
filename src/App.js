import './App.css';
import HomePage from './page/homepage';
import Login from './page/login';
import Signup from './page/signup';
import CartPage from './page/cartpage';
import UserPage from './page/userpage';
import WishlistPage from './page/wishlistpage';
import "./css/style.css";
import "./css/responsivestyle.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CartState from './context/cartstate';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<HomePage />}/>
    <Route path="/homepage" element={<HomePage />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/signup" element={<Signup />}/>
    <Route path="/cart" element={<CartState><CartPage /></CartState>}/>
    <Route path="/user" element={<UserPage />}/>
    <Route path="/wish-list" element={<WishlistPage />}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App;
