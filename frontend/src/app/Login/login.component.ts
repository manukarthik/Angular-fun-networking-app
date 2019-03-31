import { Component } from '@angular/core';
import { AuthService } from "../auth.service";
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',

})
export class LoginComponent {
    loginData = {}

    constructor(private authService: AuthService, public snackBar: MatSnackBar ) { }
    post() {
        this.authService.loginUser(this.loginData)
        if (this.authService.isAuthenticated) {
            this.snackBar.open('you are logged in', 'ok', {
                duration: 3000
            });
        }
    }
}
