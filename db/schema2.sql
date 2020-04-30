create database cards_db;
use cards_db;

create table blackCards(
  id INT NOT NULL AUTO_INCREMENT,
  card_text VARCHAR(255) NOT NULL,
  pick INT,
  PRIMARY KEY (id)
);

create table whiteCards(
  id INT NOT NULL AUTO_INCREMENT,
  card_text VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);
