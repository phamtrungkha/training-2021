import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/core/class/todo';
import { TodoService } from '../../core/service/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[];
  username = sessionStorage.getItem('username') || '';

  constructor(
    private todoService: TodoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(){
    this.todoService.getAllTodo(this.username).subscribe(
      response => {
        this.todos = response;
      },
      error => {
        console.error(error);
      }
    )}

    gotoUpdate(id: number){
      this.router.navigateByUrl(`/todos/${id}`);
    }

    deleteTodo(id: number){
      this.todoService.deleteTodo(this.username, id).subscribe(
        response => {
          this.refreshList();
        },
        error => {
          console.error(error);
        }
      );
    }
}
