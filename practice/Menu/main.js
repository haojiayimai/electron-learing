const {app, Menu, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let win
function createWindow() {
	win = new BrowserWindow({
		'autoHideMenuBar': true,
		kiosk: true
	})
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file',
		slashes: true
	}))
	win.setFullScreen(true)
	win.on('closed', () => {
		win = null
	})
	const template = [
		{
			label: 'Edit',
			submenu: [
				{role: 'undo'},
				{role: 'redo'},
				{type: 'separator'},
				{role: 'cut'},
				{role: 'copy'},
				{role: 'paste'},
				{role: 'pasteandmatchstyle'},
				{role: 'delete'},
				{role: 'selectall'}
			]
		},
		{
			label: 'View',
			submenu: [
				{role: 'reload'},
				{role: 'forcereload'},
				{role: 'toggledevtools'},
				{type: 'separator'},
				{role: 'resetzoom'},
				{role: 'zoomin'},
				{role: 'zoomout'},
				{type: 'separator'},
				{role: 'togglefullscreen'}
			]
		},
		{
			role: 'window',
			submenu: [
				{role: 'minimize'},
				{role: 'close'}
			]
		},
		{
			role: 'help',
			submenu: [
				{
					label: 'Learn More',
					click() {require('electron').shell.openExternal('http://electron.atom.io')}
				}
			]
		},
		{
			label: '&File',
			submenu: [
				{
					label: '&Close',
					accelerator: 'F4',
					click: function(){
						win.close()
					}
				}
			]
		}
	]
	
	if(process.platform === 'darwin') {
		template.unshift( {
			label: app.getName(),
			submenu: [
				{role: 'about'},
				{type: 'separator'},
				{role: 'services', submenu:[]},
				{type: 'separator'},
				{role: 'hide'},
				{role: 'hideothers'},
				{role: 'unhide'},
				{type: 'separator'},
				{role: 'quit'}
			]
		})
	
		//Edit menu
		template[1].submenu.push(
			{type: 'separator'},
			{
				label: 'Speech',
				submenu: [
					{role: 'startspeaking'},
					{role: 'stopspeaking'}
				]
			}
		)
	
		//Window menu
		template[3].submenu = [
			{role: 'close'},
			{role: 'minimize'},
			{role: 'zoom'},
			{type: 'separator'},
			{role: 'front'}
		]
	}
	
	const menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu)
	//win.setMenu(menu)
}	
app.on('ready', createWindow)
app.on('window-all-closed', () =>{
	if(process.platform !== 'darwin') {
		app.quit()
	}
})
app.on('activate', () => {
	if(win === null){
		createWindow()
	}
})


