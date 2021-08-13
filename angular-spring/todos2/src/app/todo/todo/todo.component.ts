import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../../core/class/todo';
import { TodoService } from '../../core/service/todo.service';
import { ERR_TODO_BLANK } from '../../core/Const/Message';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  todo: Todo = new Todo({description: '', status: ''});
  username = sessionStorage.getItem('username') || '';
  message: string;

  constructor(
    private todoService: TodoService,
    private router: Router,
    private routes: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.routes.snapshot.paramMap.get('id') || 0;
    if (id != 0){
      this.todoService.getTodo(this.username, id).subscribe(
        response => {
          this.todo = response;
        },
        error => {
          this.message = error.error.message;
        }
      )
    }
  }

  regis(): void {
    if (!this.todo.description || !this.todo.targetDate || !this.todo.status){
      console.log(!!this.todo.description);
      console.log(!!this.todo.targetDate);
      console.log(!!this.todo.status);
      this.message = ERR_TODO_BLANK;
    } else{
      this.todoService.updateTodo(this.username, this.todo).subscribe(
        response => {
          this.router.navigateByUrl('/todos')
        },
        error => {
          this.message = error.error.message;
        }
      )
    }
  }
}
