import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function existingUsernameValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return authService.isUsernameUnique(control.value).pipe(
        map(unique => {
            return (!unique) ? { "usernameExists": true } : null;
        })
    );
  };
}