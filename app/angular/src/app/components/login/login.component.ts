import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'lx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  Auth: AuthService;
  User: UserService;

  constructor(Auth: AuthService, User: UserService) {
    this.Auth = Auth;
    this.User = User;

    this.Auth.loginSuccess.subscribe(() => {
      console.log(this.Auth.currentUser);
    });
  }

  login(username, password) {
    this.Auth.login(username, password).subscribe(token => {
      console.log(token);
    });
  }

  logout() {
    this.Auth.logout();
  }

  get currentUser() {
    return this.Auth.currentUser;
  }

}
