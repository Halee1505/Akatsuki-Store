export default function ShowUserPage() {
    return (
        <table className="table bg-white rounded">
            <thead>
                <tr>
                    <th scope="col">Index</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Ban Chat</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Nguyễn Hải Linh</td>
                    <td>
                        <a href="mailto:linh.nguyen1505@hcmut.edu.vn">linh.nguyen1505@hcmut.edu.vn</a>
                    </td>
                    <td>
                        <div className="badge badge-danger" style={{cursor:"pointer"}}>Ban Chat</div>
                    </td>
                    <td>
                        <div className="badge badge-danger" style={{cursor:"pointer"}}>Delete</div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}