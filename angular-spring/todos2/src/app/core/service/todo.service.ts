import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../class/todo';
import { WEB_SERVICES } from '../Const/Config';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http: HttpClient
  ) { }

  getAllTodo(username: String) {
    return this.http.get<Todo[]>(`${WEB_SERVICES}/users/${username}/todos`);
  }

  getTodo(username: string, id: string | null) {
    return this.http.get<Todo>(`${WEB_SERVICES}/users/${username}/todos/${id}`);
  }

  deleteTodo(username: string, id: number) {
    return this.http.delete(`${WEB_SERVICES}/users/${username}/todos/${id}`);
  }

  updateTodo(username: string, todo: Todo) {
    if (todo.id)
      return this.http.put(`${WEB_SERVICES}/users/${username}/todos/${todo.id}`, todo);
    else {
      let newTodo = {username, ...todo};
      return this.http.post(`${WEB_SERVICES}/users/${username}/todos`, newTodo);
    }
  }
}
