package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Todo;
import com.example.demo.repository.TodoDao;

@Service
public class TodoServiceImpl implements TodoService {
	
	private TodoDao dao;

	@Autowired
	public TodoServiceImpl(TodoDao dao) {
		this.dao = dao;
	}
	
	@Override
	public void add(Todo todo) {
		dao.insert(todo);
	}

	@Override
	public void save(Todo todo) {
		dao.update(todo);
	}

	@Override
	public Todo remove(int id) {
		Todo todo = findById(id);
		dao.delete(id);
		return todo;
	}

	@Override
	public List<Todo> findAll() {
		return dao.getAll();
	}

	@Override
	public Todo findById(int id) {
		return dao.getById(id);
	}

}
