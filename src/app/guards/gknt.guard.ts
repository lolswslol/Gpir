import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from "../services/authentication.service";



@Injectable()
export class GkntGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService){

  }
  canActivate(){
    if(this.authenticationService.role === 'GKNT'){
      return true
    }else return false;

  }
}
