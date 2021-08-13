package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserDao;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserDao dao;

	@Override
	public List<User> getAllUser() {
		return dao.findAll();
	}

	@Override
	public User getUser(String username) {
		try {
			return dao.findById(username);
		} catch (EmptyResultDataAccessException e) {
			return null;
		}
	}

	@Override
	public void addUser(User user) {
//		if (getUser(user.getUsername()) != null)
//			throw new UserDuplicateException("このユーザー名は既に使用されました。");
		dao.insert(user);		
	}

	@Override
	public void updateUser(User user) {
		dao.update(user);
	}

	@Override
	public void deleteUser(String username) {
		dao.delete(username);
	}

}
