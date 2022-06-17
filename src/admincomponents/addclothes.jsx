import PreviewClothes from "./previewclothes";
import Classify from "./classify";
import { useContext } from "react"
import React from "react";
import AddClothesContext from "../context/addclothescontext";
import Axios from "axios";
export default function AddClothes() {
    const AddClothes = useContext(AddClothesContext);
    function addcolorhandler(e) {
        AddClothes.setSize([...AddClothes.size, {["color"+e]:"#000000"}])
    }
    function onAddClotheshandler() {
       const clothes = {
            name: AddClothes.name,
            price: AddClothes.price,
            type: AddClothes.type,
            gender: AddClothes.gender,
            color: JSON.stringify(AddClothes.size),
            // color: Object.assign({}, AddClothes.size),
            description: AddClothes.description
            
       }
       Axios.post("http://localhost/api/clothes/create.php", clothes).then(res => {
              window.location.href = "/admin/manage-clothes"
       })
    }
    return (
        <div className="userpage container-fluid bg-white">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h1>Add Clothes</h1>
                        <hr className="my-3" />
                    </div>
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-12">
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="inputname">Name: </label>
                                        <input type="text" className="form-control" name="name" id="inputname" placeholder="Enter name" onChange={(e) => { AddClothes.setName(e.target.value) }} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputprice">Price: </label>
                                        <input type="number" className="form-control" name="price" id="inputprice" min={0} placeholder="Enter price" onChange={(e) => { AddClothes.setPrice(e.target.value) }} />
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text" htmlFor="type">Type</label>
                                            </div>
                                            <select className="custom-select" name="type" id="type" defaultValue="" onChange={(e) => { AddClothes.setType(e.target.value) }}>
                                                <option value="">Select type</option>
                                                <option value="Shoes">Shoes</option>
                                                <option value="Clothes">Clothes</option>
                                                <option value="Accessories">Accessories</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text" htmlFor="gender">Gender</label>
                                            </div>
                                            <select className="custom-select" name="gender" id="gender" defaultValue="" onChange={(e) => { AddClothes.setGender(e.target.value) }}>
                                                <option value="">Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Unisex">Unisex</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="classify" className="mb-1">Classify: </label>
                                        <br />
                                        {
                                            AddClothes.size.length > 0 ?
                                                AddClothes.size.map((item, index) => {
                                                    return <React.Fragment key={index} >
                                                        <Classify id={index}/>
                                                        <hr className="my-3"/>
                                                    </React.Fragment>
                                                })
                                                : null
                                        }
                                        <button type="button" id="classify" className="btn btn-outline-dark" onClick={()=>{addcolorhandler(AddClothes.size.length)}}>Add Color</button>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputdescription">Description: </label>
                                        <textarea className="form-control" id="inputdescription" name="description" rows="3" onChange={(e)=>{AddClothes.setDescription(e.target.value)}} placeholder="Enter description"></textarea>
                                    </div>
                                    <div className="form-group d-flex justify-content-center">
                                        <button type="button" className="btn btn-light mr-3">Clear</button>
                                        <button type="button" className="btn btn-dark ml-3" onClick={onAddClotheshandler}>Add Clothes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <PreviewClothes />
                    </div>
                </div>
            </div>

        </div>
    )
}