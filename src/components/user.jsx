import Cookies from 'js-cookie'
import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import UserContext from "../context/usercontext"
let loged = Cookies.get("email")
const styleInput = {
    width: "0.1px",
    height: "0.1px",
    opacity: "0",
    overflow: "hidden",
    position: "absolute",
    zIndex: "-1",

}

function SignOut() {
    Cookies.remove("email")
    window.location.href = "/login"
}

export default function User() {
    const User = useContext(UserContext);
    useEffect(() => {
        axios.get("http://localhost/api/customer/read_single.php?cid=" + loged)
            .then(res => {
                User.setUser(res.data)
            })
    }, [])
    const [avatar, setAvatar] = useState(User.user.avatar)
    const [userName, setUserName] = useState(User.user.username)
    const [email, setEmail] = useState(User.user.fullname)
    const [phoneNumber, setPhoneNumber] = useState(User.user.phone)
    const [gender, setGender] = useState(User.user.gender)
    const [dob, setDob] = useState(User.user.dob)
    const [street, setStreet] = useState(User.user.street)
    const [district, setDistrict] = useState(User.user.street)
    const [city, setCity] = useState(User.user.street)

    useEffect(() => {
        setAvatar(e => User.user.avatar)
        setUserName(e => User.user.username)
        setEmail(e => User.user.fullname)
        setPhoneNumber(e => User.user.phone)
        setGender(e => User.user.gender)
        setDob(e => User.user.dob)
        setStreet(e => User.user.street)
        setDistrict(e => User.user.district)
        setCity(e => User.user.city)

    }, [User.user])
    console.log(gender)

    return (

        <div className="container-fluid title">
            {
                Object.keys(User.user).length !== 0 ?
                    <div className="container">
                        <div className="row d-flex justify-content-between mb-2 mt-2 align-items-center">
                            <div className="card card-body col-md-4" style={{ width: "8rem" }}>
                                <div style={styleInput}>
                                    <input type="file" name="avt" id="avt" />
                                </div>
                                <label htmlFor="avt" className="card-img-top img-border mb-4" style={{ backgroundImage: "url(" + avatar + ")" }}>
                                    <i className="fa-solid fa-upload upload"></i>
                                </label>
                                <hr className="my-4" />
                                <button className="btn btn-outline-danger" onClick={() => { SignOut() }}>Sign Out</button>
                            </div>
                            <div className=" card card-body col-md-7 mt-4 mb-4">
                                <h5 className="card-title">My profile</h5>
                                <p className="card-title">Manage profile information for account security</p>

                                <form>
                                    <div className="form-group row">
                                        <label htmlFor="username" className="col-sm-4 col-form-label">Email: </label>
                                        <div className="col-sm-8 col-form-label">
                                            {userName}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputEmail" className="col-sm-4 col-form-label">User name: </label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control-plaintext" id="inputEmail" defaultValue={email} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputphonenumber" className="col-sm-4 col-form-label">Phone number: </label>
                                        <div className="col-sm-8 col-form-label">
                                            <input type="number" className="form-control-plaintext" id="inputphonenumber" defaultValue={phoneNumber} />

                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputgender" className="col-sm-4 col-form-label">Gender: </label>
                                        <div className="col-sm-8 col-form-label">
                                            <select className="custom-select" id="inputgender" defaultValue={gender} >
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Three</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="day" className="col-sm-4 col-form-label">Birthday: </label>
                                        <input type="date" defaultValue={dob} />
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="inputgender" className="col-sm-4 col-form-label">Address: </label>
                                        <div className="col-sm-8 col-form-label d-flex align-items-center">
                                            <label htmlFor="street">Street: </label>
                                            <input type="text" className="form-control-plaintext" id="street" name="gender" defaultValue={street} />
                                            <label htmlFor="district">District: </label>
                                            <input type="text" className="form-control-plaintext" id="district" name="gender" defaultValue={district} />
                                            <label htmlFor="city">City: </label>
                                            <input type="text" className="form-control-plaintext" id="city" name="gender" defaultValue={city} />
                                        </div>
                                    </div>
                                    <div className="form-group row justify-content-end col-md-11">
                                        <button type="button" className="btn btn-dark">Save</button>

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