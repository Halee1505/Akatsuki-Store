<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: PUT');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/Clothes.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate clothes object
  $clothes = new Clothes($db);

  // Get clothes data
  $data = json_decode(file_get_contents("php://input"));

  // Set ID to update
  $clothes->id = isset($_GET['id']) ? $_GET['id'] : die();

  // Set clothes data
  $clothes->name = $data->name;
  $clothes->price = $data->price;
  $clothes->description = $data->description;
  $clothes->gender = $data->gender;
  $clothes->color = $data->color;
  $clothes->type = $data->type;

  if ($clothes->update()) {
    http_response_code(200);
    echo json_encode(
      array('message' => 'Clothes updated successfully')
    );
  }
  else {
    http_response_code(404);
    echo json_encode(
      array('message' => 'Clothes not found')
    );
  }
?>