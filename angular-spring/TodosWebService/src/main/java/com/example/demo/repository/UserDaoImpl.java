package com.example.demo.repository;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Todo;
import com.example.demo.entity.User;

@Repository
public class UserDaoImpl implements UserDao {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Override
	public List<User> findAll() {
		String sql = "select * from user1";
		List<Map<String, Object>> rs = jdbcTemplate.queryForList(sql);
		List<User> result = new ArrayList<>();
		for (Map<String, Object> item : rs) {
			User user = new User();
			user.setId(Integer.parseInt(item.get("id").toString()));
			user.setUsername((String) item.get("username"));
			user.setPassword((String) item.get("password"));
			user.setEmail((String) item.get("email"));
			result.add(user);
		}
		return result;
	}

	@Override
	public User findById(String username) {
		String sql = "select * from user1 where username = ?";
		Map<String, Object> rs = jdbcTemplate.queryForMap(sql, username);
		User user = new User();
		if (!rs.isEmpty()) {
			user.setId(Integer.parseInt(rs.get("id").toString()));
			user.setUsername((String) rs.get("username"));
			user.setPassword((String) rs.get("password"));
			user.setEmail((String) rs.get("email"));
		}
		return user;
	}

	@Override
	public void insert(User user) {
		String sql = "insert into user1 (username, password, email) values (?,?,?)";
		jdbcTemplate.update(sql, user.getUsername(), user.getPassword(), user.getEmail());
	}

	@Override
	public void update(User user) {
		String sql = "update user1 set username = ?, password = ?, email = ? where id = ?";
		jdbcTemplate.update(sql, user.getUsername(), user.getPassword(), user.getEmail(), user.getId());
	}

	@Override
	public void delete(String username) {
		String sql = "delete from user1 where username = ?";
		jdbcTemplate.update(sql, username);
	}

}
