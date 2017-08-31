import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import { Router } from "@angular/router";
import { domain } from '../config/config';


@Injectable()
export class AuthenticationService {

  domain = domain;
  token: String;
  username: String;
  role: String;
  isLogged: boolean = false;

  options: RequestOptions;


  constructor(private http: Http, private router: Router) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let currentToken = JSON.parse(localStorage.getItem('currentToken'));



    if(localStorage.getItem('currentUser') && localStorage.getItem('currentToken')){
      this.isLogged = true;
      this.token = currentToken && currentToken.token;
      this.username = currentUser && currentUser.username;
      this.role = currentUser && currentUser.role;
    }else {
      this.isLogged = false;
      this.token = null;
      this.username = null;
      this.role = null;
    }
  }

  loadToken(){
    this.token = JSON.parse(localStorage.getItem('currentToken')).token;
  }

  createAuthenticationHeaders() {
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'X-Authorization':'Bearer '+ this.token,
        'Cache-Control':'no-cache'
      })
    });
  }


  login(user):Observable<boolean>{

    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'X-Requested-With':'XMLHttpRequest',
        'Cache-Control':'no-cache'
      })
    });

    return this.http.post(this.domain+'api/auth/login',user,this.options)
        .map((res:Response)=>{
          const token = res.json() && res.json().token;
          const username = res.json && res.json().username;
          const role = res.json && res.json().role;
          if(token){
            this.token = token;
            this.username = username;
            this.role = role;
            this.isLogged = true;
            localStorage.setItem('currentToken',JSON.stringify({token:token}));
            localStorage.setItem('currentUser',JSON.stringify({username:username,role:role}));
            return true;
          }else {
            return false;
          }
        })
        .catch((error: Response)=>{
          return Observable.throw(error);
        })
  }

  logout(){
    this.token = null;
    this.username = null;
    this.role = null;
    this.isLogged = false;
    localStorage.removeItem('currentToken');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn():Observable<boolean>{
    this.createAuthenticationHeaders();
    return this.http.get(this.domain+'api/me',this.options)
        .map(res=>{
          return res.json();
        })
        .catch((error)=>{
          return Observable.throw(error);
        })
        ;
  }



}
