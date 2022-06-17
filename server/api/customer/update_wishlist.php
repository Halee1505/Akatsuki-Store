<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: PUT');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/Customer.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate customer object
  $customer = new Customer($db);

  // Get customer data
  $data = json_decode(file_get_contents("php://input"));

  // Set ID to update
  $customer->cid = isset($_GET['cid']) ? $_GET['cid'] : die();

  // Set customer data
  $customer->wishlist  = $data->wishlist;


  if ($customer->update_wishlist()) {
    http_response_code(200);
    echo json_encode(
      array('message' => 'Customer wishlist updated successfully')
    );
    
  }
  else {
    http_response_code(404);
    echo json_encode(
      array('message' => 'Customer not found')
    );
  }
?>