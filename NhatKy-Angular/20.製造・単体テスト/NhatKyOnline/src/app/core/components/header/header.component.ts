import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { UserService } from '../../services/user.service';
import { Common } from '../../classes/common';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  isLogin: boolean;
  title$: Observable<string>;
  title: string = '';
  url: string;
  navRight: string;
  navRightUrl: string;

  ngOnInit(): void {

    Common.titleTerms.pipe(
      switchMap((status: string) => {
        switch (status) {
          case ' ':  //welcome
          case 'ログイン':
            this.url = "/login"
            this.navRight = 'サインアップ'
            this.navRightUrl = '/signup'
            break;
          case 'アカウント作成':
            this.url = "/signup"
            this.navRight = 'ログイン'
            this.navRightUrl = '/login'
            break;
          case 'プロファイル':
          case 'プロファイル設定...':
            this.url = "/user-profile"
            this.navRight = 'ログアウト'
            this.navRightUrl = '/'
            break;
          case '  ':  //not-found
            this.url = "/"
            this.navRight = ''
            this.navRightUrl = '/'
            break;

          default:
            this.url = "/user-profile"
            this.navRight = 'ログアウト'
            this.navRightUrl = '/'
            break;
        }
        return this.title = status;
      })
    ).subscribe();

    // this.wait();
  }

  // async wait(){
  //   await Common.delay(3000);
  //   console.log(this.title);
  // }

  click(): void {
    console.log(this.navRight)
    if (this.navRight == "ログアウト"){
      this.userService.logout().then(() => this.router.navigateByUrl("/user-profile"));
      // window.location.reload();
    }
  }
}
