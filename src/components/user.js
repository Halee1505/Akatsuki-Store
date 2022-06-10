import Cookies from 'js-cookie'
function ArrayDecl(from, to) {
    let a = new Array(to-from+1)
    for (var i = from; i <= to; i++) {
        a.push(i)
    }
    return a
}
function SignOut() {
    Cookies.remove("email")
    window.location.href = "/login"
}
export default function User() {
    return (
        <div className="container-fluid title">
            <div className="container">
                <div className="row d-flex justify-content-between mb-2 mt-2 align-items-center">
                    <div className="card card-body col-md-4" style={{ width: "8rem" }}>
                        <div className="card-img-top img-border mb-4" style={{backgroundImage:"url(http://res.cloudinary.com/vitamim/image/upload/v1641982851/aootf0lsclxzlmedbvlo.jpg)"}}></div>

                        <a href="#" className="btn btn-primary">Change Avatar</a>
                        <hr class="my-4" />
                        <button className="btn btn-outline-danger" onClick={() => { SignOut() }}>Sign Out</button>
                    </div>
                    <div className=" card card-body col-md-7 mt-4 mb-4">
                        <h5 className="card-title">My profile</h5>
                        <p className="card-title">Manage profile information for account security</p>
                        <form>
                            <div className="form-group row">
                                <label htmlFor="username" className="col-sm-4 col-form-label">User name: </label>
                                <div className="col-sm-8 col-form-label">
                                    Nguyễn Hải Linh
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputEmail" className="col-sm-4 col-form-label">Email</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control-plaintext" id="inputEmail" defaultValue="email@example.com" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputphonenumber" className="col-sm-4 col-form-label">Phone number: </label>
                                <div className="col-sm-8 col-form-label">
                                    <input type="number" className="form-control-plaintext" id="inputphonenumber" defaultValue="0395114189" />

                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputnickname" className="col-sm-4 col-form-label">Nickname: </label>
                                <div className="col-sm-8 col-form-label">
                                    <input type="text" className="form-control-plaintext" id="inputnickname" defaultValue="Nguyễn Hải Linh" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputsex" className="col-sm-4 col-form-label">Sex: </label>
                                <div className="col-sm-8 col-form-label d-flex align-items-center">
                                    <label htmlFor="male">Male</label>
                                    <input type="radio" className="form-control-plaintext" id="male" name="gender" defaultChecked />
                                    <label htmlFor="female">Female</label>
                                    <input type="radio" className="form-control-plaintext" id="female" name="gender" />
                                    <label htmlFor="others">Others</label>
                                    <input type="radio" className="form-control-plaintext" id="others" name="gender" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="inputsex" className="col-sm-4 col-form-label">Birthday: </label>
                                <div className="col-sm-8 col-form-label row">
                                    <div className="input-group mb-3 col-md-4">
                                        <select className="custom-select" id="day" defaultValue="">
                                            <option value="">Day</option>
                                            {
                                                ArrayDecl(1, 31).map((item, index) => {
                                                    return <option key={index} value={item}>{item}</option>
                                                }
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div className="input-group mb-3 col-md-4">
                                        <select className="custom-select" id="month" defaultValue="">
                                            <option value="">Month</option>
                                            {
                                                ArrayDecl(1, 12).map((item, index) => {
                                                    return <option key={index} value={item}>{item}</option>
                                                }
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div className="input-group mb-3 col-md-4">
                                        <select className="custom-select" id="year" defaultValue="">
                                            <option value="">Year</option>
                                            {
                                                ArrayDecl(1990, 2022).map((item, index) => {
                                                    return <option key={index} value={item}>{item}</option>
                                                }
                                                )
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group row justify-content-end col-md-11">
                                <button type="button" className="btn btn-dark">Save</button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}