package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.config.jwt.AuthenticationException;
import com.example.demo.config.jwt.JwtTokenResponse;
import com.example.demo.entity.User;
import com.example.demo.service.UserDuplicateException;
import com.example.demo.service.UserService;

@CrossOrigin(origins = "http://localhost")
@RestController
//@RequestMapping("/todos")
public class UserController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/users")
	public List<User> referAllTodo() {
		return this.userService.getAllUser();
	}

	@GetMapping("/users/{username}")
	public User referTodo(@PathVariable String username) {
		return this.userService.getUser(username);
	}
	
	@PostMapping("/users")
	public ResponseEntity<Void> addUser(@RequestBody User user) {
		try {
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();		
			user.setPassword(encoder.encode(user.getPassword()));
			this.userService.addUser(user);
			return ResponseEntity.noContent().build();			
		} catch (DuplicateKeyException e) {
			throw new UserDuplicateException("このユーザー名は既に使用されました。");
		}
	}
	
	@PostMapping("/users/{username}")
	public ResponseEntity<String> checkOldPass(@PathVariable String username, @RequestBody String oldPass) {

		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, oldPass));
			return ResponseEntity.noContent().build();
		} catch (DisabledException e) {
			throw new AuthenticationException("ユーザ名は無効です。", e);
		} catch (BadCredentialsException e) {
			throw new AuthenticationException("旧パスワードが間違っています。", e);
		}
	}
	
	@PutMapping("/users/{username}")
	public ResponseEntity<Void> updateTodo(@PathVariable String username, @RequestBody User user) {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		if (!user.getPassword().equals(this.userService.getUser(username).getPassword()))
			user.setPassword(encoder.encode(user.getPassword()));
		
		this.userService.updateUser(user);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("/users/{username}")
	public ResponseEntity<Void> deleteUser(@PathVariable String username) {
		this.userService.deleteUser(username);
		return ResponseEntity.noContent().build();
	}

}
