const electron = require('electron')
const path = require('path')
const remote = electron.remote // we can to use HTML properties

const ipc = electron.ipcRenderer // integrate the IPC Renderer process

const closeBtn = document.getElementById('closeBtn') // get button id

closeBtn.addEventListener('click', function (event) {
    var window = remote.getCurrentWindow();
    window.close();
})

const updateBtn = document.getElementById('updateBtn')

// Once the update button is clicked, we use ipc.send() to first set a name of the message, and then the value of the input.
updateBtn.addEventListener('click', function () {
    ipc.send('update-notify-value', document.getElementById('notifyVal').value)
  
    // Close this window
    var window = remote.getCurrentWindow();
    window.close();
})
