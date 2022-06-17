<?php
  class Advertisement {
    private $conn;
    private $table = 'advertisement';

    public $id;
    public $name;
    public $url;

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
      $query = 'SELECT * FROM ' . $this->table . ' WHERE id = ?';

      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(1, $this->id);
      $stmt->execute();

      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      if ($row === false) {
        return false;
      } else {
        $this->id = $row['id'];
        $this->name = $row['name'];
        $this->url = $row['url'];
        return true;
      }
    }

    public function create() {
      $query = 'INSERT INTO ' . $this->table . '
                SET 
                advertisement1 = :advertisement1,
                advertisement2 = :advertisement2,
                advertisement3 = :advertisement3,
                advertisement4 = :advertisement4,
                advertisement5 = :advertisement5,
                discount = :discount
                ';

      $stmt = $this->conn->prepare($query);

      // Bind data
      $stmt->bindParam(':advertisement1', $this->advertisement1);
      $stmt->bindParam(':advertisement2', $this->advertisement2);
      $stmt->bindParam(':advertisement3', $this->advertisement3);
      $stmt->bindParam(':advertisement4', $this->advertisement4);
      $stmt->bindParam(':advertisement5', $this->advertisement5);
      $stmt->bindParam(':discount', $this->discount);
      // Execute the query
      if ($stmt->execute()) {
        return true;
      }
      return false;
    }

    public function update() {
      $query = 'SELECT * FROM ' . $this->table . ' WHERE id = ?';

      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(1, $this->id);
      $stmt->execute();

      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      if ($row === false) {
        return false;
      } else {
        $query = 'UPDATE ' . $this->table . '
                SET
                  advertisement1 = :advertisement1,
                  advertisement2 = :advertisement2,
                  advertisement3 = :advertisement3,
                  advertisement4 = :advertisement4,
                  advertisement5 = :advertisement5,
                  discount = :discount
                WHERE id = :id';

        $stmt = $this->conn->prepare($query);

        // Bind data
        $stmt->bindParam(':advertisement1', $this->advertisement1);
        $stmt->bindParam(':advertisement2', $this->advertisement2);
        $stmt->bindParam(':advertisement3', $this->advertisement3);
        $stmt->bindParam(':advertisement4', $this->advertisement4);
        $stmt->bindParam(':advertisement5', $this->advertisement5);
        $stmt->bindParam(':discount', $this->discount);
        $stmt->bindParam(':id', $this->id);

        // Execute the query
        if ($stmt->execute()) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
?>