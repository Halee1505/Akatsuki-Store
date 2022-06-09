export default function CartFooter() {
    return (
        <div className="container d-flex justify-content-between fixed-bottom pt-4 pb-4 rounded bg-white">
            <h3 scope="col">Total</h3>
            <button type="button" className="btn btn-dark" onClick={() => {
                console.log("delete")
            }}>Checkout</button>
        </div>
    )
}