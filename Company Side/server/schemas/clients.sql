CREATE TABLE clients (
  name varchar(100),
  email varchar(200) PRIMARY KEY,
  password varchar(200),
  otp int DEFAULT NULL,
  id varchar(20),
  number int DEFAULT NULL,
  age int,
  gender varchar(10)
);
