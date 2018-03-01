const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow // launch a new window in our Electron app.

// to listen for click events on the notify button
const notifyBtn = document.getElementById('notifyBtn') 

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
