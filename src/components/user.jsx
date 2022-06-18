import Cookies from "js-cookie";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserContext from "../context/usercontext";
import Dropzone from "react-dropzone";
let loged = Cookies.get("email");
const styleInput = {
  width: "0.1px",
  height: "0.1px",
  opacity: "0",
  overflow: "hidden",
  position: "absolute",
  zIndex: "-1",
};

function SignOut() {
  Cookies.remove("email");
  window.location.href = "/login";
}

export default function User() {
  const User = useContext(UserContext);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost/api/customer/read_single.php?cid=" + loged)
      .then((res) => {
        User.setUser(res.data);
      });
  }, [update]);
  const [avatar, setAvatar] = useState(User.user.avatar);
  const [updateAvatar, setUpdateAvatar] = useState(null);
  const [userName, setUserName] = useState(User.user.fullname);
  const [email, setEmail] = useState(User.user.username);
  const [phoneNumber, setPhoneNumber] = useState(User.user.phone);
  const [gender, setGender] = useState(User.user.gender);
  const [dob, setDob] = useState(User.user.dob);
  const [street, setStreet] = useState(User.user.street);
  const [district, setDistrict] = useState(User.user.street);
  const [city, setCity] = useState(User.user.street);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    setAvatar((e) => User.user.avatar);
    setUserName((e) => User.user.fullname);
    setEmail((e) => User.user.username);
    setPhoneNumber((e) => User.user.phone);
    setGender((e) => User.user.gender);
    setDob((e) => User.user.dob);
    setStreet((e) => User.user.street);
    setDistrict((e) => User.user.district);
    setCity((e) => User.user.city);
  }, [User.user]);

  const Upload = (UploadImg) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", UploadImg);
    formData.append("upload_preset", "vitamim");
    axios
      .post("https://api.cloudinary.com/v1_1/vitamim/image/upload", formData)
      .then((res) => {
        setLoading(false);
        UpdateUser(res.data.url);
      });
  };
  const onDrop = (files) => {
    if (files) {
      setAvatar((avatar) => URL.createObjectURL(files));
      setUpdateAvatar((avatar) => files);
    }
  };

  function UpdateUser(newAvatar) {
    console.log(newAvatar);
    const newUser = {
      fullname: userName,
      dob: dob,
      gender: gender,
      phone: phoneNumber,
      avatar: newAvatar,
      wishlist: User.user.wishlist,
      isBanned: User.user.isBanned,
    };
    axios
      .put("http://localhost/api/customer/update.php?cid=" + loged, newUser)
      .then((res) => {
        alert("Update Successfully");
        setUpdate(!update);
      })
      .catch((err) => {
        alert("Update Failed");
      });
  }

  return (
    <div className="container-fluid title">
      {Loading ? <i className="fa-solid fa-spinner fa-spin uploading"></i> : ""}
      {Object.keys(User.user).length !== 0 ? (
        <div className="container">
          <div className="row d-flex justify-content-between mb-2 mt-2 align-items-center">
            <div className="card card-body col-md-4" style={{ width: "8rem" }}>
              <Dropzone onDrop={(acceptedFiles) => onDrop(acceptedFiles[0])}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div
                      className="card-img-top img-border mb-4"
                      style={{
                        backgroundImage: "url(" + avatar + ")",
                      }}
                      {...getRootProps()}
                    >
                      <input
                        style={styleInput}
                        type="file"
                        id="avt"
                        {...getInputProps()}
                      />

                      <i className="fa-solid fa-upload upload"></i>
                    </div>
                  </section>
                )}
              </Dropzone>
              <hr className="my-4" />
              <button
                className="btn btn-outline-danger"
                onClick={() => {
                  SignOut();
                }}
              >
                Sign Out
              </button>
            </div>
            <div className=" card card-body col-md-7 mt-4 mb-4">
              <h5 className="card-title">My profile</h5>
              <p className="card-title">
                Manage profile information for account security
              </p>

              <form>
                <div className="form-group row">
                  <label htmlFor="username" className="col-sm-4 col-form-label">
                    Email:{" "}
                  </label>
                  <div className="col-sm-8 col-form-label">{email}</div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputEmail"
                    className="col-sm-4 col-form-label"
                  >
                    User name:{" "}
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control-plaintext"
                      onChange={(e) => setUserName(e.target.value)}
                      id="inputEmail"
                      defaultValue={userName}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputphonenumber"
                    className="col-sm-4 col-form-label"
                  >
                    Phone number:{" "}
                  </label>
                  <div className="col-sm-8 col-form-label">
                    <input
                      type="number"
                      className="form-control-plaintext"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      id="inputphonenumber"
                      defaultValue={phoneNumber}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputgender"
                    className="col-sm-4 col-form-label"
                  >
                    Gender:{" "}
                  </label>
                  <div className="col-sm-8 col-form-label">
                    <select
                      className="custom-select"
                      onChange={(e) => setGender(e.target.value)}
                      id="inputgender"
                      defaultValue={gender}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Three</option>
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="day" className="col-sm-4 col-form-label">
                    Birthday:{" "}
                  </label>
                  <input
                    type="date"
                    onChange={(e) => setDob(e.target.value)}
                    defaultValue={dob}
                    className="col-form-label date"
                  />
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputgender"
                    className="col-sm-4 col-form-label"
                  >
                    Address:{" "}
                  </label>
                  <div className="col-sm-8 col-form-label d-flex align-items-center">
                    <label htmlFor="street">Street: </label>
                    <input
                      type="text"
                      className="form-control-plaintext"
                      id="street"
                      onChange={(e) => setStreet(e.target.value)}
                      defaultValue={street}
                    />
                    <label htmlFor="district">District: </label>
                    <input
                      type="text"
                      className="form-control-plaintext"
                      id="district"
                      onChange={(e) => setDistrict(e.target.value)}
                      defaultValue={district}
                    />
                    <label htmlFor="city">City: </label>
                    <input
                      type="text"
                      className="form-control-plaintext"
                      id="city"
                      onChange={(e) => setCity(e.target.value)}
                      defaultValue={city}
                    />
                  </div>
                </div>
                <div className="form-group row justify-content-end col-md-11">
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={() => {
                      Upload(updateAvatar);
                    }}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
