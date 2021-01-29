const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
// const httpProxy = require('http-proxy')

const app = express()

// app.use(app.router)

// here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')))

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
  // res.setHeader('Last-Modified', (new Date()).toUTCString())
  // next()
})

// app.disable('etag')

const port = process.env.PORT || 8080
// app.listen(port)

console.log(`app is listening on port: ${port}`)
