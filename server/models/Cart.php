<?php
  class Cart {
    private $conn;
    private $table = 'cart';

    public $id;
    public $user_id;
    public $cart_item;
    public $color;
    public $size;
    public $count;
    public $status;
    public $index_color;

    public function __construct($db) {
      $this->conn = $db;
    }

    public function read() {
      $query = "SELECT * FROM " . $this->table ;
      $stmt = $this->conn->prepare($query);
      $stmt->execute();

      return $stmt;
    }
    public function read_cart_user() {
      $query = "SELECT a.cid, a.fullname, a.username, a.phone,a.street,a.district,a.city, b.id ,b.cart_item, b.color, b.size, b.count, b.status, b.index_color
      
       FROM  customer a
       JOIN " . $this->table ." b ON a.cid = b.user_id
       ";
      $stmt = $this->conn->prepare($query);
      $stmt->execute();

      return $stmt;
    }
    public function read_single() {
      $query = "SELECT * FROM " . $this->table . " WHERE user_id = ?";
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(1, $this->user_id);
      $stmt->execute();

      return $stmt;
    }
    public function read_single_cart() {
      $query = "SELECT * FROM " . $this->table . " WHERE id = ?";
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(1, $this->id);
      $stmt->execute();

      return $stmt;
    }

    public function create() {
      $query = "INSERT INTO " . $this->table . " (user_id, cart_item, color, size, count,status,index_color) VALUES (:user_id, :cart_item, :color, :size, :count,:status,:index_color)";
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(':user_id', $this->user_id);
      $stmt->bindParam(':cart_item', $this->cart_item);
      $stmt->bindParam(':color', $this->color);
      $stmt->bindParam(':size', $this->size);
      $stmt->bindParam(':count', $this->count);
      $stmt->bindParam(':status', $this->status);
      $stmt->bindParam(':index_color', $this->index_color);


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
        $query = "UPDATE " . $this->table . " SET 
        
        user_id = :user_id,
        cart_item = :cart_item,
        color   = :color,
        size  = :size,
        count = :count,
        status = :status,
        index_color = :index_color

              WHERE id = :id";
              
              $stmt = $this->conn->prepare($query);
              
              $stmt->bindParam(':user_id', $this->user_id);
              $stmt->bindParam(':cart_item', $this->cart_item);
              $stmt->bindParam(':color', $this->color);
              $stmt->bindParam(':size', $this->size);
              $stmt->bindParam(':count', $this->count);
              $stmt->bindParam(':status', $this->status);
              $stmt->bindParam(':index_color', $this->index_color);
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