import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import {AuthGuard} from "./guards/auth.guard";
import { NoAuthGuard } from "./guards/noAuth.guard";
import {ReportComponent} from "./components/report/report.component";
import {ProjectGuard} from "./guards/project.guard";
import { CustomersProjectInfoComponent } from "./components/customers-forms-dir/customers-project-info/customers-project-info.component";

const appRoutes=[
    {path:"",component: HomeComponent, canActivate: [AuthGuard]},
    {path:"login",component: LoginComponent,},
    {path:"home",component: HomeComponent, canActivate: [AuthGuard]},
    {path:"report",component: ReportComponent, canActivate: [AuthGuard,ProjectGuard]},
 /* Customers routes*/
    {path:"customers-project-info",component: CustomersProjectInfoComponent, canActivate: [AuthGuard,ProjectGuard]},
    {path:"**",component: HomeComponent, canActivate: [AuthGuard]},

];

@NgModule({
    declarations: [],
    imports: [ RouterModule.forRoot(appRoutes)],
    providers: [],
    bootstrap: [],
    exports:[RouterModule]
})
export class AppRoutingModule { }
