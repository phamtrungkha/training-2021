package com.example.demo.config;

import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.InitBinder;

import com.example.demo.service.TaskNotFoundException;

@ControllerAdvice
public class WebMvcControllerAdvice {
	
	@InitBinder
	public void initBinder(WebDataBinder dataBinder) {
		dataBinder.registerCustomEditor(String.class, new StringTrimmerEditor(true));
	}

	@ExceptionHandler(TaskNotFoundException.class)
	public String exceptionHandler(TaskNotFoundException e, Model model) {
		model.addAttribute("message", e);
		return "error/errorPage";
	}
}
