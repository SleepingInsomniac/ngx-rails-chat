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
  messageText;

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
        this.messages.push({ text: 'Welcome', user: { username: 'Info' }});
      },
      disconnected: data => {
        // console.log(data);
      },
      received: data => {
        console.log(data);
        this.messages.push(data);
      },
      sendMessage: function(data) {
        this.perform('send_message', data);
      }
    });
    console.log('room: ', this.room);
  }

  ngOnInit() {
    this.Auth.afterLogin(() => {
      this.subscribeRoom();
    });
  }

  sendMessage() {
    this.room.sendMessage({ text: this.messageText });
    this.messageText = null;
  }

  keypress(event) {
    if (event.which == '13') {
      this.sendMessage();
      event.preventDefault();
    }
  }

}
