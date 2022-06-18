<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../config/Database.php';
  include_once '../../models/Ratings.php';
  include_once '../../models/Customer.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate ratings object
  $ratings = new Ratings($db);

  // get ratings id
  $ratings_result = $ratings->read_all();
  $num_ratings = $ratings_result->rowCount();

  // Instantiate customer object
  $customer = new Customer($db);

  if ($num_ratings > 0) {
    $ratings_arr = array();
    $ratings_arr['data'] = array();

    while ($row = $ratings_result->fetch(PDO::FETCH_ASSOC)) {
      extract($row);

      // get customer info
      $customer->cid = $user_id;
      $customer->read_single();

      $ratings_item = array(
        'clothes_id' => $clothes_id,
        'user_id' => $user_id,
        'star' => $star,
        'comment' => $comment,
        'fullname' => $customer->fullname,
        'avatar' => $customer->avatar
      );
      $avg_ratings = $ratings->calculate_rating($ratings->clothes_id);
      array_push($ratings_arr['data'], $ratings_item);
      $ratings_arr['avg_ratings'] = $avg_ratings;
    }
    echo json_encode($ratings_arr);
  }
  else {
    http_response_code(200);
    echo json_encode(
      array('message' => 'No Ratings Found')
    );
  }
?>