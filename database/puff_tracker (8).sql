-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 01 jun 2025 om 15:58
-- Serverversie: 10.4.32-MariaDB
-- PHP-versie: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `puff_tracker`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `challenges`
--

CREATE TABLE `challenges` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `icon` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `budget` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
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
(18, 67, 'reizen', 'Niet actief', 9000.00, '2025-05-30 14:20:31');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `friends`
--

CREATE TABLE `friends` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `friend_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
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
(20, 58, 31, '2025-05-27 10:57:13'),
(22, 58, 57, '2025-05-27 11:20:45'),
(23, 58, 52, '2025-05-27 11:36:35'),
(24, 58, 49, '2025-05-27 11:36:47'),
(35, 61, 31, '2025-05-27 11:52:04'),
(37, 61, 52, '2025-05-27 12:35:06'),
(38, 62, 54, '2025-05-28 08:39:24'),
(39, 62, 57, '2025-05-28 08:39:33'),
(40, 31, 54, '2025-05-28 13:52:47'),
(41, 58, 32, '2025-05-28 13:54:20'),
(42, 58, 32, '2025-05-28 13:54:23'),
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
(61, 66, 31, '2025-05-31 10:09:34');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `leaderboards`
--

CREATE TABLE `leaderboards` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
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
(23, 'Tdt', 67, '2025-05-30 14:32:42');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `leaderboard_friends`
--

CREATE TABLE `leaderboard_friends` (
  `id` int(11) NOT NULL,
  `leaderboard_id` int(11) NOT NULL,
  `friend_id` int(11) NOT NULL,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp()
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
(41, 23, 57, '2025-05-30 14:32:42');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `puffs`
--

CREATE TABLE `puffs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `time_of_day` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

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
(54, 67, 25, '2025-05-30 14:27:56', 'Nacht (00:00 - 6:00)');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `birth_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `password` varchar(255) NOT NULL,
  `active_challenge_id` int(11) DEFAULT NULL,
  `profile_picture` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Gegevens worden geëxporteerd voor tabel `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `birth_date`, `created_at`, `password`, `active_challenge_id`, `profile_picture`) VALUES
(31, 'Jef', 'Wef', 'Bef@gmail.com', '0000-00-00', '2025-05-08 12:27:57', 'Wef', NULL, 'profile2.png'),
(32, 'Jef', 'Wef', 'Rjfjf@gmail.com', '0000-00-00', '2025-05-08 13:02:13', 'Test', NULL, 'profile5.png'),
(33, 'Nekf', 'Jeiei', 'Jdjf@gmail.com', '0000-00-00', '2025-05-08 13:03:05', 'Test', NULL, 'profile3.png'),
(34, 'Jdjfk', 'Jdkfkd', 'Jdjdi@gmail.com', '0000-00-00', '2025-05-08 13:11:01', 'Test', NULL, 'profile3.png'),
(35, 'Jdjd', 'Kdkdk', 'Jdjd@gmail.com', '0000-00-00', '2025-05-08 13:21:05', 'Test', NULL, 'profile1.png'),
(36, 'Jeje', 'Jdjfk', 'Jrjf@gmail.com', '0000-00-00', '2025-05-08 13:26:34', '', NULL, 'profile1.png'),
(37, 'Kdke', 'Ieiei', 'Jdkf@gmail.com', '0000-00-00', '2025-05-08 13:27:36', 'Test', NULL, 'profile3.png'),
(39, 'Jdjdj', 'Kekfk', 'Jfjdi@gmail.com', '0000-00-00', '2025-05-08 13:33:10', '', NULL, 'profile4.png'),
(40, 'Fhguu', 'Fyuf', 'Fyuf@gmail.com', '0000-00-00', '2025-05-08 13:40:41', 'Lol', NULL, 'profile3.png'),
(41, 'Kfir', 'Ejejrj', 'Jfkfo@gmail.com', '0000-00-00', '2025-05-08 13:44:52', 'Jo', NULL, 'profile1.png'),
(42, 'Jef', 'Jef', 'Jef@gmail.com', '0000-00-00', '2025-05-08 13:49:40', 'Test', NULL, 'profile4.png'),
(43, 'Jdkd', 'Jdjdj', 'Nfkf@gmail.com', '0000-00-00', '2025-05-08 14:10:50', 'Test', NULL, 'profile3.png'),
(44, 'Jdjfj', 'Jejeje', 'Jdjfj@gmail.com', '0000-00-00', '2025-05-08 14:32:44', 'Test', NULL, 'profile1.png'),
(46, 'Jeff', 'Jefff', 'Jefff@gmail.com', '0000-00-00', '2025-05-08 15:01:53', 'Test', NULL, 'profile5.png'),
(47, 'Wef', 'Bef', 'Lef@gmail.com', '0000-00-00', '2025-05-08 15:03:44', 'Test', NULL, 'profile2.png'),
(48, 'Test', 'Test', 'Hdjfj@gmail.com', '0000-00-00', '2025-05-08 15:09:22', 'Test', NULL, 'profile4.png'),
(49, 'Jefff', 'Weefff', 'Jdjfjd@gmail.com', '0000-00-00', '2025-05-08 15:12:10', 'Test', NULL, 'profile4.png'),
(50, 'Jef', 'Wef', 'Jfjfuf@gmail.com', '0000-00-00', '2025-05-08 15:28:24', 'Test', NULL, 'profile3.png'),
(51, 'Jefke', 'Pefke', 'Jefke@gmail.com', '0000-00-00', '2025-05-08 15:36:50', 'Test', NULL, 'profile2.png'),
(52, 'Jef', 'Bef', 'Kfkf@gmail.com', '0000-00-00', '2025-05-10 14:06:18', 'Bef', NULL, 'profile2.png'),
(53, 'Jef', 'Wef', 'Jfjfk@gmail.com', '0000-00-00', '2025-05-10 14:18:35', 'Bef', NULL, 'profile2.png'),
(54, 'Dirk', 'Van Roy', 'Dkfj@jfj.jd', '0000-00-00', '2025-05-10 14:36:36', '', NULL, 'profile4.png'),
(55, 'Jef', 'Pec', 'Jfjf@gmail.com', '0000-00-00', '2025-05-10 14:53:47', 'Test', NULL, 'profile5.png'),
(56, 'Jeeeff', 'Peeefff', 'Jeef@gmail.com', '0000-00-00', '2025-05-10 14:57:07', 'Test', NULL, 'profile3.png'),
(57, 'Jelle', 'De boeck', 'Jelle@gmail.com', '0000-00-00', '2025-05-19 12:16:11', 'Test', 2, 'profile3.png'),
(58, 'Foto', '2', 'Foto@gmail.com', '0000-00-00', '2025-05-27 09:57:48', 'Test', 6, 'profile4.png'),
(61, 'Jonas', 'Van roy', 'Jonas@gmail.com', '0000-00-00', '2025-05-27 11:50:20', 'Test', NULL, 'profile2.png'),
(62, 'Jefrey', 'Van hoo', 'Jefrey@gmail.com', '0000-00-00', '2025-05-28 08:38:40', 'Test', NULL, 'profile5.png'),
(65, 'Jens', 'Tielemans', 'Jens@gmail.com', '2003-04-18', '2025-05-29 10:35:28', 'Test', NULL, 'profile5.png'),
(66, 'Robbe ', 'Vermeiren ', 'Robbe@gmail.com', '2003-06-04', '2025-05-28 10:38:52', 'Test', 14, 'profile1.png'),
(67, 'Ikke', 'Testnaam', 'Testmail@test.tst', '0000-00-00', '2025-05-30 14:02:19', 'Ww1', 17, 'profile1.png'),
(69, 'Jef', 'Lef', 'Jari@gmail.com', '2003-02-15', '2025-05-31 08:27:12', 'Test', NULL, 'profile3.png');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `user_badges`
--

CREATE TABLE `user_badges` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `badge_name` varchar(255) NOT NULL,
  `earned_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `user_badges`
--

INSERT INTO `user_badges` (`id`, `user_id`, `badge_name`, `earned_date`) VALUES
(1, 69, 'Vrienden Strijder', '2025-05-31 12:00:27'),
(4, 66, 'Vrienden Strijder', '2025-05-31 12:09:34');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `user_goals`
--

CREATE TABLE `user_goals` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `goal` varchar(255) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `current_usage` int(11) DEFAULT NULL,
  `goal_usage` int(11) DEFAULT NULL,
  `plan` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

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
(67, 58, 'Minder puffs nemen', 'Voor mijn familie of vrienden', 250, 50, 'geleidelijk', '2025-05-27 09:57:56'),
(79, 61, 'Minder puffs nemen', 'Voor mijn familie of vrienden', 250, 60, 'geleidelijk', '2025-05-27 11:50:27'),
(83, 62, 'Minder puffs nemen', 'Voor mijn familie of vrienden', 300, 50, 'geleidelijk', '2025-05-28 08:38:47'),
(87, 65, 'Minder puffs nemen', 'Om geld te besparen', 260, 60, 'geleidelijk', '2025-05-29 10:35:51'),
(91, 66, 'Bewuster worden van mijn gebruik', 'Om geld te besparen', 190, 50, 'geleidelijk', '2025-05-29 10:39:14'),
(95, 67, 'Stoppen met vapen', 'Voor mijn welzijn', 200, 99, 'agressief', '2025-05-30 14:06:25'),
(101, 69, 'Stoppen met vapen', 'Om geld te besparen', 250, 60, 'geleidelijk', '2025-05-31 08:48:06');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `user_progress`
--

CREATE TABLE `user_progress` (
  `user_id` int(11) NOT NULL,
  `appOpened` tinyint(1) DEFAULT 0,
  `accountCreated` tinyint(1) DEFAULT 0,
  `firstDayUnderGoal` tinyint(1) DEFAULT 0,
  `daysUnderGoal` int(11) DEFAULT 0,
  `consecutiveDaysUnderGoal` int(11) DEFAULT 0,
  `noDaysOverGoal` tinyint(1) DEFAULT 0,
  `sustainableGoals` int(11) DEFAULT 0,
  `healthGoals` int(11) DEFAULT 0,
  `mentalGoals` int(11) DEFAULT 0,
  `challengeStarted` tinyint(1) DEFAULT 0,
  `goalAmountReached` tinyint(1) DEFAULT 0,
  `moneyGoals` int(11) DEFAULT 0,
  `moneySaved` decimal(10,2) DEFAULT 0.00,
  `firstPlace` tinyint(1) DEFAULT 0,
  `leaderboardDays` int(11) DEFAULT 0,
  `invitedFriends` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `user_progress`
--

INSERT INTO `user_progress` (`user_id`, `appOpened`, `accountCreated`, `firstDayUnderGoal`, `daysUnderGoal`, `consecutiveDaysUnderGoal`, `noDaysOverGoal`, `sustainableGoals`, `healthGoals`, `mentalGoals`, `challengeStarted`, `goalAmountReached`, `moneyGoals`, `moneySaved`, `firstPlace`, `leaderboardDays`, `invitedFriends`) VALUES
(58, 1, 1, 1, 10, 7, 1, 3, 6, 4, 1, 0, 5, 20.00, 0, 3, 2),
(61, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 3),
(62, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 2),
(64, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(65, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(66, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 2),
(67, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 2),
(68, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 0),
(69, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.00, 0, 0, 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT voor een tabel `friends`
--
ALTER TABLE `friends`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT voor een tabel `leaderboards`
--
ALTER TABLE `leaderboards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT voor een tabel `leaderboard_friends`
--
ALTER TABLE `leaderboard_friends`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT voor een tabel `puffs`
--
ALTER TABLE `puffs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT voor een tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT voor een tabel `user_badges`
--
ALTER TABLE `user_badges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT voor een tabel `user_goals`
--
ALTER TABLE `user_goals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

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
