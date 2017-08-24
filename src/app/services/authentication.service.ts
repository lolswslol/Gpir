import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

@Injectable()
export class AuthenticationService {

  token: String;
  refreshToken: String;
  username: String;
  role: String;
  isLogged: boolean = false;


  constructor(private http: Http) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let currentToken = JSON.parse(localStorage.getItem('currentToken'));

    this.token = currentToken && currentToken.token;
    this.refreshToken = currentToken && currentToken.refreshToken;
    this.username = currentUser && currentUser.username;
    this.role = currentUser && currentUser.role;

    if(localStorage.getItem('currentUser')&&localStorage.getItem('currentToken')){
      this.isLogged = true;
    }
  }

}
