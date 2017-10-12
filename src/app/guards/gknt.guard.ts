import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from "../services/authentication.service";
import { Observable } from "rxjs";
import { ProjectService } from "../services/project.service";


@Injectable()
export class GkntGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private projectService: ProjectService, private router: Router){

  }
  canActivate(){
    if(this.authenticationService.role === 'GKNT'){
      return true
    }else {
      return false;
    }
  }
}
