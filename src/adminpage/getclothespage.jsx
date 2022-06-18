import axios from "axios"
import { useEffect, useState } from "react"
import GetClothes from "../admincomponents/getclothes"
export default function GetClothesPage() {
    const [getClothes, setGetClothes] = useState([])
    useEffect(() => {
        axios.get("http://localhost/api/clothes/read.php")
            .then(res => {
                setGetClothes(res.data)
            })
    }, [])
    // console.log(getClothes)
    return (
        <GetClothes props={getClothes}/>
    )
}