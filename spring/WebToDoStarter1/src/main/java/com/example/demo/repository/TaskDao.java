package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import com.example.demo.entity.Task;

public interface TaskDao {

	void insert(Task task);
	
	int update(Task task);
	
	int delete(int id);
	
	List<Task> getAll();
	
	Optional<Task> getById(int id);
}
