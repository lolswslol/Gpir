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
  projectNew;

  constructor(private http: Http, private authenticationService: AuthenticationService) {
    let currentProject = JSON.parse(localStorage.getItem('currentProject'));
    this.currentProjectName = currentProject && currentProject.name;
    this.currentProjectId = currentProject && currentProject.id;
    this.writable = currentProject && currentProject.writable;
    this.projectNew = currentProject && currentProject.projectNew;
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
      writable: apiProject.writable,
      projectNew: apiProject.projectNew
    };
    this.currentProjectId = project.id;
    this.currentProjectName = project.name;
    this.writable = project.writable;
    this.projectNew = project.projectNew;
    localStorage.setItem('currentProject',JSON.stringify({name: project.name, id: project.id, writable: project.writable, projectNew: project.projectNew}))
  }

  clearCurrentProject(){
    this.currentProjectId = null;
    this.currentProjectName = null;
    this.writable = null;
    this.projectNew = null;
    localStorage.removeItem('currentProject');
  }

  isProjectActive(){
    if(this.currentProjectId && this.currentProjectName){
      return true
    }else return false
  }

  setWritableProject(){
    this.writable = !this.writable;
    let currentProject = JSON.parse(localStorage.getItem('currentProject'));
    currentProject.writable = !currentProject.writable;
    localStorage.setItem('currentProject',JSON.stringify(currentProject));
  }

}
