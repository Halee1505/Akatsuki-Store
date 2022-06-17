<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../config/Database.php';
  include_once '../../models/Cart.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate cart object
  $cart = new Cart($db);

  $result = $cart->read();

  if ($result !== null) {
    $carts_arr = array();
    // $carts_arr['data'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
      extract($row);

      $cart_item = array(
        'id' => $id,
        'user_id' => $user_id,
        'product_id' => $product_id,
        'clothes' => $clothes,
        'quantity' => $quantity,
        'price' => $price
      );

      array_push($carts_arr, $cart_item);
    }
    echo json_encode($carts_arr);
  }
  else {
    http_response_code(200);
    echo json_encode(
      array('message' => 'No Clothes in Cart')
    );
  }
?>