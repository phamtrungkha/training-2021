import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { User } from '../classes/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) { }

  createUser(email: string, password: string) : Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then ((credential) => {
        const user = credential.user;
        if (user) {
          const actionCodeSetting = {url: `http://localhost:4200/?newAccount=true&email=${email}`};
          user.sendEmailVerification(actionCodeSetting);
          this.db.object(`/users/${user.uid}`).set(new User(user));
        }
      });
  }

  login(email: string, password: string) : Promise<firebase.auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  isLogin() : AngularFireAuth{
    return this.afAuth;
  }

  logout() : Promise<void> {
    return this.afAuth.signOut();
  }

  checkOldPass(email: string, password: string): Promise<firebase.auth.UserCredential> | null {
    const credentials = firebase.auth.EmailAuthProvider.credential(email, password);
    const currentUser = firebase.auth().currentUser;
    if (currentUser){
      return currentUser.reauthenticateWithCredential(credentials);
    }
    return null;

  }

  getCurrentUser() : Observable<User | null> {
    return this.afAuth.authState.pipe(
      map((user: firebase.User | null) => {
        if (user)
          return new User(user);
        return null;
      }));
  }

  updateProfile(displayName: string, newPassword: string, image: FileList|null) : Promise<string|void> {
    return this.afAuth.currentUser.then((user: firebase.User | null) => {
      // console.log(user);
        if (user){
          let newUser = new User(user);
          let isUpdateImage: boolean = false;
          if (displayName){
            user.updateProfile({ displayName: displayName }).then(() => {
              newUser.setDisplayName(displayName);
            }).catch(error => {
              throw error;
            });
          }

          if (newPassword){
            user.updatePassword(newPassword).catch(error => {
              throw error;
            })
          }

          let dblocal = this.db;
          if (image?.length) {
            isUpdateImage = true;
            let storageRef = firebase.storage().ref(user.uid + '/profilePicture/' + image[0].name)
            storageRef.put(image[0]).then(() =>
              firebase.storage().ref(user.uid + '/profilePicture/' + image[0].name)
              .getDownloadURL().then(function(url) {
                newUser.setPhotoURL(url);
                user.updateProfile({ photoURL: url });
                dblocal.object(`/users/${user.uid}`).update(newUser);
                // console.log("-------0");
                alert(`プロファイル設定が完了しました。`)
                window.location.reload();
            })).catch(error => {
              throw error;
            });
          }

          if (!isUpdateImage){
            // console.log("-------3");
            this.db.object(`/users/${user.uid}`).update(newUser);
            alert(`プロファイル設定が完了しました`)
          }
        }
      });
    // return 'ok';
  }

  getAllUser() : Observable<User[]> {
    return this.db.list('/users').valueChanges().pipe(
      map(values => values.map(value => {
        return new User(value);
      }))
    );
  }
}
