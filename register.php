<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $username = $_POST['username'];
  $password = $_POST['password'];

  // Database connection details
  $host = 'localhost';
  $dbUsername = 'root';
  $dbPassword = '';
  $dbName = 'dailydiary';

  $pdo = new PDO("mysql:host=$host;dbname=$dbName", $dbUsername, $dbPassword);

  // Hashed password
  $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

  // executing
  $stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
  $stmt->execute([$username, $hashedPassword]);

  if ($stmt->rowCount() > 0) {
    echo 'Registration successful';
  } else {
    echo 'Registration failed';
  }
}
?>
