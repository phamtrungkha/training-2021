import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/service/user.service';
import { User } from '../../core/class/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  message: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signup(form: NgForm): void {
    const {username, password, password2} = form.value;
    let user = new User({username, password});
    if (password !== password2){
      this.message = 'パスワードが一致していなません。';
    } else {
      this.message = this.userService.checkValidation(user);
      if (this.message.length == 0){
        this.userService.addUser(user).subscribe(
          response => {
             alert("新規登録が成功しました。ログインしてご使用ください。");
             this.router.navigateByUrl('/login');
          },
          error => {
            this.message = error.error;
          }
        );
      }
    }
  }
}
