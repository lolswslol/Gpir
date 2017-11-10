import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { domain } from '../../../../config/config';
import { AuthenticationService } from "../../../../services/authentication.service";
import { ProjectService } from "../../../../services/project.service";
import { DialogModule } from 'primeng/primeng';

@Component({
  selector: 'app-customers-terms',
  templateUrl: './customers-terms.component.html',
  styleUrls: ['./customers-terms.component.css']
})
export class CustomersTermsComponent implements OnInit {

  constructor(private http: Http, private authenticationService: AuthenticationService, private projectService: ProjectService) { }

  processing = false;
  valid = true;
  domain = domain;
  model;
  commentModel=[];
  message;
  messageClass;
  display = false;
  modalWindowObject={};
  modalCommentObject = {};
  validationMap = new Map();


  ngOnInit() {
    this.authenticationService.createAuthenticationHeaders();

    this.http.get(this.domain+'api/plan_stage/'+this.projectService.currentProjectId,this.authenticationService.options)
      .map(res=>res.json())
      .subscribe(data=>{
        console.log(data.stages);
        this.model = data.stages;
          for(let key in data.stages){
            this.validationMap.set(key,true)
          }
      },
        (err)=>{
          this.message = 'Ошибка загрузки данных таблицы. Перезагрузите страницу';
          this.messageClass = 'alert alert-danger';
        },
        ()=>{});

    this.http.get(this.domain+'/api/comments/PLAN_STAGE_COMMENTS/'+this.projectService.currentProjectId,this.authenticationService.options)
      .map(res=>res.json())
      .subscribe(data=>{
        console.log(data);
        this.commentModel = data.commentFieldModels;
      },
        (err)=>{
          this.message = 'Ошибка загрузки данных комментарий. Перезагрузите страницу';
          this.messageClass = 'alert alert-danger';
        },
        ()=>{});
  }

  check(){
    console.log(this.valid);
  }

  editData(id, name, value){
    if(this.projectService.projectNew === false){
      this.processing = true;
      this.modalCommentObject = {
        dictionaryName: name,
        oldVal: value,
        localId: id,
      };
      this.display = true;
    }
  }

  rejectEditing(){
    this.processing = false;
    this.modalWindowObject = {};
    this.display = false;
  }

  addComment(){
    console.log(this.modalCommentObject);
    this.commentModel.push(this.modalCommentObject);
    this.changeNewValue(this.modalCommentObject);
    this.display = false;
  }

  changeNewValue(obj){
    this.model[obj.localId].value = obj.newVal;
  }

  validate($event){
    console.log($event);
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
