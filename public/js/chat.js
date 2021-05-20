const socket = io()
 
// socket.on('countUpdated',(count)=>{
//     console.log('count has been updated', count)
// })

// document.querySelector('#increment').addEventListener('click',()=>{
//         console.log('clicked on button')

//         socket.emit('incremented')
// })

socket.on('Msg', (message)=>{
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = e.target.elements.message.value
    socket.emit('sendMessage', message , ()=>{
        console.log('message was delivered')
    })

})
 document.querySelector('#send-location').addEventListener('click',()=>{
     if(!navigator.geolocation){
         return alert('Geolocation is not supported by your browser.')
     }

     navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position)
        socket.emit('sendLocation',{
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
        })
     })
 })


