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
  fullYearRegExp: RegExp = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
  fieldRegExp: RegExp = /^[A-Za-zА-Яа-я0-9\-_/ ]{1,90}$/;
  valid = true;
  processing = false;
  commentModel = [];
  display = false;
  modalValidationMap = new Map();
  modalValid: boolean = false;

  //modal windows models
  modalCommentObject: Object = {};



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

  show(){
    console.log(this.model);
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

  createModalValidationMap(): void{
    this.modalValidationMap.set('newDate',false);
    this.modalValidationMap.set('documentName',false);
    this.modalValidationMap.set('documentDate',false);
    this.modalValidationMap.set('reason',false);
  }

  checkValid(){
    this.valid = true;
    this.validationMap.forEach((s)=>{
      if(!s.valid){
        this.valid = false;
      }
    });
  }

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
      console.log(this.modalCommentObject);
      this.display = true;
    }
  }

  rejectEditing(){
    this.display = false;
  }

  static changeNewValue(model,obj): void{
    model[obj.nameIndex].yearFieldModels[obj.yearIndex].value = +obj.newVal;
  }

  modalSave(){
    let model = JSON.parse(JSON.stringify(this.model));
    console.log(CustomersFinancingComponent.changeNewValue(model,this.modalCommentObject));
    console.log(model);
    let commentModel = this.commentModel.concat([]);
    commentModel.push(this.modalCommentObject);
    console.log({id: this.projectService.currentProjectId, stages: model, comments: commentModel});

    this.http.post(this.domain+'api/financing/'+ this.projectService.currentProjectId, JSON.stringify({projectId: this.projectService.currentProjectId, fieldModels: model, comments: commentModel}), this.authenticationService.options)
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
          this.onChange();
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
