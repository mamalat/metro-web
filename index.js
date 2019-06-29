// true: is for curremt env from NODE_ENV
require('custom-env').env(true)

const express = require('express')
const spdy = require('spdy')
const path = require('path')
const compression = require('compression')
const http = require('http')
const fs = require('fs')
const options = {}

if (process.env.NODE_ENV === 'production') {
	options.key = fs.readFileSync(__dirname + '/cert/privkey1.pem')
	options.cert = fs.readFileSync(__dirname + '/cert/cert1.pem')
}

const app = express()
const redirectApp = express()
const publicFolder = path.resolve(__dirname, 'build')

app.use(compression())
app.use(express.static(publicFolder))

app.use((req, res) => {
	res.sendFile('index.html', { root: publicFolder })
})

redirectApp.get('*', (req, res) => {
	res.redirect('https://' + req.headers.host + req.url)
})

// Create an HTTP service.
http.createServer(redirectApp).listen(5000, () => {
	console.log('http: listening on 5000')
})

// Create an HTTPS service identical to the HTTP service.
if (process.env.NODE_ENV === 'production') {
	spdy.createServer(options, app).listen(5443, () => {
		console.log('https: listening on 5443')
	})
}