
import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
export default function Signup() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    function handleSubmit(e) {
        e.preventDefault();
        console.log(email, password);
        // axios.post("http://localhost/", {
        //     email: email,
        //     password: password
        // })
        //     .then(res => {
        //         console.log(res.data)
        //     }).catch(err => {
        //         console.log(err)
        //     }
        //     )
    }
    return (
        <div class="container">
            <div class="row">
                <div class="col-sm-9 col-md-7 col-lg-5 mx-auto  mt-5">
                    <div class="card border-0 shadow rounded-3 my-5">
                        <div class="card-body p-4 p-sm-5">
                            <h5 class="card-title text-center mb-5 fw-light fs-5">Sign Up</h5>
                            <form onSubmit={(e)=>{handleSubmit(e)}}>

                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="username" placeholder="Enter your username"
                                        onChange={(e) => { setUsername(e.target.value) }} />
                                    <label for="username">User name</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="email" class="form-control" id="email" placeholder="name@example.com"
                                        onChange={(e) => { setEmail(e.target.value) }} />
                                    <label for="email">Email address</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="password" class="form-control" id="password" placeholder="Password" 
                                        onChange={(e)=>{setPassword(e.target.value)}}/>
                                    <label for="password">Password</label>
                                </div>
                                <div class="form-floating mb-3">
                                    <input type="password" class="form-control" id="repeatpassword" placeholder="Repeat Password" 
                                        onChange={(e)=>{setRepeatPassword(e.target.value)}}/>
                                    <label for="repeatpassword">Repeat Password</label>
                                </div>

                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-secondary btn-login text-uppercase fw-bold" type="submit">Sign
                                        Up</button>
                                    <Link to="/login"><button class="btn btn-light btn-login text-uppercase fw-bold" type="button">Sign
                                        In</button></Link>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}