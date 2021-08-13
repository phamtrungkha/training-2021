package com.example.demo.app.task;

import java.time.LocalDateTime;

import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;

import org.springframework.format.annotation.DateTimeFormat;

public class TaskForm {
	private int id;
	private int typeId;
	
	@NotNull(message = "タイトルを入力してください。")
	private String title;
	
	@NotNull(message = "内容を入力してください。")
	private String detail;

	@NotNull(message = "期限を設定してください。")
	@DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
//    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
	@Future(message = "期限が過去に設定されています。")
	private LocalDateTime deadline;
	
	private boolean newTask;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public int getTypeId() {
		return typeId;
	}
	public void setTypeId(int typeId) {
		this.typeId = typeId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
	public LocalDateTime getDeadline() {
		return deadline;
	}
	public void setDeadline(LocalDateTime deadline) {
		this.deadline = deadline;
	}
	public boolean isNewTask() {
		return newTask;
	}
	public void setNewTask(boolean newTask) {
		this.newTask = newTask;
	}
}
