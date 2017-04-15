import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import { Params } from '../lib/params';

@Injectable()
export class HTTPService {
  
  http: Http;
  requestCount = 0;
  requestId = 0;
  
  constructor(http: Http) {
    this.http = http;
  }

  get headers() {
    let auth_key = window.localStorage.getItem('auth_token');
    let headers = new Headers();
    if (auth_key) headers.append('Authorization', auth_key);
    headers.append('Content-Type', 'application/json');
    return headers;
  }
  
  sendRequest(request) {
    this.requestCount++;
    let reqId = ++this.requestId;
    console.log(`Request start id:${reqId}`);
    request.subscribe(r => {
      console.log(`Request succeeded id:${reqId}`, r);
      this.requestCount--;
    }, r => {
      console.error(`Request failed id:${reqId}`, r);
      this.requestCount--;
    });
    return request;
  }
  
  post(url, data = {}) {
    let req = this.http.post(url, data, {
      headers: this.headers
    });
    return this.sendRequest(req.map(r => r.json()).share());
  }
  
  get(url, data = {}) {
    let search = new URLSearchParams(Params.serialize(data));
    
    let req = this.http.get(url, {
      headers: this.headers,
      search: search
    });
    return this.sendRequest(req.map(r => r.json()).share());
  }
  
  patch(url, data = {}) {
    let req = this.http.patch(url, data, {
      headers: this.headers
    });
    return this.sendRequest(req.map(r => r.json()).share());
  }
  
  delete(url) {
    let req = this.http.delete(url, {
      headers: this.headers
    });
    return this.sendRequest(req.map(r => r.json()).share());
  }

}
