<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once 'config.php';

try {
    $start_time = microtime(true);
    $pdo = Config::getDbConnection();
    
    // 检查数据库连接和基本查询
    $stmt = $pdo->query("SELECT COUNT(*) as products_count FROM products");
    $products_count = $stmt->fetch()['products_count'];
    
    $stmt = $pdo->query("SELECT COUNT(*) as orders_count FROM orders");
    $orders_count = $stmt->fetch()['orders_count'];
    
    $response_time = round((microtime(true) - $start_time) * 1000, 2);
    
    echo json_encode([
        "status" => "healthy",
        "timestamp" => date('Y-m-d H:i:s'),
        "database" => "connected",
        "products_count" => $products_count,
        "orders_count" => $orders_count,
        "response_time_ms" => $response_time,
        "version" => "1.0.0"
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "unhealthy",
        "timestamp" => date('Y-m-d H:i:s'),
        "error" => $e->getMessage()
    ]);
}
?> 