const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const BrowserView = electron.BrowserView
let win
let view
function createWindow() {

	win = new BrowserWindow({width: 800, heitht: 600})

	win.on('closed', () => {
		win = null	
	})

	view = new BrowserView({
		webPreferences: {
			nodeIntegreation: false
		}
	})
	win.setBrowserView(view)
	win.setBounds({x: 0, y: 0, width: 300, height: 300})
	view.webContents.loadURL('https://electron.atom.io')
}

app.on('ready',createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if(win === null) {
		createWindow()
	}
})
