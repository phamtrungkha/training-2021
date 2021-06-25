import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentDatePipe } from './pipes/comment-date.pipe';


@NgModule({
  declarations: [
    CommentDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommentDatePipe
  ]
})
export class SharedModule { }
