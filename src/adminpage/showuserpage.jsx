import axios from "axios"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
export default function ShowUserPage() {
    const [users, setUsers] = useState([])
    const [checkBan, setCheckBan] = useState(false)
    const [checkDelete, setCheckDelete] = useState(false)
    useEffect(() => {
        axios.get("http://localhost/api/customer/read.php")
            .then(res => {
                setUsers(res.data)
            })
    }, [checkBan, checkDelete])
    function uploadBan(user) {
        const newUser = {
            "fullname": user.fullname,
            "dob": user.dob,
            "gender": user.gender,
            "phone": user.phone,
            "avatar": user.avatar,
            "wishlist": user.wishlist,
            "isBanned": user.isBanned === "0" ? "1" : "0"
        }
        axios.put("http://localhost/api/customer/update.php?cid=" + user.cid, newUser)
            .then(res => {
                setCheckBan(!checkBan)
            })
    }

    function DeleteUser(user) {
        console.log("deleta data")
        axios.get("http://localhost/api/customer/delete.php?cid=" + user.cid)
            .then(res => {
                console.log(res)
                setCheckDelete(!checkDelete)
            })
            .catch(
                err => {
                    console.log(err)
                }
            )
    }

    // console.log(users)
    return (
        <table className="table bg-white rounded">
            <thead>
                <tr>
                    <th scope="col">Index</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Ban Chat</th>
                    <th scope="col">Delete</th>
                    <th scope="col" style={{width:"12vw"}}>Show User Detail</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.length !== 0 ?
                        users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.fullname}</td>
                                    <td>
                                        <a href={user.username}>{user.username}</a>
                                    </td>
                                    <td>
                                        {
                                            user.isBanned === "0" ?
                                                <div className="badge badge-dark" style={{ cursor: "pointer" }} onClick={() => { uploadBan(user) }}>Ban Chat</div>
                                                :
                                                <div className="badge badge-success" style={{ cursor: "pointer" }} onClick={() => { uploadBan(user) }}>Unban Chat</div>
                                        }
                                    </td>
                                    <td>
                                        <div className="badge badge-danger" style={{ cursor: "pointer" }} onClick={() => { DeleteUser(user) }}>Delete</div>
                                    </td>
                                    <td>
                                        <Link to={`/admin/user?id=${user.cid}`} className="badge badge-success" style={{ cursor: "pointer" }} >View Detail</Link>
                                    </td>
                                </tr>
                            )
                        })
                        : <div>Loading</div>

                }
            </tbody>
        </table>
    )
}