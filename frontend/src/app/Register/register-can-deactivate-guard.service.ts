import { RegisterComponent } from "./register.component";
import { CanDeactivate } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class RegisterCanDeactivateGuardService implements CanDeactivate<RegisterComponent> {
    canDeactivate(component: RegisterComponent): boolean {
        if(component.registerForm.dirty) {
            return confirm("Are you sure you dont want to register.?")
        }
        return true;
    }
}