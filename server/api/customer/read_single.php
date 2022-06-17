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
  
  // Get customer id
  $customer->cid = isset($_GET['cid']) ? $_GET['cid'] : die();

  // Get customer
  if ($customer->read_single()) {
    // Create array
    $customer_arr = array(
      'cid' => $customer->cid,
      'fullname' => $customer->fullname,
      'username' => $customer->username,
      'password' => $customer->password,
      'dob' => $customer->dob,
      'phone' => $customer->phone,
      'avatar' => $customer->avatar,
      'wishlist' => $customer->wishlist,
      'isBanned' => $customer->isBanned,
      'gender' => $customer->gender,
      'date_created' => $customer->date_created,
      'street' => $customer->street,
      'district' => $customer->district,
      'city' => $customer->city
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