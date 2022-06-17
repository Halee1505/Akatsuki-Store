<?php
  class Ratings {
    private $conn;
    private $table = 'ratings';

    public $id;
    public $clothes_id;
    public $user_id;
    public $star;
    public $comment;

    public function __construct($db) {
      $this->conn = $db;
    }

    public function read() {
      $query = 'SELECT * FROM ' . $this->table . ' WHERE clothes_id = ?';
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(1, $this->clothes_id);
      $stmt->execute();

      return $stmt;
    }

    public function calculate_rating($clothes_id) {
      $query = 'SELECT AVG(star) AS rating FROM ' . $this->table . ' WHERE clothes_id = ?';
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(1, $clothes_id);
      $stmt->execute();

      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      if ($row['rating'] === null) {
        return 0;
      } else {
        return $row['rating'];
      }
    }

    public function create() {
      $query = 'SELECT * FROM ' . $this->table . ' WHERE clothes_id = :clothes_id AND user_id = :user_id';
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(':clothes_id', $this->clothes_id);
      $stmt->bindParam(':user_id', $this->user_id);
      $stmt->execute();

      if ($stmt->rowCount() > 0) {
        return -3;
      } 

      $query = "SELECT isBanned FROM customer WHERE cid = :user_id";

      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(":user_id", $this->user_id);
      $stmt->execute();

      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      if ($row === false) {
        return -1;
      } else {
        if ($row['isBanned'] == 1) {
          return 0;
        } else {
          $query = "INSERT INTO `ratings` (
            `clothes_id`,
            `user_id`,
            `star`,
            `comment`
          )
          VALUES(
            :clothes_id,
              :user_id,
              :star,
              :comment
          );";
          $stmt = $this->conn->prepare($query);

          // Bind data
          $stmt->bindParam(':clothes_id', $this->clothes_id);
          $stmt->bindParam(':user_id', $this->user_id);
          $stmt->bindParam(':star', $this->star);
          $stmt->bindParam(':comment', $this->comment);

          if ($stmt->execute()) {
            return 1;
          }
          else {
            return -2;
          }
        }
      }
    }

    public function update() {
      $query = "SELECT * FROM ratings
                WHERE clothes_id = :clothes_id
                AND user_id = :user_id";

      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(":clothes_id", $this->clothes_id);
      $stmt->bindParam(":user_id", $this->user_id);
      $stmt->execute();

      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      if ($row === false) {
        return 0;
      } else {
        $query = "SELECT isBanned FROM customer WHERE cid = :user_id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row['isBanned'] == 1) {
          return -1;
        } else {
          $query = "UPDATE ratings
                    SET
                      star = :star,
                      comment = :comment
                    WHERE
                      clothes_id = :clothes_id
                      AND user_id = :user_id";

          $stmt = $this->conn->prepare($query);

          // Bind data
          $stmt->bindParam(":star", $this->star);
          $stmt->bindParam(":comment", $this->comment);
          $stmt->bindParam(":clothes_id", $this->clothes_id);
          $stmt->bindParam(":user_id", $this->user_id);

          // Execute the query
          if ($stmt->execute()) {
            return 1;
          }
          else {
            return -2;
          }
        }
      }
    }

    public function delete() {
      $query = "SELECT * FROM ratings
                WHERE clothes_id = :clothes_id
                AND user_id = :user_id";

      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(":clothes_id", $this->clothes_id);
      $stmt->bindParam(":user_id", $this->user_id);
      $stmt->execute();

      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      if ($row !== false) {
        $query = "DELETE FROM ratings
                  WHERE
                    clothes_id = :clothes_id
                    AND user_id = :user_id";

        $stmt = $this->conn->prepare($query);

        // Bind data
        $stmt->bindParam(":clothes_id", $this->clothes_id);
        $stmt->bindParam(":user_id", $this->user_id);

        // Execute the query
        if ($stmt->execute()) {
          return true;
        }
        else {
          return false;
        }
      } else {
        return false;
      }
    }
  }
?>