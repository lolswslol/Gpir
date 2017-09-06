import { Directive, ElementRef, Input, HostListener, DoCheck, Output, EventEmitter} from '@angular/core';


@Directive({
  selector: '[appInputValidation]'
})
export class InputValidationDirective{

  constructor(private el: ElementRef){

  }

  @Output() onValidation = new EventEmitter();

  @HostListener('keyup') onKeyPress(){
    let regExp = /^[а-яА-ЯёЁa-zA-Z0-9\s]+$/;
    if(!this.el.nativeElement.value.match(regExp)){
      this.el.nativeElement.parentElement.className = 'form-group-sm has-error';
      this.onValidation.emit(false);
    }else{
      this.el.nativeElement.parentElement.className = 'form-group-sm';
      this.onValidation.emit(true);
    }
  }
}
