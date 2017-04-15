import { Injectable } from '@angular/core';
import { HTTPService } from './http.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/of';

@Injectable()
export class ModelService {

  static baseURL = 'api';

  http: HTTPService;
  model; // this gets set in subclass
  singular;

  constructor(http: HTTPService) {
    this.http = http;
  }

  find(id, params = {}) {
    let req = this.http.get(`/${ModelService.baseURL}/${this.model}/${id}.json`, params);
    return this.finalizeRequest(req);
  }

  all(params = {}) {
    let req = this.http.get(`/${ModelService.baseURL}/${this.model}.json`, params);
    return this.finalizeRequest(req);
  }

  create(model) {
    let params = {};
    params[this.singular] = model;
    let req = this.http.post(`/${ModelService.baseURL}/${this.model}.json`, params);
    return this.finalizeRequest(req);
  }

  save(model) {
    if (!model.id) return false;
    let params = {};
    params[this.singular] = model;
    let req = this.http.patch(`/${ModelService.baseURL}/${this.model}/${model.id}.json`, params);
    return this.finalizeRequest(req);
  }

  destroy(model) {
    if (!model.id) return false;
    let params = {};
    params[this.singular] = model;
    let req = this.http.delete(`/${ModelService.baseURL}/${this.model}/${model.id}.json`);
    return req;
  }

  finalizeRequest(req) {
    // overide this to format requests
    return req;
  }

}
