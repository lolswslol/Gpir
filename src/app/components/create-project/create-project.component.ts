import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { domain } from '../../config/config';
import { AuthenticationService } from "../../services/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})


export class CreateProjectComponent implements OnInit {

  domain = domain;
  message;
  messageClass;
  model = {};
  listOfExecutors;
  listOfCustomers;
  coExecutors = Array<Object>();
  processing = false;
  anyRegExp = /^[а-яА-ЯёЁa-zA-Z0-9\s]+$/;
  dateRegExp = /^(19|20)\d{2}$/;
  validationMap;
  valid = false;

  constructor(private http: Http, private authenticationService: AuthenticationService, private router: Router) {
    this.createValidationMap();
  }

  createValidationMap(){
    this.validationMap =  new Map([['inputName',false],['inputExecutor',false],['selectExecutor',false],['selectCustomer',false],['selectProjectType',false]]);
  }


  ngOnInit() {
    this.authenticationService.createAuthenticationHeaders();
    this.http.get(this.domain+'api/executors',this.authenticationService.options)
      .map(res=>res.json())
      .subscribe(data=>{
        this.listOfExecutors = data;
      },
        (err)=>{
          this.message = 'Произошла ошибка загрузки списка Исполнителей. Перезагрузите страницу.';
          this.messageClass = 'alert alert-danger'
        },
        ()=>{});
    this.http.get(this.domain+'api/customers',this.authenticationService.options)
      .map(res=>res.json())
      .subscribe(data=>{
        this.listOfCustomers = data;
      },
        (err)=>{
          this.message = 'Произошла ошибка загрузки Списка Заказчиков. Перезагрузите страницу.';
          this.messageClass = 'alert alert-danger'
        },
        ()=>{})
  }

  submit(){
    this.processing = true;
    let model = {
      model:this.model,
      coExecutors:this.coExecutors
    };
    this.authenticationService.createAuthenticationHeaders();
    this.http.post(this.domain+'api/project/new',JSON.stringify(model),this.authenticationService.options)
      .subscribe(data=>{
        this.message = 'Проект успешно создан.Через пару секунд вы будете перенаправлены';
        this.messageClass = 'alert alert-success';
        setTimeout(()=>{
          this.router.navigate(['/home']);
        },3000)
      },
        (err)=>{
          this.message = 'Не возможно создать проект. Попробуйте позже.';
          this.messageClass = 'alert alert-danger';
          this.processing = false;
        },
        ()=>{})
  }

  validate($event){
    if(!$event.value){
      this.message = 'Не вверный ввод данных в поле';
      this.messageClass = 'alert alert-danger';
    }else {
      this.message = null;
      this.messageClass = null;
    }
    this.validationMap.delete($event.name);
    this.validationMap.set($event.name,$event.value);
    this.valid = true;
    this.validationMap.forEach(s=>{
      if(!s){
        this.valid = false;
      }
    });
  }

  addCoExecutor(){
    this.coExecutors.push(new Object());
  }

  removeCoExecutor(index){
    this.coExecutors.splice(index,1);
  }
}
