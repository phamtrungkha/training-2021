package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Todo;

public interface TodoService {

	void add(Todo todo);
	
	void save(Todo todo);
	
	Todo remove(int id);
	
	List<Todo> findAll();
	
	Todo findById(int id);
}
