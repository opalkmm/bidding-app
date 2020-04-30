//creating prompt in terminal
var inquirer = require("inquirer");

//install mysql
var mysql = require("mysql");

//install table
var Table = require("easy-table");

//establish connection to the database
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mimithehamham",
  port: 3306,
  database: "biddingData",
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
  .then((answers) => {
    var choosePostOrBid = JSON.stringify(answers.postOrBid);
    console.log("answers :" + choosePostOrBid + "\n ======================================================= \n");
    //if answers === 'Bid an item --> show all items in the database in selection prompt

    if (answers.postOrBid == "Bid on an item") {
      console.log("these are the available items for bidding...");
      showBids();
    }
        //if answers === 'Post an item --> create input promt, add to biddingList

    if (answers.postOrBid == "Post an item"){
      console.log("enter your username, item name, and your bid price");
      addBids();
    }

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
    var t = new Table();
    for (var i = 0; i < res.length; i++) {
      // }
      // data.forEach(function(bids){
      t.cell("ID", res[i].id);
      t.cell("Bidder", res[i].username);
      t.cell("Items", res[i].items);
      t.cell("Current bid price", res[i].bidPrice);
      t.newRow();
    }
    console.log(Table.print(res));
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
          name: "newBidPrice",
        },
      ])
      .then((answers) => {
        var idChosen = answers.itemID;
        // console.log('item ID chosen :' + idChosen);

        var newBidPrice = answers.newBidPrice;
        console.log(
          "your new bid on ID number " + idChosen + " is $" + newBidPrice
        );

        //quer the current bid price to compare with the user bid price input
        connection.query(
          "SELECT bidPrice FROM bids WHERE bids.id = " + idChosen + "",
          function (err, res) {
            if (err) throw err;

            // console.log(res[0].bidPrice);

            //store the current bid price of the selected item ID
            var currentBidPrice = res[0].bidPrice;

            //if the new bid price is higher than the current, replace the row
            //if less or the same, "you lose the bid" and ask again which one you wish to bid?

            if (newBidPrice > currentBidPrice) {
              console.log(
                "Congratulations! you are now the highest bidder of item id number " +
                  idChosen
              );
              //replace new highest to the table in biddingData DB
              connection.query(
                "UPDATE bids SET bidPrice = " +
                  newBidPrice +
                  " WHERE id = " +
                  idChosen +
                  " ",
                function (err, res) {
                  if (err) throw err;

                  console.log(
                    "The current highest bid for this item is " + newBidPrice
                  );
                }
              );
            } else {
              console.log(
                "You lost the bid.. please reselect the item you wish to bid on"
              );
              showBids()
            }
          }
        );
      });
  });
}

//function to insert new bid post
function addBids(){
  inquirer
  .prompt([
    {
      type: "input",
      message: "what is your username?",
      name: "username",
    },
    {
      type: "input",
      message: "enter your item name",
      name: "itemName",
    },
    {
      type: "input",
      message: "enter your bid price ($)",
      name: "postBidPrice",
      validate: validatePrice
    }
//validate input to number only



  ])
  .then((answers) => {
    var username = answers.username;
    var item = answers.itemName;
    var postBidPrice = answers.postBidPrice;


    console.log("username: " + username + " add an item " + item + " the a bid price of  " + postBidPrice);
    var queryNow = 'INSERT INTO bids (username,items,bidPrice) VALUES ("'+username+'", "'+item+'", '+postBidPrice+')';
    console.log(queryNow);
    connection.query(queryNow)
  }
  )}
//function to validate the bid price to be number only
  function validatePrice(price)
{
   var reg = /^\d+$/;
   return reg.test(price) || "Please enter a new price in numbers";
}

// connection.end()