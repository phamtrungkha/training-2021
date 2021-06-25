import { Component, OnInit } from '@angular/core';
import { Common } from 'src/app/core/classes/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/classes/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  currentUser: User | null;
  displayName: string;
  oldpassword: string;
  newpassword: string;
  passwordConfirm: string;
  photoURL: string;
  photoPath: string;
  email: string;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    Common.pageSwitch('プロファイル');
    this.userService.getCurrentUser().subscribe(user => {
      if (user){
        this.displayName = user.displayName;
        this.photoURL = user.photoURL;
        this.email = user.email;
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }

  errorMessage: string;
  changeProfile(): void {
    let regex = new RegExp('^[a-zA-Z0-9_ ]*$');
    this.errorMessage = '';
    if (this.displayName.length > 30){
      this.errorMessage = '名前の長さは長すぎます。'
      return;
    } else if (!regex.test(this.displayName)){
      this.errorMessage = '名前は文字、数字及び「_」しか使用できません。'
      return;
    }
    let image = (<HTMLInputElement>document.getElementById('addImage')).files;
    if (image && image[0]) {
      let filename = image[0].name.slice(image[0].name.length-4);
      if (filename !== ".png"  &&  filename !== ".jpg"){
        this.errorMessage = "ファイルはイメージ（jpg,png）しか登録できません。"
        return;
      }
    }
    if (this.oldpassword){
      const oldPass = this.userService.checkOldPass(this.email, this.oldpassword);
      if (oldPass){
        oldPass.then(() => {
          if (this.newpassword){
            if (this.newpassword.length < 6){
              this.errorMessage = "パスワードの長さは最低６文字です。"
              return;
            }
            if (this.newpassword !== this.passwordConfirm){
              this.errorMessage = "パスワードとパスワード（再）が一致していません。"
              return;
            }
          } else {
            this.errorMessage = "旧パスワードが設定されたが、パスワードとパスワード（再）が未設定"
            return;
          }
          this.userService.updateProfile(this.displayName, this.newpassword, image)
                  .catch(error => {
                    console.error(error);
                    this.errorMessage = error.message;
                    return;
                  });
        }).catch(error => {
          this.errorMessage = '旧パスワードが正しくない。';
          return;
        })
      }
    } else {
      this.userService.updateProfile(this.displayName, this.newpassword, image)
        .catch(error => {
          console.error(error);
          this.errorMessage = error.message;
          return;
        });
      }
  }

  cancel(): void {
    this.router.navigateByUrl('/');
  }
}
