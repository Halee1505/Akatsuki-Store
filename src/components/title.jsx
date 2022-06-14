import { Link } from "react-router-dom"
export default function Title() {
    return (
        <div className="title">
            <div className="title__advertisement desktop">
                <div className="title__advertisement__left">
                    <div className="title__advertisement__item">
                    </div>
                </div>
                <div className="title__advertisement__right">
                    <div className="title__advertisement__items"></div>
                    <div className="title__advertisement__items"></div>
                    <div className="title__advertisement__items"></div>
                    <div className="title__advertisement__items"></div>
                </div>
            </div>
            <div className="title__advertisement mobile">
                <div id="carouselExampleControls" className="carousel slide mt-0" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="title__advertisement__items"
                                style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDSPQLF-namZAMhSVWA1iOIyetdF7z5bfXLg&usqp=CAU')` }}>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="title__advertisement__items"
                                style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-9UOUewPMTq0NYSXOQDKfoBm4Oh_4Xdn7qA&usqp=CAU')` }}>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="title__advertisement__items"
                                style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqXiFLOvVpZneMgBluZzn1etUzdg9nhVogPQ&usqp=CAU')` }}>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
            <div id="newProduct" className="newProduct">
                <div className="newProduct__title">
                    <div className="newProduct__title__left">
                        <div className="header__logoText">NEW PRODUCT</div>
                    </div>
                    
                    <div className="newProduct__title__right">
                     <Link to="items"><button className="btn">View all</button></Link>
                      </div>
                </div>
                <div className="newProduct__content">
                    {
                        Array(8).fill(0).map((item, index) => {
                            return (
                                <Link to={`/itemdetail/${index}`} className="newProduct__content__item text-decoration-none" key={index}>
                                    {
                                        index !== 0 ? <hr className="mobile my-4" /> : ""
                                    }
                                    <div className="newProduct__content__item__img">
                                    </div>
                                    <p className="newProduct__content__item__title">
                                        Áo xxx
                                    </p>
                                    <div className="newProduct__content__item__rate">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                    <p className="newProduct__content__item__price">
                                        $xxx
                                    </p>
                                </Link>
                            )

                        })
                    }



                </div>
            </div>
            <div className="carousel" id="news">

            </div>
            <div className="specialItem" id="special">
                {
                    ['HOT TREND', 'BEST SELLER', 'FEATURE'].map((items, items_ind) => {
                        return (
                            <div className="special" key={items_ind}>
                                <h3>{items}</h3>
                                {
                                    Array(3).fill(0).map((item, item_ind) => {
                                        return (
                                            <Link to={`/itemdetail/${item_ind}`} className="specialItem__items text-decoration-none" key={item_ind}>
                                                <div className="specialItem__item__img">

                                                </div>
                                                <div className="specialItem__Item">
                                                    <p className="specialItem__item__title">Áo xxx </p>
                                                    <div className="specialItem__item__rate">
                                                        {
                                                            Array(5).fill(0).map((star, star_ind) => {
                                                                return (
                                                                    <i className="fas fa-star" key={star_ind}></i>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <strong className="specialItem__item__price">$xxx</strong>
                                                </div>
                                            </Link>
                                        )
                                    })
                                }

                            </div>
                        )
                    })
                }

            </div>
            <div className="discount" id="discount">

            </div>
            <div className="Guarantee" style={{ fontSize: '8px' }}>
                <div className="Guarantee__item">
                    <i className="fa-solid fa-car fa-5x"></i>
                    <div className="Guarantee__title">
                        <h3>Free Shipping</h3>
                        <p>Free shipping on all orders over $99</p>
                    </div>
                </div>
                <div className="Guarantee__item">
                    <i className="fa-solid fa-money-bill-1 fa-5x"></i>
                    <div className="Guarantee__title">
                        <h3>Money back guarantee</h3>
                        <p>If good have Problems</p>
                    </div>
                </div>
                <div className="Guarantee__item">
                    <i className="fa-solid fa-circle-question fa-5x"></i>
                    <div className="Guarantee__title">
                        <h3>Online Support 24/7</h3>
                        <p>Dedicated support</p>
                    </div>
                </div>
                <div className="Guarantee__item">
                    <i className="fa-solid fa-credit-card fa-5x"></i>
                    <div className="Guarantee__title">
                        <h3>Payment Secure</h3>
                        <p>100% secure payment</p>
                    </div>
                </div>
            </div>
            <div className="instagram">
                <div className="instagram__img"></div>
                <div className="instagram__img"></div>
                <div className="instagram__img"></div>
                <div className="instagram__img"></div>
                <div className="instagram__img"></div>
                <div className="instagram__img"></div>
            </div>
        </div>
    )
}