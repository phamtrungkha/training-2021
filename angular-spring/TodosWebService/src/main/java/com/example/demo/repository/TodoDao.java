package com.example.demo.repository;

import java.util.List;

import com.example.demo.entity.Todo;

public interface TodoDao {

	List<Todo> findAll(String username);

	Todo findById(int todoId);

	void insert(Todo todo);

	void update(Todo todo);

	void delete(int todoId);

}
