import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";
import { ProjectService } from "../../../services/project.service";
import { AuthenticationService } from "../../../services/authentication.service";
import { domain } from "../../../config/config";

@Component({
  selector: 'app-customers-work-place',
  templateUrl: './customers-work-place.component.html',
  styleUrls: ['./customers-work-place.component.css']
})
export class CustomersWorkPlaceComponent implements OnInit {

  domain = domain;

  constructor(private http: Http, private authenticationService: AuthenticationService, private projectService: ProjectService) { }

  ngOnInit() {
    this.authenticationService.createAuthenticationHeaders();
    this.http.get(this.domain+'api/work_place/'+this.projectService.currentProjectId,this.authenticationService.options)
      .map(res=>res.json())
      .subscribe(data=>{
        console.log(data);
      })
  }

}
