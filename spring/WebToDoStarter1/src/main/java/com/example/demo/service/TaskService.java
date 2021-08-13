package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.entity.Task;

public interface TaskService {

	void save(Task task);
	
	void add(Task task);
	
	void delete(int id);
	
	List<Task> findAll();
	
	Optional<Task> findById(int id);
}
