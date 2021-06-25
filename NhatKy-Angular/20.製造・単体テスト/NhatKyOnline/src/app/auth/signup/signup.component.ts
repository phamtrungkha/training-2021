import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Common } from 'src/app/core/classes/common';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    Common.pageSwitch('アカウント作成');
  }

  errorMessage: string;

  signup(form: NgForm) : void {
    this.errorMessage = "";
    const {email, password, passConfirm} = form.value;
    if (passConfirm != password) {
      this.errorMessage = "パスワードとパスワード（再）が一致していない"
      return;
    }
    this.userService.createUser(email, password)
      .then(() => this.router.navigateByUrl("/"))
      .catch(error => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            this.errorMessage = "このメールは他のアカウントに既に登録されています。"
            break;
          case 'auth/invalid-email':
            this.errorMessage = "メールのフォーマットが違います。"
            break;
          case 'auth/weak-password':
            this.errorMessage = "パスワードの長さは最低６文字です。"
            break;
          default:
            this.errorMessage = 'エラーが発生しました。管理者に問い合わせください。';
            console.error(error);
            break;
        }
      });
  }
}
