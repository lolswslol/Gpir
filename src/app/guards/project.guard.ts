import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import { ProjectService } from "../services/project.service";

@Injectable()
export class ProjectGuard implements CanActivate {
  constructor(private projectService: ProjectService, private router: Router){
  }

  canActivate(){
    if(this.projectService.isProjectActive()){
      return true
    }else {
      return false;
    }
  }
}
