<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/Cart.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate cart object
  $cart = new Cart($db);

  // Get cart data
  $data = json_decode(file_get_contents("php://input"));

  // Set cart data
  $cart->user_id = $data->user_id;
  $cart->product_id = $data->product_id;
  $cart->clothes = $data->clothes;
  $cart->quantity = $data->quantity;
  $cart->price = $data->price;

  if ($cart->create()) {
    http_response_code(201);
    echo json_encode(
      array('message' => 'Cart created')
    );
  } else {
    http_response_code(404);
    echo json_encode(
      array('message' => 'Something was wrong !!! Cannot add to cart')
    );
  }
?>