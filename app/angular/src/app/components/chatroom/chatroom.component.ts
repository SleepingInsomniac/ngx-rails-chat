import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CableService } from '../../services/cable.service';
import { User } from '../../models/user';

@Component({
  selector: 'lx-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent {

  Auth: AuthService;
  CableService: CableService
  room;
  @Input() roomName = 'lobby';
  messages = [];
  messageText;
  stickyScroll = true;

  infoUser = new User({
    id: 0,
    username: 'Info'
  });

  @ViewChild('messageList') messageList;
  @ViewChild('messageTextArea') messageTextArea;

  constructor(Auth: AuthService, CableService: CableService) {
    this.Auth = Auth;
    this.CableService = CableService;
  }

  subscribeRoom() {
    this.room = this.CableService.cable.subscriptions.create({
      channel: "ChatChannel",
      room: this.roomName,
      auth_token: this.Auth.token
    }, {
      connected: data => this.messages.push({ text: 'Connected', user: this.infoUser }),
      disconnected: data => this.messages.push({ text: 'You were disconnected', user: this.infoUser }),
      received: data => this.addMessage(data),
      sendMessage: function(data) {
        this.perform('send_message', data);
      },
      login: function(data) {
        this.perform('log_in', data);
      },
      logout: function(data) {
        this.perform('log_out', data);
      }
    });

    this.Auth.afterLogin(() => {
      this.room.login({ auth_token: this.Auth.token });
    });
  }

  addMessage(data) {
    if (data.server_timestamp) {
      data.server_timestamp = new Date(data.server_timestamp);
    } else {
      data.server_timestamp = new Date();
    }
    data.textColor = this.messageColor(data.user.color);
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

  messageColor(colorString) {
    if (!colorString) return;
    let [r,g,b] = colorString.split(',').map(i => parseInt(i));
    let luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (luminance > 127.5) {
      return '#000';
    } else {
      return '#FFF';
    }
  }

  ngOnInit() {
    this.messageTextArea.nativeElement.focus();
    this.Auth.loginSuccess.subscribe(() => {
      this.messageTextArea.nativeElement.focus();
    });
    this.subscribeRoom();
  }

  sendMessage() {
    this.stickyScroll = true;
    this.room.sendMessage({ text: this.messageText });
    this.messageText = null;
    this.messageTextArea.nativeElement.focus();
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
