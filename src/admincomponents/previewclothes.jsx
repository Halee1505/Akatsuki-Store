import { useState, useContext } from "react"
import React from "react";
import AddClothesContext from "../context/addclothescontext"
export default function PreviewClothes() {
    const AddClothes = useContext(AddClothesContext);
    const [countcolor, setCountColor] = useState(0)
    const [countsize, setCountSize] = useState(0)

    return (
        <div className="card d-flex flex-column align-items-center" style={{ width: "18vw" }}>
            {
                AddClothes.size.length !== 0 ?
                    <div id="carouselExampleIndicators" className="carousel slide" style={{ width: "100%", marginLeft: "0px", marginTop: "0px" }} data-ride="carousel">
                        <ol className="carousel-indicators">
                            {
                                AddClothes.size.map((item, index) => {
                                    return <button key={index} type="button" data-target="#carouselExampleIndicators" data-slide-to={index}
                                        style={{ height: "1.4vw", width: "1.4vw", backgroundColor: item["color" + index] }}
                                        className={index === 0 ? "active btn btn-dark" : "btn btn-dark"} onClick={()=>{setCountColor(index)}}></button>
                                })
                            }
                        </ol>
                        <div className="carousel-inner">
                            {
                                AddClothes.size.map((item, index) => {
                                    return <div key={index} className={index === 0 ? "carousel-item active" : "carousel-item"}>
                                        <div className="bg-secondary mt-2 preview-img" style={{ height: "20vw", width: "17vw", backgroundImage: "url(" + item["url" + index] + ")" }}></div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    : ""
            }

            <div className="card-body" style={{ width: "17vw" }}>
                <h5 className="card-title">Name: {AddClothes.name}</h5>
                <p className="card-text">Price: {AddClothes.price === "" ? 0 : AddClothes.price}.000 vnd</p>
                <p className="card-text">Type: {AddClothes.type}</p>
                <p className="card-text">Gender: {AddClothes.sex}</p>
                <p className="card-text">Size:</p>
                {
                    AddClothes.size.length !== 0 ?
                        <div className="row d-flex justify-content-between">
                            {
                                (Object.keys(AddClothes.size[countcolor]).length-2)>=2 && (Object.keys(AddClothes.size[countcolor]).length-2)%2===0?
                                new Array((Object.keys(AddClothes.size[countcolor]).length-2)/2).fill(0).map((item,index)=>{
                                    return <button key={index} className="btn" onClick={()=>{setCountSize(index)}}>{AddClothes.size[countcolor]["classifycolor"+countcolor+"-"+index]}</button>
                                }):""
                            }
                        </div> :
                        <div className="row d-flex justify-content-between">

                        </div>
                }
                <p className="card-text mt-3">Count: {AddClothes.size.length !== 0?AddClothes.size[countcolor]["countcolor"+countcolor+"-"+countsize]:0}</p>
            </div>
        </div>
    )
}