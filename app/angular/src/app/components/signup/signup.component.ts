import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'lx-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  Router: Router;
  User: UserService;
  Auth: AuthService;

  username = '';
  email = '';
  password = '';

  constructor(Router: Router, User: UserService, Auth: AuthService) {
    this.User = User;
    this.Auth = Auth;
    this.Router = Router;
  }

  signup() {
    this.User.create({
      username: this.username,
      password: this.password,
      email: this.email
    }).subscribe(response => {
      console.log(response);
      console.log('Account created!');
      this.Auth.login(this.username, this.password).subscribe(() => {
        console.log('Logged in!');
        this.password = '';
        this.Router.navigate(['/']);
      }, error => {
        console.error(error);
      })
    }, error => {
      console.error(error);
    });
  }

}
