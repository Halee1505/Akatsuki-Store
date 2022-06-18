<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: GET');
  include_once '../../config/Database.php';
  include_once '../../models/Cart.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate cart object
  $cart = new Cart($db);

  // Get customer id
  $cart->id = isset($_GET['id']) ? $_GET['id'] : die();

  // Get cart
  $result = $cart->read_single_cart();

  if ($result != null) {
    // Create array
    $carts_arr = array();
    // $carts_arr['data'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
      extract($row);

      $cart_item = array(
        'id' => $id,
        'user_id' => $user_id,
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
  } else {
    http_response_code(404);
    echo json_encode(
      array(0)
    );
  }
?>