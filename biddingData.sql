create database biddingData;

use biddingData;

create table bids(
id integer auto_increment not null,
username varchar(50) not null,
items varchar(50) not null,
bidPrice integer not null,
primary key(id)
)