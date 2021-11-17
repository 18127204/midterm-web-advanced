-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 17, 2021 lúc 02:30 PM
-- Phiên bản máy phục vụ: 10.4.21-MariaDB
-- Phiên bản PHP: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `manageclassrooms`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`id`, `username`, `password`) VALUES
(1, 'tanthai', '123456'),
(2, 'minhquang', '1234'),
(3, 'tqluc', '123456789'),
(4, 'nvan', '123'),
(5, 'nvbinh', '12345');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `classroom`
--

CREATE TABLE `classroom` (
  `id` int(11) NOT NULL,
  `id_nguoithamgia` int(11) NOT NULL,
  `tenlophoc` varchar(100) NOT NULL,
  `phan` varchar(100) NOT NULL,
  `chude` varchar(100) NOT NULL,
  `phong` varchar(100) NOT NULL,
  `duonglink` varchar(100) NOT NULL,
  `id_chuphong` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `classroom`
--

INSERT INTO `classroom` (`id`, `id_nguoithamgia`, `tenlophoc`, `phan`, `chude`, `phong`, `duonglink`, `id_chuphong`) VALUES
(1, 1, 'toán', '1.1', 'hình không gian', 'F203', '/classroom/1637069808370', 1),
(1, 2, 'toán', '1.1', 'hình không gian', 'F203', '/classroom/1637069808370', 1),
(1, 3, 'toán', '1.1', 'hình không gian', 'F203', '/classroom/1637069808370', 3),
(1, 4, 'toán', '1.1', 'hình không gian', 'F203', '/classroom/1637069808370', 1),
(4, 1, 'Văn', '2', 'tự luận', 'A111', '/classroom/1637069808407', 2),
(4, 2, 'Văn', '2', 'tự luận', 'A111', '/classroom/1637069808407', 2),
(9, 4, 'Sử', '3', 'Pháp', 'A1110', '/classroom/1637130210101', 4);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `infomation`
--

CREATE TABLE `infomation` (
  `id` int(11) NOT NULL,
  `hoten` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `sodienthoai` varchar(50) NOT NULL,
  `diachi` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `infomation`
--

INSERT INTO `infomation` (`id`, `hoten`, `email`, `sodienthoai`, `diachi`) VALUES
(1, 'Thái Nhật Tân', 'tanthai172k@gmail.com', '0123456789', '123 Lê Lợi'),
(2, 'Trần Minh Quang', 'thainhattan123abc@gmail.com', '9875654123', '456 Quang Trung'),
(3, 'tranquangluc', 'tquangluc@gmail.com', '0365412333', '123 Điện Biên Phủ'),
(4, 'nguyễn văn an', 'nvan@gmail.com', '0123456789', '321 Lê Lai'),
(5, 'Nguyễn Văn Bình', 'tuhoa123abc@gmail.com', '9875654123', '566 Trần Phú');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `classroom`
--
ALTER TABLE `classroom`
  ADD PRIMARY KEY (`id`,`id_nguoithamgia`);

--
-- Chỉ mục cho bảng `infomation`
--
ALTER TABLE `infomation`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `account`
--
ALTER TABLE `account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `classroom`
--
ALTER TABLE `classroom`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `infomation`
--
ALTER TABLE `infomation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
