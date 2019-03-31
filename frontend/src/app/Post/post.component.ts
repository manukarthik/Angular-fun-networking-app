import { Component } from '@angular/core';
import { ApiService } from "../api.service";
import { AuthService } from "../auth.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'post',
    templateUrl: './post.html'

})
export class PostComponent {
    messageForm : FormGroup;
    constructor(private apiService: ApiService, private authService: AuthService, public snackBar: MatSnackBar, private fb: FormBuilder) { }
    postMsg={
      id:'',
      msg:''
    }

    ngOnInit() {
        this.messageForm = this.fb.group({
         postMsg : ['']
        })
    }

    post() {
    this.apiService.postMessage(this.messageForm.value.postMsg)
       console.log(this.messageForm.value)
        this.snackBar.open('You\'re post was sent', 'ok', {
            duration: 2000,
        });
    }

}
