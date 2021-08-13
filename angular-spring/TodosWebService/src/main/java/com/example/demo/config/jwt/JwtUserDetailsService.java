package com.example.demo.config.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;

@Service
public class JwtUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UserService userService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = this.userService.getUser(username);
		JwtUserDetail userDetails; 
		if (user != null){
			userDetails = new JwtUserDetail(user);
		} else {
			throw new UsernameNotFoundException(String.format("ユーザがみつかりません。'%s'", username));
		}
		return userDetails;
	}

}
