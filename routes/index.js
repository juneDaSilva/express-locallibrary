var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('/catalog');
});

// router.post('/users', (req, res) => {
//   console.log(req.body);
// });

module.exports = router;
