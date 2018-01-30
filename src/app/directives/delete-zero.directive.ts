import {Directive, HostListener, ElementRef} from '@angular/core';


@Directive({
  selector: '[appDeleteZero]'
})
export class DeleteZeroDirective {

  constructor(private el: ElementRef) { }

  @HostListener('focus') onFocus(){
    if(this.el.nativeElement.value === '0'){
      this.el.nativeElement.value = '';
    }
  }
  @HostListener('blur') onBlur(){
    if(this.el.nativeElement.value === ''){
      this.el.nativeElement.value = '0';
    }
  }

}
