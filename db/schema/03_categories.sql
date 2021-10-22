-- Drop and recreate catagories table (Example)

DROP TABLE IF EXISTS catagories CASCADE;
CREATE TABLE catagories (
  id SERIAL PRIMARY KEY NOT NULL,
  type VARCHAR(255) NOT NULL
);
