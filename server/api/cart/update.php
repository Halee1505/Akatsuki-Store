<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: PUT');
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
  $cart->id = $data->id;
  $cart->clothes = $data->clothes;
  $cart->quantity = $data->quantity;

  if ($cart->update()) {
    http_response_code(200);
    echo json_encode(
      array('message' => 'Cart updated successfully')
    );
  }
  else {
    http_response_code(404);
    echo json_encode(
      array('message' => 'Something was wrong !!! cannot update cart')
    );
  }
?>