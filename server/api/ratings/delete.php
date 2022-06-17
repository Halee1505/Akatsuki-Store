<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: DELETE');
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

  // Set ID to update
  $ratings->clothes_id = $data->clothes_id;
  $ratings->user_id = $data->user_id;

  if ($ratings->delete()) {
    http_response_code(200);
    echo json_encode(
      array('message' => 'ratings deleted successfully')
    );
  } else {
    http_response_code(404);
    echo json_encode(
      array('message' => 'ratings not found')
    );
  }
?>