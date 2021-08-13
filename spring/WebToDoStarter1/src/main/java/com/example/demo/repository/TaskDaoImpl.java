package com.example.demo.repository;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Task;
import com.example.demo.entity.TaskType;

@Repository
public class TaskDaoImpl implements TaskDao {
	
	JdbcTemplate jdbcTemplate;
	
	@Autowired
	public TaskDaoImpl(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	@Override
	public void insert(Task task) {
		String sql = "insert into task (user_id, type_id, title, detail, deadline) values (?,?,?,?,?)";
		this.jdbcTemplate.update(sql, task.getUser_id(), task.getType_id(), task.getTitle(), task.getDetail(), task.getDeadline());
	}

	@Override
	public int update(Task task) {
		String sql = "update task set user_id = ?, type_id = ?, title = ?, detail = ?, deadline = ? where id = ?";
		return this.jdbcTemplate.update(sql,  task.getUser_id(), task.getType_id(), task.getTitle(), task.getDetail(), task.getDeadline(), task.getId());
	}

	@Override
	public int delete(int id) {
		String sql = "delete task where id = ?";
		return this.jdbcTemplate.update(sql, id);
	}

	@Override
	public List<Task> getAll() {
		String sql = "select t.id as task_id, user_id, type_id, title, detail, deadline, type, comment, type from task t, task_type tt where t.type_id = tt.id order by t.id";
		List<Map<String, Object>> list = this.jdbcTemplate.queryForList(sql);
		List<Task> resultList = new ArrayList<>();
		for (Map<String, Object> item : list) {
			Task task = new Task();
			task.setId((int) item.get("task_id"));
			task.setUser_id((int) item.get("user_id"));
			task.setType_id((int) item.get("type_id"));
			task.setTitle((String) item.get("title"));
			task.setDetail((String) item.get("detail"));
			task.setDeadline(((Timestamp) item.get("deadline")).toLocalDateTime());
			
			TaskType taskType = new TaskType();
			taskType.setId((int) item.get("type_id"));
			taskType.setType((String) item.get("type"));
			taskType.setComment((String) item.get("comment"));
			task.setTaskType(taskType);
			resultList.add(task);
		}
		return resultList;
	}

	@Override
	public Optional<Task> getById(int id) {
		String sql = "select t.id as task_id, user_id, type_id, detail, title, deadline, type, comment from task t, task_type tt where t.id = ? and t.type_id = tt.id";
		Map<String, Object> taskQ = this.jdbcTemplate.queryForMap(sql, id);
		Task task = new Task();
		task.setId((int) taskQ.get("task_id"));
		task.setUser_id((int) taskQ.get("user_id"));
		task.setType_id((int) taskQ.get("type_id"));
		task.setTitle((String) taskQ.get("title"));
		task.setDetail((String) taskQ.get("detail"));
		task.setDeadline(((Timestamp) taskQ.get("deadline")).toLocalDateTime());
		
		TaskType taskType = new TaskType();
		taskType.setId((int) taskQ.get("type_id"));
		taskType.setComment((String) taskQ.get("comment"));
		task.setTaskType(taskType);
		
		Optional<Task> result = Optional.ofNullable(task);
		return result;
	}

}
