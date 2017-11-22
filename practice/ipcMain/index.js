const {ipcRenderer} = require('electron')

//console.log(ipcRenderer.sendSync('synchronous-message', 'ping'))

ipcRenderer.on('asynchronous-reply', (event, arg) => {
	console.log(arg) //print "pong"
})

ipcRenderer.send('asynchronous-message', 'ping')
