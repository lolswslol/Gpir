import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {AuthenticationService} from "../../../services/authentication.service";
import {ProjectService} from "../../../services/project.service";
import { domain } from '../../../config/config';


@Component({
  selector: 'app-customers-planned-date',
  templateUrl: './customers-planned-date.component.html',
  styleUrls: ['./customers-planned-date.component.css']
})
export class CustomersPlannedDateComponent implements OnInit {

  domain = domain;
  message;
  messageClass;
  model;
  projectId;
  arrayMaps = [];
  anyRegExp = /(0[1-9]|1[012])[ /](19|20)\d\d/;
  processing = false;
  valid = true;

  constructor(private http: Http, private authenticationService: AuthenticationService, private projectService: ProjectService) { }

  ngOnInit() {
    this.authenticationService.createAuthenticationHeaders();
    this.http.get(this.domain+'api/plan_stage/'+this.projectService.currentProjectId,this.authenticationService.options)
      .map(res=>res.json())
      .subscribe(data=>{
        this.projectId = data.id;
        this.model = data.stages;
        data.stages.forEach((s)=>{
          let map = new Map();
          for(let key in s){
            map.set(key,true);
          }
          this.arrayMaps.push(map);
        })
      },
        (err)=>{
          this.message = 'Произошла ошибка загрузки проекта. Перезагрузите страницу.';
          this.messageClass = 'alert alert-danger'
      },
        ()=>{})
  }

  validate(event){
    this.valid = true;
    this.arrayMaps[event.index].delete(event.name);
    this.arrayMaps[event.index].set(event.name,event.value);
    this.arrayMaps.forEach((s)=>{
      s.forEach((a)=>{
        if(!a){
          this.valid = false;
          this.message = 'Не вверный ввод данных в поле';
          this.messageClass = 'alert alert-danger';
          setTimeout(()=>{
            this.message = null;
            this.messageClass = null;
          },4000)
        }
      })
    })
  }

  submit(){
    this.processing = true;
    this.authenticationService.createAuthenticationHeaders();
    let postData = {id: this.projectId, stages: this.model};
    this.http.post(this.domain+'api/plan_stage/'+this.projectId,postData,this.authenticationService.options)
      .subscribe(data=>{
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

}
