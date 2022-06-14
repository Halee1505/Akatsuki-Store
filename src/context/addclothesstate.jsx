import AddClothesContext from "./addclothescontext";
import { useState } from "react";
 export default function AddClothesState({children}){
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [type, setType] = useState("")
    const [gender, setGender] = useState("")
    const [size,setSize]  = useState([])
    const [description, setDescription] = useState("")

    return (
        <AddClothesContext.Provider value={{
            name,
            setName,
            price,
            setPrice,
            type,
            setType,
            gender,
            setGender,
            size,
            setSize,
            description,
            setDescription
        }}>
            {children}
        </AddClothesContext.Provider>
    )
 }
