import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import { AuthenticationService } from "../../../services/authentication.service";
import { domain } from "../../../config/config";
import { ProjectService } from "../../../services/project.service";

@Component({
  selector: 'app-customers-executors-info',
  templateUrl: './customers-executors-info.component.html',
  styleUrls: ['./customers-executors-info.component.css']
})
export class CustomersExecutorsInfoComponent implements OnInit {

  domain = domain;
  model={
    coExecutors:[],
    responsibleOrg:'',
    okfsId: null,
    customerId: null
  };
  executorModel = {
    id: null,
    fullName:'',
    shortName:'',
    addressFact:'',
    addressJurid:'',
    okpo: null,
    okulp: null,
    unp: null,
    oked: null,
    okogu: null,
  };
  message;
  messageClass;
  listOfExecutors;
  listOfCustomers;
  listOfOkfs;
  id;
  processing = false;



  constructor(private http: Http, private authenticationService: AuthenticationService, private projectService: ProjectService) {
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
    this.http.get(this.domain+'api/okfs',this.authenticationService.options)
      .map(res=>res.json())
      .subscribe(data=>{
          this.listOfOkfs = data;
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
        ()=>{});
    this.http.get(this.domain+'api/executors_info/'+this.projectService.currentProjectId,this.authenticationService.options)
      .map(res=>res.json())
      .subscribe(data=>{
        this.model = data;
        this.id = data.id;
      },
        (err)=>{
        this.message = 'Произошла ошибка загрузки списка Исполнителей. Перезагрузите страницу.';
        this.messageClass = 'alert alert-danger'
      },
        ()=>{this.http.get(this.domain+'api/executor/'+this.id,this.authenticationService.options)
          .map(res=>res.json())
          .subscribe((data)=>{
          this.executorModel = data;
          },
            (err)=>{
              this.message = 'Произошла ошибка. Перезагрузите страницу.';
              this.messageClass = 'alert alert-danger'
            },
            ()=>{})});
  }



  changeExecutor(id){
   this.processing = true;
    this.http.get(this.domain+'api/executor/'+id,this.authenticationService.options)
      .map(res=>res.json())
      .subscribe((data)=>{
        this.executorModel = data;
      },
        (err)=>{
      this.message = 'Произошла ошибка выбора исполнителя. Попробуйте выбрать сново.';
      this.messageClass = 'alert alert-danger';
      this.processing = false;
        },
        ()=>{
      this.processing = false;
        })
  }

  submit(){
    this.processing = true;
    let body = {
      id: this.executorModel.id,
      fullName: this.executorModel.fullName,
      shortName: this.executorModel.shortName,
      responsibleOrg: this.model.responsibleOrg,
      addressFact: this.executorModel.addressFact,
      addressJurid: this.executorModel.addressJurid,
      okpo: this.executorModel.okpo,
      okulp: this.executorModel.okulp,
      unp: this.executorModel.unp,
      oked: this.executorModel.oked,
      okogu: this.executorModel.okogu,
      okfsId: this.model.okfsId,
      customerId: this.model.customerId,
      coExecutors: this.model.coExecutors
    };
    this.authenticationService.createAuthenticationHeaders();
    this.http.post(this.domain+'api/executors_info/'+this.projectService.currentProjectId,JSON.stringify(body),this.authenticationService.options)
      .subscribe(data=>{},
        (err)=>{
        this.message = 'Не возможно сохранить данные. Ошибка серверной части';
        this.messageClass = 'alert alert-danger';
        this.processing = false;
        },
        ()=>{
        this.message = 'Данные успешно сохранены.';
        this.messageClass = 'alert alert-success';
        this.processing = false;
        });
  }

  addCoExecutor(){
    this.model.coExecutors.push(new Object());
  }

  removeCoExecutor(index){
    this.model.coExecutors.splice(index,1);
  }


}
