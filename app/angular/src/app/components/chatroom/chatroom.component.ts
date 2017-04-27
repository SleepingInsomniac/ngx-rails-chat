import { Component, OnInit, ViewChild } from '@angular/core';
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
  stickyScroll = true;

  infoUser = {
    id: 0,
    username: 'Info'
  };

  @ViewChild('messageList') messageList;

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
        this.messages.push({ text: 'Welcome', user: this.infoUser});
      },
      disconnected: data => {
        this.messages.push({ text: 'You were disconnected', user: this.infoUser});
      },
      received: data => {
        this.addMessage(data);
      },
      sendMessage: function(data) {
        this.perform('send_message', data);
      }
    });

    this.Auth.logoutSuccess.subscribe(() => {
      this.room.unsubscribe();
    });
  }

  addMessage(data) {
    if (data.server_timestamp) {
      data.server_timestamp = new Date(data.server_timestamp);
    } else {
      data.server_timestamp = new Date();
    }
    data.divider = true;
    if (this.messages.length > 0) {
      let lastMessage = this.messages[this.messages.length - 1];
      if (lastMessage.user.id !== data.user.id) {
        data.divider = true;
      } else {
        data.divider = false;
      }
    }
    this.messages.push(data);
    if (this.stickyScroll) {
      setTimeout(_ => {
        let listElement = this.messageList.nativeElement;
        listElement.scrollTop = listElement.scrollHeight;
      }, 1);
    }
  }

  ngOnInit() {
    this.Auth.afterLogin(() => {
      this.subscribeRoom();
    });
  }

  sendMessage() {
    this.stickyScroll = true;
    this.room.sendMessage({ text: this.messageText });
    this.messageText = null;
  }

  keypress(event) {
    if (event.which == '13') {
      this.sendMessage();
      event.preventDefault();
    }
  }

  listScroll(event) {
    let listElement = this.messageList.nativeElement;
    if (listElement.scrollHeight - listElement.scrollTop <= listElement.clientHeight) {
      this.stickyScroll = true;
    } else {
      this.stickyScroll = false;
    }
  }

}
