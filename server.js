//Practical 2 exercises for SIT725 by Aaron Taylor
//I've added comments throughout this script to explain my thought process as I was doing. 
//If possible, I've left all redundant code commented and moved it to the bottom of this script to show all work done on practical.

const express = require('express');
var app = express();

//start the server on port 3000, added the extra flare from online video just for practice.
var port = 3000
app.listen(port);
console.log(`Server listening on: ${port}`);

//load the index.html under the directory public. This one was new to me.
app.use(express.static(__dirname +'/public'));


//I've added this here to just play around and get confident with calling a function in the script using 'get' somewhere else.
function rollTheDice(min, max) {  
    return Math.floor(Math.random() * (max - min) + min);
}  

//I wanted to play around with nesting functions inside 'get' and adding some different layers. So I built a dice roller called D20.
app.get('/D20', function(d20Req,d20Res){
    let dice = parseInt(d20Req.query.dice)
    let roll = rollTheDice(1,dice);
    if(roll == 20){
        //console.log(`NAT20! Critical Hit!`);
        d20Res.send(`NAT20! Critical Hit!`);
    }else if (roll == 1){
        //console.log(`Oh no! Critical Fail. Time to roll a new character`);
        d20Res.send(`Oh no! Critical Fail. Time to roll a new character`);
    } else {
        //console.log(`The D20 roll was ${roll}`);
        d20Res.send((`The D20 roll was ${roll}`)); 
    };
    
});


//respond with "hello world when a GET request is made to the homepage" - I've left this in from todays online practical.

// app.get('/',function(request,response){
//      response.send('Hello Worlds')
//})