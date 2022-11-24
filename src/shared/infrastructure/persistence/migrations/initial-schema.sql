CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  district_id VARCHAR(6) NOT NULL,
  PRIMARY KEY(id),
  UNIQUE KEY UQ_users_email(email),
  KEY IX_users_district_id(district_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS accounts(
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  type ENUM ('Cl', 'Co') NOT NULL DEFAULT 'Cl',
  created_at DATETIME NULL,
  created_by BIGINT UNSIGNED NULL,
  updated_at DATETIME NULL,
  updated_by BIGINT UNSIGNED NULL,
  first_name VARCHAR(75) NULL,
  last_name VARCHAR(75) NULL,
  dni VARCHAR(8) NULL,
  salary VARCHAR(11) NULL,
  cardd VARCHAR(12) NULL,
  gender VARCHAR(5)NULL,
  PRIMARY KEY(id),
  UNIQUE INDEX card_usuario(cardd),
  UNIQUE INDEX salary_coach(salary), 
  UNIQUE INDEX dni_usuario(dni),
  UNIQUE INDEX gender_usuario(gender),
  KEY IX_clients_created_by(created_by),
  KEY IX_clients_updated_by(updated_by),
  CONSTRAINT FK_clients_created_by FOREIGN KEY(created_by) REFERENCES users(id),
  CONSTRAINT FK_clients_updated_by FOREIGN KEY(updated_by) REFERENCES users(id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;