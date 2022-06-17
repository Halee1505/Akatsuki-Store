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

  $result = $advertisement->read();
  $num = $result->rowCount();

  if ($num > 0) {
    $advertisements_arr = array();
    // $advertisements_arr['data'] = array();

    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
      extract($row);

      $advertisement_item = array(
        'id' => $id,
        'advertisement1'=> $advertisement1,
        'advertisement2'=> $advertisement2,
        'advertisement3'=> $advertisement3,
        'advertisement4'=> $advertisement4,
        'advertisement5'=> $advertisement5,
        'discount'=> $discount,
      );

      array_push($advertisements_arr, $advertisement_item);
    }
    echo json_encode($advertisements_arr);
  }
  else {
    http_response_code(200);
    echo json_encode(
      array('message' => 'No advertisements Found')
    );
  }
?>