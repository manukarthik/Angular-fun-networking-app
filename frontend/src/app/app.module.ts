import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule, MatCardModule, MatToolbarModule,MatInputModule, MatListModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule  } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { AppComponent } from './app.component';
import { ApiService } from "./api.service";
import { AuthService } from "./auth.service";
import { MessagesComponent } from "./Messages/messages.component";
import { RegisterComponent  } from "./Register/register.component";
import { LoginComponent } from "./Login/login.component";
import { UsersComponent } from "./Users/users.component";
import { ProfileComponent } from "./Profile/profile.component";
import { PostComponent } from "./Post/post.component";
import { AuthInterceptorService } from "./authInterceptor.service";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NavService } from './nav.service';
import { RegisterCanDeactivateGuardService } from './Register/register-can-deactivate-guard.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { ProfileGuardService } from './Profile/profile-guard.service';

const routes =[

{ path: '', component: PostComponent },
{path:  'register', component: RegisterComponent, canDeactivate : [RegisterCanDeactivateGuardService]},
{ path: 'login', component: LoginComponent },
{ path: 'users', component: UsersComponent },
{ path: 'profile/:id', 
  component: ProfileComponent ,
  canActivate : [ProfileGuardService]},
{path : 'notfound', component : PageNotFoundComponent}

]
@NgModule({
  declarations: [
    AppComponent, MessagesComponent, RegisterComponent, LoginComponent, UsersComponent, ProfileComponent, PostComponent, PageNotFoundComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    FormsModule, MatButtonModule, MatCardModule, MatToolbarModule, RouterModule.forRoot(routes), MatInputModule,
    BrowserAnimationsModule, MatListModule, MatSnackBarModule, ReactiveFormsModule  
  ],
  providers: [ApiService, AuthService, NavService, RegisterCanDeactivateGuardService, ProfileGuardService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
