const router = require('express').Router();
const isLoggedIn = require('../middleware/isLoggedIn')
let db = require('../models')

// GET /profile
router.get('/',isLoggedIn , (req, res) => {
  db.stock.findAll({
    where: {userId: req.user.id}
})
.then(stocks => {
  res.render('profile/index', { stocks })
})
});

// GET /profile/admin
router.get('/admin', (req, res) => {
  res.render('profile/admin');
});

module.exports = router;
