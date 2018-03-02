const electron = require('electron')
const path = require('path')
const remote = electron.remote // we can to use HTML properties

const closeBtn = document.getElementById('closeBtn') // get button id

closeBtn.addEventListener('click', function (event) {
    var window = remote.getCurrentWindow();
    window.close();
})

// 35:31 pause tutorial 5 - Integrating an HTTP Library with Electron