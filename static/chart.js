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
            console.log(x)
            // x = ticks
            var ctx = document.getElementById("canvas").getContext("2d");
    var myNewChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [x, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
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