create table todo (
	id int(3) not null auto_increment,
	username varchar(20) not null,
	description varchar(50) not null,
	target_date datetime not null,
	status varchar(10) not null,
	primary key (id)
);

create table user (
	id int(3) not null auto_increment,
	username varchar(20) not null,
	password varchar(100) not null,
	email varchar(20),
	primary key (username)
);