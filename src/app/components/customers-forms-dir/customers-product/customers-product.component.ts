import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {ProjectService} from "../../../services/project.service";
import { AuthenticationService } from "../../../services/authentication.service";
import { domain } from '../../../config/config';

@Component({
  selector: 'app-customers-product',
  templateUrl: './customers-product.component.html',
  styleUrls: ['./customers-product.component.css']
})
export class CustomersProductComponent implements OnInit {


  domain = domain;
  model;
  display = false;
  modalObject = {
    name: null,
    powerCost: null,
    powerPhysical: null,
    unitPhysical: null,
    productId: null,
    tnVed: null,

  };

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
      })
  }

  submit(){
    this.authenticationService.createAuthenticationHeaders();
    let body = {
      productFieldModels: this.model,
      projectId: this.projectService.currentProjectId,
    };
    this.http.post(this.domain+'api/product/'+this.projectService.currentProjectId,JSON.stringify(body),this.authenticationService.options)
      .subscribe(data=>{
        console.log(data);
      })
  }

  addProduct(){
    this.display = true;
  }

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

}
