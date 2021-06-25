import { Common } from "./common";
import { User } from './user';

export class Diary {
  dc_id: string;
  user_id: string;
  isDiary: boolean;
  parent_id: string;
  cur_content: string;
  prev_content: string;
  created_date: string;
  update_date: string;
  deleted: boolean;
  isEditing: boolean;
  user_photoURL: string;
  user_displayName: string;

  constructor(diary: any) {
    if (diary.dc_id)
      this.dc_id = diary.dc_id;
    if (diary.user_id)
      this.user_id = diary.user_id;
    this.isDiary = diary.isDiary;
    if (diary.parent_id)
      this.parent_id = diary.parent_id;
    this.cur_content = diary.cur_content;
    if (diary.prev_content)
      this.prev_content = diary.prev_content;
    this.created_date = diary.created_date || Common.saveDate(Date.now().toString());
    this.update_date = diary.update_date || Common.saveDate(Date.now().toString());
    this.deleted = diary.deleted || false;
  }

  update(updatedDiary: string) : Diary{
    const newDiary = new Diary({
      dc_id: this.dc_id,
      user_id: this.user_id,
      isDiary: this.isDiary,
      parent_id: (this.isDiary)?this.parent_id:"",
      cur_content: updatedDiary,
      prev_content: this.cur_content,
      created_date: this.created_date,
      update_date: Common.saveDate(Date.now().toString()) });

    return newDiary;
  }

  delete(): Diary {
    const newDiary = new Diary({
      dc_id: this.dc_id,
      user_id: this.user_id,
      isDiary: this.isDiary,
      parent_id: (this.isDiary)?this.parent_id:"",
      cur_content: this.cur_content,
      prev_content: this.prev_content,
      created_date: this.created_date,
      update_date: Common.saveDate(Date.now().toString()),
      deleted: true });
    return newDiary;
  }

  addUserProfile(allUser: User[]): Diary {
    let user = allUser.find(user => user.uid == this.user_id);
    if (user){
      this.user_displayName = user.displayName;
      this.user_photoURL = user.photoURL;
    }
    return this;
  }
}
