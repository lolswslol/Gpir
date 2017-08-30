import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class ProjectService {

  constructor(private http: Http, private authenticationService: AuthenticationService) { }

  getAllProjects(){
    this.authenticationService.createAuthenticationHeaders();
    return this.http.get('http://192.168.11.93:9966/api/projects',this.authenticationService.options)
      .map(res=>res.json());
  }

}
