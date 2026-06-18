CREATE TABLE IF NOT EXISTS `personnel` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `im` VARCHAR(20) NOT NULL UNIQUE COMMENT 'Matricule unique',
    `lastname` VARCHAR(100) NOT NULL,
    `firstname` VARCHAR(100) NOT NULL,
    `grade` VARCHAR(100) NOT NULL COMMENT 'Grade / Rank',
    `fonction` VARCHAR(200) NOT NULL COMMENT 'Fonction / Position',
    `email` VARCHAR(255) NULL,
    `phone` VARCHAR(50) NULL,
    `photo` VARCHAR(255) NULL COMMENT 'Photo filename',
    `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_personnel_status` (`status`),
    INDEX `idx_personnel_grade` (`grade`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
