-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: sql.freedb.tech
-- Gegenereerd op: 07 jun 2025 om 16:14
-- Serverversie: 8.0.42-0ubuntu0.22.04.1
-- PHP-versie: 8.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `freedb_puff_tracker`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `challenges`
--

CREATE TABLE `challenges` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `icon` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `budget` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `challenges`
--

INSERT INTO `challenges` (`id`, `user_id`, `icon`, `title`, `budget`, `created_at`) VALUES
(1, 57, 'elektronica', 'Iphone 16 pro', 1200.00, '2025-05-19 14:03:27'),
(2, 57, 'kleding', 'Kleren', 5000.00, '2025-05-19 14:30:55'),
(3, 57, 'cadeau', 'Moederdag', 50.00, '2025-05-19 15:23:59'),
(4, 51, 'voeding', 'Eten met de papa', 100.00, '2025-05-19 15:25:51'),
(6, 58, 'elektronica', 'Nokia', 2.00, '2025-05-27 11:28:54'),
(7, 62, 'cadeau', 'Moederdag ', 50.00, '2025-05-28 08:41:29'),
(8, 58, 'kleding', 'Whp', 80.00, '2025-05-30 09:57:33'),
(10, 66, 'kleding', 'Gucci kleren ', 150.00, '2025-05-30 13:33:13'),
(13, 66, 'elektronica', 'Iphone ', 500.00, '2025-05-30 13:37:42'),
(14, 66, 'reizen', 'Spanje', 500.00, '2025-05-30 13:58:06'),
(15, 67, 'cadeau', 'Fefufb', 250.00, '2025-05-30 14:16:59'),
(16, 67, 'kleding', 'Niet a tuef', 400.00, '2025-05-30 14:18:33'),
(17, 67, 'voeding', 'Eten', 800.00, '2025-05-30 14:19:20'),
(18, 67, 'reizen', 'Niet actief', 9000.00, '2025-05-30 14:20:31'),
(20, 73, 'cadeau', 'Vaderkesdag', 50.00, '2025-06-04 11:54:45'),
(21, 73, 'voeding', 'Etentje', 60.00, '2025-06-04 11:55:01'),
(22, 73, 'kleding', 'Kleren ', 20.00, '2025-06-04 11:55:27'),
(28, 75, 'elektronica', 'Gsm', 50.00, '2025-06-05 01:14:37'),
(31, 75, 'elektronica', 'Oke', 50.00, '2025-06-05 14:28:04'),
(32, 75, 'reizen', 'Vakantie', 50.00, '2025-06-05 14:29:34'),
(35, 102, 'reizen', 'Vakantie', 50.00, '2025-06-05 16:09:47'),
(36, 89, 'reizen', 'Vakantie', 150.00, '2025-06-05 16:16:04'),
(37, 103, 'kleding', 'Tshirt', 80.00, '2025-06-05 16:26:51'),
(38, 106, 'kleding', 'Vakantie ', 50.00, '2025-06-05 16:54:20'),
(39, 106, 'reizen', 'Bob', 70.00, '2025-06-05 17:17:47'),
(40, 75, 'kleding', 'Dhirt', 20.00, '2025-06-06 12:49:58'),
(41, 73, 'elektronica', 'Iphone ', 500.00, '2025-06-06 15:22:38'),
(42, 123, 'reizen', 'Vakantie ', 150.00, '2025-06-06 17:46:57'),
(43, 126, 'reizen', 'Vakantie', 150.00, '2025-06-07 00:32:51');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `friends`
--

CREATE TABLE `friends` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `friend_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `friends`
--

INSERT INTO `friends` (`id`, `user_id`, `friend_id`, `created_at`) VALUES
(8, 51, 50, '2025-05-14 14:23:26'),
(9, 51, 54, '2025-05-14 14:44:39'),
(10, 51, 31, '2025-05-14 14:44:46'),
(11, 51, 32, '2025-05-14 14:44:47'),
(13, 47, 48, '2025-05-17 15:44:48'),
(14, 47, 41, '2025-05-17 15:45:00'),
(15, 47, 34, '2025-05-17 15:45:29'),
(16, 57, 54, '2025-05-19 12:18:15'),
(17, 57, 48, '2025-05-19 12:18:24'),
(18, 57, 42, '2025-05-19 12:18:40'),
(35, 61, 31, '2025-05-27 11:52:04'),
(37, 61, 52, '2025-05-27 12:35:06'),
(38, 62, 54, '2025-05-28 08:39:24'),
(39, 62, 57, '2025-05-28 08:39:33'),
(40, 31, 54, '2025-05-28 13:52:47'),
(43, 58, 33, '2025-05-28 13:54:25'),
(44, 67, 54, '2025-05-30 14:21:16'),
(45, 67, 57, '2025-05-30 14:22:42'),
(50, 67, 36, '2025-05-30 14:31:34'),
(51, 69, 31, '2025-05-31 09:11:24'),
(52, 69, 41, '2025-05-31 09:11:39'),
(53, 69, 42, '2025-05-31 09:11:41'),
(54, 69, 54, '2025-05-31 09:22:56'),
(55, 69, 32, '2025-05-31 09:31:45'),
(56, 69, 33, '2025-05-31 10:00:27'),
(57, 69, 34, '2025-05-31 10:00:29'),
(58, 69, 35, '2025-05-31 10:00:30'),
(59, 66, 54, '2025-05-31 10:09:19'),
(60, 66, 57, '2025-05-31 10:09:23'),
(61, 66, 31, '2025-05-31 10:09:34'),
(62, 58, 54, '2025-06-01 17:05:24'),
(63, 58, 31, '2025-06-01 17:18:08'),
(77, 76, 31, '2025-06-04 23:32:46'),
(78, 76, 32, '2025-06-04 23:32:46'),
(79, 77, 33, '2025-06-04 23:37:49'),
(80, 77, 34, '2025-06-04 23:37:57'),
(86, 73, 54, '2025-06-05 09:52:36'),
(87, 73, 57, '2025-06-05 09:52:44'),
(88, 73, 75, '2025-06-05 09:52:45'),
(91, 87, 34, '2025-06-05 11:52:03'),
(92, 87, 35, '2025-06-05 11:52:05'),
(93, 88, 76, '2025-06-05 12:22:28'),
(94, 88, 80, '2025-06-05 12:22:30'),
(100, 89, 75, '2025-06-05 12:46:38'),
(101, 89, 84, '2025-06-05 12:46:39'),
(102, 90, 40, '2025-06-05 13:11:33'),
(103, 90, 48, '2025-06-05 13:11:34'),
(108, 91, 46, '2025-06-05 13:28:16'),
(109, 91, 49, '2025-06-05 13:28:18'),
(117, 93, 57, '2025-06-05 14:49:05'),
(118, 93, 54, '2025-06-05 14:49:12'),
(119, 93, 74, '2025-06-05 14:58:38'),
(120, 100, 31, '2025-06-05 15:36:20'),
(121, 100, 32, '2025-06-05 15:36:22'),
(129, 106, 73, '2025-06-05 18:04:47'),
(130, 73, 106, '2025-06-05 18:32:39'),
(131, 110, 31, '2025-06-05 22:21:37'),
(132, 110, 32, '2025-06-05 22:21:39'),
(135, 115, 31, '2025-06-06 12:37:39'),
(136, 115, 32, '2025-06-06 12:37:40'),
(137, 116, 31, '2025-06-06 12:41:55'),
(138, 116, 32, '2025-06-06 12:41:55'),
(139, 121, 54, '2025-06-06 15:42:23'),
(140, 123, 31, '2025-06-06 17:48:45'),
(141, 123, 35, '2025-06-06 17:48:47'),
(142, 125, 31, '2025-06-06 22:59:58'),
(143, 125, 32, '2025-06-06 22:59:59'),
(144, 75, 31, '2025-06-07 14:10:42'),
(145, 75, 32, '2025-06-07 14:10:44'),
(148, 75, 74, '2025-06-07 14:54:05'),
(149, 132, 34, '2025-06-07 15:31:53'),
(150, 132, 31, '2025-06-07 15:31:57');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `leaderboards`
--

CREATE TABLE `leaderboards` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `leaderboards`
--

INSERT INTO `leaderboards` (`id`, `name`, `user_id`, `created_at`) VALUES
(3, 'Test', 31, '2025-05-14 18:53:52'),
(4, '', 31, '2025-05-14 18:57:56'),
(5, '', 31, '2025-05-14 19:04:22'),
(6, '', 31, '2025-05-14 19:06:45'),
(7, 'Test23', 31, '2025-05-14 19:07:25'),
(8, 'Test24', 31, '2025-05-14 19:16:13'),
(9, 'Baaaa', 51, '2025-05-17 10:37:15'),
(10, 'Kfkfk', 51, '2025-05-17 10:48:59'),
(11, 'Yes', 51, '2025-05-17 15:41:41'),
(12, '1e', 47, '2025-05-17 15:45:43'),
(16, 'Kkkl', 57, '2025-05-19 13:24:05'),
(18, '1', 57, '2025-05-19 13:36:08'),
(19, 'Lol', 57, '2025-05-19 13:39:43'),
(21, 'Nieuw', 58, '2025-05-27 11:35:40'),
(22, 'De boyss', 62, '2025-05-28 08:44:05'),
(23, 'Tdt', 67, '2025-05-30 14:32:42'),
(27, 'Databasee', 58, '2025-06-01 17:15:30'),
(32, 'Hh', 77, '2025-06-04 23:43:08'),
(38, '1234', 88, '2025-06-05 12:23:12'),
(52, 'Kk', 116, '2025-06-06 12:42:37'),
(53, 'The boys', 123, '2025-06-06 17:49:43'),
(55, 'Kkk', 75, '2025-06-07 15:13:41');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `leaderboard_friends`
--

CREATE TABLE `leaderboard_friends` (
  `id` int NOT NULL,
  `leaderboard_id` int NOT NULL,
  `friend_id` int NOT NULL,
  `added_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `leaderboard_friends`
--

INSERT INTO `leaderboard_friends` (`id`, `leaderboard_id`, `friend_id`, `added_at`) VALUES
(6, 5, 54, '2025-05-14 19:04:22'),
(7, 6, 54, '2025-05-14 19:06:45'),
(8, 7, 54, '2025-05-14 19:07:25'),
(9, 8, 54, '2025-05-14 19:16:13'),
(10, 9, 50, '2025-05-17 10:37:15'),
(11, 9, 54, '2025-05-17 10:37:15'),
(12, 10, 54, '2025-05-17 10:48:59'),
(13, 10, 31, '2025-05-17 10:48:59'),
(14, 10, 32, '2025-05-17 10:48:59'),
(15, 11, 50, '2025-05-17 15:41:41'),
(16, 11, 54, '2025-05-17 15:41:41'),
(17, 11, 31, '2025-05-17 15:41:41'),
(18, 12, 48, '2025-05-17 15:45:43'),
(19, 12, 41, '2025-05-17 15:45:43'),
(20, 12, 34, '2025-05-17 15:45:43'),
(26, 16, 42, '2025-05-19 13:24:05'),
(28, 18, 48, '2025-05-19 13:36:08'),
(29, 18, 42, '2025-05-19 13:36:08'),
(30, 19, 48, '2025-05-19 13:39:43'),
(31, 19, 42, '2025-05-19 13:39:43'),
(33, 21, 31, '2025-05-27 11:35:40'),
(34, 21, 57, '2025-05-27 11:35:40'),
(35, 22, 54, '2025-05-28 08:44:05'),
(36, 22, 57, '2025-05-28 08:44:05'),
(37, 9, 58, '2025-05-29 09:49:56'),
(40, 23, 54, '2025-05-30 14:32:42'),
(41, 23, 57, '2025-05-30 14:32:42'),
(47, 27, 33, '2025-06-01 17:15:30'),
(48, 27, 54, '2025-06-01 17:15:30'),
(50, 22, 58, '2025-06-04 09:06:58'),
(60, 32, 33, '2025-06-04 23:43:08'),
(61, 32, 34, '2025-06-04 23:43:08'),
(65, 22, 73, '2025-06-05 09:57:53'),
(74, 38, 76, '2025-06-05 12:23:12'),
(75, 38, 80, '2025-06-05 12:23:12'),
(108, 52, 31, '2025-06-06 12:42:37'),
(109, 52, 32, '2025-06-06 12:42:37'),
(110, 53, 31, '2025-06-06 17:49:43'),
(111, 53, 35, '2025-06-06 17:49:43'),
(114, 55, 31, '2025-06-07 15:13:41'),
(115, 55, 32, '2025-06-07 15:13:41'),
(116, 55, 74, '2025-06-07 15:13:41');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `puffs`
--

CREATE TABLE `puffs` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `amount` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `time_of_day` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `puffs`
--

INSERT INTO `puffs` (`id`, `user_id`, `amount`, `created_at`, `time_of_day`) VALUES
(21, 0, 30, '2025-04-17 10:38:37', NULL),
(22, 0, 8, '2025-04-17 11:20:25', NULL),
(23, 0, 60, '2025-04-28 17:00:29', NULL),
(24, 0, 5, '2025-04-28 17:01:23', NULL),
(25, 0, 18, '2025-05-03 17:00:39', NULL),
(26, 0, 18, '2025-05-03 17:00:55', NULL),
(27, 0, 9, '2025-05-08 15:38:55', NULL),
(28, 0, 52, '2025-05-10 13:19:03', NULL),
(29, 0, 60, '2025-05-10 13:25:49', 'Middag (12:00 - 18:00)'),
(30, 0, 60, '2025-05-10 13:34:51', 'Ochtend (6:00 - 12:00)'),
(31, 0, 90, '2025-05-10 13:39:43', 'Nacht (00:00 - 6:00)'),
(32, 0, 23, '2025-05-10 13:43:27', 'Middag (12:00 - 18:00)'),
(33, 0, 30, '2025-05-10 14:07:32', 'Ochtend (6:00 - 12:00)'),
(34, 0, 60, '2025-05-10 14:11:10', 'Ochtend (6:00 - 12:00)'),
(35, 0, 60, '2025-05-10 14:16:39', 'Ochtend (6:00 - 12:00)'),
(36, 0, 30, '2025-05-10 14:19:01', 'Ochtend (6:00 - 12:00)'),
(37, 0, 60, '2025-05-10 14:25:33', 'Ochtend (6:00 - 12:00)'),
(38, 0, 30, '2025-05-10 14:26:29', 'Avond (18:00 - 00:00)'),
(39, 51, 11, '2025-05-10 14:32:25', 'Ochtend (6:00 - 12:00)'),
(40, 54, 36, '2025-05-10 14:38:39', 'Avond (18:00 - 00:00)'),
(41, 54, 30, '2025-05-10 14:46:38', 'Ochtend (6:00 - 12:00)'),
(42, 51, 60, '2025-05-19 12:15:27', 'Middag (12:00 - 18:00)'),
(43, 48, 30, '2025-05-19 12:21:04', 'Middag (12:00 - 18:00)'),
(44, 57, 30, '2025-05-19 12:35:31', 'Middag (12:00 - 18:00)'),
(45, 57, 6, '2025-05-19 13:10:19', 'Ochtend (6:00 - 12:00)'),
(46, 58, 7, '2025-05-27 10:33:43', 'Nacht (00:00 - 6:00)'),
(47, 57, 14, '2025-05-28 08:37:20', 'Middag (12:00 - 18:00)'),
(48, 62, 6, '2025-05-28 08:42:08', 'Middag (12:00 - 18:00)'),
(49, 58, 14, '2025-05-28 13:23:36', 'Middag (12:00 - 18:00)'),
(51, 65, 8, '2025-05-29 10:36:39', 'Middag (12:00 - 18:00)'),
(52, 67, 31, '2025-05-30 14:27:17', 'Middag (12:00 - 18:00)'),
(53, 67, 144, '2025-05-30 14:27:38', 'Avond (18:00 - 00:00)'),
(54, 67, 25, '2025-05-30 14:27:56', 'Nacht (00:00 - 6:00)'),
(58, 66, 6, '2025-06-01 16:18:13', 'Avond (18:00 - 00:00)'),
(59, 66, 4, '2025-06-01 16:19:04', 'Nacht (00:00 - 6:00)'),
(61, 58, 10, '2025-06-01 17:39:23', 'Ochtend (6:00 - 12:00)'),
(62, 58, 7, '2025-06-02 08:50:42', 'Nacht (00:00 - 6:00)'),
(63, 57, 1, '2025-06-03 10:11:41', 'Middag (12:00 - 18:00)'),
(64, 57, 1, '2025-06-03 10:11:43', 'Middag (12:00 - 18:00)'),
(65, 57, 1, '2025-06-03 11:26:03', 'Middag (12:00 - 18:00)'),
(66, 57, 1, '2025-06-03 11:26:06', 'Middag (12:00 - 18:00)'),
(67, 57, 1, '2025-06-03 11:26:10', 'Middag (12:00 - 18:00)'),
(68, 57, 1, '2025-06-03 11:26:12', 'Middag (12:00 - 18:00)'),
(69, 57, 1, '2025-06-03 11:31:07', 'Middag (12:00 - 18:00)'),
(70, 57, 1, '2025-06-03 11:31:17', 'Middag (12:00 - 18:00)'),
(71, 57, 1, '2025-06-03 11:31:19', 'Middag (12:00 - 18:00)'),
(72, 57, 6, '2025-06-03 11:32:54', 'Ochtend (6:00 - 12:00)'),
(73, 57, 1, '2025-06-04 12:27:33', 'Middag (12:00 - 18:00)'),
(75, 57, 1, '2025-06-04 12:30:51', 'Middag (12:00 - 18:00)'),
(76, 57, 1, '2025-06-04 12:30:52', 'Middag (12:00 - 18:00)'),
(77, 57, 1, '2025-06-04 12:31:14', 'Middag (12:00 - 18:00)'),
(78, 57, 1, '2025-06-04 12:31:16', 'Middag (12:00 - 18:00)'),
(79, 57, 1, '2025-06-04 12:31:18', 'Middag (12:00 - 18:00)'),
(80, 57, 1, '2025-06-04 12:31:21', 'Middag (12:00 - 18:00)'),
(81, 57, 1, '2025-06-04 12:31:22', 'Middag (12:00 - 18:00)'),
(82, 57, 1, '2025-06-04 12:31:23', 'Middag (12:00 - 18:00)'),
(83, 57, 1, '2025-06-04 12:31:28', 'Middag (12:00 - 18:00)'),
(84, 57, 1, '2025-06-04 12:32:00', 'Middag (12:00 - 18:00)'),
(85, 57, 1, '2025-06-04 12:32:01', 'Middag (12:00 - 18:00)'),
(86, 57, 1, '2025-06-04 12:32:03', 'Middag (12:00 - 18:00)'),
(87, 57, 1, '2025-06-04 12:32:08', 'Middag (12:00 - 18:00)'),
(88, 57, 1, '2025-06-04 12:32:09', 'Middag (12:00 - 18:00)'),
(89, 57, 1, '2025-06-04 12:32:15', 'Middag (12:00 - 18:00)'),
(90, 57, 1, '2025-06-04 12:38:20', 'Middag (12:00 - 18:00)'),
(91, 57, 1, '2025-06-04 12:38:24', 'Middag (12:00 - 18:00)'),
(92, 57, 1, '2025-06-04 12:38:25', 'Middag (12:00 - 18:00)'),
(94, 57, 1, '2025-06-04 12:43:51', 'Middag (12:00 - 18:00)'),
(95, 57, 1, '2025-06-04 12:44:00', 'Middag (12:00 - 18:00)'),
(96, 57, 1, '2025-06-04 12:44:02', 'Middag (12:00 - 18:00)'),
(97, 57, 1, '2025-06-04 12:44:03', 'Middag (12:00 - 18:00)'),
(98, 73, 81, '2025-06-04 12:46:55', 'Middag (12:00 - 18:00)'),
(99, 57, 1, '2025-06-04 12:47:24', 'Middag (12:00 - 18:00)'),
(100, 57, 1, '2025-06-04 12:47:35', 'Middag (12:00 - 18:00)'),
(101, 57, 1, '2025-06-04 12:48:04', 'Middag (12:00 - 18:00)'),
(102, 57, 1, '2025-06-04 12:48:05', 'Middag (12:00 - 18:00)'),
(103, 57, 1, '2025-06-04 12:48:10', 'Middag (12:00 - 18:00)'),
(104, 57, 1, '2025-06-04 12:48:12', 'Middag (12:00 - 18:00)'),
(105, 57, 1, '2025-06-04 12:48:14', 'Middag (12:00 - 18:00)'),
(107, 74, 1, '2025-06-04 13:24:12', 'Middag (12:00 - 18:00)'),
(108, 74, 1, '2025-06-04 13:24:22', 'Middag (12:00 - 18:00)'),
(109, 74, 1, '2025-06-04 13:25:22', 'Middag (12:00 - 18:00)'),
(110, 74, 1, '2025-06-04 13:31:35', 'Middag (12:00 - 18:00)'),
(111, 74, 1, '2025-06-04 13:31:46', 'Middag (12:00 - 18:00)'),
(112, 74, 1, '2025-06-04 13:31:47', 'Middag (12:00 - 18:00)'),
(113, 74, 1, '2025-06-04 13:32:16', 'Middag (12:00 - 18:00)'),
(114, 74, 1, '2025-06-04 13:32:24', 'Middag (12:00 - 18:00)'),
(115, 74, 1, '2025-06-04 13:32:52', 'Middag (12:00 - 18:00)'),
(116, 74, 1, '2025-06-04 13:34:13', 'Middag (12:00 - 18:00)'),
(117, 74, 1, '2025-06-04 13:39:25', 'Middag (12:00 - 18:00)'),
(118, 74, 1, '2025-06-04 13:39:29', 'Middag (12:00 - 18:00)'),
(119, 74, 1, '2025-06-04 13:40:49', 'Middag (12:00 - 18:00)'),
(120, 74, 1, '2025-06-04 13:41:10', 'Middag (12:00 - 18:00)'),
(121, 74, 1, '2025-06-04 13:46:15', 'Middag (12:00 - 18:00)'),
(122, 74, 1, '2025-06-04 13:46:17', 'Middag (12:00 - 18:00)'),
(123, 74, 1, '2025-06-04 13:46:19', 'Middag (12:00 - 18:00)'),
(124, 74, 1, '2025-06-04 13:46:21', 'Middag (12:00 - 18:00)'),
(125, 74, 1, '2025-06-04 14:14:40', 'Middag (12:00 - 18:00)'),
(126, 74, 1, '2025-06-04 14:14:49', 'Middag (12:00 - 18:00)'),
(127, 74, 1, '2025-06-04 14:14:50', 'Middag (12:00 - 18:00)'),
(128, 74, 1, '2025-06-04 14:14:54', 'Middag (12:00 - 18:00)'),
(129, 74, 1, '2025-06-04 14:14:59', 'Middag (12:00 - 18:00)'),
(130, 74, 1, '2025-06-04 14:15:00', 'Middag (12:00 - 18:00)'),
(131, 74, 1, '2025-06-04 14:15:07', 'Middag (12:00 - 18:00)'),
(132, 74, 1, '2025-06-04 14:15:16', 'Middag (12:00 - 18:00)'),
(133, 74, 1, '2025-06-04 14:15:20', 'Middag (12:00 - 18:00)'),
(134, 74, 1, '2025-06-04 14:15:22', 'Middag (12:00 - 18:00)'),
(135, 74, 1, '2025-06-04 14:15:25', 'Middag (12:00 - 18:00)'),
(136, 74, 1, '2025-06-04 16:25:12', 'Avond (18:00 - 00:00)'),
(137, 74, 1, '2025-06-04 16:25:14', 'Avond (18:00 - 00:00)'),
(138, 74, 1, '2025-06-04 16:25:19', 'Avond (18:00 - 00:00)'),
(139, 74, 1, '2025-06-04 16:25:22', 'Avond (18:00 - 00:00)'),
(140, 74, 1, '2025-06-04 16:25:28', 'Avond (18:00 - 00:00)'),
(141, 74, 1, '2025-06-04 16:25:34', 'Avond (18:00 - 00:00)'),
(142, 74, 1, '2025-06-04 16:25:37', 'Avond (18:00 - 00:00)'),
(143, 74, 1, '2025-06-04 16:25:38', 'Avond (18:00 - 00:00)'),
(144, 74, 1, '2025-06-04 16:25:41', 'Avond (18:00 - 00:00)'),
(145, 75, 90, '2025-06-04 22:16:59', 'Middag (12:00 - 18:00)'),
(146, 77, 140, '2025-06-04 23:42:30', 'Nacht (00:00 - 6:00)'),
(147, 75, 44, '2025-06-05 01:17:24', 'Nacht (00:00 - 6:00)'),
(148, 73, 6, '2025-06-05 09:43:37', 'Middag (12:00 - 18:00)'),
(149, 75, 30, '2025-06-05 11:42:54', 'Nacht (00:00 - 6:00)'),
(150, 88, 60, '2025-06-05 12:20:25', 'Nacht (00:00 - 6:00)'),
(151, 100, 27, '2025-06-05 15:36:03', 'Nacht (00:00 - 6:00)'),
(152, 100, 60, '2025-06-05 15:36:08', 'Middag (12:00 - 18:00)'),
(154, 75, 90, '2025-06-05 15:55:41', 'Nacht (00:00 - 6:00)'),
(155, 75, 1, '2025-06-05 16:04:32', 'Nacht (00:00 - 6:00)'),
(156, 102, 8, '2025-06-05 16:09:58', 'Ochtend (6:00 - 12:00)'),
(157, 89, 24, '2025-06-05 16:16:12', 'Ochtend (6:00 - 12:00)'),
(158, 103, 3, '2025-06-05 16:27:01', 'Ochtend (6:00 - 12:00)'),
(161, 113, 92, '2025-06-06 10:24:07', 'Ochtend (6:00 - 12:00)'),
(162, 75, 80, '2025-06-06 12:20:18', 'Middag (12:00 - 18:00)'),
(163, 75, 60, '2025-06-06 12:24:55', 'Nacht (00:00 - 6:00)'),
(164, 75, 60, '2025-06-06 12:27:13', 'Nacht (00:00 - 6:00)'),
(165, 75, 60, '2025-06-06 12:28:12', 'Ochtend (6:00 - 12:00)'),
(166, 75, 60, '2025-06-06 12:28:34', 'Nacht (00:00 - 6:00)'),
(167, 116, 60, '2025-06-06 12:41:31', 'Ochtend (6:00 - 12:00)'),
(168, 116, 60, '2025-06-06 12:41:37', 'Avond (18:00 - 00:00)'),
(169, 116, 60, '2025-06-06 12:42:46', 'Nacht (00:00 - 6:00)'),
(170, 75, 60, '2025-06-06 12:46:07', 'Avond (18:00 - 00:00)'),
(171, 120, 60, '2025-06-06 13:08:08', 'Nacht (00:00 - 6:00)'),
(172, 123, 27, '2025-06-06 17:47:51', 'Middag (12:00 - 18:00)'),
(173, 123, 19, '2025-06-06 17:50:58', 'Nacht (00:00 - 6:00)'),
(174, 124, 92, '2025-06-06 18:24:53', 'Nacht (00:00 - 6:00)'),
(175, 123, 60, '2025-06-06 18:25:23', 'Nacht (00:00 - 6:00)'),
(176, 75, 60, '2025-06-07 13:48:04', 'Nacht (00:00 - 6:00)'),
(179, 75, 60, '2025-06-07 15:26:59', 'Nacht (00:00 - 6:00)');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `birth_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(255) DEFAULT NULL,
  `active_challenge_id` int DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `birth_date`, `created_at`, `password`, `active_challenge_id`, `profile_picture`) VALUES
(31, 'Jef', 'Wef', 'Bef@gmail.com', '0000-00-00', '2025-05-08 12:27:57', 'Wef', NULL, 'profile-2.png'),
(32, 'Jef', 'Wef', 'Rjfjf@gmail.com', '0000-00-00', '2025-05-08 13:02:13', 'Test', NULL, 'profile-5.png'),
(33, 'Nekf', 'Jeiei', 'Jdjf@gmail.com', '0000-00-00', '2025-05-08 13:03:05', 'Test', NULL, 'profile-3.png'),
(34, 'Jdjfk', 'Jdkfkd', 'Jdjdi@gmail.com', '0000-00-00', '2025-05-08 13:11:01', 'Test', NULL, 'profile-3.png'),
(35, 'Jdjd', 'Kdkdk', 'Jdjd@gmail.com', '0000-00-00', '2025-05-08 13:21:05', 'Test', NULL, 'profile-1.png'),
(36, 'Jeje', 'Jdjfk', 'Jrjf@gmail.com', '0000-00-00', '2025-05-08 13:26:34', '', NULL, 'profile-1.png'),
(37, 'Kdke', 'Ieiei', 'Jdkf@gmail.com', '0000-00-00', '2025-05-08 13:27:36', 'Test', NULL, 'profile-3.png'),
(39, 'Jdjdj', 'Kekfk', 'Jfjdi@gmail.com', '0000-00-00', '2025-05-08 13:33:10', '', NULL, 'profile-4.png'),
(40, 'Fhguu', 'Fyuf', 'Fyuf@gmail.com', '0000-00-00', '2025-05-08 13:40:41', 'Lol', NULL, 'profile-3.png'),
(41, 'Kfir', 'Ejejrj', 'Jfkfo@gmail.com', '0000-00-00', '2025-05-08 13:44:52', 'Jo', NULL, 'profile-1.png'),
(42, 'Jef', 'Jef', 'Jef@gmail.com', '0000-00-00', '2025-05-08 13:49:40', 'Test', NULL, 'profile-4.png'),
(43, 'Jdkd', 'Jdjdj', 'Nfkf@gmail.com', '0000-00-00', '2025-05-08 14:10:50', 'Test', NULL, 'profile-3.png'),
(44, 'Jdjfj', 'Jejeje', 'Jdjfj@gmail.com', '0000-00-00', '2025-05-08 14:32:44', 'Test', NULL, 'profile-1.png'),
(46, 'Jeff', 'Jefff', 'Jefff@gmail.com', '0000-00-00', '2025-05-08 15:01:53', 'Test', NULL, 'profile-5.png'),
(47, 'Wef', 'Bef', 'Lef@gmail.com', '0000-00-00', '2025-05-08 15:03:44', 'Test', NULL, 'profile-2.png'),
(48, 'Test', 'Test', 'Hdjfj@gmail.com', '0000-00-00', '2025-05-08 15:09:22', 'Test', NULL, 'profile-4.png'),
(49, 'Jefff', 'Weefff', 'Jdjfjd@gmail.com', '0000-00-00', '2025-05-08 15:12:10', 'Test', NULL, 'profile-4.png'),
(50, 'Jef', 'Wef', 'Jfjfuf@gmail.com', '0000-00-00', '2025-05-08 15:28:24', 'Test', NULL, 'profile-3.png'),
(51, 'Jefke', 'Pefke', 'Jefke@gmail.com', '0000-00-00', '2025-05-08 15:36:50', 'Test', NULL, 'profile-2.png'),
(52, 'Jef', 'Bef', 'Kfkf@gmail.com', '0000-00-00', '2025-05-10 14:06:18', 'Bef', NULL, 'profile-2.png'),
(53, 'Jef', 'Wef', 'Jfjfk@gmail.com', '0000-00-00', '2025-05-10 14:18:35', 'Bef', NULL, 'profile-2.png'),
(54, 'Dirk', 'Van Roy', 'Dkfj@jfj.jd', '0000-00-00', '2025-05-10 14:36:36', '', NULL, 'profile-4.png'),
(55, 'Jef', 'Pec', 'Jfjf@gmail.com', '0000-00-00', '2025-05-10 14:53:47', 'Test', NULL, 'profile-5.png'),
(56, 'Jeeeff', 'Peeefff', 'Jeef@gmail.com', '0000-00-00', '2025-05-10 14:57:07', 'Test', NULL, 'profile-3.png'),
(57, 'Jelle', 'De boeck', 'Jelle@gmail.com', '0000-00-00', '2025-05-19 12:16:11', 'Test', 2, 'profile-3.png'),
(58, 'Foto', '2', 'Foto@gmail.com', '0000-00-00', '2025-05-27 09:57:48', 'Test', 6, 'profile-4.png'),
(61, 'Jonas', 'Van roy', 'Jonas@gmail.com', '0000-00-00', '2025-05-27 11:50:20', 'Test', NULL, 'profile-2.png'),
(62, 'Jefrey', 'Van hoo', 'Jefrey@gmail.com', '0000-00-00', '2025-05-28 08:38:40', 'Test', NULL, 'profile-5.png'),
(65, 'Jens', 'Tielemans', 'Jens@gmail.com', '2003-04-18', '2025-05-29 10:35:28', 'Test', NULL, 'profile-5.png'),
(66, 'Robbe ', 'Vermeiren ', 'Robbe@gmail.com', '2003-06-04', '2025-05-28 10:38:52', 'Test', 14, 'profile-1.png'),
(67, 'Ikke', 'Testnaam', 'Testmail@test.tst', '0000-00-00', '2025-05-30 14:02:19', 'Ww1', 17, 'profile-1.png'),
(69, 'Jef', 'Lef', 'Jari@gmail.com', '2003-02-15', '2025-05-31 08:27:12', 'Test', NULL, 'profile-3.png'),
(72, 'Jean', 'Luc', 'Jean@gmail.com', '2003-04-18', '2025-06-04 10:31:05', '$2b$10$rxGZJCOxSMn4Hsc.MSnbR.JZ5x2aA3WmJcepHCcmBoX0AEbj3Uf0S', NULL, 'profile-2.png'),
(73, 'Cor', 'Bor', 'Cor@gmail.com', '2000-05-18', '2025-05-29 11:16:04', '$2b$10$Aptlh6rx2s5NTuuf1mMZjuLZMJE1q6ZB3y5PF8tkgv4.G8Trp5CwK', 22, 'profile-5.png'),
(74, 'Andres ', 'Cochez', 'Andrescochez@gmail.com', '2003-05-23', '2025-06-04 12:49:31', '$2b$10$Lsa7QruC.o5sCq6t7O3MH.disFjgjbFDmVaMjBylDqDUARctq0x82', NULL, 'profile-5.png'),
(75, 'Jelle', 'De Boeck ', 'deboeck@gmail.com', '2003-01-14', '2025-06-01 21:32:52', '$2b$10$dWSCceEy.51wlwFG7d72I.7V/U0BTTaefh5S82sSZnZiF8l6MSRWO', 31, 'profile-2.png'),
(76, 'Tester', '1234', 'Tester1234@gmail.com', '2003-01-14', '2025-06-04 23:10:35', '$2b$10$ybpwaaLKg2buzzcgSXcMOu8Bmw.gHuFdmL2cdpMayXGx0D3B2yjKC', NULL, 'profile-3.png'),
(77, 'Test3', '12', 'Test3@gmail.com', '2003-12-14', '2025-06-04 23:34:46', NULL, NULL, 'profile-5.png'),
(78, 'Kevin', 'De tester', 'Kevin@gmail.com', '2004-02-14', '2025-06-05 00:29:33', '$2b$10$sRiMCrmusU7aYSI9hWCEFesgWKHys3iz.fFrEdKQsZvzfFHlZDkOK', NULL, 'profile-2.png'),
(79, 'kevin', 'De tester', 'k@gmail.com', '2004-02-14', '2025-06-05 00:30:42', '$2b$10$yK.SVcQRYK0.sLuT7izYeuAQ.uJl0FeV4TMMmZAa3YDUG/gTVUyG2', NULL, 'profile-1.png'),
(80, 'Jelle', 'De boeck', '123@gmail.com', '2003-01-14', '2025-06-05 00:32:13', '$2b$10$rC6YFivD2AgltQFJa07ri.kmqWaWwPxAj1eClV4rTTl3kpb6dKXh.', NULL, 'profile-5.png'),
(81, 'Developer', 'Test', 'Developer@gmail.com', '2000-01-01', '2025-06-05 10:12:27', '$2b$10$YgYpt5xVsDbBmjJcgQSja.VUdXXAMz0ggF8cR0Z6zXWIuXZ8sax1u', NULL, 'profile-3.png'),
(84, 'Jelle', 'De Boeck', 'deboeck07011@gmail.com', '2003-01-14', '2025-06-05 11:30:16', '$2b$10$vZ/G0TgfKeAtTkimNxJRtuTho/Rps8KbxTz9Q9Vb5zV/chsvTUeoS', NULL, 'profile-2.png'),
(87, 'testing', 'Fase', 'Testing34@gmail.com', '2003-02-14', '2025-06-05 11:51:28', '$2b$10$6/DuNREZAAl6KPe7Ux9RvO/sdclhqL0Jre.QtchUIeUIdnrLXpqCC', NULL, 'profile-2.png'),
(88, 'Jelle', 'De Boeck', 'Detest@gmail.com', '2003-01-14', '2025-06-05 12:18:42', '$2b$10$L.idkh/tdP1gq0T8gLBe0O4knNP3GEtNVTswxitlys6yRMtYU7Mim', NULL, 'profile-5.png'),
(89, 'ik', 'Test', '1test@gmail.com', '2003-01-14', '2025-06-05 12:44:41', '$2b$10$C3mFrhbxRr4xjur16OCKg.wxoCyrk0Bsik5liDn7SgMbOHRs91ARe', 36, 'profile-3.png'),
(90, 'dirk', 'testing', '123dirk@gmail.com', '2004-10-20', '2025-06-05 13:08:27', '$2b$10$/ql2y1EFeuwndT0AWrLvWe8g9qjBeca47rb/fuIIlKguUvdZ1B.DO', NULL, 'profile-1.png'),
(91, 'tezt', '1234', 'detest3@gmail.com', '2003-01-14', '2025-06-05 13:25:52', '$2b$10$u1uFPPkgaUrQ3tJUQVJtOeAqjEENst6.WsaSIE8NrMr5Nf05RsbJm', NULL, 'profile-2.png'),
(93, 'Thomas', 'Pieters', 'pieters@gmail.com', '2003-01-14', '2025-06-05 14:48:40', '$2b$10$mzY11dZrPmxTuURMl5mRR.9ydB8A1XKu5w3EyMZQnljoEb.4bhyhy', NULL, 'profile-1.png'),
(100, 'testing', '123', '1243@gmail.com', '2003-01-14', '2025-06-05 15:35:29', '$2b$10$dTB3aW6Sp5Age2pR/ou5e.Xt/OZsysSTxTvTsPMuept8uYB7BkNjm', NULL, 'profile-5.png'),
(102, 'Jelle', 'Testing', 'Testtest@gmail.com', '2003-01-14', '2025-06-05 16:09:21', '$2b$10$xViUThLQsB.SnJY8KsF3mOEgKFPgBukfOdM18/UsTkETH9EiigC.G', NULL, 'profile-3.png'),
(103, 'Tessa', 'Testers', 'Tessa123@gmail.com', '2003-01-14', '2025-06-05 16:26:04', '$2b$10$.LbOR19d5YmACTbs4G.JneQn1WNLyFAKGv1rZTHVRjESbUEPk6q6u', 37, 'profile-4.png'),
(106, 'Jens', 'Tielemans', 'Jensi@gmail.com', '2003-04-18', '2025-06-05 16:49:08', '$2b$10$OshjGdO5gBLA3ABE2YBzd.ESNqoiViUt3/snMDxhzRhktHo7VQNQu', NULL, 'profile-2.png'),
(110, 'jaja', 'Nene', '123ja@gmail.com', '2003-01-14', '2025-06-05 22:20:59', '$2b$10$idgrdqazPsVC90Hn0NiM4uKXAwA1aJsP3X/K.g29Hdu.bKeuShBZW', NULL, 'profile-5.png'),
(113, 'Track ', 'Er', 'Track@gmail.com', '2003-04-18', '2025-06-06 09:33:05', '$2b$10$IJMIVLTNxp5cYIpcMXhQqedNKZdJoDAWPVjmQwBTDvw64/J3Cz4dC', NULL, 'profile-1.png'),
(115, 'Testing', 'Popup', '123test1@gmail.com', '2000-10-14', '2025-06-06 12:37:06', '$2b$10$Aq5lUTK6zCMVEcMMBpyHuu7p8Ca2nKZPFiWrtymac988Y9/3id3YO', NULL, 'profile-5.png'),
(116, 'detest', 'er', 'er@gmail.com', '2000-10-10', '2025-06-06 12:41:07', '$2b$10$QCXD7YHryQ/cvVe.mCLTpuwf/US4vnvwOe5/mHUmwW45fNrjhNy7K', NULL, 'profile-3.png'),
(117, 'laatste', 'test', '123testings@gmail.com', '2009-02-14', '2025-06-06 12:51:50', '$2b$10$Z7/k2Wzp1lXmLxMS9OiCbuiqjcF1ACvaeuPPKk5bfs9/bnRVCpZH.', NULL, 'profile-5.png'),
(118, 'Voornaam', 'Achternaam', 'Naam@gmail.com', '2003-01-14', '2025-06-06 12:53:40', '$2b$10$TKejv7xCNGU80e6M3FF6fuizC.3oybuKoaMim8bSq.a65ASvhG5K2', NULL, 'profile-1.png'),
(119, 'Testing', 'Joo', 'Haha@gmail.com', '2003-01-14', '2025-06-06 13:06:21', '$2b$10$SjQtRgpf0CY7olo/JF9L4e50YnY1f8Pmt2FpCxA816KvsnuEYuNBu', NULL, 'profile-2.png'),
(120, 'breezd', 'user', '12@gmail.com', '2003-01-14', '2025-06-06 13:07:42', '$2b$10$OQCNvFFjTnMXJw9cjoOKZ.8zhaDtXTmG8pLZgLAhQt5aELYUIOgYa', NULL, 'profile-2.png'),
(121, 'Test', 'Test', 'Einde@gmail.com', '2003-04-14', '2025-06-06 15:40:59', '$2b$10$3ooOf8HqSV3PimA/IckCTOQ16pjK7ibfzhtMEepf.ZCZPCrZKoc1u', NULL, 'profile-4.png'),
(123, 'Jelle', 'De Boeck', 'deboeck1@gmail.com', '2003-01-14', '2025-06-06 17:45:29', '$2b$10$lYSfZljTOPYlx7i9W9bq4uDVsO/yC5Vdmr8J60Xo6Tb/LL1QOC4oG', 42, 'profile-5.png'),
(124, 'Jelle', 'De Boeck', 'jellebreezd@gmail.com', '2003-01-14', '2025-06-06 18:24:26', '$2b$10$b7eIjdJ5EgUPFm37F0QsO.xitiMdvB0u9CAZIDQplxWgYgvXyDOOK', NULL, 'profile-2.png'),
(125, 'Flow', 'Chart', 'flow@gmail.com', '2003-01-14', '2025-06-06 22:04:08', '$2b$10$d5rqdlJRDRDnegQDM9QYbe5UCy64mITfjn8WBYYfW29bT.M577kqS', NULL, 'profile-3.png'),
(126, 'Test', 'Figma', 'figma1@gmail.com', '2003-01-14', '2025-06-07 00:03:12', '$2b$10$kUBEQu/EzIMPbQOW3Z.8JuhD8dW3MUUCV3p7JtT.l823C1Kmw/Xzq', 43, 'profile-4.png'),
(127, 'joske', 'joske', 'joske@gmail.com', '2002-05-23', '2025-06-07 11:01:04', '$2y$10$4UrQryJKnNtci/JNeiQcMuSSkF10qLW8/PPmC8nxLZenELRYCVuV2', NULL, 'default.png'),
(132, 'Nieuw', 'Account', '123acc@gmail.com', '2003-01-14', '2025-06-07 15:29:25', '$2b$10$2CxOGx.LAaehapCxcOg7kONXODs/H6puOiYgIJFRixKC91/WGxbzG', NULL, 'profile-2.png');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `user_badges`
--

CREATE TABLE `user_badges` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `badge_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `earned_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `user_badges`
--

INSERT INTO `user_badges` (`id`, `user_id`, `badge_name`, `earned_date`) VALUES
(1, 69, 'Vrienden Strijder', '2025-05-31 12:00:27'),
(4, 66, 'Vrienden Strijder', '2025-05-31 12:09:34'),
(5, 58, 'Vrienden Strijder', '2025-06-01 17:18:08'),
(6, 75, 'Vrienden Strijder', '2025-06-05 13:32:18');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `user_goals`
--

CREATE TABLE `user_goals` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `goal` varchar(255) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `current_usage` int DEFAULT NULL,
  `goal_usage` int DEFAULT NULL,
  `plan` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden geëxporteerd voor tabel `user_goals`
--

INSERT INTO `user_goals` (`id`, `user_id`, `goal`, `reason`, `current_usage`, `goal_usage`, `plan`, `created_at`) VALUES
(22, 48, 'Bewuster worden van mijn gebruik', 'Voor mijn welzijn', NULL, NULL, NULL, '2025-05-08 15:09:29'),
(28, 49, 'Bewuster worden van mijn gebruik', 'Voor mijn familie of vrienden', 20, 10, 'Geleidelijke Reductie', '2025-05-08 15:12:16'),
(35, 50, 'Minder puffs nemen', 'Voor mijn welzijn', 100, 10, 'Agressieve Reductie', '2025-05-08 15:28:33'),
(39, 51, 'Bewuster worden van mijn gebruik', 'Voor mijn welzijn', 120, 30, 'Agressieve Reductie', '2025-05-08 15:36:57'),
(43, 52, 'Stoppen met vapen', 'Voor mijn welzijn', 20, 10, 'Geleidelijke Reductie', '2025-05-10 14:07:00'),
(47, 53, 'Stoppen met vapen', 'Om geld te besparen', 1, 5, 'Agressieve Reductie', '2025-05-10 14:18:42'),
(51, 54, 'Bewuster worden van mijn gebruik', 'Voor mijn welzijn', 55, 20, 'Agressieve Reductie', '2025-05-10 14:37:03'),
(55, 55, 'Bewuster worden van mijn gebruik', 'Voor mijn welzijn', 20, 10, 'Geleidelijke Reductie', '2025-05-10 14:53:53'),
(59, 56, 'Minder puffs nemen', 'Voor mijn familie of vrienden', 20, 30, 'Geleidelijke Reductie', '2025-05-10 14:57:13'),
(63, 57, 'Bewuster worden van mijn gebruik', 'Voor mijn welzijn', 20, 10, 'Geleidelijke Reductie', '2025-05-19 12:17:20'),
(67, 58, 'Minder puffs nemen', 'Voor mijn familie of vrienden', 250, 20, 'geleidelijk', '2025-05-27 09:57:56'),
(79, 61, 'Minder puffs nemen', 'Voor mijn familie of vrienden', 250, 60, 'geleidelijk', '2025-05-27 11:50:27'),
(83, 62, 'Minder puffs nemen', 'Voor mijn familie of vrienden', 300, 50, 'geleidelijk', '2025-05-28 08:38:47'),
(87, 65, 'Minder puffs nemen', 'Om geld te besparen', 260, 60, 'geleidelijk', '2025-05-29 10:35:51'),
(91, 66, 'Bewuster worden van mijn gebruik', 'Om geld te besparen', 190, 50, 'geleidelijk', '2025-05-29 10:39:14'),
(95, 67, 'Stoppen met vapen', 'Voor mijn welzijn', 200, 99, 'agressief', '2025-05-30 14:06:25'),
(101, 69, 'Stoppen met vapen', 'Om geld te besparen', 250, 60, 'geleidelijk', '2025-05-31 08:48:06'),
(109, 72, 'Minder puffs nemen', 'Om geld te besparen', 200, 50, 'geleidelijk', '2025-06-04 10:47:12'),
(113, 73, 'Minder puffs nemen', 'Voor mijn familie of vrienden', 200, 50, 'geleidelijk', '2025-06-04 11:16:14'),
(117, 74, 'Stoppen met vapen', 'Voor mijn gezondheid', 300, 70, 'geleidelijk', '2025-06-04 12:49:45'),
(121, 75, 'Minder puffs nemen', 'Voor mijn familie of vrienden', 80, 50, NULL, '2025-06-04 21:33:03'),
(124, 76, 'Bewuster worden van mijn gebruik', 'Voor mijn familie of vrienden', 80, 50, 'agressief', '2025-06-04 23:10:45'),
(128, 78, NULL, NULL, 80, 30, NULL, '2025-06-05 00:29:49'),
(129, 79, NULL, NULL, 80, 30, NULL, '2025-06-05 00:31:15'),
(130, 80, NULL, NULL, 80, 30, NULL, '2025-06-05 00:32:23'),
(132, 81, NULL, NULL, 200, 50, NULL, '2025-06-05 10:13:16'),
(133, 84, NULL, NULL, 80, 30, NULL, '2025-06-05 11:30:51'),
(134, 87, NULL, NULL, 80, 50, NULL, '2025-06-05 11:51:38'),
(136, 88, NULL, NULL, 120, 50, NULL, '2025-06-05 12:18:52'),
(137, 89, NULL, NULL, 80, 30, NULL, '2025-06-05 12:44:57'),
(138, 90, NULL, NULL, 80, 50, NULL, '2025-06-05 13:09:45'),
(139, 91, NULL, NULL, 80, 50, NULL, '2025-06-05 13:26:02'),
(141, 93, NULL, NULL, 80, 50, NULL, '2025-06-05 14:48:51'),
(142, 100, NULL, NULL, 80, 50, NULL, '2025-06-05 15:35:39'),
(145, 102, NULL, NULL, 80, 30, NULL, '2025-06-05 16:09:32'),
(146, 103, NULL, NULL, 80, 30, NULL, '2025-06-05 16:26:38'),
(148, 106, NULL, NULL, 300, 50, NULL, '2025-06-05 16:49:22'),
(149, 110, NULL, NULL, 80, 30, NULL, '2025-06-05 22:21:10'),
(150, 113, NULL, NULL, 230, 100, NULL, '2025-06-06 09:33:28'),
(153, 115, NULL, NULL, 80, 30, NULL, '2025-06-06 12:37:18'),
(154, 116, NULL, NULL, 80, 50, NULL, '2025-06-06 12:41:17'),
(155, 117, NULL, NULL, 80, 50, NULL, '2025-06-06 12:52:03'),
(156, 118, NULL, NULL, 50, 50, NULL, '2025-06-06 12:53:48'),
(157, 119, NULL, NULL, 80, 50, NULL, '2025-06-06 13:06:32'),
(158, 120, NULL, NULL, 80, 60, NULL, '2025-06-06 13:07:56'),
(159, 121, NULL, NULL, 200, 50, NULL, '2025-06-06 15:42:02'),
(160, 123, NULL, NULL, 80, 30, NULL, '2025-06-06 17:45:52'),
(161, 124, NULL, NULL, 80, 30, NULL, '2025-06-06 18:24:42'),
(162, 125, NULL, NULL, 80, 30, NULL, '2025-06-06 22:05:13'),
(163, 126, NULL, NULL, 80, 30, NULL, '2025-06-07 00:04:39'),
(168, 132, NULL, NULL, 80, 30, NULL, '2025-06-07 15:29:40');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `user_progress`
--

CREATE TABLE `user_progress` (
  `user_id` int NOT NULL,
  `appOpened` tinyint(1) DEFAULT '0',
  `accountCreated` tinyint(1) DEFAULT '0',
  `firstDayUnderGoal` tinyint(1) DEFAULT '0',
  `daysUnderGoal` int DEFAULT '0',
  `consecutiveDaysUnderGoal` int DEFAULT '0',
  `noDaysOverGoal` tinyint(1) DEFAULT '0',
  `sustainableGoals` int DEFAULT '0',
  `healthGoals` int DEFAULT '0',
  `mentalGoals` int DEFAULT '0',
  `challengeStarted` tinyint(1) DEFAULT '0',
  `goalAmountReached` tinyint(1) DEFAULT '0',
  `moneyGoals` int DEFAULT '0',
  `moneySaved` decimal(10,2) DEFAULT '0.00',
  `firstPlace` tinyint(1) DEFAULT '0',
  `leaderboardDays` int DEFAULT '0',
  `invitedFriends` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `user_progress`
--

INSERT INTO `user_progress` (`user_id`, `appOpened`, `accountCreated`, `firstDayUnderGoal`, `daysUnderGoal`, `consecutiveDaysUnderGoal`, `noDaysOverGoal`, `sustainableGoals`, `healthGoals`, `mentalGoals`, `challengeStarted`, `goalAmountReached`, `moneyGoals`, `moneySaved`, `firstPlace`, `leaderboardDays`, `invitedFriends`) VALUES
(58, 1, 1, 1, 10, 7, 1, 3, 6, 4, 1, 0, 5, 20.00, 0, 3, 3),
(61, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 3),
(62, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 2),
(64, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(65, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(66, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 2),
(67, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 2),
(68, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(69, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 1),
(70, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(71, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(72, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(73, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 5),
(74, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(75, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 27),
(76, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 5),
(77, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 2),
(78, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(79, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(80, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(81, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(84, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(87, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 2),
(88, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 2),
(89, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 2),
(90, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 4),
(91, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 4),
(92, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 2),
(93, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 3),
(100, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 2),
(101, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 3),
(102, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(103, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(106, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 1),
(108, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(110, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 2),
(111, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(112, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(113, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(114, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 2),
(115, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 2),
(116, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 2),
(117, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(118, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(119, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(120, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(121, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 1),
(123, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 2),
(124, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(125, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 2),
(126, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(128, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(129, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(130, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(131, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 2),
(132, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 2);

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `challenges`
--
ALTER TABLE `challenges`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `friend_id` (`friend_id`);

--
-- Indexen voor tabel `leaderboards`
--
ALTER TABLE `leaderboards`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexen voor tabel `leaderboard_friends`
--
ALTER TABLE `leaderboard_friends`
  ADD PRIMARY KEY (`id`),
  ADD KEY `leaderboard_id` (`leaderboard_id`),
  ADD KEY `friend_id` (`friend_id`);

--
-- Indexen voor tabel `puffs`
--
ALTER TABLE `puffs`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexen voor tabel `user_badges`
--
ALTER TABLE `user_badges`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_badge` (`user_id`,`badge_name`);

--
-- Indexen voor tabel `user_goals`
--
ALTER TABLE `user_goals`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexen voor tabel `user_progress`
--
ALTER TABLE `user_progress`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `challenges`
--
ALTER TABLE `challenges`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT voor een tabel `friends`
--
ALTER TABLE `friends`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;

--
-- AUTO_INCREMENT voor een tabel `leaderboards`
--
ALTER TABLE `leaderboards`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT voor een tabel `leaderboard_friends`
--
ALTER TABLE `leaderboard_friends`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT voor een tabel `puffs`
--
ALTER TABLE `puffs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=180;

--
-- AUTO_INCREMENT voor een tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- AUTO_INCREMENT voor een tabel `user_badges`
--
ALTER TABLE `user_badges`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT voor een tabel `user_goals`
--
ALTER TABLE `user_goals`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=169;

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `friends`
--
ALTER TABLE `friends`
  ADD CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `friends_ibfk_2` FOREIGN KEY (`friend_id`) REFERENCES `users` (`id`);

--
-- Beperkingen voor tabel `leaderboards`
--
ALTER TABLE `leaderboards`
  ADD CONSTRAINT `leaderboards_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Beperkingen voor tabel `leaderboard_friends`
--
ALTER TABLE `leaderboard_friends`
  ADD CONSTRAINT `leaderboard_friends_ibfk_1` FOREIGN KEY (`leaderboard_id`) REFERENCES `leaderboards` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `leaderboard_friends_ibfk_2` FOREIGN KEY (`friend_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Beperkingen voor tabel `user_badges`
--
ALTER TABLE `user_badges`
  ADD CONSTRAINT `user_badges_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
