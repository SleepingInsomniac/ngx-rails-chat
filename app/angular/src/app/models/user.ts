import { ModelBase } from './model-base';

export class User extends ModelBase {
  username;
  email;
  password;
  last_login: Date;
}
