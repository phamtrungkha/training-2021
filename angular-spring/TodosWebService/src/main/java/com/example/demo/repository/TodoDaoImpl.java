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

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Override
	public List<Todo> findAll(String username) {
		String sql = "select * from todo where username = ?";
		List<Map<String, Object>> rs = jdbcTemplate.queryForList(sql, username);
		List<Todo> result = new ArrayList<>();
		for (Map<String, Object> item : rs) {
			Todo todo = new Todo();
			todo.setId(Integer.parseInt(item.get("id").toString()));
			todo.setUsername((String) item.get("username"));
			todo.setDescription((String) item.get("description"));
			todo.setTargetDate(((Timestamp) item.get("target_date")).toLocalDateTime());
			todo.setStatus((String) item.get("status"));
			result.add(todo);
		}
		return result;
	}

	@Override
	public Todo findById(int todoId) {
		String sql = "select * from todo where id = ?";
		Map<String, Object> rs = jdbcTemplate.queryForMap(sql, todoId);
		Todo todo = new Todo();
		if (!rs.isEmpty()) {
			todo.setId(Integer.parseInt(rs.get("id").toString()));
			todo.setUsername((String) rs.get("username"));
			todo.setDescription((String) rs.get("description"));
			todo.setTargetDate(((Timestamp) rs.get("target_date")).toLocalDateTime());
			todo.setStatus((String) rs.get("status"));			
		}
		return todo;
	}

	@Override
	public void insert(Todo todo) {
		String sql = "insert into todo (username, description, target_date, status) values (?,?,?,?)";
		jdbcTemplate.update(sql, todo.getUsername(), todo.getDescription(), todo.getTargetDate(), todo.getStatus());
	}

	@Override
	public void update(Todo todo) {
		String sql = "update todo set username = ?, description = ?, target_date = ?, status = ? where id = ?";
		jdbcTemplate.update(sql, todo.getUsername(), todo.getDescription(), todo.getTargetDate(), todo.getStatus(), todo.getId());
	}

	@Override
	public void delete(int todoId) {
		String sql = "delete from todo where id = ?";
		jdbcTemplate.update(sql, todoId);
	}

}
