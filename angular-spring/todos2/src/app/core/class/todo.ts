export class Todo {
  id: number;
  description: string;
  targetDate: string;
  status: string;

  constructor(todo: any){
    if (todo.id)
      this.id = todo.id;
    this.description = todo.description;
    this.targetDate = todo.targetDate || Date.now();
    this.status = todo.status;
  }
}
