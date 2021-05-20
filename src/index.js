const http = require('http')
const path = require('path')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const port = process.env.PORT || 3000

const server = http.createServer(app)
const io = socketio(server)

const publicDirectoryPath = path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath))


io.on('connection',(socket)=>{
    console.log('new websocket connection')

    // socket.emit('countUpdated',count)

    // socket.on('incremented',()=>{
    //     count++;
    //     socket.emit('countUpdated',count)
    //     io.emit('countUpdated',count)
    // })

    // welcome msg when app open
    socket.emit('Msg','Wellcome!')
    // online
    socket.broadcast.emit('Msg', 'A new user joined');

    socket.on('sendMessage', (message , callback) => {
        io.emit('Msg', message)
        callback()
    })

    // socket.broadcast.to().emit('messgae', () => {

    // })

    socket.on('disconnect',()=>{
        io.emit('Msg','user has left')
    })

    socket.on('sendLocation',(coords)=>{
        io.emit('Msg', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    })
})

server.listen(port, () => console.log(`Example app listening on ${port} port!`))