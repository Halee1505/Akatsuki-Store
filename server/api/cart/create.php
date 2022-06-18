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
  $cart->cart_item = $data->cart_item;
  $cart->color = $data->color;
  $cart->size = $data->size;
  $cart->count = $data->count;
  $cart->status = $data->status;
  $cart->index_color = $data->index_color;

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