import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import { AuthenticationService } from "../../../services/authentication.service";
import { domain } from '../../../config/config';
import {ProjectService} from "../../../services/project.service";
import {Message} from "primeng/components/common/message";

@Component({
  selector: 'app-customers-project-info',
  templateUrl: './customers-project-info.component.html',
  styleUrls: ['./customers-project-info.component.css']
})
export class CustomersProjectInfoComponent implements OnInit {

  domain = domain;
  model={id:null};
  message;
  messageClass;
  processing = false;
  valid = true;
  validationMap = new Map();
  //RegExp for custom validation directives
  anyRegExp = /.*\S.*/g;
  numbericRegExp = /^\d+$/;
  yearRegExp = /^(20)\d{2}$/;
  dateProgramRegExp = /(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)\d\d/;


  //Messages
  msgs: Message[]=[];



  constructor(private http: Http, private authenticationService: AuthenticationService, private projectService: ProjectService) { }

  ngOnInit() {
    this.authenticationService.createAuthenticationHeaders();
    this.http.get(this.domain+'api/project_info/'+this.projectService.currentProjectId,this.authenticationService.options)
      .map(res=>res.json())
      .subscribe((data)=>{
                            this.model = data;
                            for(let key in data){

                              this.validationMap.set(key,true)
                            }
                          },
                  (err)=>{
                          console.log(err);
                          this.message = 'Произошла ошибка загрузки проекта. Перезагрузите страницу.';
                          this.messageClass = 'alert alert-danger';
                          this.showError('Ошибка','Произошла ошибка загрузки проекта. Перезагрузите страницу.')},

                  ()=>{});


  }

  submit(){
    this.processing = true;
    this.authenticationService.createAuthenticationHeaders();
    this.http.post(this.domain+'api/project_info/'+this.model.id,this.model,this.authenticationService.options)
      .subscribe(()=>{
        this.showSuccess(null,'Данные были успешно сохранены');
        this.message = 'Данные были успешно сохранены';
        this.messageClass = 'alert alert-success';
      },
        (err)=>{
        if(err.status === 401){
         this.message = 'Ваш токен истек. Пожалуйста перелогиньтесь.';
         this.messageClass = 'alert alert-danger';
         setTimeout(()=>{
           this.projectService.clearCurrentProject();
           this.authenticationService.logout();
         },4000)
        }else {
          this.showError('Ошибка','Произошла ошибка загрузки проекта. Перезагрузите страницу.');
          this.message = 'Произошла ошибка сохранения данных';
          this.messageClass = 'alert alert-danger';
          this.processing = false;
        setTimeout(()=>{
            this.message = null;
            this.messageClass = ''},4000)
          }
        },
        ()=>{
        this.processing = false;
        setTimeout(()=>{
          this.message = null;
          this.messageClass = ''},4000)
        })
  }

  //Validate from directive

  validate($event){
    this.valid = true;
    if(!$event.value){
      this.showError('Ошибка валидации','Не правильный ввод данных в поле');
      this.message = 'Не верный ввод данных в поле';
      this.messageClass = 'alert alert-danger';
    }else {
      this.msgs = [];
      this.message = null;
      this.messageClass = null;
    }
    this.validationMap.delete($event.name);
    this.validationMap.set($event.name, $event.value);
    this.validationMap.forEach((s)=>{
      if(!s){
        this.valid = false;
      }
    });
  }

  //Messages
  showSuccess(summary,message) {
    this.msgs = [];
    this.msgs.push({severity:'success', summary:summary, detail:message});
  }

  //Error
  showError(summary,message){
    this.msgs = [];
    this.msgs.push({severity:'error', summary:summary, detail:message});
  }
}
