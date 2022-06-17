<?php
  class Cart {
    private $conn;
    private $table = 'cart';

    public $id;
    public $user_id;
    public $product_id;
    public $clothes;
    public $quantity;
    public $price;

    public function __construct($db) {
      $this->conn = $db;
    }

    public function read() {
      $query = "SELECT * FROM " . $this->table . " WHERE user_id = ?";
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(1, $this->user_id);
      $stmt->execute();

      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      if ($row === false) {
        return false;
      } else {
        return $stmt;
      }
    }

    public function create() {
      $query = "INSERT INTO " . $this->table . " (user_id, product_id, clothes, quantity, price) VALUES (:user_id, :product_id, :clothes, :quantity, :price)";
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(':user_id', $this->user_id);
      $stmt->bindParam(':product_id', $this->product_id);
      $stmt->bindParam(':clothes', $this->clothes);
      $stmt->bindParam(':quantity', $this->quantity);
      $stmt->bindParam(':price', $this->price);

      if ($stmt->execute()) {
        return true;
      } else {
        return false;
      }
    }

    public function update() {
      $query = "SELECT * FROM " . $this->table . " WHERE id = :id";

      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(':id', $this->id);
      $stmt->execute();

      $row = $stmt->fetch(PDO::FETCH_ASSOC);

      if ($row === false) {
        return false;
      } else {
        $query = "UPDATE " . $this->table . " SET clothes = :clothes, quantity = :quantity WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':clothes', $this->clothes);
        $stmt->bindParam(':quantity', $this->quantity);
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()) {
          return true;
        } else {
          return false;
        }
      }
    }

    public function delete() {
      $query = "SELECT * FROM " . $this->table . " WHERE id = :id";

      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(':id', $this->id);
      $stmt->execute();

      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      if ($row === false) {
        return false;
      } else {
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $this->id);

        if ($stmt->execute()) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
?>