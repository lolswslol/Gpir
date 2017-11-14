import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { domain } from '../../../../config/config';
import { AuthenticationService } from "../../../../services/authentication.service";
import { ProjectService } from "../../../../services/project.service";


@Component({
  selector: 'app-customers-terms',
  templateUrl: './customers-terms.component.html',
  styleUrls: ['./customers-terms.component.css']
})
export class CustomersTermsComponent implements OnInit {

  constructor(private http: Http, private authenticationService: AuthenticationService, private projectService: ProjectService) { }

  processing = false;
  valid = true;
  modalValid = false;
  domain = domain;
  model;
  commentModel=[];
  message;
  messageClass;
  display = false;
  modalWindowObject={};
  modalCommentObject = {};
  validationMap = new Map();
  yearRegExp = /(0[1-9]|1[012])[/](19|20)\d{2}$/;
  fullYearRegExp = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
  fieldRegExp = /^[A-Za-zА-Яа-я0-9\-_]{1,90}$/;
  modalValidationMap = new Map();


  ngOnInit() {
    this.authenticationService.createAuthenticationHeaders();

    this.http.get(this.domain+'api/plan_stage/'+this.projectService.currentProjectId,this.authenticationService.options)
      .map(res=>res.json())
      .subscribe(data=>{
        console.log(data);
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
    console.log(this.commentModel);
  }

  editData(id, name, value){
    this.createModalValidationMap();
    this.modalValid = false;
    if(this.projectService.projectNew === false){
      this.modalCommentObject = {
        dictionaryName: name,
        oldVal: value,
        localId: id,
      };
      this.display = true;
    }
  }

  rejectEditing(){
    this.modalWindowObject = {};
    this.modalValidationMap.clear();
    this.display = false;
    this.message = '';
    this.messageClass = null;
  }

  addComment(){
    console.log(this.modalCommentObject);
    this.commentModel.push(this.modalCommentObject);
    this.changeNewValue(this.model,this.modalCommentObject);
    this.display = false;
  }

  changeNewValue(model,obj){
    model[obj.localId].value = obj.newVal;
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

  createModalValidationMap(){
    this.modalValidationMap.set('newDate',false);
    this.modalValidationMap.set('documentName',false);
    this.modalValidationMap.set('documentDate',false);
    this.modalValidationMap.set('reason',false);
  }

  modalValidate($event){
    this.modalValid = true;
    if(!$event.value){
      this.message = 'Не верный ввод данных в поле';
      this.messageClass = 'alert alert-danger';
    }else {
      this.message = null;
      this.messageClass = null;
    }
    this.modalValidationMap.delete($event.name);
    this.modalValidationMap.set($event.name, $event.value);
    this.modalValidationMap.forEach((s)=>{
      if(!s){
        this.modalValid = false;
      }
    });
  }

  modalSave(){
    let model = JSON.parse(JSON.stringify(this.model));
    let commentModel = this.commentModel.concat([]);
    commentModel.push(this.modalCommentObject);
    this.changeNewValue(model,this.modalCommentObject);
    console.log(this.modalCommentObject);
    console.log(commentModel);
    let body = {id: this.projectService.currentProjectId, stages: model, comments: commentModel};
    console.log(body);


    this.http.post(this.domain+'api/plan_stage/'+ this.projectService.currentProjectId, JSON.stringify({id: this.projectService.currentProjectId, stages: model, comments: commentModel}), this.authenticationService.options)
      .subscribe(data=>{
          console.log('saved');
        },
        (err)=>{
          console.log(err);
          this.message = 'Ошибка при сохранении. Перезагрузите страницу';
          this.messageClass = 'alert alert-danger';
        },
        ()=>{
        this.model = model;
        this.commentModel = commentModel;
        this.display = false;
        });

  }

  submit(){
    this.http.post(this.domain+'api/plan_stage/'+ this.projectService.currentProjectId, JSON.stringify({id: this.projectService.currentProjectId, stages: this.model, comments: this.commentModel}), this.authenticationService.options)
      .subscribe(data=>{
          console.log('saved');
        },
        (err)=>{
        console.log(err);
          this.message = 'Ошибка при сохранении. Перезагрузите страницу';
          this.messageClass = 'alert alert-danger';
        },
        ()=>{});
  }

}
