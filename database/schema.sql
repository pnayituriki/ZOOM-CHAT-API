-- -----------------------------------------------------
-- Schema zoom_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS zoom_db DEFAULT CHARACTER SET utf8 ;
USE zoom_db;

-- -----------------------------------------------------
-- Table `zoom_db`.`tbl_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tbl_user (
  user_id serial primary key,
  user_name VARCHAR(45) NULL,
  user_email VARCHAR(45) NULL,
  user_password VARCHAR(200) NULL
)

-- -----------------------------------------------------
-- Table `zoom_db`.`tbl_rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS tbl_rooms (
  room_id serial primary key,
  room_key INT NOT NULL,
  user_id serial NOT NULL
)

