import {
  Component, Input, Output, EventEmitter, OnInit

} from "@angular/core";
import { ProjectService } from "../../../../../services/project.service";

@Component({
  selector: 'app-customers-terms-input',
  templateUrl: './customers-terms-input.component.html',
  styleUrls: ['./customers-terms-input.component.css']
})
export class CustomersTermsInputComponent implements OnInit{

  yearRegExp = /(0[1-9]|1[012])[/](19|20)\d{2}$/;

  @Input() status;
  @Input() fieldName;
  @Input() value;
  @Output() changedInput = new  EventEmitter();
  @Output() validationEvent = new EventEmitter();
  @Output() focused = new EventEmitter();
  @Output() statusChange= new EventEmitter();



  disabled;
  name;

  constructor(private projectService: ProjectService){

  }

  ngOnInit(){
    if(this.status === false){
      this.disabled = true;
      this.value = 'Не определено';
      this.name = 'Определено';
    }else {
      this.disabled = false;
      this.name = 'Не определено';
    }
  }

  change(newValue){
    this.value = newValue;
    this.changedInput.emit(newValue);
  }

  disableDate(){
    if(this.projectService.projectNew){
      if(this.status === false){
        this.disabled = false;
        this.name = 'Не определено';
        this.change('');
        this.statusChange.emit(true);
      }else {
        this.disabled = true;
        this.name = 'Определено';
        this.change('2');
        this.statusChange.emit(false);
      }
    }
  }

  validate($event){
    console.log($event);
    this.validationEvent.emit($event);
  }

  focus(){
    this.focused.emit()
  }

  check(){
    console.log(this.status);
  }

}
