import PreviewUpdateClothes from "./previewupdateclothes";
import ClassifyUpdate from "./classifyupdate";
import { useContext, useState, useEffect } from "react";
import React from "react";
import AddClothesContext from "../context/addclothescontext";
import { useLocation } from "react-router-dom";
import axios from "axios";
export default function UpdateClothes() {
    const [clothes, setClothes] = useState([]);
    const clothes_id = useLocation().pathname.split("/")[3];
    const AddClothes = useContext(AddClothesContext);
    useEffect(() => {
        axios
            .get("http://localhost/api/clothes/read_single.php?id=" + clothes_id)
            .then((res) => {
                setClothes(res.data);
            });
    }, [clothes_id]);
    console.log(clothes);
    useEffect(() => {
        if (clothes.length > 0) {
            AddClothes.setUpdateName((name) => clothes[0].name);
            AddClothes.setUpdatePrice((price) => clothes[0].price);
            AddClothes.setUpdateType((type) => clothes[0].type);
            AddClothes.setUpdateGender((gender) => clothes[0].gender);
            AddClothes.setUpdateSize((size) => clothes[0].color);
            AddClothes.setUpdateDescription((description) => clothes[0].description);
        }
    }, [clothes]);
    function addcolorhandler(e) {
        AddClothes.setUpdateSize([
            ...AddClothes.updateSize,
            { ["color" + e]: "#000000" },
        ]);
    }
    function onUpdateClotheshandler() {
        const clothes = {
            name: AddClothes.updateName,
            price: AddClothes.updatePrice,
            type: AddClothes.updateType,
            gender: AddClothes.updateGender,
            color: JSON.stringify(AddClothes.updateSize),
            description: AddClothes.updateDescription,
        };
        axios
            .put("http://localhost/api/clothes/update.php?id="+clothes_id, clothes)
            .then((res) => {
                alert("Update successfully");
                window.location.href = "/admin/manage-clothes";
            });
    }

    function onDeleteClotheshandler() {
        axios
            .get("http://localhost/api/clothes/delete.php?id=" + clothes_id)
            .then((res) => {
                alert("Delete successfully");
                window.location.href = "/admin/manage-clothes";
            });
    }
    return (
        <div className="userpage container-fluid bg-white">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h1>Update Clothes Information</h1>
                        <hr className="my-3" />
                    </div>
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-12">
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="inputname">Name: </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="name"
                                            id="inputname"
                                            placeholder="Enter name"
                                            defaultValue={AddClothes.updateName}
                                            onChange={(e) => {
                                                AddClothes.setUpdateName(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputprice">Price: </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="price"
                                            id="inputprice"
                                            min={0}
                                            placeholder="Enter price"
                                            value={AddClothes.updatePrice}
                                            onChange={(e) => {
                                                AddClothes.setUpdatePrice(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <label className="input-group-text" htmlFor="type">
                                                    Type
                                                </label>
                                            </div>
                                            <select
                                                className="custom-select"
                                                name="type"
                                                id="type"
                                                value={AddClothes.updateType}
                                                onChange={(e) => {
                                                    AddClothes.setUpdateType(e.target.value);
                                                }}
                                            >
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
                                                <label className="input-group-text" htmlFor="gender">
                                                    Gender
                                                </label>
                                            </div>
                                            <select
                                                className="custom-select"
                                                name="gender"
                                                id="gender"
                                                value={AddClothes.updateGender}
                                                onChange={(e) => {
                                                    AddClothes.setUpdateGender(e.target.value);
                                                }}
                                            >
                                                <option value="">Select</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Unisex">Unisex</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="classify" className="mb-1">
                                            Classify:{" "}
                                        </label>
                                        <br />
                                        {AddClothes.updateSize.length > 0
                                            ? AddClothes.updateSize.map((item, index) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <ClassifyUpdate id={index} />
                                                        <hr className="my-3" />
                                                    </React.Fragment>
                                                );
                                            })
                                            : null}
                                        <button
                                            type="button"
                                            id="classify"
                                            className="btn btn-outline-dark"
                                            onClick={() => {
                                                addcolorhandler(AddClothes.updateSize.length);
                                            }}
                                        >
                                            Add Color
                                        </button>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="inputdescription">Description: </label>
                                        <textarea
                                            className="form-control"
                                            id="inputdescription"
                                            name="description"
                                            rows="3"
                                            defaultValue={AddClothes.updateDescription}
                                            onChange={(e) => {
                                                AddClothes.setUpdateDescription(e.target.value);
                                            }}
                                            placeholder="Enter description"
                                        ></textarea>
                                    </div>
                                    <div className="form-group d-flex justify-content-center">
                                        <button type="button" className="btn btn-danger mr-3"
                                            onClick={onDeleteClotheshandler}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-dark ml-3"
                                            onClick={onUpdateClotheshandler}
                                        >
                                            Update Clothes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <PreviewUpdateClothes />
                    </div>
                </div>
            </div>
        </div>
    );
}
