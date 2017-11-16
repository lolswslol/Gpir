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

  constructor(private http: Http,
              private authenticationService: AuthenticationService,
              private projectService: ProjectService){

  }



//common stuff
  domain: string = domain;
  message: string;
  messageClass: string;
  display: boolean = false;

//modal windows models
  modalWindowObject: Object ={};
  modalCommentObject: Object = {};

//main table models
  model: Object;
  commentModel = [];


//main table validation
  valid: boolean = true;
  processing: boolean = false;
  validationMap = new Map();
  yearRegExp: RegExp = /(0[1-9]|1[012])[/](19|20)\d{2}$/;

//modal window validation
  modalValidationMap = new Map();
  modalValid: boolean = false;
  fullYearRegExp: RegExp = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
  fieldRegExp: RegExp = /^[A-Za-zА-Яа-я0-9\-_/ ]{1,90}$/;

  //-->LIFECYCLE HOOKS

  ngOnInit() {
//Creating auth headers for http requests
    this.authenticationService.createAuthenticationHeaders();

//Get main table data and fills validation Map for main table
    this.http.get(this.domain+'api/plan_stage/'+this.projectService.currentProjectId,this.authenticationService.options)
      .map(res=>res.json())
      .subscribe(data=>{
        data.stages.forEach((s)=>{
          if(s.value === null && s.status===false){
            s.value = 'Не определено'
          }
        });
        this.model = data.stages;
          for(let key in data.stages){
            this.validationMap.set(key,true)
          }
      },
        (err)=>{
          console.log('Произошла ошибка '+err);
          this.message = 'Ошибка загрузки данных таблицы. Перезагрузите страницу';
          this.messageClass = 'alert alert-danger';
        },
        ()=>{});

//Get main table comments data
    this.http.get(this.domain+'/api/comments/PLAN_STAGE_COMMENTS/'+this.projectService.currentProjectId,this.authenticationService.options)
      .map(res=>res.json())
      .subscribe(data=>{
        this.commentModel = data.commentFieldModels;
      },
        (err)=>{
          console.log('Произошла ошибка '+err);
          this.message = 'Ошибка загрузки данных комментарий. Перезагрузите страницу';
          this.messageClass = 'alert alert-danger';
        },
        ()=>{});
  }

  //--> END OF LIFECYCLE HOOKS

  //--> MAIN TABLE METHODS
//validate current input, check and change table validation in common
  validate($event): void{
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

//Disabling input when "n/a date" button is pressed
  disableDate(index){
    if(this.projectService.projectNew){
      if(this.model[index].status === false){
        console.log(this.model[index].status);
        this.model[index].status = true;
        this.model[index].value = null;
      }else {
        console.log(this.model[index].status);
        this.model[index].status = false;
        this.model[index].value = 'Не определено';
      }
    }
  }

//sending data to the server
  submit(): void{
    this.http.post(this.domain+'api/plan_stage/'+ this.projectService.currentProjectId, JSON.stringify({id: this.projectService.currentProjectId, stages: this.model, comments: this.commentModel}), this.authenticationService.options)
      .subscribe(()=>{
          this.message = 'Данные успешно сохранены';
          this.messageClass = 'alert alert-success';
        },
        (err)=>{
          console.log(err);
          this.message = 'Ошибка при сохранении. Перезагрузите страницу';
          this.messageClass = 'alert alert-danger';
        },
        ()=>{});
  }

//intercept event of editing confirmed planed data with opening new modal window for editing.
  editData(id, name, value): void{
    if(this.projectService.projectNew === false && this.projectService.writable === true){
      this.createModalValidationMap();
      this.modalValid = false;
      this.modalCommentObject = {
        dictionaryName: name,
        oldVal: value,
        localId: id,
      };
      this.display = true;
    }
  }

//change main table data with new value from modal window
  static changeNewValue(model,obj): void{
    model[obj.localId].value = obj.newVal;
  }

  //--> END OF MAIN TABLE METHODS

  //--> MODAL WINDOW METHODS

//creating modal window validation Map
  createModalValidationMap(): void{
    this.modalValidationMap.set('newDate',false);
    this.modalValidationMap.set('documentName',false);
    this.modalValidationMap.set('documentDate',false);
    this.modalValidationMap.set('reason',false);
  }

//validate input event from modal window
  modalValidate($event): void{
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

//cancel modal window
  rejectEditing(): void{
    this.modalWindowObject = {};
    this.modalValidationMap.clear();
    this.display = false;
    this.message = '';
    this.messageClass = null;
  }

//submit modal window data. Sending to the server, save , if successful - change comments and main table models
  modalSave(): void{
    let model = JSON.parse(JSON.stringify(this.model));
    let commentModel = this.commentModel.concat([]);
    commentModel.push(this.modalCommentObject);
    CustomersTermsComponent.changeNewValue(model,this.modalCommentObject);

    this.http.post(this.domain+'api/plan_stage/'+ this.projectService.currentProjectId, JSON.stringify({id: this.projectService.currentProjectId, stages: model, comments: commentModel}), this.authenticationService.options)
      .map(res=>res.json())
      .subscribe((data)=>{
        console.log(data);
        commentModel=data;
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
  //--> END OF MODAL WINDOW METHODS

}
