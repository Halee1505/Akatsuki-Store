
import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
function CreateUser(email,password,fullname,callback){
    axios.post("http://localhost/api/customer/create.php",{
        username: email,
        password: password,
        fullname:fullname})
        .then(res=>{
            // return res.status
            callback(res.status)
        })
        .catch(err=>{
            // return err.response.status
            callback(err.response.status)
        })
}
export default function Signup() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    function handleSubmit() {
        if(password !== repeatPassword){
            alert("Password not match")
        }
        else{
            CreateUser(email,password,username,(res)=>{
                console.log(res)
                if(res === 201){
                    alert("Create account success")
                    window.location.href = "/login"
                }
                else{
                    alert("Email already exist")
                }
            })

            // window.location.href = "/login"
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto  mt-5">
                    <div className="card border-0 shadow rounded-3 my-5">
                        <div className="card-body p-4 p-sm-5">
                            <h5 className="card-title text-center mb-3 fw-light fs-8">Sign Up</h5>
                            <div>

                                <div className="form-floating mb-3">
                                    <label for="username">User name</label>
                                    <input type="text" className="form-control" id="username" placeholder="Enter your username"
                                        onChange={(e) => { setUsername(e.target.value) }} />
                                    
                                </div>
                                <div className="form-floating mb-3">
                                    <label for="email">Email address</label>
                                    <input type="email" className="form-control" id="email" placeholder="name@example.com"
                                        onChange={(e) => { setEmail(e.target.value) }} />
                                    
                                </div>
                                <div className="form-floating mb-3">
                                    <label for="password">Password</label>
                                    <input type="password" className="form-control" id="password" placeholder="Password" 
                                        onChange={(e)=>{setPassword(e.target.value)}}/>
                                    
                                </div>
                                <div className="form-floating mb-3">
                                    <label for="repeatpassword">Repeat Password</label>
                                    <input type="password" className="form-control" id="repeatpassword" placeholder="Repeat Password" 
                                        onChange={(e)=>{setRepeatPassword(e.target.value)}}/>
                                    
                                </div>

                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-secondary btn-login text-uppercase fw-bold" type="button" onClick={handleSubmit}>Sign
                                        Up</button>
                                    <Link to="/login"><button className="btn btn-light btn-login text-uppercase fw-bold" type="button">Sign
                                        In</button></Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}