import { Component, OnInit } from '@angular/core';
import { ProjectService } from "../../services/project.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  projects: Array<Object> = [];


  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getAllProjects().subscribe(data=>{this.projects=data});
  }


}
