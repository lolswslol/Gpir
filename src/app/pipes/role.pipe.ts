import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appRolePipe'
})
export class RolePipe implements PipeTransform {

  transform(value: string, args?: any): string {
    let pipedString: string = value;
    switch (pipedString){
      case 'EXECUTOR':{
         pipedString = 'у исполнителя';
         break;
      }
      case 'CUSTOMER':{
         pipedString = 'у заказчика';
         break;
      }
      case 'BElISA':{
         pipedString = 'в БелИСА';
         break;
      }
      case 'GKNT':{
         pipedString = 'в ГКНТ';
         break;
      }
      default:{
        pipedString = 'неизвестно'
      }

    }
    return pipedString;
  }
}
