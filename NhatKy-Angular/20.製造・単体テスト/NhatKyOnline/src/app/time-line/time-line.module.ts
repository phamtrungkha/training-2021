import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeLineRoutingModule } from './time-line-routing.module';
import { MenuComponent } from './menu/menu.component';
import { MainComponent } from './main/main.component';
import { RouterModule } from '@angular/router';
import { CommentDatePipe } from '../shared/pipes/comment-date.pipe';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MenuComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    TimeLineRoutingModule,
    RouterModule,
    SharedModule,
    FormsModule
  ],
  exports: [
    MainComponent
  ]
})
export class TimeLineModule { }
