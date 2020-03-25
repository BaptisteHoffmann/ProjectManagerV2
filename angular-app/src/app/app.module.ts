import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/error-interceptor.service';
import { AuthGuardService } from './services/auth-guard.service';
import { EtatprojetComponent } from './etatprojet/etatprojet.component';
import { EtatprojetadminComponent } from './etatprojetadmin/etatprojetadmin.component';
import { FormulaireadminComponent } from './formulaireadmin/formulaireadmin.component';
import { FormulaireclientComponent } from './formulaireclient/formulaireclient.component';
import { ResumeprojetComponent } from './resumeprojet/resumeprojet.component';
import { ResumeprojetadminComponent } from './resumeprojetadmin/resumeprojetadmin.component';
import { CreationusersComponent } from './creationusers/creationusers.component';
import { ErrorComponent } from './error/error.component';
import { DatePipe } from '@angular/common';
import { Role } from './modeles/role';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VerificationDemandeService } from './services/verification-demande.service';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserComponent } from './user/user.component';
import { JwPaginationComponent } from 'jw-angular-pagination';


const appRoutes: Routes = [
  { path: 'authentification', component: AuthentificationComponent },
  { path: 'formulaireclient', canActivate: [AuthGuardService], component: FormulaireclientComponent },
  { path: 'formulaireadmin/:id', canActivate: [AuthGuardService], data: { roles: [Role.Admin] }, component: FormulaireadminComponent },
  { path: 'resumeprojet/:iduser/:iddemande', canActivate: [AuthGuardService, VerificationDemandeService], component: ResumeprojetComponent},
  { path: 'resumeprojetadmin/:iddemande', canActivate: [AuthGuardService , VerificationDemandeService], data: { roles: [Role.Admin] }, component: ResumeprojetadminComponent},
  { path: 'etatprojet', canActivate: [AuthGuardService],  data: { roles: [Role.User] }, component: EtatprojetComponent},
  { path: 'etatprojetadmin', canActivate: [AuthGuardService], data: { roles: [Role.Admin] }, component: EtatprojetadminComponent},
  { path: 'utilisateurs', canActivate: [AuthGuardService], data: { roles: [Role.Admin] }, component: ListUsersComponent},
  { path: 'utilisateur/:iduser', canActivate: [AuthGuardService], component: UserComponent},
  { path: 'creationusers',  data: { roles: [Role.Admin] }, canActivate: [AuthGuardService], component: CreationusersComponent},
  { path: '', component: AuthentificationComponent },
  { path: 'erreur', component: ErrorComponent},
  {path : '**', redirectTo: '/erreur'}
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthentificationComponent,
    EtatprojetComponent,
    EtatprojetadminComponent,
    FormulaireadminComponent,
    FormulaireclientComponent,
    ResumeprojetComponent,
    ResumeprojetadminComponent,
    CreationusersComponent,
    ErrorComponent,
    ListUsersComponent,
    UserComponent,
    JwPaginationComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
