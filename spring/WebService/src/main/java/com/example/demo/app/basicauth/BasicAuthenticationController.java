package com.example.demo.app.basicauth;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

//@Controller
@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class BasicAuthenticationController {


	@GetMapping("/basicauth")
	public AuthenticationBean basicAuthBean() {
		return new AuthenticationBean("Hello World Bean2");
	}
}
