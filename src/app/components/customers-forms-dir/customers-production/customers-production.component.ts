import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { domain } from '../../../config/config';
import { AuthenticationService } from "../../../services/authentication.service";
import { ProjectService } from "../../../services/project.service";
import { Http } from "@angular/http";
import {Message} from "primeng/components/common/message";

@Component({
  selector: 'app-customers-production',
  templateUrl: './customers-production.component.html',
  styleUrls: ['./customers-production.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CustomersProductionComponent implements OnInit {


  message;
  messageClass;
  domain = domain;
  valid = true;
  processing = false;

  //main table models
  headerModel;
  model;
  validationMap = new Map();

  //RegExp
  regExp = /^[0-9]{1,11}(.[0-9]?)?$/;
  fullYearRegExp: RegExp = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
  fieldRegExp: RegExp = /^[A-Za-zА-Яа-я0-9\-_/ ]{1,90}$/;


  //modal window models
  display = false;
  modalCommentObject: Object = {};
  commentModel = [];
  modalValidationMap = new Map();
  modalValid: boolean = false;

  test=1;

  msgs: Message[] = [];

  constructor(private authenticationService: AuthenticationService,
              private projectService: ProjectService,
              private http: Http) { }

  ngOnInit() {
    //get Main table data
    this.authenticationService.createAuthenticationHeaders();
    this.http.get(this.domain+'api/production/'+this.projectService.currentProjectId,this.authenticationService.options)
      .map(res=>res.json())
      .subscribe(data=>{
          console.log(data);
          this.model = data.fieldModels;
          this.headerModel = data.years;
        },
        (err)=>{
          console.log(err);
          this.showError(null,'Не удалось получить данные с сервера');
          this.message = 'Не удалось получить данные с сервера';
          this.messageClass = 'alert alert-danger';
        },
        ()=>{});

    //get comments data
    this.http.get(this.domain+'/api/comments/PRODUCTION_COMMENTS/'+this.projectService.currentProjectId,this.authenticationService.options)
      .map(res=>res.json())
      .subscribe(data=>{
          console.log(data);
          this.commentModel = data.commentFieldModels;
        },
        (err)=>{
          console.log('Произошла ошибка '+err);
          this.showError(null,'Не удалось получить данные с сервера');
          this.message = 'Ошибка загрузки данных комментарий. Перезагрузите страницу';
          this.messageClass = 'alert alert-danger';
        },
        ()=>{});
  }

  showModel(){
    console.log(this.model);
  }

  check11($event,localModel,i){
    /*console.log($event);
    console.log(localModel);
    console.log(i);*/
    let a = localModel.code + 'y' +i;
    console.log(a);
   /* if(this.validationMap.has(a)){
      this.validationMap.delete(a);
      this.validationMap.set(a,$event.target.value);
    }else {
      this.validationMap.set($event.status,$event.value);
    }*/
    this.checkValidInput(a);
  }

  checkValidInput(string){
    let code = string.split('y')[0];
    let year = string.split('y')[1];
    let sum = 0;
    let parent = 0;
    if(code.length>1){
    this.model.forEach(s=>{
      if(s.code.slice(0,-1) === code.slice(0,-1)){
        sum = sum + Number(s.yearFieldModels[year].value);
      }
      if(s.code === code.slice(0,-2)){
        parent = s.yearFieldModels[year].value;
      }
    });
    if(sum<=parent){
      console.log('correct');
    }else console.log('incorrect');
    }else {
      console.log('else');
    }


  }

  deleteZero($event){
    if($event.target.value === '0')
    $event.target.value='';
  }

  returnZero($event){
    if($event.target.value === '')
      $event.target.value='0';
  }

  setTab(code){
    if(code.split('.').length>1){
      return true
    }else false
  }

  //Main table validation func
  check($event){
    if(this.validationMap.has($event.status)){
      this.validationMap.delete($event.status);
      this.validationMap.set($event.status,$event.value);
    }else {
      this.validationMap.set($event.status,$event.value);
    }
    this.checkValid();
  }

  //calculate row values of the main table
  getRowSum(){
    this.model.forEach(s=>{
      let sum : number = 0;
      for(let i=0;i<s.yearFieldModels.length-1;i++){
        sum = sum + Number(s.yearFieldModels[i+1].value);
      }
      s.yearFieldModels[0].value = sum.toFixed(1);
    })
  }

  //calculate column values of the main table
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

  //do calculation operations with every input
  onChange(){
    this.getRowSum();
    /*this.getColSum();*/
  }

  //create a Map for validation Main table
  createModalValidationMap(): void{
    this.modalValidationMap.set('newDate',false);
    this.modalValidationMap.set('documentName',false);
    this.modalValidationMap.set('documentDate',false);
    this.modalValidationMap.set('reason',false);
  }

  //Check valid of main table before save
  checkValid(){
    this.valid = true;
    this.validationMap.forEach((s)=>{
      if(!s.valid){
        this.valid = false;
      }
    });
  }

  //Func for validating modal window
  modalValidate($event): void{
    this.modalValid = true;
    if(!$event.value){
      this.showError(null,'Не верный ввод данных в поле');
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

  //Emit modal window by clicking on the fields
  editData(i,k, name, year, value): void{
    if(this.projectService.projectNew === false && this.projectService.writable === true && year !=0){
      this.createModalValidationMap();
      this.modalValid = false;
      this.modalCommentObject = {
        dictionaryName: name,
        oldVal: value,
        nameIndex: i,
        yearIndex: k,
        year: year
      };
      this.display = true;
    }
  }

  //Close Modal Window
  rejectEditing(){
    this.display = false;
  }

  //method to change new value in main table based by modal window
  static changeNewValue(model,obj): void{
    model[obj.nameIndex].yearFieldModels[obj.yearIndex].value = +obj.newVal;
  }

  //save modal window
  modalSave(){
    let model = JSON.parse(JSON.stringify(this.model));
    console.log(CustomersProductionComponent.changeNewValue(model,this.modalCommentObject));
    console.log(model);
    let commentModel = this.commentModel.concat([]);
    commentModel.push(this.modalCommentObject);
    console.log({id: this.projectService.currentProjectId, stages: model, comments: commentModel});

    this.http.post(this.domain+'api/production/'+ this.projectService.currentProjectId, JSON.stringify({projectId: this.projectService.currentProjectId, fieldModels: model, comments: commentModel}), this.authenticationService.options)
      .map(res=>res.json())
      .subscribe((data)=>{
          commentModel = data;
          this.showSuccess(null,'Данные были успешно сохранены');
        },
        (err)=>{
          console.log(err);
          this.showError(null,'Ошибка при сохранении. Перезагрузите страницу');
          this.message = 'Ошибка при сохранении. Перезагрузите страницу';
          this.messageClass = 'alert alert-danger';
        },
        ()=>{
          this.model = model;
          this.commentModel = commentModel;
          this.display = false;
          this.onChange();
        });
  }


  //save Main table
  submit(){
    this.processing = true;
    if(this.valid){
      this.authenticationService.createAuthenticationHeaders();
      let body = {
        fieldModels: this.model,
        projectId: this.projectService.currentProjectId
      };
      this.http.post(this.domain+'api/production/'+this.projectService.currentProjectId, JSON.stringify(body),this.authenticationService.options)
        .subscribe(()=>{
            this.showSuccess(null,'Данные были успешно сохранены');
            this.message = 'Данные были успешно сохранены';
            this.messageClass = 'alert alert-success';
            setTimeout(()=>{
              this.message = null;
              this.messageClass = null;
            },4000)
          },
          (err)=>{
            console.log(err);
            this.showError(null,'Ошибка при сохранении. Перезагрузите страницу');
            this.message = 'Не возможно сохранить данные';
            this.messageClass = 'alert alert-danger';
          },
          ()=>{
            this.processing = false;

          })
    }

  }

  check1(){
    console.log(this.codeSeparated(this.model[2].code))
  }

//test

  codeSeparated(code:string){
    return code.split('.')
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
