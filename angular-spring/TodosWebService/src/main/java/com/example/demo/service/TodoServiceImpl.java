package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Todo;
import com.example.demo.repository.TodoDao;

@Service
public class TodoServiceImpl implements TodoService{
	
	@Autowired
	private TodoDao dao;

	@Override
	public List<Todo> getAllTodo(String username) {
		return dao.findAll(username);
	}

	@Override
	public Todo getTodo(int todoId) {
		return dao.findById(todoId);
	}

	@Override
	public void addTodo(Todo todo) {
		dao.insert(todo);
	}

	@Override
	public void updateTodo(Todo todo) {
		dao.update(todo);
	}

	@Override
	public void deleteTodo(int todoId) {
		dao.delete(todoId);
	}

}
