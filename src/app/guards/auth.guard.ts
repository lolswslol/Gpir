import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from "../services/authentication.service";
import { Observable } from "rxjs";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService, private router: Router){

    }
    canActivate(){

        return this.authenticationService.isLoggedIn()
            .map((data)=>{
                if(data){
                    return true;
                }
            })
            .catch((error)=>{
            this.router.navigate(['/login']);
            return Observable.throw(error)

            })




    }
}