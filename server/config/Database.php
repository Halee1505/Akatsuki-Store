<?php
  class Database {
    private $host = "localhost";
    private $db_name = "akatsuki_store";
    private $username = "root";
    private $password = "";
    // private $conn;

    public function connect() {
      $this->conn = null;

        $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        if (!$this->conn) {
          die("Connection failed: " . mysqli_connect_error());
      }
      return $this->conn;
    }
  }
?>