package com.example.demo.config.jwt;

public class JwtTokenResponse {

	private String token;

	protected JwtTokenResponse(String token) {
		super();
		this.token = token;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	
	
}
