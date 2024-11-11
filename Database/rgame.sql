-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Lis 10, 2024 at 04:59 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rgame`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `goods`
--

CREATE TABLE `goods` (
  `ID` int(11) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `WoodCost` int(11) NOT NULL,
  `StoneCost` int(11) NOT NULL,
  `MetalCost` int(11) NOT NULL,
  `Value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `goods`
--

INSERT INTO `goods` (`ID`, `Name`, `WoodCost`, `StoneCost`, `MetalCost`, `Value`) VALUES
(1, 'Wooden Table', 14, 4, 2, 250),
(2, 'Marble Table', 2, 12, 4, 320),
(3, 'Chandelier', 4, 2, 12, 400);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `players`
--

CREATE TABLE `players` (
  `ID` int(11) NOT NULL,
  `Wood` int(11) NOT NULL,
  `Stone` int(11) NOT NULL,
  `Metal` int(11) NOT NULL,
  `Money` int(11) NOT NULL,
  `WoodenTable` int(11) DEFAULT 0,
  `MarbleTable` int(11) DEFAULT 0,
  `Chandelier` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`ID`, `Wood`, `Stone`, `Metal`, `Money`, `WoodenTable`, `MarbleTable`, `Chandelier`) VALUES
(1, 0, 0, 0, 10000, 0, 0, 0),
(2, 0, 0, 0, 10000, 0, 0, 0),
(3, 0, 0, 0, 10000, 0, 0, 0),
(4, 0, 0, 0, 10000, 0, 0, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `resources`
--

CREATE TABLE `resources` (
  `ID` int(11) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `Cost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `resources`
--

INSERT INTO `resources` (`ID`, `Name`, `Cost`) VALUES
(1, 'Wood', 4),
(2, 'Stone', 8),
(3, 'Metal', 12);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Name` (`Name`),
  ADD UNIQUE KEY `WoodCost` (`WoodCost`),
  ADD UNIQUE KEY `StoneCost` (`StoneCost`),
  ADD UNIQUE KEY `MetalCost` (`MetalCost`),
  ADD UNIQUE KEY `Value` (`Value`);

--
-- Indeksy dla tabeli `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`ID`);

--
-- Indeksy dla tabeli `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Name` (`Name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `goods`
--
ALTER TABLE `goods`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `resources`
--
ALTER TABLE `resources`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
