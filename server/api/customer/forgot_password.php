<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../config/Database.php';
  include_once '../../models/Customer.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate customer object
  $customer = new Customer($db);
  
  // Get customer username
  $customer->username = $_GET['username'] ? $_GET['username'] : die();

  // Get customer
  if ($customer->forgotPassword()) {
    // echo json_encode($customer);
    // Create array
    $customer_arr = array(
      "username" => $customer->username
    );

    // Make JSON representation
    print_r(json_encode($customer_arr));
  } else {
    http_response_code(404);
    echo json_encode(
      array('message' => 'No Customer Found')
    );
  }
?>