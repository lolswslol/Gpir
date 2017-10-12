import { Directive, ElementRef, Input, HostListener, Output, EventEmitter} from '@angular/core';


@Directive({
  selector: '[appCreateProjectValidation]'
})
export class CreateProjectValidationDirective{

  constructor(private el: ElementRef){

  }
  @Input() parentClass: string;
  @Input() fieldName: string;
  @Input() regExp;
  @Output() onInputValidation = new EventEmitter<Object>();
  @Output() onSelectValidation = new EventEmitter<Object>();

  @HostListener('keyup') onKeyPress(){
    if(!this.el.nativeElement.value.match(this.regExp)){
      let event = {name:this.fieldName, value: false};
      this.el.nativeElement.parentElement.className += ' has-error';
      this.onInputValidation.emit(event);
    }else{
      this.el.nativeElement.parentElement.className = this.parentClass;
      let event = {name:this.fieldName,value: true};
      this.onInputValidation.emit(event);
    }
  }

  @HostListener('change') onChange(){
    let event = {name:this.fieldName, value: true};
    this.onSelectValidation.emit(event);
  }
}
