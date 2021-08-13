package com.example.demo.service;

public class UserDuplicateException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public UserDuplicateException(String message) {
		super(message);
	}
}
