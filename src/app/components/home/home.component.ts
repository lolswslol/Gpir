import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../../services/project.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  projects: Array<Object> = [];
  message;
  messageClass;


  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getAllProjects()
      .subscribe(data=>{
        this.projects=data;
        if(this.projectService.currentProjectId){
          this.onChoose(this.projectService.currentProjectName);
        }
      },
        (err)=>{
        this.message = 'Произошла ошибка загрузки проектов, попробуйте перезагрузить страницу';
        this.messageClass = 'alert alert-danger';
        },
        ()=>{});
  }

  onChoose($event){
    this.message = $event;
    this.messageClass = 'alert alert-success';
  }



}
