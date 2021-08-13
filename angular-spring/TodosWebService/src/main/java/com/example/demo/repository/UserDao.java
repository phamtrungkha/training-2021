package com.example.demo.repository;

import java.util.List;

import com.example.demo.entity.User;

public interface UserDao {

	List<User> findAll();

	User findById(String username);

	void insert(User user);

	void update(User user);

	void delete(String username);

}
