import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { CableService } from '../../services/cable.service';

@Component({
  selector: 'lx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  Auth: AuthService;
  User: UserService;
  Cable: CableService;

  constructor(Auth: AuthService, User: UserService, Cable: CableService) {
    this.Auth = Auth;
    this.User = User;
    this.Cable = Cable;

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
