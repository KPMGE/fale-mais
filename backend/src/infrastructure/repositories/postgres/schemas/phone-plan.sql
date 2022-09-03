CREATE TABLE phone_plans (
  id VARCHAR(255)     NOT NULL PRIMARY KEY,
  name VARCHAR(255)   NOT NULL,
  duration_in_minutes INT NOT NULL,
  tax                 FLOAT NOT NULL
);

