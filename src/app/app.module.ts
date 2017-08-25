import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from "./app-routing.module";
import { AuthenticationService } from "./services/authentication.service";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpModule} from "@angular/http";
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from "./guards/auth.guard";
import { NoAuthGuard } from "./guards/noAuth.guard";
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  providers: [AuthenticationService, AuthGuard, NoAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
