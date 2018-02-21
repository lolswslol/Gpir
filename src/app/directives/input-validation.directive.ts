import { Directive, ElementRef, Input, HostListener, DoCheck, Output, EventEmitter} from '@angular/core';


@Directive({
  selector: '[appInputValidation]'
})
export class InputValidationDirective{

  constructor(private el: ElementRef){

  }
  @Input() index;
  @Input() fieldName:String;
  @Input() regExp;
  @Input() length;
  @Output() onValidation = new EventEmitter<Object>();

  @HostListener('keyup') onKeyPress(){
    if(!this.el.nativeElement.value.match(this.regExp) || this.el.nativeElement.value.length > this.length){
      let event = {name:this.fieldName,value: false,index:this.index};
      this.el.nativeElement.parentElement.className = 'form-group-sm has-error';
      this.onValidation.emit(event);
    }else{
      this.el.nativeElement.parentElement.className = 'form-group-sm';
      let event = {name:this.fieldName,value: true,index:this.index};
      this.onValidation.emit(event);
    }
  }
}
