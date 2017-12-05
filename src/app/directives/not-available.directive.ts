import {
  Directive, ElementRef, Input, Output, EventEmitter, DoCheck, OnChanges,SimpleChanges

} from '@angular/core';

@Directive({
  selector: '[appNotAvailable]'
})
export class NotAvailableDirective implements DoCheck{

  constructor(private el: ElementRef ){

  }
  @Input() index;
  @Input() regExp;
  @Output() onValidation = new EventEmitter<Object>();


   ngDoCheck(){
     if(!this.el.nativeElement.value.match(this.regExp)){
       let event = {name:'fieldName',value: false,index:this.index};
       this.el.nativeElement.parentElement.className = 'form-group-sm has-error';
       this.onValidation.emit(event);
     }else{
       this.el.nativeElement.parentElement.className = 'form-group-sm';
       let event = {name:'fieldName',value: true,index:this.index};
       this.onValidation.emit(event);
     }
   }



}
