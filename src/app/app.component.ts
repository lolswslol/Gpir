import { Component } from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {Router} from "@angular/router";
import {ProjectService} from "./services/project.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authenticationService: AuthenticationService, private projectService: ProjectService, private router: Router){
    this.authenticationService.isLoggedIn().subscribe(data=>{
      this.authenticationService.isLogged = data;
    },
      (err)=>{
      this.projectService.clearCurrentProject();
      this.authenticationService.isLogged = false;
      this.router.navigate(['/login']);
      },
      ()=>{})
  }

}
