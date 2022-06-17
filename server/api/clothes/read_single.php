<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../config/Database.php';
  include_once '../../models/Clothes.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate clothes object
  $clothes = new Clothes($db);
  
  // Get clothes id
  $clothes->id = isset($_GET['id']) ? $_GET['id'] : die();

  // Get clothes
  $result = $clothes->read_single();
  $num = $result->rowCount();

  if ($num > 0) {
    $clothes_arr = array();
    // $clothes_arr['data'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
      extract($row);

      $clothes_item = array(
        'id' => $id,
        'name' => $name,
        'price' => $price,
        'description' => $description,
        'gender' => $gender,
        'date_created' => $date_created,
        'type' => $type,
        'color' => json_decode($color)
      );
      array_push($clothes_arr, $clothes_item);
    }
    echo json_encode($clothes_arr);
  }
  else {
    http_response_code(404);
    echo json_encode(
      array('message' => 'No Clothes Found')
    );
  }
?>