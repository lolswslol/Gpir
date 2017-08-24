import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  constructor(
      private authenticationService:AuthenticationService,
      private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  ngOnInit() {
  }

  onLoginSubmit(){

  }

}
