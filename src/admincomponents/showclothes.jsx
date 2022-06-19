export default function ShowClothes({ clothes }) {
    console.log(clothes.color.filter((e,i)=>i===0));
    return (
        <div className="card d-flex flex-column align-items-center">
            {
                <div id="carouselExampleIndicators" className="carousel slide" style={{ width: "100%", marginLeft: "0px", marginTop: "0px" }} data-ride="carousel">
                    <div className="carousel-inner">
                        {
                            clothes.color.filter((e,i)=>i===0).map((item, index) => {
                                return <div key={index} className={index === 0 ? "carousel-item active d-flex justify-content-center" : "carousel-item d-flex justify-content-center"}>
                                    <div className="bg-secondary mt-2 preview-img" style={{ height: "20vw", width: "17vw", backgroundImage: "url(" + item.updateImg + ")" }}></div>
                                </div>
                            })
                        }
                    </div>
                </div>
            }

            <div className="card-body" style={{ width: "17vw" }}>
                <h5 className="card-title" style={{fontSize:"18px",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>Name: {clothes.name}</h5>
                <p className="card-text">Price: {clothes.price}.000<i className="fa-solid fa-dong-sign"></i></p>
                <p className="card-text">Type: {clothes.type}</p>
                <p className="card-text">Gender: {clothes.gender}</p>
            </div>
        </div>
    )
}