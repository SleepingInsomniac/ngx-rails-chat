import {Component, Input} from "@angular/core";
import * as ActionCable from 'actioncable';

@Component({
  selector: "lx-index",
  templateUrl: "./index.component.html",
  styleUrls: ['./index.component.scss']
})

export class IndexComponent {
  constructor() {
    // when component class instance is created
    let cable = ActionCable.createConsumer();
    cable.subscriptions.create({
      channel: "chat_channel",
      room: "Best Room"
    }, {
      received: data => {
        console.log(data);
      }
    });
    console.log(cable);
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
