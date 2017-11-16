import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buttonDate'
})
export class ButtonDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value === true){
      return 'Не определено'
    }else return 'Определено'
  }

}
