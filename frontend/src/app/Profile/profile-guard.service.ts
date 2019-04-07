import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { ApiService } from "../api.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ProfileGuardService implements CanActivate {
    constructor(private _router : Router, private apiService : ApiService) {}

        canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
         const postExists = !!this.apiService.getProfile(+route.paramMap.get('id'));
         console.log(postExists);

         if(postExists) {
             return true;
         } else {
             console.log("page not found");
             this._router.navigate(['notfound'])
         }
        }
    
}