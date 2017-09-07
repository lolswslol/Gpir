import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from "./app-routing.module";
import { AuthenticationService } from "./services/authentication.service";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { HttpModule} from "@angular/http";
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from "./guards/auth.guard";
import { NoAuthGuard } from "./guards/noAuth.guard";
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProjectService } from "./services/project.service";
import { SelectProjectDirective } from './directives/select-project.directive';
import { ReportComponent } from './components/report/report.component';
import { ProjectGuard } from "./guards/project.guard";
import { CustomersProjectInfoComponent } from './components/customers-forms-dir/customers-project-info/customers-project-info.component';
import { InputValidationDirective } from "./directives/input-validation.directive";
import { CustomersExecutorsInfoComponent } from './components/customers-forms-dir/customers-executors-info/customers-executors-info.component';
import { CustomersPlannedDateComponent } from './components/customers-forms-dir/customers-planned-date/customers-planned-date.component';
//PrimeNG modules


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    SelectProjectDirective,
    InputValidationDirective,
    ReportComponent,
    CustomersProjectInfoComponent,
    CustomersExecutorsInfoComponent,
    CustomersPlannedDateComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
  ],
  providers: [AuthenticationService, ProjectService, AuthGuard, NoAuthGuard, ProjectGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
