const router = require('express').Router();
const getters = require('./controllers/getters.js');
const posters = require('./controllers/posters.js');
const putters = require('./controllers/putters.js');

router.get('/qa/questions', getters.getQuestions);
router.get('/qa/questions/:question_id/answers', getters.getAnswers);
router.post('/qa/questions', posters.postQuestion);
router.post('/qa/questions/:question_id/answers', posters.postAnswer);
router.put('/qa/questions/:question_id/helpful', putters.updateQuestionHelpful);
router.put('/qa/questions/:question_id/report', putters.updateQuestionReported);
router.put('/qa/answers/:answer_id/helpful', putters.updateAnswerHelpful);
router.put('/qa/answers/:answer_id/report', putters.updateAnswerReported);

module.exports = router;
