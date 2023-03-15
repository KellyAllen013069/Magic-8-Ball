-- MySQL dump 10.13  Distrib 8.0.30, for macos12 (x86_64)
--
-- Host: localhost    Database: magic8ball
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `Responses`
--

DROP TABLE IF EXISTS `Responses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Responses` (
  `ResponseID` int NOT NULL AUTO_INCREMENT,
  `ThemeID` int NOT NULL,
  `Phrase` varchar(80) NOT NULL,
  `KeyWord` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ResponseID`),
  UNIQUE KEY `ResponseID` (`ResponseID`),
  KEY `ThemeID_idx` (`ThemeID`)
) ENGINE=InnoDB AUTO_INCREMENT=175 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Responses`
--

LOCK TABLES `Responses` WRITE;
/*!40000 ALTER TABLE `Responses` DISABLE KEYS */;
INSERT INTO `Responses` VALUES (135,3,'It is certain',NULL),(136,3,'Reply hazy, try agin',NULL),(137,3,'Don\'t count on it',NULL),(138,3,'It is decidedly so',NULL),(139,3,'Ask again later',NULL),(140,3,'My reply is no',NULL),(141,3,'Without a doubt',NULL),(142,3,'Better not tell you now',NULL),(143,3,'My sources say no',NULL),(144,3,'Yes definitely',NULL),(145,3,'Cannot predict now',NULL),(146,3,'Outlook not so good',NULL),(147,3,'You may rely on it',NULL),(148,3,'Concentrate and ask again',NULL),(149,3,'Very doubtful',NULL),(150,3,'As I see it, yes',NULL),(151,3,'Most likely',NULL),(152,3,'Outlook good',NULL),(153,3,'Yes',NULL),(154,3,'Signs point to yes',NULL),(155,55,'It is certain, dude',NULL),(156,55,'Reply hazy, boogie, and try again',NULL),(157,55,'Yikes! Don\'t count on it',NULL),(158,55,'Groovy, it is decidedly so',NULL),(159,55,'Get down and ask again later',NULL),(160,55,'My reply is no, dude',NULL),(161,55,'Without a doubt! Get down tonight!',NULL),(162,55,'Better be cool and not say now',NULL),(163,55,'My forces say no',NULL),(164,55,'Yes definitely groovy',NULL),(165,55,'Cannot predict right now, dude',NULL),(166,55,'Outlook not good, but the night is young',NULL),(167,55,'You may rely on it. Boogie-oogie-oogie',NULL),(168,55,'Stop talking, start dancing, and ask again',NULL),(169,55,'Oh no dude! Doubtful',NULL),(170,55,'Yes! Life is a party!',NULL),(171,55,'Most likely. You can get down on it',NULL),(172,55,'Outlook groovy',NULL),(173,55,'Yes! It\'s a hot disco inferno',NULL),(174,55,'Disco signs point to yes',NULL);
/*!40000 ALTER TABLE `Responses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Themes`
--

DROP TABLE IF EXISTS `Themes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Themes` (
  `ThemeID` int NOT NULL AUTO_INCREMENT,
  `UserID` int DEFAULT NULL,
  `Name` varchar(45) DEFAULT NULL,
  `Type` varchar(45) DEFAULT NULL,
  `AdminComments` varchar(200) DEFAULT NULL,
  `AdminApproval` tinyint DEFAULT NULL,
  PRIMARY KEY (`ThemeID`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Themes`
--

LOCK TABLES `Themes` WRITE;
/*!40000 ALTER TABLE `Themes` DISABLE KEYS */;
INSERT INTO `Themes` VALUES (3,162,'Basic','public',NULL,NULL),(55,163,'Disco','public','',1);
/*!40000 ALTER TABLE `Themes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) DEFAULT NULL,
  `EmailAddress` varchar(100) DEFAULT NULL,
  `Password` varchar(1000) DEFAULT NULL,
  `AuthType` varchar(45) DEFAULT NULL,
  `AuthID` varchar(100) DEFAULT NULL,
  `thumbnail` varchar(100) DEFAULT NULL,
  `Role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UserID_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=168 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (162,'default',NULL,NULL,NULL,NULL,NULL,NULL),(163,'developer','k@kelly.com','$2a$10$cUD7xRq60c6JC27g.RRCOOtbCUtKD8TjcMv7Xk7xdbsA3VglNZMtu','local','','','admin');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-15 17:32:05
