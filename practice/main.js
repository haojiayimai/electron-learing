const electron = require('electron')
//const {app, BrowserWindow} = require('electron')
const app = electron.app

const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')


//保持对与一个window对象的全局引用，否则当Javascript对象被垃圾回收，window会被自动关闭
let win

function createWindow () {
	//创建浏览器窗口
	win = new BrowserWindow({width:800,height: 600})

	//然后加载应用的index.html
	win.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file',
		slashes: true
	}))

	//打开开发者工具
	//win.webContents.openDevTools()

	//当window被关闭，这个事件会被触发
	win.on('closed',function () {
		//取消引用window对象，如果你的应用支持多窗口的话
		//通常会把多个window对象存放在一个数组里面
		//与此同时，你应该删除相应的元素
		win = null
	})
}

//Electron会在初始化并准备创建浏览器窗口时，调用这个函数
//部分API在ready事件触发后才能使用
//
app.on('ready', createWindow)


app.on('window-all-closed',function () {
	//在MacOS上，除非用户用Cmd+Q确定地退出，否则绝大部分应用及其菜单栏会保持激活
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function() {
	//在macOS上，当单击dock图标并且没有其他窗口打开时
	//通常会在应用程序中重新创建一个窗口
	if(win === null) {
		createWindow()
	}
})

//在这文件可以续写应用剩下主进程代码，也可以拆分成几个文件，然后用require导入
