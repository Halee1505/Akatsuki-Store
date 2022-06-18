<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: GET');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, X-Auth-Token, Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/Cart.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate cart object
  $cart = new Cart($db);

  // Get cart data
  $data = json_decode(file_get_contents("php://input"));

  $cart->id = isset($_GET['id']) ? $_GET['id'] : die();

  if ($cart->delete()) {
    http_response_code(200);
    echo json_encode(
      array('message' => 'Cart deleted successfully')
    );
    
  } else {
    http_response_code(404);
    echo json_encode(
      array('message' => 'Cart not found')
    );
  }
?>