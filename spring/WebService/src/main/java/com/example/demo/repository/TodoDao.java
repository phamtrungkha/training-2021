package com.example.demo.repository;

import java.util.List;

import com.example.demo.entity.Todo;

public interface TodoDao {

	void insert(Todo todo);
	
	void update(Todo todo);
	
	void delete(int id);
	
	List<Todo> getAll();
	
	Todo getById(int id);
}
