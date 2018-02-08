import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {ProjectService} from "../../../services/project.service";
import { AuthenticationService } from "../../../services/authentication.service";
import { domain } from '../../../config/config';
import {Message} from "primeng/components/common/message";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-customers-product',
  templateUrl: './customers-product.component.html',
  styleUrls: ['./customers-product.component.css']
})
export class CustomersProductComponent implements OnInit {


  domain = domain;
  model = [];
  msgs: Message[]=[];
  display = false;
  modalObject = {
    name: null,
    powerCost: null,
    powerPhysical: null,
    unitPhysical: null,
    productId: null,
    tnVed: null,

  };
  validationArray = [];
  tnVedRegExp = /^\d{6}/;
  powerCostRegExp = /^[0-9]{1,11}(.[0-9]?)?$/;
  powerPhysical = /^[0-9]{1,11}(.[0-9]?)?$/;


  constructor(private authenticationService: AuthenticationService,
              private projectService: ProjectService,
              private http: Http) { }

  ngOnInit() {
    this.authenticationService.createAuthenticationHeaders();
    this.http.get(this.domain+'/api/product/'+this.projectService.currentProjectId,this.authenticationService.options)
      .map(res=>res.json())
      .subscribe(data=>{
        console.log(data);
        this.model = data.productFieldModels;
        data.productFieldModels.forEach(()=>{
          let newMap = new Map();
          newMap.set('tnVed',true);
          newMap.set('powerCost',true);
          newMap.set('powerPhysical',true);
          newMap.set('unitPhysical',true);
          this.validationArray.push(newMap);
        });
      })
  }

  submit(){
    this.authenticationService.createAuthenticationHeaders();
    console.log(this.model);
    let body = {
      productFieldModels: this.model,
      projectId: this.projectService.currentProjectId,
    };
    console.log(JSON.stringify(body));
    let o = JSON.stringify(body);
    this.http.post(this.domain+'api/product/'+this.projectService.currentProjectId,o,this.authenticationService.options)
      .subscribe(()=>{
        this.showSuccess(null,'Данные успешно сохранены');
      },
        ()=>{
        this.showError(null,'Ошибка сохранения')
        },
        ()=>{

        })
  }

  //Add new produc in the list
  addProduct(){
    this.modalObject = {
      name: null,
      powerCost: null,
      powerPhysical: null,
      unitPhysical: null,
      productId: null,
      tnVed: null,
    };
    this.display = true;
  }

  //Delete select product form main table
  deleteProduct(index){
    this.authenticationService.createAuthenticationHeaders();
    this.http.post(this.domain+'api/product_delete/'+this.projectService.currentProjectId+'/'+this.model[index].productId,null,this.authenticationService.options)
      .subscribe(()=>{
        this.showInfo(null,'Продукт был удален');
        this.model.splice(index,1);
      });
  }

  //Save product in main table with sendin' to backend
  saveProduct(){
    let model = JSON.parse(JSON.stringify(this.model));
    model.push(this.modalObject);
    let body = {
      productFieldModels: model,
      projectId: this.projectService.currentProjectId
    };
    this.authenticationService.createAuthenticationHeaders();
    this.http.post(this.domain+'/api/product/'+this.projectService.currentProjectId,body,this.authenticationService.options)
      .subscribe(data=>{
        this.model = data.json().productFieldModels;
      });
    this.display = false;
  }

  //Cancel and close modal window
  rejectEditing(){
    this.display = false;
    this.modalObject = {
      name: null,
      powerCost: null,
      powerPhysical: null,
      unitPhysical: null,
      productId: null,
      tnVed: null,
    };
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
  showInfo(summary,message){
    this.msgs = [];
    this.msgs.push({severity:'info', summary:summary, detail:message});
  }
}
