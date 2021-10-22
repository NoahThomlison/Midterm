-- Drop and recreate keywords table (Example)

DROP TABLE IF EXISTS keywords CASCADE;
CREATE TABLE keywords (
  id SERIAL PRIMARY KEY NOT NULL,
  keyword VARCHAR(255) NOT NULL
  catagory_id INTEGER NOT NULL REFERENCES catagories(id) ON DELETE CASCADE,
);
