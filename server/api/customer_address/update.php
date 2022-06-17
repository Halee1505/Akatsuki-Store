<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: PUT');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/Customer_Address.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate customer object
  $customer_addr = new Customer_Address($db);

  // Get customer data
  $data = json_decode(file_get_contents("php://input"));

  $customer_addr->cid = isset($_GET['cid']) ? $_GET['cid'] : die();

  // Set customer data
  $customer_addr->street = $data->street;
  $customer_addr->district = $data->district;
  $customer_addr->city = $data->city;

  if ($customer_addr->update()) {
    http_response_code(200);
    echo json_encode(
      array('message' => 'Customer Address updated successfully')
    );
  } else {
    http_response_code(404);
    echo json_encode(
      array('message' => 'Customer not found')
    );
  }
?>