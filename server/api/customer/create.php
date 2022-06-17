<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: POST');
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

  // Set customer data
  $customer->fullname = $data->fullname;
  $customer->username = $data->username;
  $customer->password = $data->password;

  if ($customer->create()) {
    http_response_code(201);
    echo json_encode(
      array('message' => 'Customer created')
    );
  } else {
    http_response_code(404);
    echo json_encode(
      array('message' => 'Customer with this email already exists')
    );
  }
?>