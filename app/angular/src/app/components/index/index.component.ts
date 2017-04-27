import { Component, Input } from "@angular/core";
import { AuthService } from '../../services/auth.service';
import { RoomService } from '../../services/room.service';

@Component({
  selector: "lx-index",
  templateUrl: "./index.component.html",
  styleUrls: ['./index.component.scss']
})

export class IndexComponent {

  Auth: AuthService;
  Room: RoomService;

  rooms = [];
  loading = {};

  constructor(Auth: AuthService, Room: RoomService) {
    this.Auth = Auth;
    this.Room = Room;
    this.loadRooms();
  }

  loadRooms() {
    this.loading['rooms'] = true;
    this.Room.all()
      .finally(() => this.loading['rooms'] = false)
      .subscribe(
        rooms => this.rooms = rooms,
        err => this.loading['rooms'] = false
      );
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
