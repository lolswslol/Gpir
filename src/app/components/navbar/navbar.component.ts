import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";
import { ProjectService } from "../../services/project.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

 isLogged: boolean = false;

  constructor(private authenticationService: AuthenticationService, private projectService: ProjectService){
  }

  ngOnInit() {

  }

  logout(){
    this.authenticationService.logout();
    this.projectService.clearCurrentProject();
  }
}
