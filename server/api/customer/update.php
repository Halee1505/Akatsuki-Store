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
  $customer->fullname  = $data->fullname;
  $customer->dob       = $data->dob;
  $customer->gender    = $data->gender;
  $customer->phone     = $data->phone;
  $customer->avatar    = $data->avatar;
  $customer->wishlist  = $data->wishlist;
  $customer->isBanned  = $data->isBanned;


  if ($customer->update_information() ==1) {
    http_response_code(200);
    echo json_encode(
      array('message' => 'Customer updated successfully')
    );
    
  }
  else if($customer->update_information() ==2) {
    http_response_code(200);
    echo json_encode(
      array('message' => 'Customer updated ')
    );
  }
  else {
    http_response_code(404);
    echo json_encode(
      array('message' => 'Customer not found')
    );
  }
?>