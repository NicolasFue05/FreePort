const net = require('node:net')

function freePort (port) {
  return new Promise((resolve, reject) => {
    const server = net.createServer()

    server.once('error', (e) => {
      if (e.code === 'EADDRINUSE') {
        reject(new Error(`Port ${port} is already in use!`))
      } else {
        reject(new Error(`An error occurred: ${e.message}`))
      }
    })

    server.once('listening', () => {
      server.close(() => {
        resolve(`Port ${port} is free!`)
      })
    })

    // Attempt to listen on the port
    server.listen(port)
  })
}

module.exports = { freePort }
