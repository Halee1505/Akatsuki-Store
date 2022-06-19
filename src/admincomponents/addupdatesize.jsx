import { useState,useEffect } from "react";
export default function AddUpdateSize({setSizeHandler, sizeHandler, indexHander}) {
  const [sizeName, setSizeName] = useState("");
  const [sizeCount, setSizeCount] = useState(0);
  console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
  console.log(sizeHandler[indexHander]);
  console.log(indexHander);
  console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")

  useEffect(() => {
    if(sizeHandler.length > 0) {
        setSizeName(sizeHandler[indexHander].sizeName? sizeHandler[indexHander].sizeName : "");
        setSizeCount(sizeHandler[indexHander].sizeCount? sizeHandler[indexHander].sizeCount : 0);
    }
    }, []);

  useEffect(() => {
    function handleChange() {
        let NewSize = [...sizeHandler];
        NewSize[indexHander]= {sizeName, sizeCount};
        setSizeHandler(NewSize);
    }
    handleChange();
    }, [sizeName,sizeCount]);
    function onDeleteSizeHandler() {
        let NewSize = [...sizeHandler];
        NewSize.splice(indexHander, 1);
        setSizeHandler(NewSize);
    }
  return (
    <div className="input-group col-md-13 row d-flex align-items-center">
      <input
        type="text"
        className="form-control col-md-5"
        placeholder="phân loại"
        defaultValue={sizeName}
        onChange={(e) => {
          setSizeName(e.target.value);
        }}
      />
      <input
        type="number"
        className="form-control col-md-5 px-0"
        placeholder="Số lượng"
        value={sizeCount}
        onChange={(e) => {
          setSizeCount(e.target.value);
        }}
      />
      <i
        className="fa-regular fa-circle-xmark ml-2 col-md-2 px-0"
        style={{ fontSize: "1.7vw" }}
        onClick={onDeleteSizeHandler}
      ></i>
    </div>
  );
}
