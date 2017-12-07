import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import { AuthenticationService } from "../../../services/authentication.service";
import { domain } from '../../../config/config';
import {ProjectService} from "../../../services/project.service";

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
  anyRegExp = /^[а-яА-ЯёЁa-zA-Z0-9\s]+$/;
  numbericRegExp = /^\d+$/;
  yearRegExp = /^(19|20)\d{2}$/;



  constructor(private http: Http, private authenticationService: AuthenticationService, private projectService: ProjectService) { }

  ngOnInit() {
    this.authenticationService.createAuthenticationHeaders();
    this.http.get(this.domain+'api/project_info/'+this.projectService.currentProjectId,this.authenticationService.options)
      .map(res=>res.json())
      .subscribe((data)=>{
                            this.model = data;
                            for(let key in data){
                              //noinspection JSUnfilteredForInLoop
                              this.validationMap.set(key,true)
                            }
                          },
                  (err)=>{
                          console.log(err);
                          this.message = 'Произошла ошибка загрузки проекта. Перезагрузите страницу.';
                          this.messageClass = 'alert alert-danger'},
                  ()=>{})

    console.log(this.projectService);
    console.log(this.authenticationService);
  }

  submit(){
    this.processing = true;
    this.authenticationService.createAuthenticationHeaders();
    this.http.post(this.domain+'api/project_info/'+this.model.id,this.model,this.authenticationService.options)
      .subscribe(()=>{
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

  validate($event){
    this.valid = true;
    if(!$event.value){
      this.message = 'Не верный ввод данных в поле';
      this.messageClass = 'alert alert-danger';
    }else {
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
}
