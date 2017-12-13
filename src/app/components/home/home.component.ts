import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../../services/project.service";
import { AuthenticationService } from "../../services/authentication.service";
import {trigger, transition, style, animate} from "@angular/animations";
import {Message} from "primeng/components/common/message";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateY(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class HomeComponent implements OnInit {

  projects: Array<Object> = [];
  message;
  messageClass;
  customersListIndex = null;
  msgs: Message[]=[];





  constructor(private projectService: ProjectService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.projectService.getAllProjects()
      .subscribe(data=>{
        if(this.authenticationService.role === 'EXECUTOR' || this.authenticationService.role === 'CUSTOMER'){
          console.log(data);
          this.projects = data;
        }else {
          console.log(data);
         this.projects = data;
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
   this.showSuccess($event)
  }

  selectCustomer(i){
    if(i!=this.customersListIndex){
      this.customersListIndex = i;
    }else {
      this.customersListIndex = null;
    }

  }

  //Messages
  showSuccess(message) {
    this.msgs = [];
    this.msgs.push({severity:'success', summary:'Проект выбран', detail:message});
  }

  //Error
  showError(){
    this.msgs = [];
    this.msgs.push({severity:'error', summary:'Ошибка авторизации', detail:'Не правильный логин или пароль'});
  }


}
