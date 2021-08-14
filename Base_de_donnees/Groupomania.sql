-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 14 août 2021 à 19:52
-- Version du serveur :  8.0.21
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `articles`
--

DROP TABLE IF EXISTS `articles`;
CREATE TABLE IF NOT EXISTS `articles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `contain` text,
  `imageUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `articles`
--

INSERT INTO `articles` (`id`, `title`, `contain`, `imageUrl`, `createdAt`, `updatedAt`, `UserId`) VALUES
(21, 'Lancement du forum', 'Bonjour à toujours, je suis le premier à me lancer donc. Moi c\'est Bruce et j\'aime les costumes noirs, en voici un que je porte souvent, qu\'en pensez vous?', 'http://localhost:3000/articlesImages/batman2.jpg1628970200868.jpg', '2021-08-14 19:43:20', '2021-08-14 19:43:20', 1),
(22, 'Je cherche une amie', 'Bonjour,\nMoi c\'est Peter et je cherche à joindre une amie depuis un moment mais impossible de savoir où elle est et ce qu\'elle est encore en train de bricoler à cette heure ci. Elle s\'appelle Clochette, est habillée souvent de vert et a deux petites ailes dans le dos. \nSi jamais vous l\'apercevez dîtes lui que je m\'inquiète pour elle et que je cherche à la joindre, elle saura où me trouver !', NULL, '2021-08-14 19:48:18', '2021-08-14 19:48:18', 4);

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contain` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ArticleId` int DEFAULT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ArticleId` (`ArticleId`),
  KEY `UserId` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `contain`, `createdAt`, `updatedAt`, `ArticleId`, `UserId`) VALUES
(59, 'Bien sûr la luminosité n\'était pas optimale au moment de la photo mais ça donne un style non?', '2021-08-14 19:44:20', '2021-08-14 19:44:20', 21, 1),
(60, 'Effectivement c\'est plutôt sombre mais je trouve que la photo a du charme', '2021-08-14 19:46:15', '2021-08-14 19:46:15', 21, 4);

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ArticleId` int DEFAULT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ArticleId` (`ArticleId`),
  KEY `UserId` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=259 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`id`, `createdAt`, `updatedAt`, `ArticleId`, `UserId`) VALUES
(258, '2021-08-14 19:46:17', '2021-08-14 19:46:17', 21, 4);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(75) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profileImageUrl` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `profileImageUrl`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(1, 'Bruce', 'Wayne', 'batman@mail.com', '$2b$10$v04gJb4vj.yQlFsXmC3c2.Q/Q6SyCiCHMw8/IsOGxejoMFrsgDlmq', 'http://localhost:3000/images/batman.jpg1628279275214.jpg', 1, '2021-08-06 19:46:15', '2021-08-12 08:57:40'),
(2, 'Peter', 'Parker', 'spiderman@mail.com', '$2b$10$b/lBf3ofI/RLZIJoIMSxpeSgsjP2wwPB2Gltkule/XXtb1Ysm0VD2', 'http://localhost:3000/images/default-icon.png', 0, '2021-08-06 19:51:29', '2021-08-12 10:25:48'),
(4, 'Peter', 'Pan', 'peterpan@mail.com', '$2b$10$YDPnt7Sku3a8gPuVCJON7eravBQsmwj5iKJeh8ncUoH5hC4jeGfkC', 'http://localhost:3000/images/peterpan.jpg1628677779149.jpg', 1, '2021-08-11 10:19:52', '2021-08-13 11:30:37'),
(9, 'Ragnar', 'Lod Brok', 'ragnar@mail.com', '$2b$10$56RvJArQE/qx6aqaZiSyzuoUXKCoggstkJjlbBhg.erogniMCX8Pm', 'http://localhost:3000/images/default-icon.png', 0, '2021-08-13 11:13:58', '2021-08-13 11:13:58'),
(11, 'Tony', 'Stark', 'ironman@mail.com', '$2b$10$ahmdUmspCMPPO7IH.po.LeEUJ6yqdU2dLSI2mnY0dqJr3SbMO/B.m', 'http://localhost:3000/images/default-icon.png', 0, '2021-08-14 14:20:07', '2021-08-14 14:20:07');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `articles_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `articles_ibfk_3` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`ArticleId`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`ArticleId`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_4` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_5` FOREIGN KEY (`ArticleId`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_6` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`ArticleId`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_3` FOREIGN KEY (`ArticleId`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_4` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_5` FOREIGN KEY (`ArticleId`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_6` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
