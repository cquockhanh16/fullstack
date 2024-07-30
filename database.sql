-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: project
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accessories`
--

DROP TABLE IF EXISTS `accessories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accessories` (
  `accessory_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `accessory_size` varchar(50) DEFAULT NULL,
  `accessory_weight` varchar(10) DEFAULT NULL,
  `accessory_sku` varchar(10) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`accessory_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `accessories_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accessories`
--

LOCK TABLES `accessories` WRITE;
/*!40000 ALTER TABLE `accessories` DISABLE KEYS */;
INSERT INTO `accessories` VALUES (1,1,'10 x 20 x 0.5 cm','50g','290476737','2024-06-05 16:22:50','2024-06-05 16:22:50');
/*!40000 ALTER TABLE `accessories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `account_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(40) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `account_image_url` text,
  `account_image` text,
  PRIMARY KEY (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'khanhkhanh','$2b$10$SepVUoOMzXM.Sl/qFuU9m.8yvAB58aQUdiGV5.TRLcA9XB4yV562y',1,'2024-06-05 16:21:11','2024-06-05 16:21:11',NULL,NULL),(2,'khanh123','$2b$10$B0VyeepZXgXxqsqAwAFf6OSIPqdw2N7sMn/sXVDKmRzAGSaXYj9Zy',0,'2024-06-05 16:49:44','2024-06-05 16:49:44',NULL,NULL),(3,'khanh1234','$2b$10$xodFL3JTlZdq2rfj3TFIteJzM7No6jTIa4tsrhQ5N00D/gQlJeHmq',0,'2024-06-07 01:24:13','2024-06-07 01:24:13',NULL,NULL),(4,'khanh2003','$2b$10$wBcKXco4zmmnMDbLeNeJ3Oq6t5bbTiOez7vQktU5lHVTYIXjzZBwC',0,'2024-06-07 01:35:37','2024-06-07 01:35:37',NULL,NULL),(5,'vuong2003','$2b$10$pATKDw6vFlN3YRIspv1aUerR0W8jmWvzFdUlIkfXF2csZV7u/gKt2',0,'2024-06-11 18:42:17','2024-06-11 18:42:17',NULL,'1718131337744-family.jpg');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `categories_id` int NOT NULL AUTO_INCREMENT,
  `categories_name` varchar(255) DEFAULT NULL,
  `categories_description` text,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`categories_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Điện thoại','Điện thoại là một thiết bị di động nhỏ gọn, thường được thiết kế để giao tiếp bằng cách gọi điện thoại, gửi tin nhắn văn bản, và truy cập interne','2024-06-05 23:10:19','2024-06-05 23:10:19'),(2,'Tablet','Tablet hay máy tính bảng là một thiết bị di động cầm tay, nhẹ và linh hoạt, thường có một màn hình cảm ứng lớn và không có bàn phím vật lý','2024-06-05 23:10:19','2024-06-05 23:10:19'),(3,'Laptop','Laptop là một thiết bị di động và linh hoạt được thiết kế để cung cấp các tính năng của một máy tính cá nhân trong một thiết bị nhỏ gọn.','2024-06-05 23:10:19','2024-06-05 23:10:19'),(4,'Phụ kiện','Phụ kiện điện tử là một sản phẩm bổ sung được thiết kế để cải thiện trải nghiệm sử dụng của các thiết bị điện tử như điện thoại di động, máy tính bảng, máy tính xách tay và các thiết bị khác','2024-06-05 23:10:19','2024-06-05 23:10:19'),(5,'Sạc dự phòng','sạc duej phòng','2024-06-12 14:01:35','2024-06-12 14:01:35'),(6,'Máy đọc sách',NULL,'2024-06-12 14:04:48','2024-06-12 14:04:48'),(7,'Màn hình máy tính',NULL,'2024-06-12 14:09:31','2024-06-12 14:09:31'),(8,'dádasd','sadasdasd','2024-06-12 14:10:05','2024-06-12 14:10:05');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `fisrt_name` varchar(40) DEFAULT NULL,
  `last_name` varchar(40) DEFAULT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `country` varchar(20) DEFAULT NULL,
  `phone_number` varchar(10) DEFAULT NULL,
  `address` varchar(40) DEFAULT NULL,
  `city` varchar(20) DEFAULT NULL,
  `email` char(40) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'chu quoc','khanh','haui','Vietnam',NULL,'bac giang','bac gian','khanh@mail.com','2024-06-05 16:50:49','2024-06-05 16:50:49'),(2,'chu quoc','khanh','haui','Vietnam',NULL,'bac giang','bac giang','chuquoc591@mail.com','2024-06-07 01:29:21','2024-06-07 01:29:21'),(3,'chu quoc','khanh','haui','Vietnam',NULL,'ha lonh yen dung','bac giang','chuquoc591@gmail.com','2024-06-07 01:37:47','2024-06-07 01:37:47'),(4,'David','Beckham','Manchester United','United States',NULL,'Manchester','Manchester','david@mail.com','2024-06-07 01:40:02','2024-06-07 01:40:02'),(5,'Chu Quốc','Vượng','Công ty TNHH Gia Đình','Việt Nam',NULL,'Thôn hạ long, xã đồng phúc yên dũng','bắc giang','vuong@mail.com','2024-06-11 18:00:15','2024-06-11 18:00:15'),(6,'Chu Thị','Đào','Công ty gia đình','Việt Nam',NULL,'trung kính, cầu giấy','Hà nội','daocthi@mail.com','2024-06-11 18:59:05','2024-06-11 18:59:05'),(7,'Chu Quốc','Vượng','hạ long','Việt Nam',NULL,'Ha long, dong phuc yen dung','bac giang','khanh@mail.com','2024-06-13 08:24:29','2024-06-13 08:24:29'),(8,'Chu Quốc','Khánh','haui','Việt Nam',NULL,'phố phú kiều','hà nội','quockhanh@mail.com','2024-06-13 08:26:17','2024-06-13 08:26:17'),(9,'chu quoc','khanh','haui','Việt Nam',NULL,'ha long','bac giang','khanh@mail.com','2024-06-13 14:13:52','2024-06-13 14:13:52');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `laptops`
--

DROP TABLE IF EXISTS `laptops`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `laptops` (
  `laptop_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `laptop_os` varchar(100) DEFAULT NULL,
  `laptop_screen` varchar(100) DEFAULT NULL,
  `laptop_chip` varchar(100) DEFAULT NULL,
  `laptop_rom` varchar(40) DEFAULT NULL,
  `laptop_ram` varchar(40) DEFAULT NULL,
  `laptop_camera` varchar(40) DEFAULT NULL,
  `laptop_pin` varchar(40) DEFAULT NULL,
  `laptop_connect` varchar(255) DEFAULT NULL,
  `laptop_accessory` varchar(40) DEFAULT NULL,
  `laptop_card_graphic` varchar(40) DEFAULT NULL,
  `laptop_card_ram` varchar(40) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`laptop_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `laptops_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `laptops`
--

LOCK TABLES `laptops` WRITE;
/*!40000 ALTER TABLE `laptops` DISABLE KEYS */;
INSERT INTO `laptops` VALUES (1,5,'MacOS','13.3 inch, 2560 x 1600 pixels','Intel Core i5 dual-core 3.1GHz','512GB','8GB 2133MHz LPDDR3 memory','720p FaceTime HD camera','54.5-watt-hour lithium-polymer battery','4 x Thunderbolt 3 (USB-C) ports for: Charging, DisplayPort, Thunderbolt (up to 40 Gbps), USB 3.1 Gen 2 (up to 10 Gbps)','Không có','Intel Iris Plus Graphics 650','4GB','2024-06-05 16:33:05','2024-06-05 16:33:05');
/*!40000 ALTER TABLE `laptops` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mobile_devices`
--

DROP TABLE IF EXISTS `mobile_devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mobile_devices` (
  `mobile_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `mobile_os` varchar(100) DEFAULT NULL,
  `mobile_screen` varchar(100) DEFAULT NULL,
  `mobile_chip` varchar(100) DEFAULT NULL,
  `mobile_rom` varchar(40) DEFAULT NULL,
  `mobile_ram` varchar(40) DEFAULT NULL,
  `mobile_camera` varchar(100) DEFAULT NULL,
  `mobile_pin` varchar(100) DEFAULT NULL,
  `mobile_connect` varchar(100) DEFAULT NULL,
  `mobile_accessory` varchar(100) DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`mobile_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `mobile_devices_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mobile_devices`
--

LOCK TABLES `mobile_devices` WRITE;
/*!40000 ALTER TABLE `mobile_devices` DISABLE KEYS */;
INSERT INTO `mobile_devices` VALUES (1,2,'Android 7.1 Nougat','4.5 inch, 1620 x 1080 pixels','Qualcomm MSM8953 Snapdragon 625','512GB','4GB','12 MP','	Li-Ion 3505mAh','3 x USB 3.0, 1 x HDMI','Không có','2024-06-05 16:25:20','2024-06-05 16:25:20'),(2,3,'iOS 9',' 9.7 inch, độ phân giải 1536 x 2048 pixels','Apple A9X 2 nhân 64-bit','32GB','2GB','Trước/Sau: 5Mp/12MP','Lithium – Ion, 27.5 Wh (Khoảng 7350 mAh)','3 x USB 3.0, 1 x HDMI','Không có','2024-06-05 16:27:30','2024-06-05 16:27:30'),(3,6,'Android','FullHD','Snapdragon 880','128GB','8GB','12MPX','Pin do nhà sản xuất','Wifi...','Củ sạc, dây sạc, sách hướng dẫn sử dụng','2024-06-12 12:52:39','2024-06-12 12:52:39');
/*!40000 ALTER TABLE `mobile_devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `order_detail_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `quanity` int DEFAULT NULL,
  `unit_price` mediumtext,
  `sub_total` mediumtext,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_detail_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (1,1,1,1,'105000','105000','2024-06-05 16:50:49','2024-06-05 16:50:49'),(2,1,5,2,'3849999.9999999995','7699999.999999999','2024-06-05 16:50:49','2024-06-05 16:50:49'),(3,2,3,1,'1500000','1500000','2024-06-07 01:29:22','2024-06-07 01:29:22'),(4,3,2,1,'149999.99999999997','149999.99999999997','2024-06-07 01:37:47','2024-06-07 01:37:47'),(5,3,3,1,'1500000','1500000','2024-06-07 01:37:47','2024-06-07 01:37:47'),(6,3,5,2,'3849999.9999999995','7699999.999999999','2024-06-07 01:37:47','2024-06-07 01:37:47'),(7,4,2,1,'149999.99999999997','149999.99999999997','2024-06-07 01:40:02','2024-06-07 01:40:02'),(8,4,3,1,'1500000','1500000','2024-06-07 01:40:02','2024-06-07 01:40:02'),(9,4,5,2,'3849999.9999999995','7699999.999999999','2024-06-07 01:40:02','2024-06-07 01:40:02'),(10,5,5,1,'3849999.9999999995','3849999.9999999995','2024-06-11 18:00:15','2024-06-11 18:00:15'),(11,5,2,1,'149999.99999999997','149999.99999999997','2024-06-11 18:00:15','2024-06-11 18:00:15'),(12,5,3,1,'1500000','1500000','2024-06-11 18:00:15','2024-06-11 18:00:15'),(13,5,1,1,'150000','150000','2024-06-11 18:00:15','2024-06-11 18:00:15'),(14,6,2,1,'149999.99999999997','149999.99999999997','2024-06-11 18:59:05','2024-06-11 18:59:05'),(15,6,1,1,'150000','150000','2024-06-11 18:59:05','2024-06-11 18:59:05'),(16,7,3,1,'1500000','1500000','2024-06-13 08:24:29','2024-06-13 08:24:29'),(17,8,3,1,'1500000','1500000','2024-06-13 08:26:17','2024-06-13 08:26:17'),(18,9,2,1,'149999.99999999997','149999.99999999997','2024-06-13 14:13:52','2024-06-13 14:13:52');
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `account_id` int DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `total_amount` mediumtext,
  `note` text,
  `code` char(8) DEFAULT NULL,
  `payment_methods` varchar(40) DEFAULT NULL,
  `status` int DEFAULT '0',
  PRIMARY KEY (`order_id`),
  KEY `account_id` (`account_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,2,1,'2024-06-05 16:50:49','2024-06-07 01:10:56','7804999.999999999','Giao hàng nhanh giúp mình với ạ','686868','Thanh toán sau khi nhận hàng',0),(2,3,2,'2024-06-07 01:29:21','2024-06-11 17:13:09','1500000','giao hang nhanh giup em','686868','Thanh toán sau khi nhận hàng',0),(3,4,3,'2024-06-07 01:37:47','2024-06-11 17:20:10','9350000','sadasdasd','686868','Thanh toán sau khi nhận hàng',0),(4,4,4,'2024-06-07 01:40:02','2024-06-11 17:20:53','9350000','giao nhanh cho tôi còn đi đá bóng nữa','686868','Thanh toán sau khi nhận hàng',0),(5,4,5,'2024-06-11 18:00:15','2024-06-13 07:46:59','5650000','Giao nhanh giúp em với','786858','Thanh toán sau khi nhận hàng',0),(6,5,6,'2024-06-11 18:59:05','2024-06-12 12:47:43','300000','khôgn','29292','Thanh toán sau khi nhận hàng',0),(7,5,7,'2024-06-13 08:24:29','2024-06-13 08:32:06','1500000','giao nhanh','686868','Thanh toán sau khi nhận hàng',5),(8,5,8,'2024-06-13 08:26:17','2024-06-13 08:26:17','1500000','sadasa','989898','Thanh toán sau khi nhận hàng',1),(9,5,9,'2024-06-13 14:13:52','2024-06-13 14:13:52','149999.99999999997','giao hàng','686868','Thanh toán sau khi nhận hàng',1);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `post_image_url` text,
  `post_title` varchar(255) DEFAULT NULL,
  `post_description` text,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) NOT NULL,
  `product_image_url` varchar(255) DEFAULT NULL,
  `product_description` text,
  `product_price` mediumtext,
  `quantity` int DEFAULT NULL,
  `is_new` tinyint(1) DEFAULT NULL,
  `categories_id` int DEFAULT NULL,
  `supplier_id` int DEFAULT NULL,
  `promotion_id` int DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`),
  KEY `categories_id` (`categories_id`),
  KEY `promotion_id` (`promotion_id`),
  KEY `supplier_id` (`supplier_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`categories_id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`promotion_id`),
  CONSTRAINT `products_ibfk_3` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Ốp Lưng Dẻo Cho iPhone 6 Plus/6s Plus – Gấu Kèm Thú Nổi','1718126994004-op-deo-hinh-thu-01.jpg',NULL,'150000',9998,1,4,1,NULL,'2024-06-05 16:22:50','2024-06-11 18:59:05'),(2,'Điện Thoại BlackBerry KEYone – Hàng Chính Hãng','1717604720763-bb-key-one-04-300x300.jpg',NULL,'1500000',95,1,1,1,1,'2024-06-05 16:25:20','2024-06-13 14:13:52'),(3,'iPad Pro 9.7 inch Wifi Cellular 32GB – Hàng Chính Hãng','1717604850211-ipad-pro-9.7-wifi-4g-32gb-rose-gold-01.jpg',NULL,'1500000',94,1,2,1,NULL,'2024-06-05 16:27:30','2024-06-13 08:26:17'),(5,'Apple Macbook Pro 2017 13.3 Inch Touch Bar & ID MPXW2 Gray – Hàng Chính Hãng','1717605185819-mac-pro-2017-01.jpg',NULL,'5500000',93,1,3,1,3,'2024-06-05 16:33:05','2024-06-11 18:00:16'),(6,'Samsung Galaxy S23 Ultra','1718196759825-ss-galaxy-note-fe-01.jpg',NULL,'400000000',10,1,1,1,NULL,'2024-06-12 12:52:39','2024-06-12 12:52:39');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotions`
--

DROP TABLE IF EXISTS `promotions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotions` (
  `promotion_id` int NOT NULL AUTO_INCREMENT,
  `promotion_name` varchar(255) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `description` text,
  `discount_value` int DEFAULT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`promotion_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotions`
--

LOCK TABLES `promotions` WRITE;
/*!40000 ALTER TABLE `promotions` DISABLE KEYS */;
INSERT INTO `promotions` VALUES (1,'Giảm giá','2024-05-07 15:30:00','2026-05-07 15:30:00','Giảm giá kịch sàn cho anh em luôn',90,'2024-06-05 23:10:32','2024-06-05 23:10:32'),(2,'Giảm giá','2024-05-07 15:30:00','2026-05-07 15:30:00','Giảm giá nhân ngày quốc tế phụ nữ',60,'2024-06-05 23:10:32','2024-06-05 23:10:32'),(3,'Giảm giá','2024-05-07 15:30:00','2026-05-07 15:30:00','Giảm giá kịch sàn cho anh em luôn',30,'2024-06-05 23:10:32','2024-06-05 23:10:32'),(4,'Giảm giá','2024-05-07 15:30:00','2026-05-07 15:30:00','Giảm giá kịch sàn cho anh em luôn',55,'2024-06-05 23:10:32','2024-06-05 23:10:32'),(5,'Giảm giá','2024-05-07 15:30:00','2026-05-07 15:30:00','Giảm giá kịch sàn cho anh em luôn',68,'2024-06-05 23:10:32','2024-06-05 23:10:32');
/*!40000 ALTER TABLE `promotions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `supplier_id` int NOT NULL AUTO_INCREMENT,
  `supplier_name` varchar(255) DEFAULT NULL,
  `contact_name` varchar(255) DEFAULT NULL,
  `contact_email` varchar(50) DEFAULT NULL,
  `contact_phone` varchar(20) DEFAULT NULL,
  `supplier_address` varchar(255) DEFAULT NULL,
  `supplier_detail` text,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`supplier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (1,'Apple','Tim Cook','apple@apple.com','1-800-692-7753',' Apple Park, 1 Apple Park Way, Cupertino, California, 95014, Hoa Kỳ','Apple là một trong những công ty công nghệ hàng đầu trên thế giới, được thành lập vào năm 1976 bởi Steve Jobs, Steve Wozniak và Ronald Wayne. Apple nổi tiếng với việc phát triển và sản xuất các sản phẩm công nghệ tiên tiến, đặc biệt là trong lĩnh vực điện tử tiêu dùng, máy tính và phần mềm.','2024-06-05 23:16:26','2024-06-05 23:16:26'),(2,'Samsung Electronics','Kim Ki-Nam','support@samsung.com','1-800-726-7864','Samsung Digital City, 8, Samsung-ro 2-gil, Giheung-gu, Yongin-si, Gyeonggi-do, 446-711, Hàn Quốc','Samsung Electronics là một trong những nhà sản xuất điện tử lớn nhất thế giới, chuyên sản xuất các sản phẩm từ điện thoại thông minh, máy tính bảng, máy tính xách tay đến các thiết bị gia dụng và linh kiện điện tử. Với sứ mệnh \'Tạo ra những sản phẩm và dịch vụ tốt nhất để làm cuộc sống của mọi người dễ dàng hơn\', Samsung không ngừng nỗ lực đổi mới và cải thiện để đáp ứng nhu cầu của khách hàng trên toàn cầu.','2024-06-05 23:16:26','2024-06-05 23:16:26');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-14  6:56:25
