import { Directive, ElementRef, Input, HostListener, DoCheck, Output, EventEmitter} from '@angular/core';


@Directive({
  selector: '[appModalInputValidation]'
})
export class ModalInputValidationDirective{

  constructor(private el: ElementRef){
    this.baseClass = this.el.nativeElement.parentElement.className;
  }

  baseClass;

  @Input() index;
  @Input() fieldName:String;
  @Input() regExp;
  @Output() onValidation = new EventEmitter<Object>();

  @HostListener('keyup') onKeyPress(){
    if(!this.el.nativeElement.value.match(this.regExp)){
      let event = {name:this.fieldName,value: false,index:this.index};
      this.el.nativeElement.parentElement.className = this.baseClass + ' has-error';
      this.onValidation.emit(event);
    }else{
      this.el.nativeElement.parentElement.className = this.baseClass;
      let event = {name:this.fieldName,value: true,index:this.index};
      this.onValidation.emit(event);
    }
  }
}
