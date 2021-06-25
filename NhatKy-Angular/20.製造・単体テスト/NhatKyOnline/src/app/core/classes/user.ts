export class User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;

  constructor(user: any) {
    this.uid = user.uid;
    this.email = user.email;
    if (user.displayName)
      this.displayName = user.displayName;
    if (user.photoURL)
      this.photoURL = user.photoURL;
  }

  setDisplayName(displayName: string): void {
    this.displayName = displayName;
  }

  setPhotoURL(photoURL: string): void {
    this.photoURL = photoURL;
  }
}
