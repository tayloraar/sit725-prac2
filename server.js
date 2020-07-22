//Practical 2 exercises for SIT725 by Aaron Taylor
//I've added comments throughout this script to explain my thought process as I was doing. 
//If possible, I've left all redundant code commented and moved it to the bottom of this script to show all work done on practical.
//Task 1 - Git connection and form - completed


//Task 2 - Web Server
const express = require('express');
var app = express();

var port = 3000
app.listen(port);
console.log(`Server listening on: ${port}`);

// Task 2 - Sub Task 1: load the index.html under the directory public. This one was new to me.
app.use(express.static(__dirname +'/public'));

//Task 2 - Sub Task 2
var adder = function(num1,num2){
    var result = num1+num2;
    return result;
}

app.get('/add', function(addReq,addRes){
    var num1 = parseInt(addReq.query.num1);
    var num2 = parseInt(addReq.query.num2);
    var result= adder(num1,num2);
    addRes.send(`The answer is: ${result}`);
})

//Task 3 - Credit Task
//Create a GET en point that retrieves data stored into an array.

//Provided Array
let accounts=[
    {id:1, name:'alex',deposit:5},
    {id:2, name:'sarah',deposit:5},
    {id:3, name:'jim',deposit:15}
]

//Pull the allocated id from the array and display as a string
app.get('/dep',function(depReq,depRes){
    let idPull = parseInt(depReq.query.id) - 1;
    depRes.send(`User ID: ${accounts[idPull].id}, User Name: ${accounts[idPull].name}, Deposit: ${accounts[idPull].deposit}`);    
});


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