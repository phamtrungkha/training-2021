import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Diary } from '../classes/diary';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  addDiary(newDiary: string, userId: string) {
    const diary = new Diary({user_id: userId, isDiary: true, cur_content: newDiary})
    this.db.list(`/diaries`).push(diary);
  }

  getDiaries(userId: string): Observable<Diary[]> {
    return this.db.list(`/diaries`).snapshotChanges().pipe(
      map(snapshots => snapshots
        .filter(snapshot => {
          // console.log((snapshot.payload.val() as Diary).user_id)
          return (snapshot.payload.val() as Diary).user_id == userId
        })
        .map(snapshot => {
          const values = snapshot.payload.val();
          return new Diary({ dc_id : snapshot.payload.key, ...values as Object});
        })));
  }

  updateDiary(newContent: string, diary: Diary) : void {

    const newDiary = diary.update(newContent);
    const objectLink = (diary.isDiary)?`/diaries/${diary.dc_id}`:`/comments/${diary.dc_id}`;
    this.db.object(objectLink).update(newDiary);
  }

  deleteDiary(diary: Diary): void {
    const newDiary = diary.delete();
    const objectLink = (diary.isDiary)?`/diaries/${diary.dc_id}`:`/comments/${diary.dc_id}`;
    this.db.object(objectLink).update(newDiary);
  }

  addComment(newComment: string, userId: string, parentId: string) {
    const comment = new Diary({user_id: userId, isDiary: false, cur_content: newComment, parent_id: parentId})
    this.db.list(`/comments`).push(comment);
  }

  getComments(): Observable<Diary[]> {
    return this.db.list(`/comments`).snapshotChanges().pipe(
      map(snapshots => snapshots.map(snapshot => {
        return new Diary({ dc_id : snapshot.payload.key, ...snapshot.payload.val() as Object})
      })));
  }

}
