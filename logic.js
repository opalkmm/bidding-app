
//creating prompt in terminal
var inquirer = require("inquirer");

//install mysql
var mysql = require("mysql");

//install table
var Table = require('easy-table');

//establish connection to the database
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mimithehamham",
  port: 3306,
  database: "biddingData",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

inquirer
  .prompt([
    {
      //first screening question to determine if the user should be sent to the post or bid screen
      type: "list",
      message: "What are you here for today?",
      name: "postOrBid",
      //array of possible choices
      choices: ["Post an item", new inquirer.Separator(), "Bid on an item"],
    },
  ])
  .then(answers => {
      var answers1 = JSON.stringify(answers.postOrBid);
    console.log('answers :' + answers1);
   
    if (answers.postOrBid == "Bid on an item") {
      console.log("these are the available items for bidding...");
      showBids();
    }
   
    //if answers === 'Post an item --> create input promt, add to biddingList
    //if answers === 'Bid an item --> show all items in the database in selection prompt
  })
  
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log(err.code);
    }
    // } else {
    //   // Something else when wrong
    // }
  });

//function to query all data available for bidding
function showBids() {
  connection.query("SELECT * FROM bids", function (err, res) {
    if (err) throw err;

// var data = JSON.stringify(res);
console.log(res);

// create table for the bidding list
var t = new Table
  for (var i = 0; i < res.length; i++) {
    // }
    // data.forEach(function(bids){
      t.cell('ID', res[i].id)
      t.cell('Bidder', res[i].username)
      t.cell('Items', res[i].items)
      t.cell('Current bid price', res[i].bidPrice)
      t.newRow()
  };
    console.log(Table.print(res))
 //add a prompt to get the item the user wishes to bid on
 inquirer
 .prompt([
   {
     type: "input",
     message: "enter the ID number of the item you wish to bid on",
     name: "itemID",
   },
   {
     message: "enter your bid price",
     type: "input",
     name: "newBidPrice"
 }

//if the new bid price is higher than the current, replace the row
//if less or the same, leave it there 

 ])

 
 
  })
}     