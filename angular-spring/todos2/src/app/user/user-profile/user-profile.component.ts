import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../core/class/user';
import { UserService } from '../../core/service/user.service';
import { ERR_PASSWORD_NOT_MATCH, ERR_PASSWORD_WRONG, SUC_UPDATED_USER } from '../../core/Const/Message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  changePass: boolean = false;
  username = sessionStorage.getItem('username') || '';
  updatedUser: User = new User({username:this.username, password: ''});
  user: User = new User({username:this.username, password: ''});
  message: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getUser(this.username).subscribe(
      response => {
        this.user = response;
      },
      error => {
        this.message = error.error.message;
      }
    );
  }

  update(form : NgForm): void {
    const {oldpassword, password, password2} = form.value;
    if (this.changePass){
      // if (oldpassword !== this.user.password){
      //   console.log(oldpassword);
      //   console.log(this.user.password);
      //   console.log(password);
      //   this.message = ERR_PASSWORD_WRONG;
      //   return;
      // } else if(password !== password2) {
      if(password !== password2) {
        this.message = ERR_PASSWORD_NOT_MATCH;
        return;
      }
      this.message = this.userService.checkValidationPass(password);
      if (this.message){
        return;
      }
      this.user.password = password;
    }


    this.message = this.userService.checkValidationEmail(this.user.email);
    if (this.message){
      return;
    }

    if (oldpassword != null){
      this.userService.checkOldPass(this.username, oldpassword).subscribe(
        response => {
          this.updateUser(this.user);
        },
        error => {
          console.log(error);
          this.message = error.error;
          return;
        }
      )
    } else {
      this.updateUser(this.user);
    }

  }
  private updateUser(user: User) {
    this.userService.updateUser(this.user).subscribe(
      response => {
        response;
        alert(SUC_UPDATED_USER);
        this.router.navigateByUrl('/');
      },
      error => {
        this.message = error.error.message;
      }
    )
  }
}
