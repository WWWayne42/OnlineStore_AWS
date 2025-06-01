<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once 'config.php';

try {
  $pdo = Config::getDbConnection();

  $category = $_GET['category'] ?? null;
  $subcategory = $_GET['sub'] ?? null;

  $sql = "SELECT * FROM products WHERE inStock > 0"; // 只显示有库存的商品
  $params = [];

  if ($category && $subcategory) {
    $sql .= " AND category = ? AND subcategory = ?";
    $params = [$category, $subcategory];
  } elseif ($category) {
    $sql .= " AND category = ?";
    $params = [$category];
  }

  $sql .= " ORDER BY name";

  $stmt = $pdo->prepare($sql);
  $stmt->execute($params);
  $products = $stmt->fetchAll();
  echo json_encode($products);
  
} catch (PDOException $e) {
  http_response_code(500);
  echo json_encode(["error" => $e->getMessage()]);
}