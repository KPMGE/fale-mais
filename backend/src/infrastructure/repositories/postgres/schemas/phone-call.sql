CREATE TABLE phone_calls (
  id VARCHAR(255)  NOT NULL PRIMARY KEY,
  origin_ddd       VARCHAR(3) NOT NULL,
  destination_ddd  VARCHAR(3) NOT NULL,
  price_per_minute FLOAT NOT NULL
);
