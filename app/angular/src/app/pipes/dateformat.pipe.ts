import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateformat'
})
export class DateformatPipe {

  transform(value?: Date, format?: string): string {
    if (!value) value = new Date();
    return moment(value).format(format);
  }

}
