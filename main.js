const {app, BrowserWindow, Menu} = require('electron')
  const path = require('path') // open file
  const url = require('url') // open file
  const shell = require('electron').shell // To open a browser window

  // Electron IPC (Inter-Process Communication), which sends JSON data between two different processes: main and renderer.
  const ipc = require('electron').ipcMain;
  
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let win
  
  function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({width: 800, height: 600})
  
    // and load the index.html of the app.
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'src/index.html'),
      protocol: 'file:',
      slashes: true
    }))
  
    // Open the DevTools.
   // win.webContents.openDevTools()
  
    // Emitted when the window is closed.
    win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      win = null
    })
  }
  
  // which is where our menu is actually defined and built, within a series of arrays and objects.
  var menu = Menu.buildFromTemplate([
    {
        label: 'Menu',
        submenu: [
            {label:'Adjust Notification Value'},
            {label:'CoinMarketCap', 
                click() {shell.openExternal('https://coinmarketcap.com')}, 
                accelerator: 'CmdOrCtrl+Shift+C'},
            {type:'separator'},  // Add this
            {label:'Exit', 
            click() {app.quit()}}
        ]
    },  
    {
        label: 'Info'
    }

  ])

  // Finally, use .setApplicationMenu to set the menu.
  Menu.setApplicationMenu(menu);

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow)
  
  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow()
    }
  })

  /* the ipc.on() method to specify the name of a message that will be sent from our add.html window, 
  and once received, we reference win, which is bound to our index.html window, and .webContents.send() 
  to send the transmitted value from add.html. We're calling it targetPriceVal and the value is the arg. 
  */
  ipc.on('update-notify-value', function (event, arg) {
    win.webContents.send('targetPriceVal', arg)
  })