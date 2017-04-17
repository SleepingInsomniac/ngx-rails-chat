import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CableService } from '../../services/cable.service';

@Component({
  selector: 'lx-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent {

  Auth: AuthService;
  CableService: CableService
  room;
  messages = [];
  message;

  constructor(Auth: AuthService, CableService: CableService) {
    this.Auth = Auth;
    this.CableService = CableService;
  }

  subscribeRoom() {
    this.room = this.CableService.cable.subscriptions.create({
      channel: "ChatChannel",
      room: "lobby"
    }, {
      connected: data => {
        console.log(data);
      },
      disconnected: data => {
        console.log(data);
      },
      received: data => {
        console.log(data);
        this.messages.push(data);
      },
      sendMessage: function(data) {
        this.perform('send_message', data);
      }
    });
  }

  ngOnInit() {
    console.log('hello');
    if (this.Auth.loggedIn) {
      this.subscribeRoom();
    } else {
      this.Auth.loginSuccess.subscribe(() => {
        this.subscribeRoom();
      });
    }
  }

  sendMessage() {
    this.room.sendMessage({message: this.message});
    this.message = '';
  }

}
