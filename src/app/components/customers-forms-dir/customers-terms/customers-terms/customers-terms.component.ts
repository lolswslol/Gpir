import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import { domain } from '../../../../config/config';
import {AuthenticationService} from "../../../../services/authentication.service";
import {ProjectService} from "../../../../services/project.service";

@Component({
  selector: 'app-customers-terms',
  templateUrl: './customers-terms.component.html',
  styleUrls: ['./customers-terms.component.css']
})
export class CustomersTermsComponent implements OnInit {

  constructor(private http: Http, private authenticationService: AuthenticationService, private projectService: ProjectService) { }

  domain = domain;
  model;
  commentModel=[];
  message;
  messageClass;

  ngOnInit() {
    this.authenticationService.createAuthenticationHeaders();
    this.http.get(this.domain+'api/plan_stage/'+this.projectService.currentProjectId,this.authenticationService.options)
      .map(res=>res.json())
      .subscribe(data=>{
        console.log(data);
        this.model = data.stages;
      },
        (err)=>{
          this.message = 'Ошибка загрузки данных таблицы. Перезагрузите страницу';
          this.messageClass = 'alert alert-danger';
        },
        ()=>{});

    this.http.get(this.domain+'api/comments/PLAN_STAGE_COMMENTS/'+this.projectService.currentProjectId,this.authenticationService.options)
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

}
