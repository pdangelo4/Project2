xd();

function xd () {
    // var symbolCh = document.getElementById('Symbol').innerHTML
    var x = '';
    // console.log(symbolCh)
    fetch('/search')
        .then(r => r.json())
        .then(function (ticks) {
            console.log('tickssssss', ticks)
            var x = parseFloat(ticks.close)
            var y = ticks
            console.log('yyyyyyyyyy', y)

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
  


            console.log('ticks today', ticks)
            // x = ticks

        .catch(err => {
            console.log('ERROR', err);
        });

})

}

