import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

export default function AdminUserPage() {
    const [user, setUser] = useState({})
    const [checkBan, setCheckBan] = useState(false)
    const request = useLocation().search.split("=")[1];

    useEffect(() => {
        axios.get("http://localhost/api/customer/read_single.php?cid=" + request)
            .then(res => {
                setUser(res.data)
            })
    }, [checkBan])

    function uploadBan(user) {
        const newUser = {
            "fullname": user.fullname,
            "dob": user.dob,
            "gender": user.gender,
            "phone": user.phone,
            "avatar": user.avatar,
            "wishlist": user.wishlist,
            "isBanned": user.isBanned === "0" ? "1" : "0"
        }
        axios.put("http://localhost/api/customer/update.php?cid=" + user.cid, newUser)
            .then(res => {
                setCheckBan(!checkBan)
            })
    }

    function DeleteUser(user) {
        console.log("deleta data")
        axios.get("http://localhost/api/customer/delete.php?cid=" + user.cid)
            .then(res => {
                console.log(res)
                window.location.href = "/admin/manage-users"
            })
            .catch(
                err => {
                    console.log(err)
                }
            )
    }
    return (
        <div className="container-fluid title">
            {
                Object.keys(user).length !== 0 ?
                    <div className="container">
                        <div className="row d-flex justify-content-between mb-2 mt-2 align-items-center">
                            <div className="card card-body col-md-4" style={{ width: "8rem" }}>
                                <label htmlFor="avt" className="card-img-top img-border mb-4" style={{ backgroundImage: "url(" + user.avatar + ")" }}>
                                </label>
                                <hr className="my-4" />
                            </div>
                            <div className=" card card-body col-md-7 mt-4 mb-4">
                                <h5 className="card-title">User profile</h5>
                                <form>
                                    <div className="form-group row">
                                        <label htmlFor="username" className="col-sm-4 col-form-label">Email: </label>
                                        <div className="col-sm-8 col-form-label">
                                            {user.username}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label">User name: </label>
                                        <div className="col-sm-8">
                                            <div className="col-sm-8 col-form-label">
                                                {user.fullname}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputphonenumber" className="col-sm-4 col-form-label">Phone number: </label>
                                        <div className="col-sm-8 col-form-label">
                                            <div className="col-sm-8 col-form-label">
                                                {user.phone}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputgender" className="col-sm-4 col-form-label">Gender: </label>
                                        <div className="col-sm-8 col-form-label">
                                            <div className="col-sm-8 col-form-label">
                                                {user.gender}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="day" className="col-sm-4 col-form-label">Birthday: </label>
                                        <input type="date" defaultValue={user.dob} />
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputgender" className="col-sm-4 col-form-label">Address: </label>
                                        <div className="col-sm-8 col-form-label d-flex align-items-center justify-content-between">
                                            <label htmlFor="street">Street: </label>
                                            <div className="col-sm-2 col-form-label">
                                                {user.street}
                                            </div>
                                            <label htmlFor="district">District: </label>
                                            <div className="col-sm-2 col-form-label">
                                                {user.district}
                                            </div>
                                            <label htmlFor="city">City: </label>
                                            <div className="col-sm-2 col-form-label">
                                                {user.city}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row justify-content-around">
                                        {
                                            user.isBanned === "0" ?
                                                <button className="btn btn-dark" type="button" style={{ cursor: "pointer" }} onClick={() => { uploadBan(user) }}>Ban Chat</button>
                                                :
                                                <button className="btn btn-success" type="button" style={{ cursor: "pointer" }} onClick={() => { uploadBan(user) }}>Unban Chat</button>
                                        }
                                        <button type="button" className="btn btn-danger" onClick={() => { DeleteUser(user) }}>Delete User</button>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    : <div>Loading</div>
            }
        </div>
    )
}