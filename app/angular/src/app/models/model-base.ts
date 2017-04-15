import { descriptor } from '../decorators/descriptor';

export class ModelBase {

  id: number;
  created_at: Date;
  updated_at: Date;

  constructor(params:any = {}) {
    for (let p in params) {
      if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(params[p])) {
        this[p] = new Date(params[p]);
      } else {
        this[p] = params[p];
      }
    }
  }

}
