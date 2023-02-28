// console.log('Hello World!')

// app = managed Lebenszyklus der Anwendung
const { app, BrowserWindow, Menu, shell, MenuItem, ipcMain, dialog } = require('electron')
const remote = require('@electron/remote/main')
remote.initialize()

function isMac() {
    return process.platform === 'darwin'
}

function createApplicationMenu() {
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

function createContextMenu(win) {
    const kmenu = new Menu()
    kmenu.append(new MenuItem({
        label: 'Klick',
        click() {
            console.log("Kontextmenu geklickt")
        }
    }))

    kmenu.append(new MenuItem({
        label: 'Alles auswählen',
        role: 'selectAll'
    }))

    win.webContents.on('context-menu', function(e, params) {
        kmenu.popup(win, params.x, params.y)
    })
}

function createWindow() {
    const win = new BrowserWindow({
        icon: 'assets/icons/icon.png',
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,   // macht nodejs-Module im FE nutzbar
            contextIsolation: false,
        }
    })

    remote.enable(win.webContents)

    win.loadFile('src/index.html')

    // create menu
    createApplicationMenu()
    createContextMenu(win)

    // const winX = new BrowserWindow({ show: false, modal: true, width: 1000, height: 700, parent: win })
    // winX.loadURL('https://birta.online')
    // winX.once('ready-to-show', () => {
    //     winX.show()
    // })

    win.webContents.openDevTools()

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

ipcMain.on('nachricht1', event => {
    dialog.showErrorBox('IPC Error', 'Bad things happended...')
    event.sender.send('nachricht2', 'Nachricht ist angekommen :)')
})

ipcMain.on('sync-nachricht', (event) => {
    dialog.showErrorBox('SYNC IPC ERROR', 'Ooops, i did it again...')
    event.returnValue = 'Synchrone Antwort :)'
})