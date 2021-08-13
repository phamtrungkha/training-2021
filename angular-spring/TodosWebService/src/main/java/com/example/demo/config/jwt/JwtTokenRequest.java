package com.example.demo.config.jwt;

public class JwtTokenRequest {
	
	private String username;
	private String password;
	
	protected JwtTokenRequest() {
		super();
	}

	protected JwtTokenRequest(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	

}
