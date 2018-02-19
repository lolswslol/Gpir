import { Injectable } from '@angular/core';
import { ProjectService } from "../services/project.service";
import { CanActivate } from "@angular/router";

@Injectable()
export class ProjectGuard implements CanActivate {
  constructor(private projectService: ProjectService){
  }

  canActivate(){
    if(this.projectService.isProjectActive()){
      return true
    }else return false;

  }
}
