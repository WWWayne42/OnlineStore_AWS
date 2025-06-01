<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once 'config.php';

try {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!$data || !isset($data['customer']) || !isset($data['items'])) {
        throw new Exception("缺少必要的订单信息");
    }
    
    $pdo = Config::getDbConnection();
    $pdo->beginTransaction();
    
    // 计算总金额
    $totalAmount = 0;
    foreach ($data['items'] as $item) {
        $totalAmount += $item['price'] * $item['quantity'];
    }
    
    // 生成唯一订单号
    $orderNumber = Config::generateOrderNumber();
    
    // 确保订单号唯一
    while (true) {
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM orders WHERE order_number = ?");
        $stmt->execute([$orderNumber]);
        if ($stmt->fetchColumn() == 0) {
            break;
        }
        $orderNumber = Config::generateOrderNumber();
    }
    
    // 构建配送地址 - 匹配DeliveryPage.jsx的表单字段
    $deliveryAddress = $data['customer']['firstName'] . ' ' . $data['customer']['lastName'] . ', ' .
                       $data['customer']['street'] . ', ' .
                       $data['customer']['city'] . ', ' . 
                       $data['customer']['state'];
    
    // 构建客户姓名
    $customerName = $data['customer']['firstName'] . ' ' . $data['customer']['lastName'];
    
    // 插入订单
    $stmt = $pdo->prepare("
        INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, 
                           delivery_address, total_amount, order_items) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    
    $stmt->execute([
        $orderNumber,
        $customerName,
        $data['customer']['email'],
        $data['customer']['mobile'], // 匹配DeliveryPage.jsx中的字段名
        $deliveryAddress,
        $totalAmount,
        json_encode($data['items'])
    ]);
    
    $orderId = $pdo->lastInsertId();
    
    $pdo->commit();
    
    echo json_encode([
        "status" => "success",
        "order_id" => $orderId,
        "order_number" => $orderNumber,
        "total_amount" => $totalAmount,
        "message" => "订单创建成功"
    ]);
    
} catch (Exception $e) {
    if (isset($pdo) && $pdo->inTransaction()) {
        $pdo->rollback();
    }
    
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?> 