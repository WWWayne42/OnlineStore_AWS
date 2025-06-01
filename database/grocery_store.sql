-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2025-04-23 07:58:06
-- 服务器版本： 10.4.28-MariaDB
-- PHP 版本： 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `grocery_store`
--

-- --------------------------------------------------------

--
-- 表的结构 `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL COMMENT 'key',
  `name` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `subcategory` varchar(50) NOT NULL,
  `unit` varchar(20) NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `inStock` tinyint(1) NOT NULL DEFAULT 1,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `products`
--

INSERT INTO `products` (`id`, `name`, `category`, `subcategory`, `unit`, `price`, `inStock`, `image`) VALUES
(1, 'Apples', 'Fresh', 'Fruits', '1kg', 5.99, 80, 'http://localhost/grocery-api/images/apples.jpg'),
(2, 'Bananas', 'Fresh', 'Fruits', '1kg', 4.25, 0, 'http://localhost/grocery-api/images/bananas.jpg'),
(3, 'Pears', 'Fresh', 'Fruits', '1kg', 6.20, 92, 'http://localhost/grocery-api/images/pears.jpg'),
(4, 'Tomatoes', 'Fresh', 'Vegetables', '500g', 3.49, 97, 'http://localhost/grocery-api/images/tomatoes.jpg'),
(5, 'Lettuce', 'Fresh', 'Vegetables', '1pc', 2.99, 96, 'http://localhost/grocery-api/images/lettuce.jpg'),
(6, 'Carrots', 'Fresh', 'Vegetables', '1kg', 2.89, 98, 'http://localhost/grocery-api/images/carrots.jpg'),
(7, 'Vanilla Ice Cream', 'Frozen', 'Ice cream', '1kg', 7.99, 100, 'http://localhost/grocery-api/images/vanilla_ice_cream.jpg'),
(8, 'Chocolate Ice Cream', 'Frozen', 'Ice cream', '500g', 4.49, 100, 'http://localhost/grocery-api/images/chocolate_ice_cream.jpg'),
(9, 'Large Shrimp', 'Frozen', 'Shrimp', '1kg', 12.99, 100, 'http://localhost/grocery-api/images/large_shrimp.jpg'),
(10, 'Medium Shrimp', 'Frozen', 'Shrimp', '500g', 7.99, 0, 'http://localhost/grocery-api/images/medium_shrimp.jpg'),
(11, 'Soda', 'Beverages', 'Fizzy drinks', '500ml', 1.99, 100, 'http://localhost/grocery-api/images/soda.jpg'),
(12, 'Coke', 'Beverages', 'Fizzy drinks', '500ml', 2.20, 98, 'http://localhost/grocery-api/images/coke.jpg'),
(13, 'Sprite', 'Beverages', 'Fizzy drinks', '500ml', 2.10, 100, 'http://localhost/grocery-api/images/sprite.jpg'),
(14, 'Fanta', 'Beverages', 'Fizzy drinks', '500ml', 2.00, 100, 'http://localhost/grocery-api/images/fanta.jpg'),
(15, 'Orange Juice', 'Beverages', 'Juice', '1L', 3.50, 100, 'http://localhost/grocery-api/images/orange_juice.jpg'),
(16, 'Mango Juice', 'Beverages', 'Juice', '1L', 3.80, 100, 'http://localhost/grocery-api/images/mango_juice.jpg'),
(17, 'Apple Juice', 'Beverages', 'Juice', '1L', 3.60, 100, 'http://localhost/grocery-api/images/apple_juice.jpg'),
(18, 'Chocolate Bar', 'Snacks', 'Confectionery', '100g', 2.50, 100, 'http://localhost/grocery-api/images/chocolate_bar.jpg'),
(19, 'Toffee Candy', 'Snacks', 'Confectionery', '150g', 2.30, 100, 'http://localhost/grocery-api/images/toffee_candy.jpg'),
(20, 'Gummy Bears', 'Snacks', 'Confectionery', '180g', 2.80, 100, 'http://localhost/grocery-api/images/gummy_bears.jpg'),
(21, 'Original Potato Chips', 'Snacks', 'Chips', '150g', 3.00, 100, 'http://localhost/grocery-api/images/original_potato_chips.jpg'),
(22, 'Barbecue Chips', 'Snacks', 'Chips', '150g', 3.20, 100, 'http://localhost/grocery-api/images/barbecue_chips.jpg'),
(23, 'Seaweed Chips', 'Snacks', 'Chips', '150g', 3.10, 100, 'http://localhost/grocery-api/images/seaweed_chips.jpg'),
(24, 'Digestive Biscuits', 'Snacks', 'Biscuits', '200g', 2.50, 100, 'http://localhost/grocery-api/images/digestive_biscuits.jpg'),
(25, 'Cream Sandwich Biscuits', 'Snacks', 'Biscuits', '180g', 2.70, 100, 'http://localhost/grocery-api/images/cream_sandwich_biscuits.jpg'),
(26, 'Wholegrain Biscuits', 'Snacks', 'Biscuits', '250g', 3.00, 100, 'http://localhost/grocery-api/images/wholegrain_biscuits.jpg'),
(27, 'Hand Wash', 'Home', 'Body', '500ml', 3.50, 100, 'http://localhost/grocery-api/images/hand_wash.jpg'),
(28, 'Shampoo', 'Home', 'Body', '400ml', 6.80, 100, 'http://localhost/grocery-api/images/shampoo.jpg'),
(29, 'Body Wash', 'Home', 'Body', '750ml', 7.20, 100, 'http://localhost/grocery-api/images/body_wash.jpg'),
(30, 'Kitchen Sponge', 'Home', 'Kitchen', '3pcs', 2.30, 100, 'http://localhost/grocery-api/images/kitchen_sponge.jpg'),
(31, 'Dishwasher Tablets', 'Home', 'Kitchen', '30pcs', 8.99, 100, 'http://localhost/grocery-api/images/dishwasher_tablets.jpg'),
(32, 'Dishwasher Cleaner', 'Home', 'Kitchen', '250ml', 4.50, 100, 'http://localhost/grocery-api/images/dishwasher_cleaner.jpg'),
(33, 'Dishwasher Powder', 'Home', 'Kitchen', '1kg', 5.75, 100, 'http://localhost/grocery-api/images/dishwasher_powder.jpg');

--
-- 转储表的索引
--

--
-- 表的索引 `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'key', AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
