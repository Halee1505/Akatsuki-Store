<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/Ratings.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate ratings object
  $ratings = new Ratings($db);

  // Get ratings data
  $data = json_decode(file_get_contents("php://input"));

  // Set ratings data
  $ratings->clothes_id = $data->clothes_id;
  $ratings->user_id = $data->user_id;
  $ratings->star = $data->star;
  $ratings->comment = $data->comment;

  // Create ratings
  $result = $ratings->create();

  if ($result == -1) {
    http_response_code(404);
    echo json_encode(
      array('message' => 'Customer not found')
    );
  } else if ($result == -3) {
    http_response_code(404);
    echo json_encode(
      array('message' => 'Cannot create ratings because user has already rated this clothes')
    );
  } else if ($result == -2) {
    http_response_code(404);
    echo json_encode(
      array('message' => 'Something was wrong !!! Cannot create ratings')
    );
  } else if ($result == 0) {
    http_response_code(404);
    echo json_encode(
      array('message' => 'Cannot create ratings because user not found')
    );
  } else {
    http_response_code(200);
    echo json_encode(
      array('message' => 'Ratings created')
    );
  }
?>