// console.log('Hello World!')

// app = managed Lebenszyklus der Anwendung
const { app, BrowserWindow, Menu, shell } = require('electron')

function isMac() {
    return process.platform === 'darwin'
}

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

    const template = [
        {
            label: "Menüpunkt 1",
            submenu: [
                {
                    label: "Menüpunkt 1.1",
                    click: function () {
                        console.log('Hallo Klick')
                    }
                },
                {
                    label: "Doku aufrufen",
                    click() {
                        shell.openExternal("https://www.electronjs.org/docs")
                    }
                },
                {type: 'separator'},
                {
                    label: "Ende",
                    click() {
                        app.quit()
                    }
                }
            ]
        },
        {
            label: "Menüpunkt 2",
            submenu: [
                {
                    role: 'selectAll',
                    label: 'Alles auswählen'
                },
            ]
        }
    ]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

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