package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Todo;
import com.example.demo.service.TodoService;

@CrossOrigin(origins = "http://localhost")
@RestController
//@RequestMapping("/todos")
public class TodoController {
	
	@Autowired
	private TodoService todoService;
	
	@GetMapping("/users/{username}/todos")
	public List<Todo> referAllTodo(@PathVariable String username) {
		return this.todoService.getAllTodo(username);
	}

	@GetMapping("/users/{username}/todos/{todoId}")
	public Todo referTodo(@PathVariable String username, @PathVariable int todoId) {
		return this.todoService.getTodo(todoId);
	}
	
	@PostMapping("/users/{username}/todos")
	public ResponseEntity<Void> addTodo(@PathVariable String username, @RequestBody Todo todo) {
		this.todoService.addTodo(todo);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping("/users/{username}/todos/{todoId}")
	public ResponseEntity<Void> updateTodo(@PathVariable String username, @PathVariable int todoId, @RequestBody Todo todo) {
		this.todoService.updateTodo(todo);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("/users/{username}/todos/{todoId}")
	public ResponseEntity<Void> deleteTodo(@PathVariable String username, @PathVariable int todoId) {
		this.todoService.deleteTodo(todoId);
		return ResponseEntity.noContent().build();
	}
}
