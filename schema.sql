CREATE DATABASE atelier;

CREATE TABLE questions
(id INT PRIMARY KEY,
product_id INT NOT NULL,
body VARCHAR(200),
date_written VARCHAR(100),
asker_name VARCHAR(50),
asker_email VARCHAR(100),
reported BIT,
helpful INT);

CREATE TABLE answers
(id INT PRIMARY KEY,
question_id INT NOT NULL,
body VARCHAR(200),
date_written VARCHAR(100),
answerer_name VARCHAR(50),
answerer_email VARCHAR(100),
reported BIT,
helpful INT,
FOREIGN KEY (question_id)
REFERENCES questions (id));

CREATE TABLE photos
(id INT PRIMARY KEY,
answer_id INT NOT NULL,
url VARCHAR(150),
FOREIGN KEY (answer_id)
REFERENCES answers (id));

COPY questions
FROM '/home/calebbroderick/hackreactor/rfp54/group-projects/Questions-and-Answers/db_setup/questions.csv'
DELIMITER ',' CSV HEADER;
-- 3518963 amount

COPY answers
FROM '/home/calebbroderick/hackreactor/rfp54/group-projects/Questions-and-Answers/db_setup/answers.csv'
DELIMITER ',' CSV HEADER;
-- 6879306 amount

COPY photos
FROM '/home/calebbroderick/hackreactor/rfp54/group-projects/Questions-and-Answers/db_setup/answers_photos.csv'
DELIMITER ',' CSV HEADER;
-- 2063759 amount