<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

  include_once '../../config/Database.php';
  include_once '../../models/Advertisement.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate advertisement object
  $advertisement = new Advertisement($db);

  // Get advertisement data
  $data = json_decode(file_get_contents("php://input"));

  // Set advertisement data
  $advertisement->advertisement1 = $data->advertisement1;
  $advertisement->advertisement2 = $data->advertisement2;
  $advertisement->advertisement3 = $data->advertisement3;
  $advertisement->advertisement4 = $data->advertisement4;
  $advertisement->advertisement5 = $data->advertisement5;
  $advertisement->discount = $data->discount;

  if ($advertisement->create()) {
    http_response_code(201);
    echo json_encode(
      array('message' => 'Advertisement created successfully')
    );
  } else {
    http_response_code(404);
    echo json_encode(
      array('message' => 'Advertisement cannot created')
    );
  }