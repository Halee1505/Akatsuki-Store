import AdminOption from './adminoption';
import AddClothesPage from './addclothespage';
import GetClothesPage from './getclothespage';
import ShowUserPage from './showuserpage';
import UpdateAdvertisement from './updateadvertisement';

import { useContext } from 'react';
import AdminOptionContext from '../context/adminoptioncontext';
export default function AdminPage() {
    const Option = useContext(AdminOptionContext);
    console.log(Option.AdminOption);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12 bg-white">
                    <h1>Admin Page</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-2">
                    <AdminOption />
                </div>
                <div className="col-md-10">
                    {
                        Option.AdminOption === "ShowAllItems" ? <GetClothesPage />
                            :
                            Option.AdminOption === "AddItem" ? <AddClothesPage />
                                : Option.AdminOption === "ShowUsers" ? <ShowUserPage />
                                    : Option.AdminOption === "advertisement" ? <UpdateAdvertisement />
                                    : null
                    }
                </div>

            </div>
        </div>
    )
}
