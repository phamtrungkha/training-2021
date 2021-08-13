package com.example.demo.app;

import java.net.URI;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.demo.entity.Todo;
import com.example.demo.service.TodoService;

@CrossOrigin(origins = "http://localhost")
@RestController
public class TodoController {
	
	@Autowired
	private TodoService todoService;

	@GetMapping("/users/{username}/todos")
	public List<Todo> getAllTodos(@PathVariable String username){
		return todoService.findAll();
	}

	@GetMapping("/users/{username}/todos/{id}")
	public Todo getById(
			@PathVariable String username,
			@PathVariable int id){
		return todoService.findById(id);
	}
	
	@DeleteMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodo(
			@PathVariable String username, @PathVariable int id){
		Todo todo = todoService.remove(id);
		if (todo != null) {
			return ResponseEntity.noContent().build();
		}
		
		return ResponseEntity.notFound().build();
	}
	
	@PutMapping("/users/{username}/todos/{id}")
	public ResponseEntity<Todo> updateTodo(
			@PathVariable String username, 
			@PathVariable int id,
			@RequestBody Todo todo){
		todoService.save(todo);
		return new ResponseEntity<Todo>(todo, HttpStatus.OK);
	}
	
	//add new todo
	@PostMapping("/users/{username}/todos")
	public ResponseEntity<Void> addTodo(
			@PathVariable String username,
			@RequestBody Todo todo){
//		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM d, y");
//		todo.setTargetDate(LocalDateTime.parse(todo.getTargetDate(), formatter));
		todoService.add(todo);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}").buildAndExpand(todo.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
}
