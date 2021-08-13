create table task_type (
	id int(2) not null,
	type varchar(20) not null,
	comment varchar(50) not null
);

create table task (
	id int(5) not null auto_increment,
	user_id int(5) not null,
	type_id int(2) not null,
	title varchar(50) not null,
	detail text,
	deadline datetime not null,
	primary key (id)
);

create table user (
	id int(5) not null auto_increment,
	username varchar(20) not null,
	email varchar(20) not null,
	password varchar(20) not null,
	enabled tinyint(1) not null,
	authority varchar(50) not null,
	tempkey varchar(250) default null,
	primary key (id)	
);