import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";
import {ProjectService} from "../../services/project.service";

@Component({
  selector: 'app-entry-point',
  templateUrl: './entry-point.component.html',
  styleUrls: ['./entry-point.component.css']
})
export class EntryPointComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private projectService: ProjectService) { }

  ngOnInit() {
  }

}
