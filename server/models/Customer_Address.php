<?php
  class Customer_Address {
    private $conn;
    private $table = 'customer_address';

    public $cid;
    public $street;
    public $district;
    public $city;

    public function __construct($db) {
      $this->conn = $db;
    }

    public function create() {
      // Find the customer with the given cid
      $query = 'SELECT * FROM customer WHERE cid = ?';

      $check = $this->query_data($query);
      if ($check === false) {
        return false;
      }

      // Check if the customer already has an address
      $query = 'SELECT * FROM customer_address WHERE cid = ?';

      $check = $this->query_data($query);
      if ($check !== false) {
        return false;
      }

      // If the customer is found, create a new address for the customer
      $query = 'INSERT INTO ' . $this->table . '
              SET street = :street, district = :district, city = :city, cid = :cid';

      $stmt = $this->conn->prepare($query);

      // Bind data
      $stmt->bindParam(':cid', $this->cid);
      $stmt->bindParam(':street', $this->street);
      $stmt->bindParam(':district', $this->district);
      $stmt->bindParam(':city', $this->city);

      // Execute the query
      if ($stmt->execute()) {
        return true;
      }

      // Print error if something goes wrong
      printf("Error: %s.\n", $stmt->error);

      return false;
    }

    public function update() {
      // Find the customer with the given cid
      $query = 'SELECT * FROM customer WHERE cid = ?';

      $check = $this->query_data($query);
      if ($check === false) {
        return false;
      }

      // If the customer is found, update the customer
      $query = 'UPDATE ' . $this->table . '
              SET
                street = :street, district = :district, city = :city
              WHERE 
                cid = ?';

      $stmt = $this->conn->prepare($query);

      // Bind data
      $stmt->bindParam(':cid', $this->cid);
      $stmt->bindParam(':street', $this->street);
      $stmt->bindParam(':district', $this->district);
      $stmt->bindParam(':city', $this->city);

      // Execute the query
      if ($stmt->execute()) {
        return true;
      }

      // Print error if something goes wrong
      printf("Error: %s.\n", $stmt->error);

      return false;
    }

    public function query_data($query) {
      $stmt = $this->conn->prepare($query);
      $this->cid = htmlspecialchars(strip_tags($this->cid));
      $stmt->bindParam(1, $this->cid);
      $stmt->execute();

      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      if ($row === false) {
        return false;
      }
      return true;
    }
  }
?>