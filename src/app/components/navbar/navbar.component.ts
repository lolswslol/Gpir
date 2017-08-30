import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

 isLogged: boolean = false;

  constructor(private authenticationService: AuthenticationService){
  }

  ngOnInit() {

  }

  logout(){
    this.authenticationService.logout();
  }
}
