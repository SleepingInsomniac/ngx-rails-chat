import { Component, Input } from "@angular/core";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: "lx-index",
  templateUrl: "./index.component.html",
  styleUrls: ['./index.component.scss']
})

export class IndexComponent {

  Auth: AuthService;

  constructor(Auth: AuthService) {
    this.Auth = Auth;
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
