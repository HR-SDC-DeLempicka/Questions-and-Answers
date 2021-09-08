const db = require('../db/db.js');

module.exports = {
  updateQuestionHelpful: (req, res) => {
    db.query(`UPDATE questions SET helpful = helpful + 1 WHERE id = ${req.params.question_id}`, (err) => {
      if (err) {
        console.log(err);
        res.end();
      } else {
        res.statusCode = 200;
        res.end('Ok');
      }
    });
  },

  updateQuestionReported: (req, res) => {
    db.query(`UPDATE questions SET reported = CAST(1 AS BIT) WHERE id = ${req.params.question_id}`, (err) => {
      if (err) {
        console.log(err);
        res.end();
      } else {
        res.statusCode = 200;
        res.end('Ok');
      }
    });
  },

  updateAnswerHelpful: (req, res) => {
    db.query(`UPDATE answers SET helpful = helpful + 1 WHERE id = ${req.params.answer_id}`, (err) => {
      if (err) {
        console.log(err);
        res.end();
      } else {
        res.statusCode = 200;
        res.end('Ok');
      }
    });
  },

  updateAnswerReported: (req, res) => {
    db.query(`UPDATE answers SET reported = CAST(1 AS BIT) WHERE id = ${req.params.answer_id}`, (err) => {
      if (err) {
        console.log(err);
        res.end();
      } else {
        res.statusCode = 200;
        res.end('Ok');
      }
    });
  }
};
