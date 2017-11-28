import { RouterModule } from "@angular/router";
import { NgModule } from '@angular/core';
import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import {AuthGuard} from "./guards/auth.guard";
import {ReportComponent} from "./components/report/report.component";
import {ProjectGuard} from "./guards/project.guard";
import { CustomersProjectInfoComponent } from "./components/customers-forms-dir/customers-project-info/customers-project-info.component";
import { CustomersExecutorsInfoComponent } from "./components/customers-forms-dir/customers-executors-info/customers-executors-info.component";
import { CustomersPlannedDateComponent } from "./components/customers-forms-dir/customers-planned-date/customers-planned-date.component";
import { ProjectProfileComponent } from "./components/project-profile/project-profile.component";
import { EntryPointComponent } from "./components/entry-point/entry-point.component";
import { CreateProjectComponent } from "./components/create-project/create-project.component";
import { GkntGuard } from "./guards/gknt.guard";
import { CustomersTermsComponent } from "./components/customers-forms-dir/customers-terms/customers-terms/customers-terms.component";
import { CustomersFinancingComponent } from "./components/customers-forms-dir/customers-financing/customers-financing.component";
import { CustomersCostInnovationComponent } from "./components/customers-forms-dir/customers-cost-innovation/customers-cost-innovation.component";

const appRoutes=[
    {path:"",component: HomeComponent, canActivate: [AuthGuard]},
    {path:"login",component: LoginComponent,},
    {path:"home",component: HomeComponent, canActivate: [AuthGuard]},
    {path:"entry-point",component: EntryPointComponent, canActivate: [AuthGuard]},
    {path:"report",component: ReportComponent, canActivate: [AuthGuard,ProjectGuard]},
 /* Customers routes*/
    {path:"customers-project-info",component: CustomersProjectInfoComponent, canActivate: [AuthGuard,ProjectGuard]},
    {path:"customers-executors-info",component: CustomersExecutorsInfoComponent, canActivate: [AuthGuard,ProjectGuard]},
    {path:"customers-planned-date",component: CustomersPlannedDateComponent, canActivate: [AuthGuard,ProjectGuard]},
    {path:"customers-financing",component: CustomersFinancingComponent, canActivate: [AuthGuard,ProjectGuard]},
    {path:"customers-cost-innovation",component: CustomersCostInnovationComponent, canActivate: [AuthGuard,ProjectGuard]},
    {path:"customers-terms",component: CustomersTermsComponent, canActivate: [AuthGuard,ProjectGuard]},
    {path:"project-profile",component: ProjectProfileComponent, canActivate: [AuthGuard,ProjectGuard]},
    {path:"create-project",component: CreateProjectComponent, canActivate: [AuthGuard,GkntGuard]},
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
