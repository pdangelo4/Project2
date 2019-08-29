let router = require('express').Router()
let db = require('../models')
let axios = require('axios');


router.post('/', function (req, res) {
    // let ticker = 'MSFT'
    let stockUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${req.body.ticker}&apikey=${process.env.apikey}`

    axios.get(stockUrl).then(function (apiResponse) {
        var stocks = apiResponse.data['Time Series (Daily)'];

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;

        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var today = yyyy + '-' + mm + '-' + dd;
        console.log('todayyyyyyyyy', today)
        stock = apiResponse.data
        // console.log(stock)
        var ticker = stock['Meta Data']['2. Symbol']
        // var Date = today
        var open = stock['Time Series (Daily)'][today]['1. open']
        var close = stock['Time Series (Daily)'][today]['4. close']
        var volume = stock['Time Series (Daily)'][today]['6. volume']

        //res.send(apiResponse.data['Time Series (Daily)'][today])
        res.render('stock/index', {
            ticker: ticker,
            date: today,
            open: open,
            close, close,
            volume: volume
        });
    })
});

router.get('/', function (req, res) {
    db.stock.findAll({ where: { userId: req.user.id } })
        .then(function (e) {
            var sym = e[0].symbol;
            console.log('symmmmmmm', sym)

            // console.log('symbollllllll', symbolCh)
            // let ticker = 'MSFT'
            let stockUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${sym}&apikey=${process.env.apikey}`

            axios.get(stockUrl).then(function (apiResponse) {
                var stocks = apiResponse.data['Time Series (Daily)'];

                var today = new Date();
                var dd = today.getDate();
                

                var mm = today.getMonth() + 1;

                var yyyy = today.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (mm < 10) {
                    mm = '0' + mm;
                }
                var today = yyyy + '-' + mm + '-' + dd;
                var t = new Date(today);
                t.setDate(t.getDate() - 35).slice(0,10);
                console.log(t)
                // t = today.toDateString();
                console.log(typeof today)
                console.log(typeof t)
                // console.log('todayyyyyyyyy', today.toDateString())
                
               

                stock = apiResponse.data
                // console.log(stock)
                // var ticker = stock['Meta Data']['2. Symbol']
                // var Date = today
                var close = stock['Time Series (Daily)'][today]['4. close']
                console.log('closeeeeeee', close)
                //res.send(apiResponse.data['Time Series (Daily)'][today])
                res.send({
                    close
                });
            })
        })
});



module.exports = router