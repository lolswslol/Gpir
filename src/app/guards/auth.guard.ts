import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from "../services/authentication.service";
import { Observable } from "rxjs";
import {ProjectService} from "../services/project.service";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService, private projectService: ProjectService, private router: Router){

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
            /*this.router.navigate(['/login']);*/
            return Observable.throw(error)
            })




    }
}
