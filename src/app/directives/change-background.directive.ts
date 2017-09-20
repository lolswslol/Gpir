import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appChangeBackground]'
})
export class ChangeBackgroundDirective implements OnInit{

  @Input() color:String;

  constructor(private el: ElementRef) {

  }

  ngOnInit(){
    switch(this.color){
      case "YELLOW":{
        this.el.nativeElement.style.background = 'yellow';
        break
      }
      case "GREEN":{
        this.el.nativeElement.style.background = 'green';
        break
      }
      case "RED":{
        this.el.nativeElement.style.background = 'red';
        break
      }
      case "BLUE":{
        this.el.nativeElement.style.background = 'blue';
        break
      }
      default:{
        this.el.nativeElement.style.background = 'black';
        break
      }
    }
  }








}
