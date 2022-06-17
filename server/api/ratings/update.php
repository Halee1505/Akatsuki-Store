<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: PUT');
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

  $ratings->clothes_id = $data->clothes_id;
  $ratings->user_id = $data->user_id;
  $ratings->star = $data->star;
  $ratings->comment = $data->comment;

  // Update ratings
  $result = $ratings->update();

  if ($result == -1) {
    http_response_code(404);
    echo json_encode(
      array('message' => 'Cannot update ratings because user has been banned')
    );
  }
  else if ($result == 0) {
    http_response_code(404);
    echo json_encode(
      array('message' => 'Cannot update ratings because user not found')
    );
  }
  else if ($result == -2) {
    http_response_code(404);
    echo json_encode(
      array('message' => 'Something was wrong !!! Cannot update ratings')
    );
  }
  else {
    http_response_code(200);
    echo json_encode(
      array('message' => 'Ratings updated')
    );
  }
?>