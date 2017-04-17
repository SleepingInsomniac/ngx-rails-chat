import { Injectable, EventEmitter } from '@angular/core';
import { HTTPService } from './http.service';
import { UserService } from './user.service';
import { User } from '../models/user';
import 'rxjs/add/operator/finally';

@Injectable()
export class AuthService {
  
  http: HTTPService;
  User: UserService;

  _currentUser: User;
  loading = false;
  loginSuccess = new EventEmitter();
  loginFailure = new EventEmitter();
  logoutSuccess = new EventEmitter();
  logoutFailure = new EventEmitter();

  constructor(httpService: HTTPService, UserService: UserService) {
    this.http = httpService;
    this.User = UserService;
  }

  get token() {
    return window.localStorage.getItem('auth_token');
  }

  get loggedIn() {
    return !!window.localStorage.getItem('auth_token');
  }

  login(identity, password) {
    let request = this.http.post('api/authentication', {
      authentication: {
        username: identity,
        password: password
      }
    });
    request.subscribe(response => {
      if (response.auth_token) {
        window.localStorage.setItem('auth_token', response.auth_token);
        this._currentUser = new User(response.user);
        this.loginSuccess.emit();
      } else {
        this.loginFailure.emit();
        console.error("auth_token not set on response!");
      }
    }, err => {
      this.loginFailure.emit();
      console.error(err);
    });
    
    return request;
  }

  logout() {
    let request = this.http.delete('api/authentication');
    request.subscribe(
      r => {
        this.logoutSuccess.emit();
        window.localStorage.removeItem('auth_token');
        this._currentUser = null;
      },
      r => this.logoutFailure.emit(),
    );
    return request;
  }

  loadCurrentUser() {
    if (!this.loading) {
      this.loading = true;
      this.User.current()
        .finally(() => this.loading = false)
        .subscribe(
          user => this._currentUser = user,
          error => this.logout()
        );
    }
  }

  get currentUser() {
    if (this.loggedIn) {
      if (this._currentUser) {
        return new User(this._currentUser);
      } else {
        this.loadCurrentUser();
      }
    }
  }

}
