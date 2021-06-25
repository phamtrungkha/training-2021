import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/core/classes/user';
import { UserService } from '../../core/services/user.service';
import * as firebase from 'firebase';
import { Diary } from '../../core/classes/diary';
import { AngularFireList } from '@angular/fire/database';
import { DiaryService } from '../../core/services/diary.service';
import { NgForm } from '@angular/forms';
import { Common } from '../../core/classes/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private userService: UserService,
    private diaryService: DiaryService
  ) { }

  currentUser$: Subscription;
  currentUser: User;
  allUser$: Subscription;
  allUser: User[];
  // diaryList$: Observable<Diary[]>;
  diaryListRoot: Diary[];
  diaryList: Diary[];
  menuAll: string[][] = [];
  menuChild: string[] = [];
  menuSelected: string = "all";

  // commentList$: Observable<Diary[]>;
  commentList: Diary[];
  // dateTemp: string = '2020/11/13 22:45';
  newDiary: string;
  // newComment: string;
  tempDiary: string;
  isLogin: boolean;
  test: string = "1624010870595";
  test2: string;

  ngOnInit(): void {

    this.currentUser$ = this.userService.getCurrentUser().subscribe(user => {
      if (user){
        // console.log(user);
        this.isLogin = true;
        this.currentUser = new User(user);
        if (typeof user.displayName === 'undefined')
          Common.pageSwitch(`プロファイル設定...`);
        else
          Common.pageSwitch(`${user.displayName}`);
      } else {
        this.isLogin = false;
        Common.pageSwitch(' ');
      }
    });

    this.allUser$ = this.userService.getAllUser().subscribe(au => {
      this.allUser = au;
    })

    this.getDc();
  }

  async getDc() {
    while (!this.currentUser || !this.allUser){
      await Common.delay(300);
    }

    this.diaryService.getDiaries(this.currentUser.uid)
      .subscribe(list => {
        if (typeof list[0] != 'undefined'){
          // console.log(this.menuSelected);
          this.diaryListRoot = list.reverse()
            .sort((a, b) => parseInt(b.created_date) - parseInt(a.created_date))
            .filter(diary => diary.deleted == false);
            // .filter(diary => (this.menuSelected == 'all')?true:((this.menuSelected.length == 4)?(Common.getYear(diary.created_date) === this.menuSelected):(Common.getYearMonth(diary.created_date) === this.menuSelected)));
          let index = '';
          index = Common.getYear(list[0].created_date);
          this.menuAll = [];
          this.menuChild = [];
          // console.log(`menuAll: ${this.menuAll.length}`);
          // console.log(list);
          for (let item of list){
            // console.log(index);
              // console.log(Common.getYearMonth(item.created_date)+'---'+item.cur_content);
            if (index === Common.getYear(item.created_date)){
              if (-1 == this.menuChild.indexOf(Common.getYearMonth(item.created_date)))
                this.menuChild.push(Common.getYearMonth(item.created_date));
            } else {
              // console.log("++++++++++++1");
              // console.log(this.menuChild);
              this.menuAll.push(this.menuChild);
              this.menuChild = [];
              this.menuChild.push(Common.getYearMonth(item.created_date));
              index = Common.getYear(item.created_date);
            }
          }
          // console.log(`menuChild 2: ${this.menuChild.length}`);
              // console.log("++++++++++++2");
              // console.log(this.menuChild);
          this.menuAll.push(this.menuChild);
          this.diaryList = this.diaryListRoot;
        }
      });
    this.diaryService.getComments()
      .subscribe(list => {
        this.commentList = list.reverse()
                            .filter(comment => comment.deleted == false)
                            .map(comment => comment.addUserProfile(this.allUser))
      }
    );
    this.currentUser$.unsubscribe();
    // this.allUser$.unsubscribe();
  }

  addDiary(): void {
    this.diaryService.addDiary(this.newDiary, this.currentUser.uid);
    this.newDiary = '';
  }

  updateDiary(diary: Diary): void {
    this.diaryService.updateDiary(this.tempDiary, diary);
    this.tempDiary = '';
  }

  deleteDiary(diary: Diary): void {
    let r = confirm(`日記を削除しますか。`);
    if (r)
      this.diaryService.deleteDiary(diary);
  }

  addComment(form: NgForm, parent_id: string): void {
    const { newComment } = form.value;
    this.diaryService.addComment(newComment, this.currentUser.uid, parent_id);
    form.reset();
  }

  getComments(diaryId: string): Diary[] {
    if (!this.commentList)
      return this.commentList;
    return this.commentList.filter(value => value.parent_id == diaryId);
  }

  getYear(year: string): string{
    //  console.log(year);
    return year.slice(0,4);
  }

  getMonth(month: string): string{
    // console.log(month);
    return parseInt(month.slice(4,6)).toString();
  }

  menuSelect(selectedValue: string): void {
    // console.log(selectedValue);
    this.diaryList = this.diaryListRoot
      .filter(diary => (selectedValue == 'all')?true:((selectedValue.length == 4)?(Common.getYear(diary.created_date) === selectedValue):(Common.getYearMonth(diary.created_date) === selectedValue)));

  }
}
