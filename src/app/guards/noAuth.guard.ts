import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from "../services/authentication.service";


@Injectable()
export class NoAuthGuard implements CanActivate {

    constructor(private authenticationService: AuthenticationService,private router: Router){

    }
    canActivate(){

        if(!this.authenticationService.isLogged && !localStorage.getItem('currentUser')){
            return true
        }else {
            this.router.navigate(['/'])
            return false
        }

    }
}