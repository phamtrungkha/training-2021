export class User {
  id: number;
  username: string;
  password: string;
  email: string;

  constructor (user: any){
    if (user.id)
      this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    if (user.email)
      this.email = user.email;
  }
}
