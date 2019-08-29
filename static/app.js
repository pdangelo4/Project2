document.getElementById('input').addEventListener('keydown', tickSearch);
console.log('app.js stuff'+document)

function tickSearch(e) {
    console.log('pressed button', e.key)
    var textBoxValue = document.getElementById('input').value + e.key;
    console.log('text box value', textBoxValue)

    if (textBoxValue) {
        fetch(`https://ticker-2e1ica8b9.now.sh/keyword/${textBoxValue}`)
        .then(r => r.json())
        .then(function(ticks) {
            console.log('SUCCESS', ticks)
            let sel = document.getElementById('list');
            sel.innerHTML = '';
            ticks.forEach(t => {
                let opt = document.createElement('option');
                opt.value = t.symbol;
                opt.text = t.name;
                sel.appendChild(opt);
            });
        })
        .catch(err => {
            console.log('ERROR', err);
        });
    }
}