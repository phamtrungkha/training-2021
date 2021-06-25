import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.isLogin().authState.pipe(
      map((user: firebase.User | null) => {
        if (user){
          this.router.navigateByUrl(`/`);
          return false;
        } else {
          return true;
        }
      })
    )
  }

}
