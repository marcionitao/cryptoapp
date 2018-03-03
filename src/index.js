const electron = require('electron')
const path = require('path')
// notification in Desktop show
const notifier = require('node-notifier');
// which is an HTTP client that will allow us to request information from a free cryptocurrency service
const axios = require('axios');
const BrowserWindow = electron.remote.BrowserWindow; // launch a new window in our Electron app.

const ipc = electron.ipcRenderer;

// to listen for click events on the notify button
const notifyBtn = document.getElementById('notifyBtn') 
// a variable to give us access to the h1 element, where the price of BTC will be displayed.
var targetPriceVal;
var price = document.querySelector('h1')
var targetPrice = document.getElementById('targetPrice')

//Inside of getBTC(), we're using the axios .get() method to specify an address of a free public API for CryptoCurrency data called CryptoCompare.
function getBTC() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=EUR')
    .then(res => {
        const cryptos = res.data.BTC.EUR
        price.innerHTML = '€ '+cryptos.toLocaleString('de')

        if (targetPrice.innerHTML != '' && cryptos <= targetPriceVal) {

            notifier.notify({
                title: 'BTC Alert',
                message: 'BTC just beat your target price!',
                icon: path.join(__dirname, '../assets/images/btc.png'),
                sound: true,
                wait: true
            })

        }
    })
}

getBTC();
setInterval ( getBTC, 10000 ); // This will call it initially, and then every 30 seconds!

notifyBtn.addEventListener('click', function (event) {
    // defining the file location of add.html.
    const modalPath = path.join('file://', __dirname, 'add.html')
    // new instance of BrowserWindow win, and defining the width and height.
    let win = new BrowserWindow({ 
        frame: false, 
        transparent: true,  
        alwaysOnTop: true, 
        width: 400, 
        height: 200 })

    win.on('close', function () { win = null })

    // load the path of add.html and then .show() it.
    win.loadURL(modalPath)
    win.show()
})

ipc.on('targetPriceVal', function (event, arg) {
    targetPriceVal = Number(arg);
    targetPrice.innerHTML = '€ '+targetPriceVal.toLocaleString('en')
})
