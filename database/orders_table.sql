-- 新增订单表
-- 为OnlineStore项目添加订单管理功能

CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_number` varchar(20) NOT NULL COMMENT '订单号',
  `customer_name` varchar(100) NOT NULL COMMENT '客户姓名',
  `customer_email` varchar(100) NOT NULL COMMENT '客户邮箱',
  `customer_phone` varchar(20) DEFAULT NULL COMMENT '客户电话',
  `delivery_address` text NOT NULL COMMENT '配送地址',
  `total_amount` decimal(10,2) NOT NULL COMMENT '订单总金额',
  `order_items` JSON NOT NULL COMMENT '订单商品详情',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_number` (`order_number`),
  INDEX `idx_order_number` (`order_number`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='订单表'; 