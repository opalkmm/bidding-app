"use strict";

//creating prompt in terminal
var inquirer = require('inquirer');

//install mysql
var mysql = require("mysql");

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
    //prompt type checkboxes
      type: 'checkbox',
      name: 'postOrBid',
      //first screening question to determine if the user should be sent to the post or bid screen
      message: 'What are you here for today?',
      //array of possible choices
      choices:['Post an item', 'Bid on an item']  
  }
])
  .then(answers => {
      console.log('answer :', JSON.stringify(answers.postOrBid));
    //user's answers

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

  