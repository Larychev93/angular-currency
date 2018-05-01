import {EventEmitter, Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class UserService {
  user = {
    email: 'stormtrooper@mail.com',
    password: 'vader',
    avatar: 'assets/images/trooper.jpg',
    token: null
  }

  constructor(private router: Router) {}

  login(email: string, password: string) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    return new Promise((resolve, reject) => {
      if (email === this.user.email && password === this.user.password) {
        this.user.token += possible.charAt(Math.floor(Math.random() * possible.length));
        resolve(this.user.token);
      } else {
        if (email !== this.user.email && password === this.user.password) {
          reject({
            code: 1,
            text: 'Your email is not correct!'
          });
        } else if (password !== this.user.password && email === this.user.email) {
          reject({
            code: 2,
            text: 'Your password is not correct!'
          });
        } else {
          reject({
            code: 3,
            text: 'Your password and email are not not correct!'
          });
        }
      }
    });
  }
  logout() {
    this.user.token = null;
    this.router.navigate(['/']);
  }
}
