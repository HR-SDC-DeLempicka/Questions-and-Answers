const db = require('../db/db.js');

module.exports = {
  getQuestions: (req, res) => {
    db.query(`SELECT questions.product_id, questions.id as qid, questions.body as qbody, questions.date_written as qdate_written, questions.asker_name, questions.helpful as qhelpful, CAST(questions.reported as INT) as qreported, answers.id as aid, answers.body as abody, answers.date_written as adate_written, answers.answerer_name, answers.helpful as ahelpful, photos.id as pid, photos.url FROM questions INNER JOIN answers ON answers.question_id = questions.id INNER JOIN photos ON photos.answer_id = answers.id WHERE questions.product_id = ${1} `, (err, data) => {
      if (err) {
        console.log(err);
        res.end();
      } else {
        res.statusCode = 200;
        res.send(data.rows);
      }
    });
  },

  getAnswers: (req, res) => {
    res.statusCode = 200;
    res.end();
  }
};