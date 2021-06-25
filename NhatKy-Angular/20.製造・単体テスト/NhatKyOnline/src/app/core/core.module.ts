import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HeaderComponent,
    NotFoundComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
