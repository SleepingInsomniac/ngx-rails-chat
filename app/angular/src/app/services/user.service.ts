import { Injectable } from '@angular/core';
import { HTTPService } from './http.service';
import { Observable } from 'rxjs/Observable';
import { ModelService } from './model.service';
import { User } from '../models/user';
import _ from 'lodash';

@Injectable()
export class UserService extends ModelService {

  model = 'users';
  singular = 'user';

  constructor(http: HTTPService) {
    super(http);
  }

  current() {
    let req = this.http.get(`/api/users/me`);
    return this.finalizeRequest(req);
  }

  finalizeRequest(req) {
    return req.map(user => new User(user));
  }

}
