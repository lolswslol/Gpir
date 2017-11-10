import {Component, Input, Output, EventEmitter} from "@angular/core";
import { ProjectService } from "../../../../../services/project.service";

@Component({
  selector: 'app-customers-terms-input',
  templateUrl: './customers-terms-input.component.html',
  styleUrls: ['./customers-terms-input.component.css']
})
export class CustomersTermsInputComponent {

  yearRegExp = /(0[1-9]|1[012])[/](19|20)\d{2}$/;

  @Input() fieldName;
  @Input() value;
  @Output() changedInput = new  EventEmitter();
  @Output() validationEvent = new EventEmitter();
  /*@Output() clickEvent = new EventEmitter();*/


  disabled;
  name;

  constructor(private projectService: ProjectService){
    if(this.value === 'Не Определен'){
      this.disabled = true;
      this.name = 'Определено'
    }else {
      this.disabled = false;
      this.name = 'Не определено'
    }
  }

  change(newValue){
    this.value = newValue;
    this.changedInput.emit(newValue);
  }

  disableDate(){
    console.log(this.projectService.projectNew);
    if(this.projectService.projectNew){
      if(this.value === 'Не определено'){
        this.disabled = false;
        this.name = 'Не определено';
        this.value = '';
      }else {
        this.disabled = true;
        this.name = 'Определено';
        this.value = 'Не определено';
      }
    }
  }

  validate($event){
    console.log($event);
    this.validationEvent.emit($event);
  }

  /*emitClick(){
    this.clickEvent.emit();
  }*/

}
