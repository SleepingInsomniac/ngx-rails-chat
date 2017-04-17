import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import * as ActionCable from 'actioncable';

@Injectable()
export class CableService {

  Auth: AuthService;
  cable;

  constructor(Auth: AuthService) {
    this.Auth = Auth;
    if (this.Auth.loggedIn) {
      this.initalizeCable();
    } else {
      this.Auth.loginSuccess.subscribe(() => {
        this.initalizeCable();
      });
    }
  }
  
  initalizeCable() {
    let protocol = window.location.protocol == 'https:' ? 'wss:' : 'ws:';
    this.cable = ActionCable.createConsumer(
      `${protocol}//${window.location.host}/cable?auth_token=${this.Auth.token}`
    );
  }

}
