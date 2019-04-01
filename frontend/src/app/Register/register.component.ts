import {Component, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms'
import {AuthService} from "../auth.service";
import {ApiService} from '../api.service';
import {MyErrorStateMatcher} from './MyErrorStateMatcher';

@Component({
    selector: 'register',
    templateUrl:'register.component.html',

})
export class RegisterComponent {
    registerForm : FormGroup;
    matcher = new MyErrorStateMatcher();
    @ViewChild('formReg') public formRegister: any;
    user;
    public registerData = {}

    constructor(private authService: AuthService, private apiService: ApiService, private fb: FormBuilder) { }

    validationMessages = {
        'email' : {
            'required' : 'email is required',
            'domainName' : 'email should be of type @gmail.com'
        },
        'password' : {
             'required' : 'password is required'
        }

    };

    formErrors = {
        'email' : '',
        'password' : ''
    };
    

    ngOnInit() {
      const {required} = Validators;
      this.registerForm = this.fb.group({
            email : ['', [required, emailDomain]],
            password : ['', required],
            confirmPassword: [''],
            name:  [''],
            imgname: [''],
            description : ['']
        }, {validator: this.checkPasswords })
     this.registerForm.valueChanges.subscribe((e) => {
       this.logValidationErrors(this.registerForm);
     });
    }

 checkPasswords(group: FormGroup) { // here we have the 'passwords' group
 console.log(group);
  let pass = group.controls.password.value;
  let confirmPass = group.controls.password.value;

  return pass === confirmPass ? null : { notSame: true }     
}

logValidationErrors(group : FormGroup) {
   Object.keys(group.controls).forEach((key : string) => {
      const abstractControl = group.get(key);
      if(abstractControl instanceof FormGroup) {
          this.logValidationErrors(abstractControl);
      }
      else {
        this.formErrors[key] = '';
          if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
              const messages = this.validationMessages[key];
              for(const errorKey in abstractControl.errors) {
                  if(errorKey)
                  this.formErrors[key] += messages[errorKey] + ' ';
              }
          }
      }
   });
}

onSubmit() : void {
    this.authService.registerUser(this.registerForm)
}
}

function emailDomain (control: AbstractControl) : {[key : string] : any } | null  {
  const email : string = control.value;
  const domain = email.substring(email.lastIndexOf('@')+1);
  if (_.toLower(domain) === 'gmail.com' || email === '') {
    return null;
  }
  return {domainName: true};
}


