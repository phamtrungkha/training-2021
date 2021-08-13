import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoDataPipe } from './pipes/todo-data.pipe';



@NgModule({
  declarations: [
    TodoDataPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
