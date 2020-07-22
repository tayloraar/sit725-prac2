const express = require('express');

var app = express();

//I've added this here to just play around and get confident with calling a function in the script using "GET somehwere else.
function rollTheDice(min, max) {  
    return Math.floor(Math.random() * (max - min) + min);
 
}  

//load the index.html under the directory public. This one was new to me.
app.use(express.static(__dirname +'/public'));

//I wanted to play around with nesting fucntions inside 'get' and adding some different layers.
app.get('/D20', function(request,response){
    let roll = rollTheDice(1,20);
    if(roll == 20){
        console.log(`NAT20! Critical Hit!`);
    }else if (roll == 1){
        console.log(`Oh no! Critical Fail. Time to roll a new character`);
    } else {
        console.log(`The D20 roll was ${roll}`);
    };
    
});

//start the server on port 3000
app.listen(3000);

//respond with "hello world when a GET request is made to the homepage" - I've left this in from todays online practical.
// app.get('/',function(request,response){
//      response.send('Hello Worlds')
//})