package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Task;
import com.example.demo.repository.TaskDao;

@Service
public class TaskServiceImpl implements TaskService {
	
	TaskDao dao;
	
	@Autowired
	public TaskServiceImpl(TaskDao dao) {
		this.dao = dao;
	}

	@Override
	public void save(Task task) {
		if (this.dao.update(task) == 0)
			throw new TaskNotFoundException("指定されたタスクが見つかりません。");		
	}

	@Override
	public void add(Task task) {
		this.dao.insert(task);
	}

	@Override
	public void delete(int id) {
		if (this.dao.delete(id) == 0)
			throw new TaskNotFoundException("指定されたタスクが見つかりません。");		
	}

	@Override
	public List<Task> findAll() {
		return this.dao.getAll();
	}

	@Override
	public Optional<Task> findById(int id) {
		try {
			return this.dao.getById(id);			
		} catch (Exception e) {
			throw new TaskNotFoundException("指定されたタスクが見つかりません。");
		}
	}

}
