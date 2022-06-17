<?php
  class Customer {
    private $conn;
    private $table = 'customer';

    public $cid;
    public $fullname;
    public $username;
    public $password;
    public $avatar;
    public $dob;
    public $gender;
    public $phone;
    public $isBanned;
    public $wishlist;
    public $date_created;
    public $street;
    public $district;
    public $city;

    public function __construct($db) {
      $this->conn = $db;
    }

    public function read() {
      $query = 'SELECT c.cid, c.fullname, c.username, c.password, c.avatar, c.dob, c.gender, c.wishlist,c.date_created, c.phone, c.isBanned, a.street, a.district, a.city
              FROM ' . $this->table . ' c
              LEFT JOIN customer_address a ON c.cid = a.cid';

      $stmt = $this->conn->prepare($query);
      $stmt->execute();

      return $stmt;
    }

    public function read_single() {
      $query = 'SELECT c.cid, c.fullname, c.username, c.password, c.avatar, c.dob, c.wishlist,c.gender, c.date_created, c.phone, c.isBanned, a.street, a.district, a.city
              FROM ' . $this->table . ' c
              LEFT JOIN customer_address a ON c.cid = a.cid
              WHERE c.cid = ?
              LIMIT 0,1';
      
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(1, $this->cid);
      $stmt->execute();

      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      if ($row === false) {
        return false;
      } else {
        $this->cid = $row['cid'];
        $this->fullname = $row['fullname'];
        $this->username = $row['username'];
        $this->password = $row['password'];
        $this->avatar = $row['avatar'];
        $this->dob = $row['dob'];
        $this->gender = $row['gender'];
        $this->wishlist = $row['wishlist'];
        $this->isBanned = $row['isBanned'];
        $this->phone = $row['phone'];
        $this->date_created = $row['date_created'];
        $this->street = $row['street'];
        $this->district = $row['district'];
        $this->city = $row['city'];
        return true;
      }
    }

    public function create() {
      $query = 'SELECT * FROM ' . $this->table . ' WHERE username = :username';
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(':username', $this->username);
      $stmt->execute();

      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      if ($row === false) {
        $query = 'INSERT INTO ' . $this->table . '
              SET
                username = :username,
                password = :password,
                fullname = :fullname';

        $stmt = $this->conn->prepare($query);

        // Bind data
        $stmt->bindParam(':username', $this->username);
        $stmt->bindParam(':fullname', $this->fullname);

        // Hash password before saving
        $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
        $stmt->bindParam(':password', $password_hash);

        // Execute the query
        if ($stmt->execute()) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    public function update_information() {
      $query = 'SELECT * FROM ' . $this->table . ' WHERE cid = :cid';
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(":cid", $this->cid);
      $stmt->execute();

      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      if ($row !== false) {
        $query = 'UPDATE ' . $this->table . ' 
              SET
                fullname = :fullname,
                avatar   = :avatar,
                dob      = :dob,
                gender   = :gender,
                phone    = :phone,
                wishlist = :wishlist,
                isBanned = :isBanned
              WHERE 
                cid = :cid';
        // $query = 'UPDATE ' . $this->table . ' 
        //       SET
        //         isBanned = :isBanned
        //       WHERE 
        //         cid = :cid';
        
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':fullname', $this->fullname);
        $stmt->bindParam(':avatar', $this->avatar);
        $stmt->bindParam(':dob', $this->dob);
        $stmt->bindParam(':gender',$this->gender);
        $stmt->bindParam(':phone',$this->phone);
        $stmt->bindParam(':wishlist',$this->wishlist);
        $stmt->bindParam(':isBanned', $this->isBanned);
        $stmt->bindParam(':cid', $this->cid);


        if ($stmt->execute()) {
          return 1;
        } else {
          return 2;
        }
      } else {
        return 3;
      }
    }
    public function update_wishlist() {
      $query = 'SELECT * FROM ' . $this->table . ' WHERE cid = :cid';
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(":cid", $this->cid);
      $stmt->execute();

      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      if ($row !== false) {
        $query = 'UPDATE ' . $this->table . ' 
              SET
                wishlist = :wishlist
              WHERE 
                cid = :cid';

        
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':wishlist',$this->wishlist);
        $stmt->bindParam(':cid', $this->cid);


        if ($stmt->execute()) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    public function login() {
      $query = 'SELECT * FROM ' . $this->table . ' WHERE username = :username';
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(':username', $this->username);

      $stmt->execute();

      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      if ($row === false) {
        return null;
      } else {
        $password_hash = $row['password'];
        if (password_verify($this->password, $password_hash)) {
          return $row;
        } else {
          return null;
        }
      }
    }

    public function forgotPassword() {
      $query = 'SELECT password FROM ' . $this->table . ' WHERE username = :username';
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(':username', $this->username);

      $stmt->execute();

      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      if ($row === false) {
        return false;
      } else {
        return true;
      }
    }

    public function delete() {
      $query = 'SELECT * FROM ' . $this->table . ' WHERE cid = ?';
      
      $stmt = $this->conn->prepare($query);
      $stmt->bindParam(1, $this->cid);
      $stmt->execute();

      $row = $stmt->fetch(PDO::FETCH_ASSOC);
      if ($row === false) {
        return false;
      }
      else {
        $query = 'DELETE FROM ' . $this->table . ' WHERE cid = ?';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->cid);
        if ($stmt->execute()) {
          return true;
        }

        printf("Error: %s.\n", $stmt->error);
        return false;
      }
    }
  }
?>