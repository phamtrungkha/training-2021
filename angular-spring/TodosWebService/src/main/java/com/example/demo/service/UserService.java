package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.User;

public interface UserService {

	List<User> getAllUser();

	User getUser(String username);

	void addUser(User user);

	void updateUser(User user);

	void deleteUser(String username);

}
