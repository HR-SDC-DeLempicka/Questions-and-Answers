const db = require('../db/db.js');

module.exports = {
  postQuestion: (req, res) => {
    db.query(`insert into questions (product_id, body, date_written, asker_name, asker_email, reported, helpful) VALUES (${req.body.product_id}, '${req.body.body}', ${new Date().getTime()}, '${req.body.name}', '${req.body.email}', cast(0 as bit), 0);`, (err) => {
      if (err) {
        res.statusCode = 500;
        console.log(err);
        res.end();
      } else {
        res.statusCode = 201;
        res.end();
      }
    });
  },

  postAnswer: (req, res) => {
    db.query(`insert into answers (question_id, body, date_written, answerer_name, answerer_email, reported, helpful) VALUES (${req.params.question_id}, '${req.body.body}', ${new Date().getTime()}, '${req.body.name}', '${req.body.email}', cast(0 as bit), 0);`, (err) => {
      if (err) {
        res.statusCode = 500;
        console.log(err);
        res.end();
      } else {
        res.statusCode = 201;
        res.end();
      }
    });
  }
};