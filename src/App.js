import './App.css';
import HomePage from './page/homepage';
import ListItemPage from './page/listitempage';
import ItemDetailPage from './page/itemdetailpage';
import Login from './page/login';
import Signup from './page/signup';
import CartPage from './page/cartpage';
import UserPage from './page/userpage';
import WishlistPage from './page/wishlistpage';
import ForgotPassword from './page/forgotpassword';



// adminpage
import AddClothesPage from './adminpage/addclothespage';
import GetClothesPage from './adminpage/getclothespage';

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
    <Route path="/items" element={<ListItemPage />}/>
    <Route path="/itemdetail/:id" element={<ItemDetailPage />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/signup" element={<Signup />}/>
    <Route path="/cart" element={<CartState><CartPage /></CartState>}/>
    <Route path="/user" element={<UserPage />}/>
    <Route path="/wish-list" element={<WishlistPage />}/>
    <Route path="/forgot-password" element={<ForgotPassword />}/>
    <Route path="/admin/add-clothes" element={<AddClothesPage />}/>
    <Route path="/admin/manage-clothes" element={<GetClothesPage />}/>
    

    </Routes>
    </BrowserRouter>
  );
}

export default App;
