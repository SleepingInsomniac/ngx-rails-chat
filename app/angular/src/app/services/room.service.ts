import { Injectable } from '@angular/core';
import { HTTPService } from './http.service';
import { Observable } from 'rxjs/Observable';
import { ModelService } from './model.service';
import { Room } from '../models/room';
import _ from 'lodash';

@Injectable()
export class RoomService extends ModelService {

  model = 'rooms';
  singular = 'room';
  ClassType = Room;

  constructor(http: HTTPService) {
    super(http);
  }

  default() {
    let req = this.http.get(`/api/${this.model}/default`);
    return this.finalizeRequest(req);
  }

}
