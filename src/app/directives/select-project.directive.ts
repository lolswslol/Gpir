import { Directive, ElementRef, Input, HostListener, DoCheck, Output, EventEmitter} from '@angular/core';
import { ProjectService } from "../services/project.service";

@Directive({
  selector: '[appSelectProject]'
})
export class SelectProjectDirective implements DoCheck{

  constructor(private el: ElementRef, private projectService: ProjectService) {

  }

  @Output() choose = new EventEmitter();
  @Input() project;


  @HostListener('click') onMouseClick(){
    this.projectService.chooseProject(this.project);
    this.choose.emit(this.project.nameProject);
  }

  ngDoCheck(){
    if(this.project.id === this.projectService.currentProjectId){
      this.el.nativeElement.className = 'text-success';
    }else {
      this.el.nativeElement.className = 'text-primary';
    }
  }
}
