import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from "./app-routing.module";
import { AuthenticationService } from "./services/authentication.service";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpModule} from "@angular/http";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";

//Guards
import { AuthGuard } from "./guards/auth.guard";
import { NoAuthGuard } from "./guards/noAuth.guard";
import { ProjectGuard } from "./guards/project.guard";
import { GkntGuard } from "./guards/gknt.guard";

//Components
import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReportComponent } from './components/report/report.component';
import { CustomersProjectInfoComponent } from './components/customers-forms-dir/customers-project-info/customers-project-info.component';
import { CustomersExecutorsInfoComponent } from './components/customers-forms-dir/customers-executors-info/customers-executors-info.component';
import { CustomersPlannedDateComponent } from './components/customers-forms-dir/customers-planned-date/customers-planned-date.component';
import { ProjectProfileComponent } from './components/project-profile/project-profile.component';
import { EntryPointComponent } from './components/entry-point/entry-point.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { CustomersFinancingComponent } from './components/customers-forms-dir/customers-financing/customers-financing.component';
import { CustomersTermsComponent } from './components/customers-forms-dir/customers-terms/customers-terms/customers-terms.component';
import { CustomersCostInnovationComponent } from './components/customers-forms-dir/customers-cost-innovation/customers-cost-innovation.component';
import { CustomersCountryYearsComponent } from './components/customers-forms-dir/customers-country-years/customers-country-years.component';
import { CustomersProductComponent } from './components/customers-forms-dir/customers-product/customers-product.component';
import { CustomersProductionComponent } from './components/customers-forms-dir/customers-production/customers-production.component';

//Services
import { ProjectService } from "./services/project.service";
import { CustomMessageService } from "./services/custom-message.service";

//Directives
import { SelectProjectDirective } from './directives/select-project.directive';
import { InputValidationDirective } from "./directives/input-validation.directive";
import { ChangeBackgroundDirective } from './directives/change-background.directive';
import { CreateProjectValidationDirective } from "./components/create-project/create-project-validation.directive";
import { ModalInputValidationDirective } from './directives/modal-input-validation.directive';
import { DynamicValidationInputDirective } from './directives/dynamic-validation-input.directive';
import { NotAvailableDirective } from './directives/not-available.directive';
import { DynamicInputDirective } from './directives/dynamic-input.directive';
import { DeleteZeroDirective } from './directives/delete-zero.directive';

//PrimeNG modules
import { DialogModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AccordionModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { SpinnerModule } from 'primeng/primeng';
import { AutoCompleteModule } from 'primeng/primeng';

//Pipes
import { RolePipe } from "./pipes/role.pipe";
import { ButtonDatePipe } from './pipes/button-date.pipe';
import { ProjectColorPipe } from './pipes/project-color.pipe';



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
    ProjectProfileComponent,
    EntryPointComponent,
    ChangeBackgroundDirective,
    CreateProjectValidationDirective,
    RolePipe,
    CreateProjectComponent,
    CustomersTermsComponent,
    ModalInputValidationDirective,
    ButtonDatePipe,
    CustomersFinancingComponent,
    DynamicValidationInputDirective,
    CustomersCostInnovationComponent,
    CustomersCountryYearsComponent,
    NotAvailableDirective,
    CustomersProductComponent,
    CustomersProductionComponent,
    DynamicInputDirective,
    ProjectColorPipe,
    DeleteZeroDirective,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    DialogModule,
    BrowserAnimationsModule,
    AccordionModule,
    AutoCompleteModule,
    GrowlModule,
    SpinnerModule,

  ],
  providers: [AuthenticationService, ProjectService, AuthGuard, NoAuthGuard, GkntGuard, CustomMessageService, ProjectGuard,{ provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
