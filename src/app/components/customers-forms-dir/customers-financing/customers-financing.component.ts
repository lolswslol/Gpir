import { Component, OnInit } from '@angular/core';
import { domain } from '../../../config/config';
import { AuthenticationService } from "../../../services/authentication.service";
import { ProjectService } from "../../../services/project.service";
import { Http } from "@angular/http";



@Component({
  selector: 'app-customers-financing',
  templateUrl: './customers-financing.component.html',
  styleUrls: ['./customers-financing.component.css']
})
export class CustomersFinancingComponent implements OnInit {

  message;
  messageClass;
  domain = domain;
  headerModel;
  model;
  validationMap = new Map();
  regExp = /^[0-9]{1,11}(.[0-9]?)?$/;
  valid = true;
  processing = false;
  commentModel;





  constructor(private authenticationService: AuthenticationService,
              private projectService: ProjectService,
              private http: Http) { }

  ngOnInit() {
    this.authenticationService.createAuthenticationHeaders();
    this.http.get(this.domain+'api/financing/'+this.projectService.currentProjectId,this.authenticationService.options)
      .map(res=>res.json())
      .subscribe(data=>{
        console.log(data);
        this.model = data.fieldModels;
        this.headerModel = data.years;
      },
        (err)=>{
        console.log(err);
          this.message = 'Не удалось получить данные с сервера';
          this.messageClass = 'alert alert-danger';
        },
        ()=>{});
    this.http.get(this.domain+'/api/comments/FINANCING_COMMENTS/'+this.projectService.currentProjectId,this.authenticationService.options)
      .map(res=>res.json())
      .subscribe(data=>{
        console.log(data);
          this.commentModel = data.commentFieldModels;
        },
        (err)=>{
          console.log('Произошла ошибка '+err);
          this.message = 'Ошибка загрузки данных комментарий. Перезагрузите страницу';
          this.messageClass = 'alert alert-danger';
        },
        ()=>{});
  }

  check($event){
     if(this.validationMap.has($event.status)){
       this.validationMap.delete($event.status);
       this.validationMap.set($event.status,$event.value);
     }else {
       this.validationMap.set($event.status,$event.value);
     }
     this.checkValid();
  }

  getRowSum(){
    this.model.forEach(s=>{
      let sum : number = 0;
      for(let i=0;i<s.yearFieldModels.length-1;i++){
        sum = sum + Number(s.yearFieldModels[i].value);
      }
      s.yearFieldModels[s.yearFieldModels.length-1].value = sum.toFixed(1);
    })
  }

  getColSum(){
    for(let k=0;k<=this.model[0].yearFieldModels.length-1;k++){
      let summa:number = 0;
      for(let i=0;i<this.model.length-1;i++){
        if(this.model[i].code.indexOf('.',0) === -1 && this.model[i].yearFieldModels[k].value){
          summa = summa + Number(this.model[i].yearFieldModels[k].value);
        }
      }
      this.model[this.model.length-1].yearFieldModels[k].value = summa;
    }
  }


  onChange(){
    this.getRowSum();
    this.getColSum();
  }

  checkValid(){
    this.valid = true;
    this.validationMap.forEach((s)=>{
      if(!s.valid){
        this.valid = false;
      }
    });
  }


  submit(){
    this.processing = true;
    if(this.valid){
      this.authenticationService.createAuthenticationHeaders();
      let body = {
        financingFieldModels: this.model,
        id: this.projectService.currentProjectId
      };
      this.http.post(this.domain+'api/financing/'+this.projectService.currentProjectId, JSON.stringify(body),this.authenticationService.options)
        .subscribe(()=>{
            this.message = 'Данные были успешно сохранены';
            this.messageClass = 'alert alert-success';
            setTimeout(()=>{
              this.message = null;
              this.messageClass = null;
            },4000)
          },
          (err)=>{
          console.log(err);
            this.message = 'Не возможно сохранить данные';
            this.messageClass = 'alert alert-danger';
          },
          ()=>{
            this.processing = false;
          })
    }

  }
}
