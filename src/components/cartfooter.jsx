export default function CartFooter({ totalPrice }) {
  return (
    <div className="container d-flex justify-content-between fixed-bottom pt-4 pb-4 bg-white rounded-top border border-dark">
      <h3>Total: {totalPrice}</h3>
    </div>
  );
}
