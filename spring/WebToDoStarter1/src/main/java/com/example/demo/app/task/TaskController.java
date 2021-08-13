package com.example.demo.app.task;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.h2.value.CompareModeDefault;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.entity.Task;
import com.example.demo.service.TaskNotFoundException;
import com.example.demo.service.TaskService;

@Controller
@RequestMapping("/task")
public class TaskController {
	
	private final TaskService taskService;

	@Autowired
	public TaskController(TaskService taskService) {
		this.taskService = taskService;
	}
	
	@GetMapping
	public String index(TaskForm taskForm, Model model) {
		
		List<Task> list = taskService.findAll();
		
		taskForm.setNewTask(true);
		
		model.addAttribute("list", list);
		return "task/index";
	}
	
	@PostMapping("/insert")
	public String insert(@Valid @ModelAttribute TaskForm taskForm, BindingResult result, Model model) {
		
		if (result.hasErrors()) {
			model.addAttribute("message", "エラーが発生しました。ご確認ください。");
			taskForm.setNewTask(true);
			List<Task> list = taskService.findAll();
			model.addAttribute("list", list);
			return "task/index";
		} else {
			Task task = new Task();
			task.setDeadline(taskForm.getDeadline());
			task.setDetail(taskForm.getDetail());
			task.setType_id(taskForm.getTypeId());
			task.setTitle(taskForm.getTitle());
			task.setUser_id(1);
			taskService.add(task);
			return "redirect:/task";
		}
	}
	
	@GetMapping("/{id}")
	public String edit(@PathVariable int id, TaskForm taskForm, Model model) {
		taskForm.setNewTask(false);
		Optional<Task> taskOpt = taskService.findById(id);
		if (taskOpt.isPresent()) {
			Task task = taskOpt.get();
			taskForm.setTitle(task.getTitle());
			taskForm.setDeadline(task.getDeadline());
			taskForm.setDetail(task.getDetail());
			taskForm.setTypeId(task.getType_id());
			model.addAttribute("taskId", task.getId());
//			model.addAttribute("taskForm", taskForm);
		}
		return "task/index";
	}
	
	@PostMapping("/update")
	public String update(@Valid @ModelAttribute TaskForm taskForm, BindingResult result, @RequestParam("taskId") int taskId, Model model) {

		taskForm.setNewTask(false);
		if (!result.hasErrors()) {
			Task task = new Task();
			task.setDeadline(taskForm.getDeadline());
			task.setDetail(taskForm.getDetail());
			task.setType_id(taskForm.getTypeId());
			task.setTitle(taskForm.getTitle());
			task.setUser_id(1);
			task.setId(taskId);
			taskService.save(task);
			model.addAttribute("message", "タスクの更新が完了しました。");
		} else {
			model.addAttribute("message", "タスクの更新が失敗しました。");
		}
		model.addAttribute("taskId", taskId);
		return "task/index";
	}
	

	@PostMapping("/delete")
	public String delete(TaskForm taskForm, Model model) {
		taskService.delete(taskForm.getId());
		return "redirect:/task";
	}
}
