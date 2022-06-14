import { useContext } from "react"
import AdminOptionContext from "../context/adminoptioncontext"
export default function AdminOption() {
    const Option = useContext(AdminOptionContext);
    return (
        <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row" onClick={()=>{Option.setAdminOption("ShowAllItems")}}>Show All Items</th>
                                </tr>
                                <tr>
                                    <th scope="row" onClick={()=>{Option.setAdminOption("AddItem")}}>Add Items</th>
                                </tr>
                                <tr>
                                    <th scope="row" onClick={()=>{Option.setAdminOption("ShowUsers")}}>Show List Users</th>
                                </tr>
                                <tr>
                                    <th scope="row" onClick={()=>{Option.setAdminOption("advertisement")}}>Advertisement</th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    )
}