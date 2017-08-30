import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  processing: boolean = false;
  message: String;
  messageClass: String;



  constructor(
      private authenticationService:AuthenticationService,
      private formBuilder: FormBuilder,
      private router: Router
  ) {
    this.form = this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    });
  }

  ngOnInit() {
  }

  enableForm(){
    this.form.controls['username'].enable();
    this.form.controls['password'].enable();
  }

  disableForm(){
    this.form.controls['username'].disable();
    this.form.controls['password'].disable();
  }


  onLoginSubmit(){
    this.processing = true;
    this.disableForm();
    let user = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    };
    this.authenticationService.login(user)
        .subscribe((data)=>{
          if(data===true){
            this.message = 'Вы успешно вошли под своим аккаунтом';
            this.messageClass = 'alert alert-success';
            setTimeout(()=>{
              this.router.navigate(['/home'])
            },3000)
          }
        },
            (error)=>{
            this.message = 'Не правильное имя пользователя или пароль';
            this.messageClass = 'alert alert-danger';
            this.enableForm();
            },
            ()=>{})

  }

  logout(){
    this.authenticationService.logout();
  }

}
