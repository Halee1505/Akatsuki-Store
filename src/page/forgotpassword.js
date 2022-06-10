
import { useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"


export default function ForgotPassword() {
    const [step, setStep] = useState(1)
    const [email, setEmail] = useState("")
    const [verifyCode, setVerifyCode] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    function handleSubmit(e,step) {
        e.preventDefault();
        if(step === 1) {
            setStep(2)
        } else if(step === 2) {
            setStep(3)
        } else if(step === 3) {
            console.log(email,verifyCode,password,repeatPassword)
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto  mt-5">
                    <div className="card border-0 shadow rounded-3 my-5">
                        <div className="card-body p-4 p-sm-5">
                            <h5 className="card-title text-center mb-5 fw-light fs-5">Reset password</h5>
                            {
                                step === 1 ?
                                    <form onSubmit={(e) => { handleSubmit(e,step) }}>
                                        <div className="form-floating mb-3">
                                            <label htmlFor="email">Enter your email address</label>
                                            <input type="email" className="form-control" id="email" placeholder="name@example.com"
                                                onChange={(e) => { setEmail(e.target.value) }} />
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            <button className="btn btn-secondary btn-login text-uppercase fw-bold" type="submit">Next</button>
                                        </div>

                                    </form>
                                    :
                                    step === 2 ?
                                        <form onSubmit={(e) => { handleSubmit(e,step) }}>
                                            <div className="form-floating mb-3">
                                                <label htmlFor="code">Please enter the verification code</label>
                                                <p className="text-muted fw-light">Your verification code will be sent by text message to {email}</p>
                                                <input type="number" className="form-control" id="code" placeholder="xxxxxx"
                                                    onChange={(e) => { setVerifyCode(e.target.value) }} />
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <button className="btn btn-secondary btn-login text-uppercase fw-bold" type="submit">Next</button>
                                            </div>
                                        </form>
                                        :
                                        <form onSubmit={(e) => { handleSubmit(e,step) }}>
                                            <div className="form-floating mb-3">
                                                <label htmlFor="password">Your new password</label>
                                                <input type="password" className="form-control" id="password" placeholder="Password"
                                                    onChange={(e) => { setPassword(e.target.value) }} />
                                            </div>
                                            <div className="form-floating mb-3">
                                                <label htmlFor="repeatpassword">Repeat your new password</label>
                                                <input type="password" className="form-control" id="repeatpassword" placeholder="Repeat password"
                                                    onChange={(e) => { setRepeatPassword(e.target.value) }} />
                                            </div>
                                            <div className="d-flex justify-content-center">
                                                <button className="btn btn-secondary btn-login text-uppercase fw-bold" type="submit">Reset Password</button>
                                            </div>
                                        </form>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}