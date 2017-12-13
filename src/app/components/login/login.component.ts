import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {Message} from 'primeng/components/common/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  processing: boolean = false;
  msgs: Message[]=[];



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
            setTimeout(()=>{
              this.router.navigate(['/entry-point'])
            },1000)
          }
        },
            (error)=>{
            this.enableForm();
            this.processing = false;
            this.showError();
            },
            ()=>{
            this.showSuccess();
            })

  }

  logout(){
    this.authenticationService.logout();
  }

  //Messages
  showSuccess() {
    this.msgs = [];
    this.msgs.push({severity:'success', summary:'Вы удачно вошли в систему', detail:'сейчас вы будете перенаправлены'});
  }

  //Error
  showError(){
    this.msgs = [];
    this.msgs.push({severity:'error', summary:'Ошибка авторизации', detail:'Не правильный логин или пароль'});
  }

}
