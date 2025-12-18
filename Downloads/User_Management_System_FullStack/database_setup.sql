-- User Management System Database Setup
-- Execute this script in MySQL Workbench or MySQL Command Line

-- Create Database
CREATE DATABASE IF NOT EXISTS user_management_db;
USE user_management_db;

-- Create UserMaster Table
CREATE TABLE IF NOT EXISTS user_master (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(100) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_phone_number VARCHAR(15) NOT NULL,
    date_of_registration DATETIME NOT NULL,
    status VARCHAR(20) NOT NULL,
    INDEX idx_username (user_name),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Create UserAddresses Table
CREATE TABLE IF NOT EXISTS user_addresses (
    address_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    full_address TEXT NOT NULL,
    address_type VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES user_master(user_id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert Sample Data (Optional - for testing)
INSERT INTO user_master (user_name, user_password, user_phone_number, date_of_registration, status) 
VALUES 
    ('john_doe', 'password123', '1234567890', NOW(), 'ACTIVE'),
    ('jane_smith', 'password456', '9876543210', NOW(), 'ACTIVE'),
    ('bob_wilson', 'password789', '5555555555', NOW(), 'INACTIVE');

-- Insert Sample Addresses
INSERT INTO user_addresses (user_id, full_address, address_type)
VALUES
    (1, '123 Main Street, Boston, MA 02101', 'HOME'),
    (1, '456 Business Ave, Cambridge, MA 02139', 'OFFICE'),
    (2, '789 Park Road, Somerville, MA 02143', 'HOME'),
    (3, '321 Oak Lane, Newton, MA 02458', 'HOME');

-- Verify the data
SELECT * FROM user_master;
SELECT * FROM user_addresses;

-- View Users with their Address Count
SELECT 
    u.user_id,
    u.user_name,
    u.user_phone_number,
    u.status,
    COUNT(a.address_id) as address_count
FROM user_master u
LEFT JOIN user_addresses a ON u.user_id = a.user_id
GROUP BY u.user_id, u.user_name, u.user_phone_number, u.status;

-- View All Users with their Addresses
SELECT 
    u.user_id,
    u.user_name,
    u.user_phone_number,
    u.status,
    a.address_id,
    a.full_address,
    a.address_type
FROM user_master u
LEFT JOIN user_addresses a ON u.user_id = a.user_id
ORDER BY u.user_id, a.address_id;
