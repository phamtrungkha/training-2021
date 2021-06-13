import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeLineRoutingModule } from './time-line-routing.module';
import { MenuComponent } from './menu/menu.component';
import { MainComponent } from './main/main.component';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap'



@NgModule({
  declarations: [
    MenuComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    TimeLineRoutingModule,
    NgbPaginationModule,
    NgbAlertModule
  ],
  exports: [
    MainComponent
  ]
})
export class TimeLineModule { }
