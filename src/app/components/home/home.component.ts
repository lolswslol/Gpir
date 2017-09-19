import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../../services/project.service";
import { AuthenticationService } from "../../services/authentication.service";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  projects: Array<Object> = [];
  message;
  messageClass;
  customersListIndex = null;





  constructor(private projectService: ProjectService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.projectService.getAllProjects()
      .subscribe(data=>{
        console.log(data);
        if(this.authenticationService.role === 'EXECUTOR' || this.authenticationService.role === 'CUSTOMER'){
          this.projects = data;
        }else {
         this.projects = Object.entries(data);
        }
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

  onChoose(project){
    this.projectService.chooseProject(project);
  }

  onCustomerChoose($event){

  }

  selectCustomer(i){
    if(i!=this.customersListIndex){
      this.customersListIndex = i;
    }else {
      this.customersListIndex = null;
    }

  }



}
