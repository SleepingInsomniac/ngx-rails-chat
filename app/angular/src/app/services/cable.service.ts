import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import * as ActionCable from 'actioncable';

@Injectable()
export class CableService {

  Auth: AuthService;
  cable;
  userChannel;

  constructor(Auth: AuthService) {
    this.Auth = Auth;
    this.initalizeCable();
  }
  
  initalizeCable() {
    let protocol = window.location.protocol == 'https:' ? 'wss:' : 'ws:';

    this.cable = ActionCable.createConsumer(
      `${protocol}//${window.location.host}/cable`
    );
  }

}
