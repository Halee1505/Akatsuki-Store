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

  $result = $cart->read_cart_user();

  if ($result !== null) {
    $carts_arr = array();
    // $carts_arr['data'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
      extract($row);

      $cart_item = array(
        'user_id' => $cid,
        'fullname' => $fullname,
        'username' => $username,
        'phone' => $phone,
        'street' => $street,
        'district' => $district,
        'city' => $city,
        'id' => $id,
        'cart_item' => $cart_item,
        'color' => $color,
        'size' => $size,
        'count' => $count,
        'status' => $status,
        'index_color' => $index_color,
      );

      array_push($carts_arr, $cart_item);
    }
    echo json_encode($carts_arr);
  }
  else {
    http_response_code(200);
    echo json_encode(
      array(0)
    );
  }
?>