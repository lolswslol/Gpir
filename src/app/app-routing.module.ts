import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import {LoginComponent} from "./components/login/login.component";

const appRoutes=[
    {path:"",component:LoginComponent},
    {path:"login",component: LoginComponent},
    {path:"**",component:LoginComponent},

];

@NgModule({
    declarations: [],
    imports: [ RouterModule.forRoot(appRoutes)],
    providers: [],
    bootstrap: [],
    exports:[RouterModule]
})
export class AppRoutingModule { }