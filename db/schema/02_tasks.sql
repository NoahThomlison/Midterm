-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS tasks CASCADE;
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  user_id INTEGER users(id) ON DELETE CASCADE,
  set-reminder BOOLEAN NOT NULL DEFAULT 0,
  reminder-date date,
  completion-status BOOLEAN NOT NULL DEFAULT 0
);
