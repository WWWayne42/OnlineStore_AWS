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

    $stmt = $pdo->prepare("SELECT name, inStock FROM products WHERE id = ?");
    $stmt->execute([$id]);
    $row = $stmt->fetch();

    if ($row && intval($row['inStock']) < $qty) {
        $productName = $row['name'];
        $stockLeft = intval($row['inStock']);
        echo json_encode([
            "status" => "error",
            "message" => "The stock of $productName is insufficient. Only $stockLeft left."
        ]);
        exit;
    }
}

echo json_encode(["status" => "ok"]);
?>