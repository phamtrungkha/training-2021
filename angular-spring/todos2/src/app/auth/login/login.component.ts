import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/class/user';
import { ERR_USERNAME_NOTFOUND, SUC_LOGIN } from 'src/app/core/Const/Message';
import { UserService } from '../../core/service/user.service';
import { ERR_PASSWORD_WRONG } from '../../core/Const/Message';
import { BasicAuthenticationService } from '../../core/service/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string;

  constructor(
    private userService : UserService,
    private router: Router,
    private authService: BasicAuthenticationService
  ) { }

  ngOnInit(): void {
  }

  login(form: NgForm): void {
    const {username, password} = form.value;
    let user = new User({username, password});
    this.message = this.userService.checkValidation(user);
    if (this.message.length == 0){
      this.authService.login(user).subscribe(
        response => {
          // console.log(response);
          alert(SUC_LOGIN);
          // this.router.navigateByUrl('/');
          window.location.reload();
        },
        error => {
          // console.log(error);
          if (error.statusText == 'Unknown Error'){
            this.message = '不明なエラーが発生しました。管理者に問い合わせください。'
          } else {
            this.message = error.error;
          }
        }
      )
    }
    // if (this.message.length == 0){
    //   this.userService.login(user).subscribe(
    //     response => {
    //       if (!response){
    //         this.message = ERR_USERNAME_NOTFOUND;
    //       } else if (response.password === password){
    //         alert(SUC_LOGIN);
    //         this.router.navigateByUrl('/');
    //       } else {
    //         this.message = ERR_PASSWORD_WRONG;
    //       }
    //     },
    //     error => {
    //       this.message = error.error.message;
    //     }
    //   )
    // }
  }
}
