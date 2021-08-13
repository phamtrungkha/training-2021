import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../class/user';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ERR_USERNAME_LENGHT, ERR_USERNAME_BLANK, ERR_PASSWORD_BLANK, ERR_PASSWORD_LENGHT, ERR_EMAIL_BAD_FORMAT } from '../Const/Message';
import { WEB_SERVICES } from '../Const/Config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) { }

  checkValidation(user: User): string {
    if (user.username.length == 0)
      return ERR_USERNAME_BLANK;
    if (user.username.length < 4)
      return ERR_USERNAME_LENGHT;
    if (user.password.length == 0)
      return ERR_PASSWORD_BLANK;
    if (user.password.length < 6)
      return ERR_PASSWORD_LENGHT;
    return '';
  }

  checkValidationPass(password: string): string {
    if (password.length == 0)
      return ERR_PASSWORD_BLANK;
    if (password.length < 6)
      return ERR_PASSWORD_LENGHT;
    return '';
  }

  checkValidationEmail(email: string): string {
    if (!email.includes('@'))
      return ERR_EMAIL_BAD_FORMAT;
    return '';
  }

  addUser(user: User) {
    return this.httpClient.post(`${WEB_SERVICES}/users`, user);
  }

  login(user: User) {
    return this.httpClient.get<User>(`${WEB_SERVICES}/users/${user.username}`);
  }

  getUser(username: string) {
    return this.httpClient.get<User>(`${WEB_SERVICES}/users/${username}`);
  }

  updateUser(user: User) {
    return this.httpClient.put(`${WEB_SERVICES}/users/${user.username}`, user);
  }

  checkOldPass(username: string, oldPass: string) {
    return this.httpClient.post(`${WEB_SERVICES}/users/${username}`, oldPass);
  }
}
