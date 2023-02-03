DROP DATABASE IF EXISTS office_db;
CREATE DATABASE offic_db;

USE office_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    deptarment_id INT,
    FOREIGN KEY (deptarment_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);