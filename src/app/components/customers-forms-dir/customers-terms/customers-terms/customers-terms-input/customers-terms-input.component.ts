import {Component, Input, Output, EventEmitter} from "@angular/core";

@Component({
  selector: 'app-customers-terms-input',
  templateUrl: './customers-terms-input.component.html',
  styleUrls: ['./customers-terms-input.component.css']
})
export class CustomersTermsInputComponent {

  @Input() value;
  @Output() changedInput = new  EventEmitter();

  disabled;
  name;

  constructor(){
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
