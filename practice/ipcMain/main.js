//ipcMain 模块、ipcRenderer模块都是EventEmitter的一个实例
//ipcMain会处理来自于Renderer Process的异步消息和同步消息
//Renderer Process发来的消息会被提交到这个模块
//
//ipcRenderer可以发送以同步或者异步的方式从渲染进程到主进程发送消息，也可以利用它从主进程接收消息
//
//ipcMain和ipcRenderer进程都利用.on(eventName,(event,arg) => {}）方法响应事件
//
//ipcRender进程利用.send(eventName, msgObj)将消息发送给ipcMain进程
//可以使用event.sender.send(...)异步的把消息回发给发送人
//
//


const path = require('path')
const {app,BrowserWindow,ipcMain} = require('electron')
const url = require('url')

ipcMain.on('asynchronous-message', (event, arg) => {
	console.log(arg) //prints 'ping'
	event.sender.send('asynchronous-reply', 'pong')
})

const INDEX_HTML_PATH = path.join(__dirname, 'index.html')
let win

app.on('ready', function() {
	win = new BrowserWindow({width: 800, height: 600})
	win.openDevTools()
//	win.loadURL('file://${INDEX_HTML_PATH}')
	win.loadURL(url.format({
		pathname: INDEX_HTML_PATH,
		protocol: 'file',
		slashes: true
	}))
	win.on('closed', () => {
		win = null
	})
})

app.on('window-all-closed', function() {
	app.quit()
})

//ipcMain.on('synchronous-message', (event, arg) => {
//	console.log(arg)
//	event.returnValue = 'pong'
//})
