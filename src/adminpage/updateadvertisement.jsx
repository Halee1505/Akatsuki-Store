const styleInput = {
    width: "0.1px",
    height: "0.1px",
    opacity: "0",
    overflow: "hidden",
    position: "absolute",
    zIndex: "-1",
}
export default function UpdateAdvertisement() {
    return (
        <div className="container-fluid bg-white">
            <div className="container">
                <div className="row">
                    <h2 className="col-md-12 mb-0">
                        Advertisement
                    </h2>
                    <div className="col-md-12">
                        <div className="title__advertisement" style={{ height: "36vw" }}>
                            <div style={styleInput}>
                                <input type="file" name="file1" id="file1" />
                                <input type="file" name="file2" id="file2" />
                                <input type="file" name="file3" id="file3" />
                                <input type="file" name="file4" id="file4" />
                                <input type="file" name="file5" id="file5" />
                                <input type="file" name="file6" id="file6" />
                            </div>
                            <div className="title__advertisement__left">
                                <label htmlFor="file1" className="title__advertisement__item">
                                    <i className="fa-solid fa-upload upload"></i>
                                </label>
                            </div>
                            <div className="title__advertisement__right">
                                <label htmlFor="file2" className="title__advertisement__items">
                                    <i className="fa-solid fa-upload upload"></i>
                                </label>
                                <label htmlFor="file3" className="title__advertisement__items">
                                    <i className="fa-solid fa-upload upload"></i>
                                </label>
                                <label htmlFor="file4" className="title__advertisement__items">
                                    <i className="fa-solid fa-upload upload"></i>
                                </label>
                                <label htmlFor="file5" className="title__advertisement__items">
                                    <i className="fa-solid fa-upload upload"></i>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 mt-0">
                        <h2>Discount</h2>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="file6" className="discount-admin">
                        <i className="fa-solid fa-upload upload"></i>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}