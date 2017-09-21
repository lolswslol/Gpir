import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { AuthenticationService } from "./authentication.service";
import { Observable } from "rxjs";
import { domain } from '../config/config';

@Injectable()
export class ProjectService {

  domain = domain;
  currentProjectName: String;
  currentProjectId: Number;
  //test params
  writable;

  constructor(private http: Http, private authenticationService: AuthenticationService) {
    let currentProject = JSON.parse(localStorage.getItem('currentProject'));
    this.currentProjectName = currentProject && currentProject.name;
    this.currentProjectId = currentProject && currentProject.id;
    this.writable = currentProject && currentProject.writable;
  }

  getAllProjects(){
    this.authenticationService.createAuthenticationHeaders();
    return this.http.get(this.domain+'api/projects',this.authenticationService.options)
      .map(res=>res.json())
      .catch((err)=>{
        return Observable.throw(err);
      });
  }

  getSingleProject(id){
    this.authenticationService.createAuthenticationHeaders();
    return this.http.get(this.domain+'api/project_info_submit/'+id,this.authenticationService.options)
      .map(res=>res.json())
      .catch((err)=>{
        return Observable.throw(err)
      })
  }

  chooseProject(apiProject){
    let project = {
      name: apiProject.nameProject,
      id: apiProject.id,
      writable: apiProject.writable
    };
    this.currentProjectId = project.id;
    this.currentProjectName = project.name;
    this.writable = project.writable;
    localStorage.setItem('currentProject',JSON.stringify({name: project.name, id: project.id, writable: project.writable}))
  }

  clearCurrentProject(){
    this.currentProjectId = null;
    this.currentProjectName = null;
    this.writable = true;
    localStorage.removeItem('currentProject');
  }

  isProjectActive(){
    if(this.currentProjectId && this.currentProjectName){
      return true
    }else return false
  }

}
