CREATE TABLE dogs (
  id PRIMARY KEY,
  dog_name TEXT NOT NULL,
  breed TEXT NOT NULL,
  about TEXT NOT NULL,
  image_data TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW());

INSERT INTO dogs (dogName, breed, about, imageData) VALUES
('Shiba Inu', 'Shiba Inu', 'A small, agile dog with a spirited personality.', '');
