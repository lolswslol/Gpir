import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {ProjectService} from "../../services/project.service";
import { Http } from "@angular/http";
import { domain } from '../../config/config';

@Component({
  selector: 'app-project-profile',
  templateUrl: './project-profile.component.html',
  styleUrls: ['./project-profile.component.css']
})
export class ProjectProfileComponent implements OnInit {

  projects = [];
  message;
  messageClass;
  domain = domain;

  constructor(private authenticationService: AuthenticationService, private projectService: ProjectService, private http: Http) { }

  ngOnInit() {
    this.projectService.getAllProjects()
      .subscribe(data=>{
        console.log(data);
          this.projects=data;
        },
        (err)=>{
          this.message = 'Произошла ошибка загрузки проектов, попробуйте перезагрузить страницу';
          this.messageClass = 'alert alert-danger';
        },
        ()=>{});
  }

  display: boolean = false;

  showDialog() {
    this.display = true;
  }

  sendTo(id){
    this.authenticationService.createAuthenticationHeaders();
    this.http.post(this.domain+'api/submit/'+id,null,this.authenticationService.options)
      .subscribe(data=>{
        this.projects.forEach((s)=>{
          if(s.id===id){
            s.writable = false;
          }
        })
      },
        (err)=>{
        console.log('err')
        },
        ()=>{})
  }

}
