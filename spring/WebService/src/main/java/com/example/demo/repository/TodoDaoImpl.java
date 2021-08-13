package com.example.demo.repository;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Todo;

@Repository
public class TodoDaoImpl implements TodoDao {
	
	JdbcTemplate jdbcTemplate;
	
	@Autowired
	public TodoDaoImpl(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	@Override
	public void insert(Todo todo) {
		String sql = "insert into todo (username, description, target_date, is_done) values (?,?,?,?)";
		this.jdbcTemplate.update(sql, todo.getUsername(), todo.getDescription(), todo.getTargetDate(), todo.getIsDone());		
	}

	@Override
	public void update(Todo todo) {
		String sql = "update todo set username = ?, description = ?, target_date = ?, is_done = ? where id = ?";
		this.jdbcTemplate.update(sql, todo.getUsername(), todo.getDescription(), todo.getTargetDate(), todo.getIsDone(), todo.getId());		
	}

	@Override
	public void delete(int id) {
		String sql = "delete from todo where id = ?";
		this.jdbcTemplate.update(sql, id);
	}

	@Override
	public List<Todo> getAll() {
		String sql = "select * from todo";
		List<Todo> result = new ArrayList<>();
		List<Map<String, Object>> rs = this.jdbcTemplate.queryForList(sql);
		for (Map<String, Object> item : rs) {
			Todo todo = new Todo();
			todo.setId((int) item.get("id"));
			todo.setUsername((String) item.get("username"));
			todo.setDescription((String) item.get("description"));
			todo.setTargetDate(((Timestamp) item.get("target_date")).toLocalDateTime());
			todo.setDone((boolean) item.get("is_done"));
			result.add(todo);
		}
		return result;
	}

	@Override
	public Todo getById(int id) {
		String sql = "select * from todo where id = ?";
		Map<String, Object> rs = this.jdbcTemplate.queryForMap(sql, id);
			Todo todo = new Todo();
			todo.setId((int) rs.get("id"));
			todo.setUsername((String) rs.get("username"));
			todo.setDescription((String) rs.get("description"));
			todo.setTargetDate(((Timestamp) rs.get("target_date")).toLocalDateTime());
			todo.setDone((boolean) rs.get("is_done"));
		return todo;
	}

}
