<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../config/Database.php';
  include_once '../../models/Clothes.php';
  include_once '../../models/Ratings.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate clothes object
  $clothes = new Clothes($db);

  $result = $clothes->read();
  $num = $result->rowCount();

  if ($num > 0) {
    $clothes_arr = array();
    // instantiate ratings object
    $ratings = new Ratings($db);
    // $clothes_arr['data'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
      extract($row);

      // $ratings->clothes_id = $id;
      $avg_ratings = $ratings->calculate_rating($id);

      $clothes_item = array(
        'id' => $id,
        'name' => $name,
        'price' => $price,
        'description' => $description,
        'gender' => $gender,
        'date_created' => $date_created,
        'type' => $type,
        'color' => json_decode($color),
        'ratings' => $avg_ratings
      );

      array_push($clothes_arr, $clothes_item);
    }
    echo json_encode($clothes_arr);
  }
  else {
    http_response_code(200);
    echo json_encode(
      array('message' => 'No Clothes Found')
    );
  }
?>