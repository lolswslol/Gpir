import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {ProjectService} from "../../services/project.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  projects: Array<Object> = new Array();

  constructor(private authenticationService: AuthenticationService, private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getAllProjects().subscribe(data=>{this.projects=data;console.log(this.projects)});
  }

logout(){
    this.authenticationService.logout();
}

}
