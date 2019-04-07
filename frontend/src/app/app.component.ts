import { Component } from '@angular/core';
import { ApiService } from "./api.service";
import { AuthService } from './auth.service';
import { NavService } from './nav.service';
import { Event, Router, NavigationStart, NavigationEnd } from '@angular/router';

var _: any;
_ = require('lodash');

@Component({
  selector: "app-root",
  styleUrls: ["./app.css"],
  templateUrl: "app.component.html"
})
export class AppComponent {
  TOKEN_KEY = "token";
  profile;
  subscription: any;
  loginData: any = undefined;
  public user;
  showLoadIndicator: boolean;
  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private navService: NavService,
    private router : Router
    ) {
      this.router.events.subscribe((routerEvent : Event) => {
       if(routerEvent instanceof NavigationStart) {
        this.showLoadIndicator = true;
       }
  
       if(routerEvent instanceof NavigationEnd) {
        this.showLoadIndicator = false;
      }
      })
    }
  title = "app";
  // ngOnInit() {
  //   const tok = this.authService.token;
  //   console.log(tok);
  //  this.navService
  //     .getNavChangeEmitter()
  //     .subscribe(loginData => this.loginUser(loginData));
  //     console.log("***",this.subscription);
  // }
  loginUser(loginData: any) {
    this.loginData = loginData;
    return this.loginData;
  }
}
