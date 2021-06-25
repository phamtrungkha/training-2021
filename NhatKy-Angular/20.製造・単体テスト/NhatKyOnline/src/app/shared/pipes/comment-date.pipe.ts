import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commentDate'
})
export class CommentDatePipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    let format = 'YYYY年MM月dd日 HH:mm';
    switch (args[0]) {
      case 'full':
        format = 'YYYY年MM月dd日 HH:mm';
        return `${value.slice(0,4)}年${parseInt(value.slice(4,6))}月${parseInt(value.slice(6,8))}日 ${parseInt(value.slice(8,10))}:${parseInt(value.slice(10,12))}`
      case 'small':
        return `${value.slice(0,4)}/${parseInt(value.slice(4,6))}/${parseInt(value.slice(6,8))}`
      // case 'month':
      //   return `${value.slice(4,6)}月`;
      default:
        return '';
    }
  }
}
