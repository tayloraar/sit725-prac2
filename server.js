/*
Practical 2 exercises for SIT725 by Aaron Taylor
I've added comments throughout this script to explain my thought process as I was doing. 

Task 1 - Git connection and form - completed
*/

//Task 2 - Web Server
const express = require('express');
var app = express();

var port = 3000;
app.listen(port);
console.log(`Server listening on: ${ port }`);

// Task 2 - Sub Task 1: load the index.html under the directory public. This one was new to me.
app.use(express.static(__dirname +'/public'));

//Task 2 - Sub Task 2
var adder = function(num1,num2){
    var result = num1 + num2;
    return result;
}

app.get('/add', function(addReq,addRes){
    var num1 = parseInt(addReq.query.num1);
    var num2 = parseInt(addReq.query.num2);
    var result= adder(num1,num2);
    addRes.send(`The answer is: ${ result }`);
})

//Task 3 - Credit Task
//Create a GET en point that retrieves data stored into an array.

//Provided Array
let accounts=[
    { id:1, name:'alex', deposit:5 },
    { id:2, name:'sarah', deposit:5 },
    { id:3, name:'jim', deposit:15 } 
]

//Pull the allocated id from the array and display as a string
app.get('/dep',function(depReq,depRes){
    let idPull = parseInt(depReq.query.id) - 1;
    depRes.send(`User ID: ${ accounts[idPull].id }, User Name: ${ accounts[idPull].name }, Deposit: ${ accounts[idPull].deposit }`);    
});


/*
HD Task - Linked Lists
Recreate Task 3 but with a Linked List instead. 
Also add comments as to why I would use a Linked List instead of an array?
 
For several reasons, mostly related to the use case of the software we are creating. 
For example, if the if we are unsure of the quantity of data to be stored, then Linked List will provide the flexibility without overuse of memory. 
As link the size of an array is fixed, whereas Linked Lists are dynamic an flexible, allowing them to expand and contact in size as needed during runtime. 
Memory management goes beyond just the Dynamic v’s Static memory allocation. 
Linked lists use the first free available memory location and can thus be stored anywhere in memory rather than a consecutive way as with an array. 
The drawback of a Linked Lists sequential access, that takes linear time would need to be weighed up against the speed of insertion and deletion of nodes. 
In this respect Linked Lists are the antithesis of Arrays, that are quick to access but insertion and deletion of elements take more time. 
In conclusion, the choice to use an array or a linked list would come down to the needs of the program and the hardware that is running it to ensure the 
highest quality user experience and data fidelity.
*/

//Created my node
class LinkedListNode {
    constructor(id,name,deposit){
        this.id = id;
        this.name = name;
        this.deposit = deposit;
        this.next = null;
    }
}

//Created my linked list with methods for accessing it (add and getAll)
class AccountList {
    constructor(){
        this.head = null;
    }
    //I used and add and 'giveAll' function within my code, as this was a static list I didn't include any others (like insert or delete)
    add(id,name,deposit){
        const newNode = new LinkedListNode(id,name,deposit);
        if (this.head === null){
            this.head = newNode;
        } else {
            let current = this.head;
            while(current.next !== null){
                current = current.next;
            }
            current.next = newNode;
        }
    }
    //This is my function to give all of the information about one node
    giveAll(index){
        if(index > -1){
            let current = this.head;
            let i = 0;
            while ((current !== null) && (i<index)){
                current = current.next;
                i++;
            }
            return current !==null ? `Customer ID: ${ current.id } Customer Name: ${ current.name } Deposit: ${ current.deposit }` : undefined;
        } else {
            return undefined;
        }
    }
}

//This is my specific nodes
const acc = new AccountList;
acc.add(1,'alex',5);
acc.add(2,'sarah',5);
acc.add(3,'jim',15);

app.get('/acclist', function(accReq,accRes){
    let hash = parseInt(accReq.query.hash)-1;
    accRes.send(acc.giveAll(hash));    
});

//I wanted to play around with nesting functions inside 'get' and adding some different layers. So I built a dice roller called D20.
//This was done very early on before I looked at the subtasks or the HD task. 
function rollTheDice(min, max) {  
    return Math.floor(Math.random() * (max - min) + min);
}  

app.get('/D20', function(d20Req,d20Res){
    let dice = parseInt(d20Req.query.dice);
    let roll = rollTheDice(1,dice);
    if(roll == 20){
        d20Res.send(`NAT20! Critical Hit!`);
    }else if (roll == 1){
        d20Res.send(`Oh no! Critical Fail. Time to roll a new character`);
    } else {
        d20Res.send((`The D20 roll was ${ roll }`)); 
    };
});
