
//creating prompt in terminal
var inquirer = require("inquirer");

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
      //first screening question to determine if the user should be sent to the post or bid screen
      type: "list",
      message: "What are you here for today?",
      name: "postOrBid",
      //array of possible choices
      choices: ["Post an item", new inquirer.Separator(), "Bid on an item"],
    },
  ])
  .then(answers => {
      var answers = JSON.stringify(answers.postOrBid);
    console.log('answers :' + answers);
   
    if (answers === answers) {
      console.log("these are the available items for bidding...");
      showBids();
    };
   
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
console.log(JSON.stringify(res))
    // for (var i = 0; i < res.length; i++) {
    //   console.log(res[i] + "\n");
    // }
  });
}
