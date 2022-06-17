<?php
  class Clothes {
    private $conn;
    private $table = "clothes";

    public $id;
    public $name;
    public $price;
    public $description;
    public $date_created;
    public $gender;
    public $type;
    public $color;

    public function __construct($db) {
      $this->conn = $db;
    }

    public function read() {
      $query = 'SELECT * FROM ' . $this->table;

      $stmt = $this->conn->prepare($query);
      $stmt->execute();

      return $stmt;
    }

    public function read_single() {
      $query = "SELECT * FROM clothes
              WHERE id = ?";
      
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(1, $this->id);
      $stmt->execute();

      return $stmt;
    }

    public function create() {

      $query = 'INSERT INTO `clothes` (
                  `name`,
                  `price`,
                  `description`,
                  `gender`,
                  `type`,
                  `color`
              )
              VALUES(
                :name,
                  :price,
                  :description,
                  :gender,
                  :type,
                  :color
              );';

      $stmt = $this->conn->prepare($query);

      // Bind data
      $stmt->bindParam(':name', $this->name);
      $stmt->bindParam(':price', $this->price);
      $stmt->bindParam(':description', $this->description);
      $stmt->bindParam(':gender', $this->gender);
      $stmt->bindParam(':type', $this->type);
      $stmt->bindParam(':color', $this->color);

      // Execute the query
      if ($stmt->execute()) {
        return true;
      }

      return false;
    }

    public function update() {
      $query = "SELECT * FROM `clothes` WHERE id = ?";

      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(1, $this->id);
      $stmt->execute();

      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      if ($row === false) {
        return false;
      } else {
        $query = "UPDATE " . $this->table . "
                SET
                  name = :name,
                  price = :price,
                  description = :description,
                  gender = :gender,
                  color = :color,
                  type = :type
                WHERE 
                  id = :id";

        $stmt = $this->conn->prepare($query);

        // Bind data
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":gender", $this->gender);
        $stmt->bindParam(":color", $this->color);
        $stmt->bindParam(":type", $this->type);
        $stmt->bindParam(":id", $this->id);

        // Execute the query
        if ($stmt->execute()) {
          return true;
        }

        // Print error if something goes wrong
        printf("Error: %s.\n", $stmt->error);

        return false;
      }
    }

    public function delete() {
      // find the clothes with the given id
      $query = "SELECT * FROM " . $this->table . " WHERE id = ?";

      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(1, $this->id);
      $stmt->execute();

      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      
      if ($row === false) {
        return false;
      }

      // if the clothes is found, delete it
      $query = "DELETE FROM " . $this->table . " WHERE id = ?";

      $stmt = $this->conn->prepare($query);

      // Bind data
      $stmt->bindParam(1, $this->id);

      // Execute the query
      if ($stmt->execute()) {
        return true;
      }

      // Print error if something goes wrong
      printf("Error: %s.\n", $stmt->error);

      return false;
    }
  }
?>