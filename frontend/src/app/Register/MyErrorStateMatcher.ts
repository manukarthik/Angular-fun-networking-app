import { Component } from '@angular/core';
import { FormGroupDirective, FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html',
})
export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
