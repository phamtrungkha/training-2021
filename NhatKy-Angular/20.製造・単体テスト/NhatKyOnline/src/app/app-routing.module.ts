import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './time-line/main/main.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: "", component: MainComponent},
  { path: "signup",  component: SignupComponent, canActivate:[AuthGuard]},
  { path: "login", component: LoginComponent, canActivate:[AuthGuard]},
  { path: "user-profile", component: UserProfileComponent},
  { path: "time-line", component: MainComponent},
  { path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
