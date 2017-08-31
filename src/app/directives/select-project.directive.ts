import { Directive, ElementRef, Input, HostListener, DoCheck } from '@angular/core';
import { ProjectService } from "../services/project.service";

@Directive({
  selector: '[appSelectProject]'
})
export class SelectProjectDirective implements DoCheck{

  constructor(private el: ElementRef, private projectService: ProjectService) {

  }

  @Input() project;


  @HostListener('click') onMouseClick(){
    this.changeAppearance();
    this.projectService.chooseProject(this.project);
  }

  private changeAppearance(){

  }

  ngDoCheck(){
    if(this.project.id === this.projectService.currentProjectId){
      this.el.nativeElement.className = 'text-warning';
    }else {
      this.el.nativeElement.className = 'text-primary';
    }
  }
}
