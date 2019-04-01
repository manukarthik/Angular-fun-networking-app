import {AbstractControl} from "@angular/forms";

export class CustomValidators {
  static emailDomain(domainName) {
    return ((control: AbstractControl) : {[key : string] : any } | null => {
      const email: string = control.value;
      const domain = email.substring(email.lastIndexOf('@') + 1);
      if (_.toLower(domain) === _.toLower(domainName) || email === '') {
        return null;
      }
      return {domainName: true};
    });
  }
}
