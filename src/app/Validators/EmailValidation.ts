import {AbstractControl} from '@angular/forms';
export class EmailValidation {

    static CheckEmail(AC: AbstractControl) {
       let email = AC.get('email').value;
       let regex = new RegExp('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$');
        if(regex.test(email)) {
            console.log('false');
            AC.get('email').setErrors( {CheckEmail: true} )
        } else {
            console.log('true');
            return null
        }
    }
}