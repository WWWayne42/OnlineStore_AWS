# Online Grocery Store

一个基于React + PHP + MySQL的在线杂货店应用，支持完整的购物流程和订单管理功能。

## 🚀 功能特性

### 用户功能
- ✅ 商品浏览和分类筛选
- ✅ 购物车管理（添加、删除、更新数量）
- ✅ 完整的订单流程（配送信息 → 订单确认）
- ✅ 订单创建和唯一订单号生成
- ✅ 历史订单查询（通过订单号）
- ✅ 库存实时检查和管理

### 技术特性
- ✅ 响应式设计，支持多设备访问
- ✅ 前后端分离架构
- ✅ RESTful API设计
- ✅ 数据库事务处理确保数据一致性
- ✅ 环境变量支持，便于部署

## 🛠️ 技术栈

### 前端
- **框架**: React 18.2.0
- **路由**: React Router Dom 6.26.0
- **构建工具**: Vite 4.5.3
- **样式**: CSS-in-JS

### 后端
- **语言**: PHP 8.x
- **Web服务器**: Apache (XAMPP)
- **数据库**: MySQL 8.0
- **API**: RESTful API

### 开发工具
- **版本控制**: Git
- **包管理**: npm
- **代码规范**: ESLint
- **本地开发**: XAMPP (macOS)

## 📦 项目结构

## 🚀 快速开始

### 环境要求
- Node.js 18.x+
- XAMPP (包含Apache + MySQL + PHP)
- npm 或 yarn

### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/your-username/online-grocery-store.git
   cd online-grocery-store
   ```

2. **启动XAMPP服务**
   ```bash
   # macOS
   sudo /Applications/XAMPP/xamppfiles/xampp start
   
   # 或通过XAMPP控制面板启动Apache和MySQL
   ```

3. **设置数据库**
   ```bash
   # 导入数据库文件
   mysql -u root -p < database/grocery_store.sql
   mysql -u root -p < database/orders_table.sql
   ```

4. **部署后端API**
   ```bash
   # 复制API文件到XAMPP htdocs目录
   cp -r backend/grocery-api /Applications/XAMPP/xamppfiles/htdocs/
   ```

5. **安装前端依赖并启动**
   ```bash
   cd frontend
   npm install
   npm run dev  # 开发模式
   # 或
   npm run build && npm run preview  # 生产模式
   ```

6. **访问应用**
   - 前端: http://localhost:5173 (开发) 或 http://localhost:4173 (生产)
   - 后端API: http://localhost/grocery-api/
   - 健康检查: http://localhost/grocery-api/health.php

## 🔧 API 端点

| 端点 | 方法 | 功能 | 参数 |
|------|------|------|------|
| `/grocery-api/getProducts.php` | GET | 获取商品列表 | `category`, `sub` |
| `/grocery-api/createOrder.php` | POST | 创建订单 | `customer`, `items` |
| `/grocery-api/getOrderById.php` | GET | 查询订单 | `order_number` |
| `/grocery-api/checkStock.php` | POST | 检查库存 | `items` |
| `/grocery-api/updateStock.php` | POST | 更新库存 | `items` |
| `/grocery-api/health.php` | GET | 健康检查 | - |

## 🧪 测试

### 后端API测试
```bash
# 健康检查
curl http://localhost/grocery-api/health.php

# 获取商品
curl "http://localhost/grocery-api/getProducts.php?category=Fresh"

# 运行完整测试脚本
php test_order_functionality.php
```

### 前端测试
1. 浏览商品页面
2. 添加商品到购物车
3. 完成订单流程
4. 使用订单号查询历史订单

## 📝 使用说明

### 购物流程
1. **浏览商品** - 在主页查看商品，可按分类筛选
2. **添加到购物车** - 点击"Add to Cart"按钮
3. **管理购物车** - 在购物车页面修改数量或删除商品
4. **填写配送信息** - 输入姓名、地址、联系方式
5. **确认订单** - 查看订单详情和订单号
6. **查询历史订单** - 使用订单号在"Orders"页面查询

### 订单管理
- 每个订单都有唯一的订单号格式：`ORD20241225001`
- 订单包含完整的客户信息和商品详情
- 支持通过订单号快速查询

## 🌐 部署到AWS

项目已为AWS部署做好准备：
- 支持环境变量配置
- 容器化就绪
- 健康检查端点
- 可扩展架构设计

### 推荐的AWS架构
- **前端**: S3 + CloudFront
- **后端**: ECS/EKS + Application Load Balancer
- **数据库**: RDS (MySQL)
- **缓存**: ElastiCache (Redis)

## 🤝 贡献

欢迎提交Issue和Pull Request！

## �� 许可证

MIT License
