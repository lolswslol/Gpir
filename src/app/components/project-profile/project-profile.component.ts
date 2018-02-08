import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {ProjectService} from "../../services/project.service";
import { Http } from "@angular/http";
import { domain } from '../../config/config';
import { Router } from "@angular/router";

@Component({
  selector: 'app-project-profile',
  templateUrl: './project-profile.component.html',
  styleUrls: ['./project-profile.component.css']
})
export class ProjectProfileComponent implements OnInit {

  id;
  domain = domain;
  project;
  processing = false;
  confirmed = false;
  message;
  messageClass;

  constructor(private authenticationService: AuthenticationService, private projectService: ProjectService, private http: Http, private router: Router) {
    this.id = this.projectService.currentProjectId;
  }

  ngOnInit() {
    this.projectService.getSingleProject(this.id)
      .subscribe(data=>{
        this.project = data;
        console.log(data);
      },
        (err)=>{console.log(err)},
        ()=>{});
    console.log(this.projectService.writable);
  }

  confirmProject(){
    this.processing = true;
    this.authenticationService.createAuthenticationHeaders();
    this.http.post(this.domain+'api/submit/'+this.id,null,this.authenticationService.options)
      .subscribe(data=>{
        this.message = 'Проект отправлен на проверку';
        this.messageClass = 'alert alert-success';
        this.confirmed = true;
        this.processing = false;
      },
        (err)=>{
        this.message = 'Проект не удалось сохранить';
        this.messageClass = 'alert alert-danger';
        this.processing = true;
        this.confirmed = false;
        },
        ()=>{
        this.projectService.setWritableProject();
        })
  }

  rejectProject(){
    this.authenticationService.createAuthenticationHeaders();
    this.http.post(this.domain+'api/return_project/'+this.id,null,this.authenticationService.options)
      .subscribe(()=>{
          this.message = 'Проект отправлен на доработку';
          this.messageClass = 'alert alert-warning';
          this.confirmed = true;
          this.processing = false;
        },
        ()=>{
          this.message = 'Проект не удалось сохранить';
          this.messageClass = 'alert alert-danger';
          this.processing = true;
          this.confirmed = false;
        },
        ()=>{
          this.projectService.setWritableProject();
        })
  }


}
