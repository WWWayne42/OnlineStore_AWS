<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

require_once 'config.php';

$data = json_decode(file_get_contents("php://input"), true);
$items = $data['items'];

$pdo = Config::getDbConnection();

foreach ($items as $item) {
    $id = intval($item['id']);
    $qty = intval($item['quantity']);
    $stmt = $pdo->prepare("UPDATE products SET inStock = inStock - ? WHERE id = ?");
    $stmt->execute([$qty, $id]);
}

echo json_encode(["status" => "ok"]);
?>