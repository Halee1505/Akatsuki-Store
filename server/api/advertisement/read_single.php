<?php
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');

  include_once '../../config/Database.php';
  include_once '../../models/Advertisement.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate advertisement object
  $advertisement = new Advertisement($db);
  
  // Get advertisement id
  $advertisement->id = isset($_GET['id']) ? $_GET['id'] : die();

  // Get advertisement
  if ($advertisement->read_single()) {
    // Create array
    $advertisement_arr = array(
      'id' => $advertisement->id,
      'name' => $advertisement->name,
      'url' => $advertisement->url
    );

    // Make JSON representation
    http_response_code(200);
    print_r(json_encode($advertisement_arr));
  } else {
    http_response_code(404);
    echo json_encode(
      array('message' => 'No advertisement Found')
    );
  }
?>