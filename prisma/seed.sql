-- Products
INSERT OR IGNORE INTO "Product" ("id", "name", "price", "currencyAmount", "image", "createdAt", "updatedAt") VALUES
('prod_001', '60 UC', 0.99, 60, '/uploads/uc_small.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('prod_002', '300+25 UC', 4.99, 325, '/uploads/uc_small.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('prod_003', '600+60 UC', 9.99, 660, '/uploads/uc_small.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('prod_004', '1500+300 UC', 24.99, 1800, '/uploads/uc_medium.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('prod_005', '3000+850 UC', 49.99, 3850, '/uploads/uc_medium.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('prod_006', '6000+2100 UC', 99.99, 8100, '/uploads/uc_medium.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('prod_007', '12000+4200 UC', 199.99, 16200, '/uploads/uc_large.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('prod_008', '18000+6300 UC', 299.99, 24300, '/uploads/uc_large.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('prod_009', '24000+8400 UC', 399.99, 32400, '/uploads/uc_large.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('prod_010', '30000+10500 UC', 499.99, 40500, '/uploads/uc_large.png', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Admin User (password: admin123)
INSERT OR IGNORE INTO "User" ("id", "email", "password", "role", "createdAt", "updatedAt") VALUES
('admin_user', 'admin@example.com', '$2a$12$aUVAsoiDXVK44l5SiA7t1OSd7qQD/rQSeB4QZ5R4QN8JtcO2xkkCu', 'ADMIN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
