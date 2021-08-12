CREATE TABLE questions
(id serial PRIMARY KEY,
product_id INT NOT NULL,
body VARCHAR(200),
date_written VARCHAR(100),
asker_name VARCHAR(50),
asker_email VARCHAR(100),
reported BIT,
helpful INT);

CREATE TABLE answers
(id serial PRIMARY KEY,
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
(id serial PRIMARY KEY,
answer_id INT NOT NULL,
url VARCHAR(150),
FOREIGN KEY (answer_id)
REFERENCES answers (id));

CREATE TABLE questionsCopy
(id serial PRIMARY KEY,
product_id INT NOT NULL,
body VARCHAR(200),
date_written VARCHAR(100),
asker_name VARCHAR(50),
asker_email VARCHAR(100),
reported BIT,
helpful INT);

CREATE TABLE answersCopy
(id serial PRIMARY KEY,
question_id INT NOT NULL,
body VARCHAR(200),
date_written VARCHAR(100),
answerer_name VARCHAR(50),
answerer_email VARCHAR(100),
reported BIT,
helpful INT);

CREATE TABLE photosCopy
(id serial PRIMARY KEY,
answer_id INT NOT NULL,
url VARCHAR(150));

COPY questionsCopy
FROM '/home/calebbroderick/hackreactor/rfp54/group-projects/Questions-and-Answers/db_setup/questions.csv'
DELIMITER ',' CSV HEADER;
-- 3518963 amount

COPY answersCopy
FROM '/home/calebbroderick/hackreactor/rfp54/group-projects/Questions-and-Answers/db_setup/answers.csv'
DELIMITER ',' CSV HEADER;
-- 6879306 amount

COPY photosCopy
FROM '/home/calebbroderick/hackreactor/rfp54/group-projects/Questions-and-Answers/db_setup/answers_photos.csv'
DELIMITER ',' CSV HEADER;
-- 2063759 amount

INSERT INTO questions (product_id, body, date_written, asker_name, asker_email, reported, helpful)
SELECT product_id, body, date_written, asker_name, asker_email, reported, helpful
FROM questionsCopy;

INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
SELECT question_id, body, date_written, answerer_name, answerer_email, reported, helpful
FROM answersCopy;

INSERT INTO photos (answer_id, url)
SELECT answer_id, url
FROM photosCopy;