create database biddingData;

use biddingData;

create table bids(
id integer auto_increment not null,
username varchar(50) not null,
items varchar(50) not null,
bidPrice integer not null,
primary key(id)
);
drop table bids;

select * from bids;

insert into bids (username, items, bidPrice)
values('alexH', 'airpods gen 1', 40),
('Opalk', 'tamagotchi meets sanrio', 100),
('RicardoH', 'Blythe Asha Alvira', 220),
('MimiH', 'Star Twinkle Precure wand', 50);

delete from bids where id = 2;

insert into bids (id,username, items, bidPrice)
values(2, 'alexH', 'moomin plush', 20);


 