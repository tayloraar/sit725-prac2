const express = require('express');

var app = express()

//respond with "hello world when a GET request is made to the homepage"
app.get('/',function(request,response){
    response.send('Hello Worlds')
})
//cheese
//start the server on port 3000
app.listen(3000)