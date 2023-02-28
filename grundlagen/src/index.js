const { app, BrowserWindow, ipcRenderer } = require('electron')

const winTwo = document.getElementById('fensterZwei')
winTwo.addEventListener('click', function (event) {
    const { BrowserWindow } = require('@electron/remote')
    const win2 = new BrowserWindow({ modal: true, width: 400, height: 400 })
    win2.loadFile('src/zwei.html')
})

const errWindow = document.getElementById('error')
errWindow.addEventListener('click', function (event) {
    ipcRenderer.send('nachricht1')
})

const errWindowSync = document.getElementById('errorSync')
errWindowSync.addEventListener('click', function (event) {
    console.log("STEP 1")
    const response = ipcRenderer.sendSync('sync-nachricht')
    console.log("SYNCHRON RESPONSE: ", response)
    console.log("STEP 2")
})

ipcRenderer.on('nachricht2', (event, args) => {
    console.log("received message: ", event, args)
})