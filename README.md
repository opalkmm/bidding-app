# bidding-app

this bidding app allows users to bid on the existing items in the database or create a new one.   

## How the Bidding App works:
1. prompt user with selection to either post a new item for bidding or bid on the existing ones
  - post an item: with username, item, and bid price input. This information will be added to the database.
  - bid on the item: all updated bidding data table will be shown so that the user can select based on the ID number and provide a new bid. The program will determine the winning bidder, which will reflect in the database.

## technologies used: 
  - Node.js 
  - MySQL

## packages installed: 
  - inquirer
  - mysql
  - easy-table

This app is a MVP. Additional features will include:
  - sign up and login 
  - account overview (items created under that account, and an ability to modify or close an auction)
  - search function for an item




