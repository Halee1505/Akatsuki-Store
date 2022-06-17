<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: POST');
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

  // Set clothes data
  $clothes->name = $data->name;
  $clothes->price = $data->price;
  $clothes->description = $data->description;
  $clothes->gender = $data->gender;
  $clothes->type = $data->type;
  $clothes->color = $data->color;

  if ($clothes->create()) {
    http_response_code(201);
    echo json_encode(
      array('message' => 'Clothes created successfully')
    );
  } else {
    http_response_code(404);
    echo json_encode(
      array('message' => 'Clothes cannot created')
    );
  }