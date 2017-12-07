import {Directive, Input, Output, EventEmitter, HostListener, ElementRef, DoCheck} from '@angular/core';


@Directive({
  selector: '[appDynamicInput]'
})
export class DynamicInputDirective implements DoCheck{

  @Input() code:string;
  @Input() index;
  @Input() model;
  @Input() regExp;
  @Output() setValidationStatus = new EventEmitter();
  @Output() checkEvent = new EventEmitter();


  constructor(private el: ElementRef) {
    this.setValidationStatus.emit({status: this.code +'/'+ this.index, value: {code: this.code,index:this.index,value:0}});
  }

  @HostListener('keyup') onKeyPress() {
    if (this.el.nativeElement.value.match(this.regExp) && this.showParent()) {
      this.setValidationStatus.emit({
        status: this.code + '/' + this.index,
        value: {valid: true, code: this.code, index: this.index, value: this.el.nativeElement.value}
      });
      this.el.nativeElement.parentElement.className = 'form-group-sm';
      this.checkEvent.emit({message: 'checkEvent'})
    }else {
      this.setValidationStatus.emit({
        status: this.code + '/' + this.index,
        value: {valid: false, code: this.code, index: this.index, value: this.el.nativeElement.value}
      });
      this.el.nativeElement.parentElement.className = 'form-group-sm has-error';
      this.checkEvent.emit({message: 'checkEvent'});
    }


}

  ngDoCheck(){
    if (this.el.nativeElement.value.match(this.regExp) && this.showParent()) {
      this.setValidationStatus.emit({
        status: this.code + '/' + this.index,
        value: {valid: true, code: this.code, index: this.index, value: this.el.nativeElement.value}
      });
      this.el.nativeElement.parentElement.className = 'form-group-sm';
      this.checkEvent.emit({message: 'checkEvent'})
    }else {
      this.setValidationStatus.emit({
        status: this.code + '/' + this.index,
        value: {valid: false, code: this.code, index: this.index, value: this.el.nativeElement.value}
      });
      this.el.nativeElement.parentElement.className = 'form-group-sm has-error';
      this.checkEvent.emit({message: 'checkEvent'});
    }
  }

  showParent2(){
    let parent:number = 0;
    this.model.forEach(s=>{
      if(s.code!=null && this.code.split('.')[0] === s.code && this.code.split('.').length > 0){
        parent = Number(s.yearFieldModels[this.index].value);
      }
    });

    let sum: number = 0;
    this.model.forEach(s=>{
      if(s.code!=null && this.code.split('.')[0] === s.code.split('.')[0] &&  s.code.split('.').length > 1){
        sum += Number(s.yearFieldModels[this.index].value);
      }
    });
    if(parent<sum){
      return false;
    }else return true;
  }

  showParent(){
    if(this.code.split('.').length>1){
      let arr = this.code.split('.');
      length = arr.length - 1;
      let parent = 0;
      let sum = 0;
      this.model.forEach(s => {
        if (s.code.split('.').length === length && arr[length - 1] === s.code.split('.')[length - 1] && arr[length - 2] === s.code.split('.')[length - 2]) {
          parent = Number(s.yearFieldModels[this.index].value);
        }
      });
      this.model.forEach(s => {
        if (s.code.split('.').length === length + 1 && s.code.split('.')[length - 1] === arr[length - 1] && s.code.split('.')[length - 2] === arr[length - 2]) {
          sum += Number(s.yearFieldModels[this.index].value);
        }
      });
      if (parent < sum) {
        return false;
      } else return true;
    }else return true
  }


}
