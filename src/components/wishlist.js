export default function Wishlist(){
    return (
        <div className="container-fluid title">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <table className="table">   
                        <thead>
                            <tr>
                                <th scope="col" className="text-center">Index</th>
                                <th scope="col" className="text-center">Product</th>
                                <th scope="col" className="text-center">Price</th>
                                <th scope="col" className="text-center" >Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row" className="text-center">1</th>
                                <th scope="row" className="text-center">
                                    <img style={{ height: "30px" }} src="src/card.png" alt="" />
                                    QQ
                                </th>
                                <th scope="row" className="text-center">99</th>
                                <th scope="row" className="text-center"><a  href="#" className="badge badge-dark mr-2">View detail</a><a  href="#" className="badge badge-danger">Remove</a></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    )
}