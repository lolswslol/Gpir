import { Component, OnInit } from '@angular/core';
import { domain } from '../../../config/config';
import { AuthenticationService } from "../../../services/authentication.service";
import { ProjectService } from "../../../services/project.service";
import { Http } from "@angular/http";
import { Observable } from "rxjs";

@Component({
  selector: 'app-customers-country-years',
  templateUrl: './customers-country-years.component.html',
  styleUrls: ['./customers-country-years.component.css']
})
export class CustomersCountryYearsComponent implements OnInit {

  domain = domain;
  message;
  messageClass;
  processing = false;

  modalObject = {
    investmentFullModels: [],
    investmentDirectForeignModels: []
  };

  display = false;

  filteredCountriesSingle: string[];
  country={id:null,name:null};



  model;
  valid = true;
  mainModelValidationMap = new Map();
  headerModel;
  validationMap = new Map();
  regExp = /^[0-9]{1,11}(.[0-9]?)?$/;
  modalValid = false;
  modalMessage = 'Выберите из списка страну';





  constructor(private authenticationService: AuthenticationService,
              private projectService: ProjectService,
              private http: Http) { }

  ngOnInit() {
    this.authenticationService.createAuthenticationHeaders();
    this.http.get(this.domain+'/api/investment/'+this.projectService.currentProjectId,this.authenticationService.options)
      .map(res=>res.json())
      .subscribe(data=>{
        console.log('obtained data',data);
        this.headerModel = data.years;
        this.model = data.countriesYears;
      })
  }

  deleteCountry(index){
    this.model.splice(index,1);
  }

  addCountry(){
    this.modalObject = {
      investmentFullModels: [],
      investmentDirectForeignModels: []
    };
    this.create();
    this.display = true;
  }

  getCountries():Observable<any>{
    this.authenticationService.createAuthenticationHeaders();
    return this.http.get('http://192.168.11.93:9966/api/countries',this.authenticationService.options)
      .map(res=>res.json()||{});

  }

  filterCountrySingle($event) {
    let query = $event.query;
    this.getCountries()
      .subscribe(countries => {
        console.log('countries', countries);
        this.filteredCountriesSingle = this.filterCountry(query, countries);
        console.log(this.filteredCountriesSingle);


      });
  }

  validateCountryInput(){
    let i = this.country.id;
    console.log('текущая ид',i);
    this.getCountries()
      .subscribe(countries => {
        console.log(countries);
        this.model.forEach(s=>{
          if(s.oksmId === i){
            this.modalValid = false;
            this.modalMessage = 'Такая страна уже есть'
          }
        })
      });
  }

  rejectEditing(){
    this.display = false;
    this.country={id:null,name:null};
  }

  filterCountry(query, countries: any[]):any[] {
    let filtered: any[] = [];
    for (let i = 0; i < countries.length; i++) {
      let country = countries[i];
      /*console.log(country.name);*/
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        console.clear();
        console.log('pushing' + country);
        filtered.push(country);
        console.log(filtered);
      }
    }
    return filtered;
  }

  show($event){
    this.modalValid = false;
    if(this.validationMap.has($event.name)){
      this.validationMap.delete($event.name);
      this.validationMap.set($event.name,$event.value);
      this.checkValid();
    }else {
      this.validationMap.set($event.name,$event.value);
      this.checkValid();
    }
  }

  checkValid(){
    this.modalValid = true;
    if(this.validationMap.size>0){
      this.validationMap.forEach((s)=>{
        if(typeof this.country.id === "number") {
          if (!s) {
            console.log('falsed');
            this.modalValid = false;
          }
        }
      })
    }else {
      if(typeof this.country.id === "number"){
        this.modalValid = true;
      }else this.modalValid = false;
    }
  }


  submit(){
    this.processing = true;
    this.authenticationService.createAuthenticationHeaders();
    this.http.post(this.domain+'api/investment/'+this.projectService.currentProjectId,JSON.stringify({countriesYears:this.model, projectId: this.projectService.currentProjectId}),this.authenticationService.options)
      .subscribe(()=>{
          this.message = 'Данные были успешно сохранены';
          this.messageClass = 'alert alert-success';
        },
        (err)=>{
          if(err.status === 401){
            this.message = 'Ваш токен истек. Пожалуйста перелогиньтесь.';
            this.messageClass = 'alert alert-danger';
            setTimeout(()=>{
              this.projectService.clearCurrentProject();
              this.authenticationService.logout();
            },4000)
          }else {
            this.message = 'Произошла ошибка сохранения данных';
            this.messageClass = 'alert alert-danger';
            this.processing = false;
            setTimeout(()=>{
              this.message = null;
              this.messageClass = ''},4000)
          }
        },
        ()=>{
          this.processing = false;
          setTimeout(()=>{
            this.message = null;
            this.messageClass = ''},4000)
        })
  }


  countryMessage(){
    if(typeof this.country.id === "number"){
      this.modalMessage = null;
    }else this.modalMessage = 'Выберите из списка страну'
  }

  checkCountry(){
    console.log(this.projectService);
  }

  validateMainModel($event){
    console.log($event);
    this.valid = false;
    if(this.mainModelValidationMap.has($event.name)){
      this.mainModelValidationMap.delete($event.name);
      this.mainModelValidationMap.set($event.name,$event.value);
      this.checkValidInput();
    }else {
      this.mainModelValidationMap.set($event.name,$event.value);
      this.checkValidInput();
    }
  }

  checkValidInput(){
    this.valid = true;
      this.mainModelValidationMap.forEach((s)=>{
          if (!s) {
            console.log(s);
            this.valid = false;
          }
      })
  }

  saveNewCountry(){
    let body = {
      oksmId: this.country.id,
      oksmName: this.country.name,
      investmentDirectForeignModels: this.modalObject.investmentDirectForeignModels,
      investmentFullModels: this.modalObject.investmentFullModels
    };
    let editedModel = JSON.parse(JSON.stringify(this.model));
    editedModel.push(body);
    this.authenticationService.createAuthenticationHeaders();
    this.http.post(this.domain+'/api/investment/'+this.projectService.currentProjectId,JSON.stringify({countriesYears:editedModel,projectId: this.projectService.currentProjectId}),this.authenticationService.options)
      .subscribe((data)=>{
        console.log(data);
      },
        (err)=>{},
        ()=>{
              this.model.push(body);
              this.rejectEditing();


    })
  }


  create(){
    this.headerModel.forEach(s=>{
      this.modalObject.investmentFullModels.push({year:s,value:0});
      this.modalObject.investmentDirectForeignModels.push({year:s,value: 0});
    });
    console.log(this.modalObject);
    }


}
