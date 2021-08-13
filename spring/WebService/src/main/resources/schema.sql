create table todo (
	id int(3) not null auto_increment,
	username varchar(20) not null,
	description varchar(50) not null,
	target_date datetime not null,
	is_done boolean not null,
	primary key (id)
);