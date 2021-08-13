package com.example.demo.service;

import java.util.List;

import com.example.demo.entity.Todo;

public interface TodoService {

	List<Todo> getAllTodo(String username);

	Todo getTodo(int todoId);

	void addTodo(Todo todo);

	void updateTodo(Todo todo);

	void deleteTodo(int todoId);

}
