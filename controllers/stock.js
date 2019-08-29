let router = require('express').Router()
let db = require('../models')
let axios = require('axios');



// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
    console.log(req.body.symbol)
    console.log('userId', req.user.id)
    console.log('open', req.body.open)
    console.log('close', req.body.close)
    console.log('volume', req.body.volume)
    console.log('date', req.body.date)
    // // TODO: Get form data and add a new record to DB
    // //res.send(req.body);
    db.stock.findOrCreate({ //db.stock reads model name
        where: {
            symbol: req.body.symbol,
            userId: req.user.id,
            open: req.body.open,
            close: req.body.close,
            volume: req.body.volume,
            date: req.body.date
        }
    })
    .then(createdFav => {
      res.redirect('./profile')
    })
    .catch(err => {
      console.log(err)
      res.send('Uh oh sorry')
    })
  });

  router.delete('/:idx', (req, res) => {
      console.log('hello worlds', req.params.idx)
  db.stock.destroy({
    where: {
      symbol: req.params.idx,
      userId: req.user.id
    }
  })
  .then(createdFav => {
    res.redirect('/profile')
  })
})

  router.get('/', (req, res) => {
      console.log('kick off favorites lookup!')
    db.stock.findAll({
        where: {userId: req.user.id}
    })
    .then(stocks => {
        res.render('stock/show', { stocks })
    })
    .catch(err => {
        console.log('Oops', err)
        res.send('Something bad happened!')

    })
})


router.get('/:id', (req, res) => {
    if (parseInt(req.params.id)) {
        db.stock.findByPk(req.params.id)
            .then(foundStock => {
                let stockUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=' + foundStock + '&apikey=' + process.env.apikey
                console.log('stockUrl : ', stockUrl)
                axios.get(stockUrl)
                    .then(function (apiResponse) {
                        var stock = apiResponse.data.results;
                        console.log('stock specs: ', stock)
                        res.render('stock/show', { ticker: foundStock, stock: stock })
                    })
            })
            .catch(err => {
                console.log('Oops', err)
                res.send('Somethingbad happened!')
            })

    } else {
        res.send('A catch error has occurred')
    }
})


module.exports = router