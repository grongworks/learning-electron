// console.log('Hello World!')

// app = managed Lebenszyklus der Anwendung
const { app, BrowserWindow } = require('electron')

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,   // macht nodejs-Module im FE nutzbar
            contextIsolation: false,
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {     // sind keine Fenster mehr offen -> App beenden
    app.quit()
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})