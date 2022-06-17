import { Link,useLocation } from "react-router-dom";
export default function AdminOption() {
    const history = useLocation().pathname.split("/")[2];
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <Link to="/admin/manage-clothes" style={{ color: "unset", width: "100%" }}>
                                    <th
                                        scope="row"
                                        className={
                                            history === "manage-clothes"
                                                ? "bg-secondary text-white"
                                                : ""
                                        }
                                    >
                                        Show All Items
                                    </th>
                                </Link>
                            </tr>
                            <tr>
                                <Link to="/admin/add-clothes" style={{ color: "unset" }}>
                                    <th
                                        scope="row"
                                        className={
                                            history === "add-clothes"
                                                ? "bg-secondary text-white"
                                                : ""
                                        }
                                    >
                                        Add Items
                                    </th></Link>
                            </tr>
                            <tr><Link to="/admin/manage-users" style={{ color: "unset" }}>
                                <th
                                    scope="row"
                                    className={
                                        history === "manage-users"
                                            ? "bg-secondary text-white"
                                            : ""
                                    }
                                >
                                    Show List Users
                                </th></Link>
                            </tr>
                            <tr>
                                <Link to="/admin/manage-advertisement" style={{ color: "unset" }}>
                                    <th
                                        scope="row"
                                        className={
                                            history === "manage-advertisement"
                                                ? "bg-secondary text-white"
                                                : ""
                                        }
                                    >
                                        Advertisement
                                    </th>
                                </Link>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
