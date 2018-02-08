import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from "../services/authentication.service";
import { Observable } from "rxjs";
import { ProjectService } from "../services/project.service";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService, private projectService: ProjectService){

    }
    canActivate(){

        return this.authenticationService.isLoggedIn()
            .map((data)=>{
                if(data){
                    return true;
                }
            })
            .catch((error)=>{
            this.authenticationService.logout();
            this.projectService.clearCurrentProject();
            return Observable.throw(error)
            })




    }
}
