// var dateCh = document.getElementById('Date')

// var closeCh = document.getElementById('Close')






window.onload = function () {
    var symbolCh = document.getElementById('Symbol').innerHTML
    var x = '';
console.log(symbolCh)
    fetch('/search')
        .then(r => r.json())
        .then(function (ticks) {
            console.log('tickssssss', ticks.close)
            var x = parseFloat(ticks.close)
            var t7 = ticks.close7
            var t14 = ticks.close14
            var t21 = ticks.close21
            var t28 = ticks.close28
            console.log(x)
            // x = ticks
            var ctx = document.getElementById("canvas").getContext("2d");
    var myNewChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
            datasets: [{
                label: symbolCh,
                data: [x, t7, t14, t21, t28],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
    console.log('chart dataaa', myNewChart.data[0])
            // var closeCh = apiResponse.data['Time Series (Daily)']['4. close']
            // var dateCh = apiResponse.data['Time Series (Daily)']
        })
        .catch(err => {
            console.log('ERROR', err);
        });
    
}

// Any of the following formats may be used
// var ctx = document.getElementById('myChart');
// var ctx = document.getElementById('myChart').getContext('2d');

// var ctx = document.getElementById('myChart');
//  var myNewChart = {
//     type: 'bar',
//     data: ,
//     options: {
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         }
//     }
// };