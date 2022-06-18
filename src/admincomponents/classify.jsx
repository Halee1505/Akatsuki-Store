import { useState, useContext } from "react"
import AddClothesContext from "../context/addclothescontext"

export default function Classify({ id }) {
    const AddClothes = useContext(AddClothesContext);
    const [classify, setClassify] = useState(0);

    function deleteAddColorHandler() {
        AddClothes.setSize(AddClothes.size.filter((item, index) => (index !== id)))
    }
    function setColorHandler(e) {
        let NewColor = [...AddClothes.size]
        NewColor[id][e.target.name] = e.target.value
        AddClothes.setSize(NewColor)
    }
    function AddSizeHandler() {
        setClassify(classify => classify + 1)


    }
    function AddClassifyhandler(index, e) {
        let NewSize = [...AddClothes.size];
        NewSize[id]["classifycolor" + id + "-" + index] = e.target.value;
        AddClothes.setSize(NewSize);
    }
    function AddCounthandler(index, e) {
        let NewSize = [...AddClothes.size];
        NewSize[id]["countcolor" + id + "-" + index] = e.target.value;
        AddClothes.setSize(NewSize);
    }
    return (
        <div className="container-fluid">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 row">
                        <div className="input-group col-md-10 row mb-1 mt-1" style={{ height: "5vw" }}>
                            <div className="input-group-prepend col-md-12 row d-flex align-items-center">
                                <label htmlFor={`color${id}`} className="col-md-4">Color {id + 1}: </label>
                                <input type="color" name={`color${id}`} className="input-group-text col-md-2"
                                    onChange={(e) => { setColorHandler(e) }} id={`color${id}`} style={{ height: "100%" }} />
                                <button className="btn btn-outline-dark col-md-4 rounded" onClick={AddSizeHandler}>Add size</button>
                                <i className="fa-regular fa-circle-xmark col-md-2" style={{ fontSize: "1.7vw" }} onClick={deleteAddColorHandler}></i>
                            </div>
                            <div className="input-group-prepend col-md-12 row d-flex align-items-center">
                                <label htmlFor={`url${id}`} className="col-md-4">Url {id + 1}: </label>
                                <input type="text" name={`url${id}`} className="input-group-text col-md-6"
                                    onChange={(e) => { setColorHandler(e) }} id={`url${id}`} style={{ height: "100%" }} />
                            </div>
                        </div>
                        <div className="col-md-12 row">
                            {
                                classify !== 0 ?
                                    new Array(classify).fill(0).map((it, index) => {
                                        return <div key={index} className="input-group col-md-13 row d-flex align-items-center">
                                            <input type="text" className="form-control col-md-5" name={`classifycolor${id}-${index}`} placeholder="phân loại" onChange={(e) => { AddClassifyhandler(index, e) }} />
                                            <input type="number" className="form-control col-md-5" name={`countcolor${id}-${index}`} placeholder="Số lượng" onChange={(e) => { AddCounthandler(index, e) }} />
                                            <i className="fa-regular fa-circle-xmark ml-2 col-md-2" style={{ fontSize: "1.7vw" }}></i>
                                        </div>

                                    }) : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}