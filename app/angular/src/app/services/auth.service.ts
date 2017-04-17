import { Injectable, EventEmitter } from '@angular/core';
import { HTTPService } from './http.service';
import { UserService } from './user.service';
import { User } from '../models/user';
import { MemoryStorage } from '../lib/memory-storage';
import 'rxjs/add/operator/finally';

@Injectable()
export class AuthService {
  
  http: HTTPService;
  User: UserService;

  storage;

  _currentUser: User;
  loading = false;
  loginSuccess = new EventEmitter();
  loginFailure = new EventEmitter();
  logoutSuccess = new EventEmitter();
  logoutFailure = new EventEmitter();

  constructor(httpService: HTTPService, UserService: UserService) {
    this.http = httpService;
    this.User = UserService;
    this.initLocalStorage();
  }

  initLocalStorage() {
    this.storage = window.localStorage;
    try {
      window.localStorage.setItem('availability', 'true');
      window.localStorage.removeItem('availability');
    } catch(e) {
      this.storage = new MemoryStorage();
    }
  }

  get token() {
    return this.storage.getItem('auth_token');
  }

  get loggedIn() {
    return !!this.storage.getItem('auth_token');
  }

  afterLogin(callback) {
    this.loggedIn ? callback() : this.loginSuccess.subscribe(() => callback());
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
        this.storage.setItem('auth_token', response.auth_token);
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
        this.storage.removeItem('auth_token');
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
