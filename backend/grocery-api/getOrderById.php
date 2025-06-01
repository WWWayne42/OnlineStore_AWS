<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once 'config.php';

try {
    $orderNumber = $_GET['order_number'] ?? null;
    
    if (!$orderNumber) {
        throw new Exception("请提供订单号");
    }
    
    $pdo = Config::getDbConnection();
    
    $stmt = $pdo->prepare("SELECT * FROM orders WHERE order_number = ?");
    $stmt->execute([$orderNumber]);
    $order = $stmt->fetch();
    
    if (!$order) {
        throw new Exception("找不到该订单号的订单");
    }
    
    // 解析JSON格式的商品信息
    $order['order_items'] = json_decode($order['order_items'], true);
    
    echo json_encode([
        "status" => "success",
        "order" => $order
    ]);
    
} catch (Exception $e) {
    http_response_code(404);
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?> 