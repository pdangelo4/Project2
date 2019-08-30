let router = require('express').Router()
let db = require('../models')
let axios = require('axios');
var async = require('async');


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

// router.get('/', function (req, res) {
//     db.stock.findAll({ where: { userId: req.user.id } })
//         .then(function (e) {
//             // async.each(e, function(elem, callback) {
//             //     async.parallel([ function(cb){
//             var sym = e[cb].symbol;
//             console.log('symmmmmmm', sym)

//             // console.log('symbollllllll', symbolCh)
//             // let ticker = 'MSFT'
//             let stockUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${sym}&apikey=${process.env.apikey}`

//             axios.get(stockUrl).then(function (apiResponse) {
//                 var stocks = apiResponse.data['Time Series (Daily)'];

//                 var today = new Date();
//                 var dd = today.getDate();


//                 var mm = today.getMonth() + 1;

//                 var yyyy = today.getFullYear();
//                 if (dd < 10) {
//                     dd = '0' + dd;
//                 }
//                 if (mm < 10) {
//                     mm = '0' + mm;
//                 }
//                 var today = yyyy + '-' + mm + '-' + dd;
//                 var t = new Date(today);
//                 t.setDate(t.getDate() - 7);
//                 let t7 = (t.toISOString().slice(0, 10));
//                 var d = new Date(today);
//                 d.setDate(d.getDate() - 14);
//                 let t14 = (d.toISOString().slice(0, 10));
//                 var x = new Date(today);
//                 x.setDate(x.getDate() - 21);
//                 let t21 = (x.toISOString().slice(0, 10));
//                 var f = new Date(today);
//                 f.setDate(f.getDate() - 28);
//                 let t28 = (f.toISOString().slice(0, 10));

//                 // t = today.toDateString();
//                 console.log(typeof today)
//                 console.log(typeof t)
//                 // console.log('todayyyyyyyyy', today.toDateString())



//                 stock = apiResponse.data
//                 // console.log(stock)
//                 // var ticker = stock['Meta Data']['2. Symbol']
//                 // var Date = today
//                 var close = stock['Time Series (Daily)'][today]['4. close']
//                 var close7 = stock['Time Series (Daily)'][t7]['4. close']
//                 var close14 = stock['Time Series (Daily)'][t14]['4. close']
//                 var close21 = stock['Time Series (Daily)'][t21]['4. close']
//                 var close28 = stock['Time Series (Daily)'][t28]['4. close']
//                 console.log('closeeeeeee', close)
//                 //res.send(apiResponse.data['Time Series (Daily)'][today])
//             // }], callback)
//             // })
//                 res.send({
//                     close,
//                     close7,
//                     close14,
//                     close21,
//                     close28
//                 });
            
//             })
//         })
// });

router.get('/', function (req, res) {
    db.stock.findAll({ where: { userId: 1 } })

    .then(function (e) {
        sym = e.symbol
        var urls = []

        for (i = 0; i < e.length; i++) {
            urls.push('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=')
        }


        count = 0
        endURL = '&apikey=LHSU6LGYCFQB71HD'

        var something = urls.map((url, idx) => {
            return function (callback) {
                console.log('idxxxxx', e[idx].dataValues.symbol);
                axios.get(url + e[idx].dataValues.symbol + endURL)
                
                    .then((response) => {
                        callback(null, response);
                        // console.log(url + sym[count] + endURL);
                        count++
                    })
            }
        })

        console.log('SOMETHING', something)
   



    async.parallel(something, function (err, results) {
        //   console.log('asdfasdf',results['0'].data['Time Series (Daily)'])
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
        t.setDate(t.getDate() - 7);
        let t7 = (t.toISOString().slice(0, 10));
        var d = new Date(today);
        d.setDate(d.getDate() - 14);
        let t14 = (d.toISOString().slice(0, 10));
        var x = new Date(today);
        x.setDate(x.getDate() - 21);
        let t21 = (x.toISOString().slice(0, 10));
        var f = new Date(today);
        f.setDate(f.getDate() - 28);
        let t28 = (f.toISOString().slice(0, 10));




          Object.keys(results).forEach(k => { 
              console.log('FAVORITE:', k)
              console.log(results[k].data['Meta Data']['2. Symbol'])
              console.log(results[k].data['Time Series (Daily)'][today]['4. close'])
              console.log(results[k].data['Time Series (Daily)'][t7]['4. close'])
              console.log(results[k].data['Time Series (Daily)'][t14]['4. close'])
              console.log(results[k].data['Time Series (Daily)'][t21]['4. close'])
              console.log(results[k].data['Time Series (Daily)'][t28]['4. close'])
          })
    });
})

});


module.exports = router

