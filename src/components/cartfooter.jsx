export default function CartFooter({ totalPrice }) {
  return (
    <div className="container cart__footer">
      <h3>Tổng đơn: {totalPrice}.000<i class="fa-solid fa-dong-sign"></i></h3>
    </div>
  );
}
