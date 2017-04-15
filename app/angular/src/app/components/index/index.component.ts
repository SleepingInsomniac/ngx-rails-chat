import {Component, Input} from "@angular/core";
import * as ActionCable from 'actioncable';

@Component({
  selector: "lx-index",
  templateUrl: "./index.component.html",
  styleUrls: ['./index.component.scss']
})

export class IndexComponent {

  room;

  constructor() {
    // when component class instance is created
    let cable = ActionCable.createConsumer();
    this.room = cable.subscriptions.create({
      channel: "ChatChannel",
      room: "Best Room"
    }, {
      connected: () => {},
      disconnected: () => {},
      received: data => {
        console.log(data);
      },
      ping: function(data) {
        this.perform('ping', {message: data});
      }
    });
    console.log(cable);
  }

  ping() {
    this.room.ping({data: 'ping'});
  }

  ngOnChanges() {
    // when inputs are updated
  }

  ngOnInit() {
    // after `ngOnChanges()` was called the first time
  }

  ngAfterViewInit() {
    // after the view was created
  }

  ngAfterContentInit() {
    // after content was projected
  }
}
