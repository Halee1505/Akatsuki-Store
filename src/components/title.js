export default function Title() {
    return (
        <div className="title">
            <div className="title__advertisement">
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
            <div id="newProduct" className="newProduct">
                <div className="newProduct__title">
                    <div className="newProduct__title__left">
                        <div className="header__logoText">NEW PRODUCT</div>
                    </div>
                    <div className="newProduct__title__right desktop">
                        <div className="newProduct__item hover_underline">All <div className="underline"></div>
                        </div>
                        <div className="newProduct__item hover_underline">Men's <div className="underline"></div>
                        </div>
                        <div className="newProduct__item hover_underline">Wommen's <div className="underline"></div>
                        </div>
                        <div className="newProduct__item hover_underline">Kid's <div className="underline"></div>
                        </div>
                        <div className="newProduct__item hover_underline">Accessories <div className="underline"></div>
                        </div>
                        <div className="newProduct__item hover_underline">Cosmetics <div className="underline"></div>
                        </div>
                    </div>
                    <div className="newProduct__title__right mobile">
                        <div className="input-group mb-3">
                            <select className="custom-select" defaultValue="">
                                <option value="">All</option>
                                <option value="1">Men's</option>
                                <option value="2">Wommen's</option>
                                <option value="3">Kid's</option>
                                <option value="4">Accessories</option>
                                <option value="5">Cosmetics</option>
                            </select>
                        </div>

                    </div>
                </div>
                <div className="newProduct__content">
                    {
                        Array(8).fill(0).map((item, index) => {
                            return (
                                <div className="newProduct__content__item">
                                    {
                                        index !== 0 ? <hr className="my-4" /> : ""
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
                                </div>
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
                            <div className="special">
                                <h3>{items}</h3>
                                {
                                    Array(3).fill(0).map((item, item_ind) => {
                                        return (
                                            <div className="specialItem__items">
                                                <div className="specialItem__item__img">

                                                </div>
                                                <div className="specialItem__Item">
                                                    <p className="specialItem__item__title">Áo xxx </p>
                                                    <div className="specialItem__item__rate">
                                                        {
                                                            Array(5).fill(0).map((star, star_ind) => {
                                                                return (
                                                                    <i className="fas fa-star"></i>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <strong className="specialItem__item__price">$xxx</strong>
                                                </div>
                                            </div>
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