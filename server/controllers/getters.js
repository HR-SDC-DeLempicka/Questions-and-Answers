const db = require('../db/db.js');

// [
//   {
//     "product_id": 1,
//     "question_id": 1,
//     "question_body": "What fabric is the top made of?",
//     "question_date": "1595884714409",
//     "asker_name": "yankeelover",
//     "question_helpfulness": 1,
//     "question_reported": 0,
//     "answer_id": 5,
//     "answer_body": "Something pretty soft but I can't be sure",
//     "answer_date": "1599990560555",
//     "answerer_name": "metslover",
//     "answer_helpfulness": 5,
//     "photo_id": 1,
//     "url": "https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"
//   },
//   {
//     "product_id": 1,
//     "question_id": 1,
//     "question_body": "What fabric is the top made of?",
//     "question_date": "1595884714409",
//     "asker_name": "yankeelover",
//     "question_helpfulness": 1,
//     "question_reported": 0,
//     "answer_id": 5,
//     "answer_body": "Something pretty soft but I can't be sure",
//     "answer_date": "1599990560555",
//     "answerer_name": "metslover",
//     "answer_helpfulness": 5,
//     "photo_id": 2,
//     "url": "https://images.unsplash.com/photo-1511127088257-53ccfcc769fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
//   },
//   {
//     "product_id": 1,
//     "question_id": 1,
//     "question_body": "What fabric is the top made of?",
//     "question_date": "1595884714409",
//     "asker_name": "yankeelover",
//     "question_helpfulness": 1,
//     "question_reported": 0,
//     "answer_id": 5,
//     "answer_body": "Something pretty soft but I can't be sure",
//     "answer_date": "1599990560555",
//     "answerer_name": "metslover",
//     "answer_helpfulness": 5,
//     "photo_id": 3,
//     "url": "https://images.unsplash.com/photo-1500603720222-eb7a1f997356?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80"
//   },
//   {
//     "product_id": 1,
//     "question_id": 1,
//     "question_body": "What fabric is the top made of?",
//     "question_date": "1595884714409",
//     "asker_name": "yankeelover",
//     "question_helpfulness": 1,
//     "question_reported": 0,
//     "answer_id": 7,
//     "answer_body": "Its the best! Seriously magic fabric",
//     "answer_date": "1614451524662",
//     "answerer_name": "metslover",
//     "answer_helpfulness": 7,
//     "photo_id": null,
//     "url": null
//   },
//   {
//     "product_id": 1,
//     "question_id": 1,
//     "question_body": "What fabric is the top made of?",
//     "question_date": "1595884714409",
//     "asker_name": "yankeelover",
//     "question_helpfulness": 1,
//     "question_reported": 0,
//     "answer_id": 8,
//     "answer_body": "DONT BUY IT! It's bad for the environment",
//     "answer_date": "1600552162548",
//     "answerer_name": "metslover",
//     "answer_helpfulness": 8,
//     "photo_id": null,
//     "url": null
//   }
// ]
const qcache = {};
const acache = {};

module.exports = {
  getQuestions: (req, res) => {
    if (qcache[req.query.product_id]) {
      res.statusCode = 200;
      res.send(qcache[req.query.product_id]);
    } else {
      let page = req.query.page || 1;
      let count = req.query.count || 5;
      db.query(`SELECT questions.product_id, questions.id as question_id, questions.body as question_body, questions.date_written as question_date, questions.asker_name, questions.helpful as question_helpfulness, CAST(questions.reported as INT) as question_reported, answers.id as answer_id, answers.body as answer_body, answers.date_written as answer_date, answers.answerer_name, answers.helpful as answer_helpfulness, photos.id as photo_id, photos.url FROM questions LEFT JOIN answers ON answers.question_id = questions.id LEFT JOIN photos ON photos.answer_id = answers.id WHERE questions.product_id = ${req.query.product_id}`, (err, data) => {
        if (err) {
          console.log(err);
          res.end();
        } else {
          if (data.rows.length <= 0) {
            res.statusCode = 200;
            res.send([]);
          } else {
            let questions ={product_id: data.rows[0].product_id, results: []};
            for (let question of data.rows) {
              if (compareQuestionId(questions.results, question)) {
                let quObject = {};
                quObject.question_id = question.question_id;
                quObject.question_body = question.question_body;
                quObject.question_date = question.question_date;
                quObject.asker_name = question.asker_name;
                quObject.question_helpfulness = question.question_helpfulness;
                if (question.question_reported === 0) {
                  quObject.reported = false;
                } else {
                  quObject.reported = true;
                }
                quObject.answers = {};
                for (let answer of data.rows) {
                  if (answer.question_id === question.question_id) {
                    if (compareAnswerId(quObject.answers, answer)) {
                      let anObject = {};
                      anObject.id = answer.answer_id;
                      anObject.body = answer.answer_body;
                      anObject.date = answer.answer_date;
                      anObject.answerer_name = answer.answerer_name;
                      anObject.helpfulness = answer.answer_helpfulness;
                      anObject.photos = [];
                      for (let photo of data.rows) {
                        if (photo.answer_id === answer.answer_id) {
                          if (comparePhotoId(anObject.photos, photo)) {
                            if (photo.photo_id !== null) {
                              let phObject = {};
                              phObject.id = photo.photo_id;
                              phObject.url = photo.url;
                              anObject.photos.push(phObject);
                            }
                          }
                        }
                      }
                      quObject.answers[answer.answer_id] = anObject;
                    }
                  }
                }
                questions.results.push(quObject);
              }
              if (questions.results.length >= page * count) { break; }
            }
            qcache[questions.product_id] = questions;
            res.statusCode = 200;
            res.send(questions);
          }
        }
      });
    }
  },

  getAnswers: (req, res) => {
    if (acache[req.params.question_id]) {
      res.statusCode = 200;
      res.send(acache[req.params.question_id]);
    } else {
      let page = req.query.page || 1;
      let count = req.query.count || 5;
      db.query(`SELECT answers.question_id, answers.id as answer_id, answers.body as answer_body, answers.date_written as answer_date, answers.answerer_name, answers.helpful as answer_helpfulness, photos.id as photo_id, photos.url FROM answers LEFT JOIN photos ON photos.answer_id = answers.id WHERE answers.question_id = ${req.params.question_id} `, (err, data) => {
        if (err) {
          console.log(err);
          res.end();
        } else {
          if (data.rows.length <= 0) {
            res.statusCode = 200;
            res.send([]);
          } else {
            let answers ={question_id: data.rows[0].question_id, page: page, count: count, results: []};
            for (let answer of data.rows) {
              if (compareAnswersId(answers.results, answer)) {
                let anObject = {};
                anObject.answer_id = answer.answer_id;
                anObject.body = answer.answer_body;
                anObject.date = answer.answer_date;
                anObject.answerer_name = answer.answerer_name;
                anObject.helpfulness = answer.answer_helpfulness;
                anObject.photos = [];
                for (let photo of data.rows) {
                  if (photo.answer_id === answer.answer_id) {
                    if (comparePhotoId(anObject.photos, photo)) {
                      if (photo.photo_id !== null) {
                        let phObject = {};
                        phObject.id = photo.photo_id;
                        phObject.url = photo.url;
                        anObject.photos.push(phObject);
                      }
                    }
                  }
                }
                answers.results.push(anObject);
                if (answers.results.length >= page * count) { break; }
              }
            }
            acache[answers.question_id] = answers;
            res.statusCode = 200;
            res.send(answers);
          }
        }
      });
    }
  }
};

const compareQuestionId = (array, obj) => {
  for (let item of array) {
    if (item.question_id === obj.question_id) { return false; }
  }
  return true;
};

const compareAnswerId = (answerObj, obj) => {
  if (Object.keys(answerObj).includes(obj.answer_id)) {
    return false;
  } else {
    return true;
  }
};

const compareAnswersId = (array, obj) => {
  for (let item of array) {
    if (item.id === obj.answer_id) { return false; }
  }
  return true;
};

const comparePhotoId = (array, obj) => {
  for (let item of array) {
    if (item.id === obj.photo_id) { return false; }
  }
  return true;
};