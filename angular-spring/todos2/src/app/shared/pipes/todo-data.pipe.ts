import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todoData'
})
export class TodoDataPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
