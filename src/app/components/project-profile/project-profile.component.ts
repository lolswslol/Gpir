import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {ProjectService} from "../../services/project.service";
import { Http } from "@angular/http";
import { domain } from '../../config/config';

@Component({
  selector: 'app-project-profile',
  templateUrl: './project-profile.component.html',
  styleUrls: ['./project-profile.component.css']
})
export class ProjectProfileComponent implements OnInit {

  id;
  domain = domain;

  constructor(private authenticationService: AuthenticationService, private projectService: ProjectService, private http: Http) { }

  ngOnInit() {
    this.id = this.projectService.currentProjectId;
  }

  confirmProject(){
    this.authenticationService.createAuthenticationHeaders();
    this.http.post(this.domain+'api/submit/'+this.id,null,this.authenticationService.options)
      .subscribe(data=>{
        console.log(data)
      })
  }

  rejectProject(){
    this.authenticationService.createAuthenticationHeaders();
    this.http.post(this.domain+'api/return_project/'+this.id,null,this.authenticationService.options)
      .subscribe(data=>{
        console.log(data)
      })
  }

}
