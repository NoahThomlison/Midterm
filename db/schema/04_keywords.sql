-- Drop and recreate keywords table (Example)

DROP TABLE IF EXISTS keywords CASCADE;
CREATE TABLE keywords (
  id SERIAL PRIMARY KEY NOT NULL,
  keyword VARCHAR(255) NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
);
