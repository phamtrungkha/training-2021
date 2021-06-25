import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { Common } from '../../core/classes/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    Common.pageSwitch('ログイン' || 'blank');
  }

  login(form: NgForm): void {
    this.errorMessage = "";
    const {email, password} = form.value;
    this.userService.login(email, password)
      .then(() => this.router.navigateByUrl("/"))
      .catch(error => {
        switch (error.code) {
          case 'auth/user-not-found':
            this.errorMessage = "このメールでまだサインアップされていません。"
            break;
          case 'auth/invalid-email':
            this.errorMessage = "メールのフォーマットが違います。"
            break;
          case 'auth/wrong-password':
            this.errorMessage = "パスワードが合っていません。"
            break;
            case 'auth/too-many-requests':
              this.errorMessage = "アカウントが無効にされました。管理者に問い合わせください。"
              break;
          default:
            this.errorMessage = '不明なエラーが発生しました。管理者に問い合わせください。';
            console.error(error);
            break;
        }
      });
  }

}
