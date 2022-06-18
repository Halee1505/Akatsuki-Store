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

  $result = $customer->read();
  $num = $result->rowCount();

  if ($num > 0) {
    $customers_arr = array();
    // $customers_arr['data'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
      extract($row);

      $customer_item = array(
        'cid' => $cid,
        'fullname' => $fullname,
        'username' => $username,
        'password' => $password,
        'avatar'  => $avatar,
        'dob' => $dob,
        'gender' => $gender,
        'phone' => $phone,
        'wishlist' => $wishlist,
        'isBanned' => $isBanned,
        'date_created' => $date_created,
        'street' => $street,
        'district' => $district,
        'city' => $city
      );

      array_push($customers_arr, $customer_item);
    }
    echo json_encode($customers_arr);
  }
  else {
    http_response_code(200);
    echo json_encode(
      array('message' => 'No Customers Found')
    );
  }
?>