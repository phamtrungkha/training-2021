import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './todo/welcome/welcome.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NotFoundComponent } from './core/component/not-found/not-found.component';
import { TodoComponent } from './todo/todo/todo.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NotAuthGuard } from './core/guards/not-auth.guard';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'todos', component: TodoListComponent, canActivate:[NotAuthGuard]},
  {path: 'todo2/todos', component: TodoListComponent, canActivate:[NotAuthGuard]},
  {path: 'todos/:id', component: TodoComponent, canActivate:[NotAuthGuard]},
  {path: 'user-profile', component: UserProfileComponent, canActivate:[NotAuthGuard]},
  {path: 'login', component: LoginComponent, canActivate:[AuthGuard]},
  {path: 'logout', component: LogoutComponent, canActivate:[NotAuthGuard]},
  {path: 'signup', component: SignupComponent, canActivate:[AuthGuard]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
