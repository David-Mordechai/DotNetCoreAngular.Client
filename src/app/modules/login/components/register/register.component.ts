import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { RegisterModel } from '../../models/register-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { existingUsernameValidator } from '../../asyncValidators/uniqueUserNameValidator';
import { existingEmailValidator } from '../../asyncValidators/uniqueEmailValidator';
import { MustMatch } from '../../asyncValidators/confirmPasswordValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: any;
  durationInSeconds = 3000;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email], [existingEmailValidator(this.authService)]),
      'username': new FormControl('', [Validators.required], [existingUsernameValidator(this.authService)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'confirmPassword': new FormControl('', Validators.required)
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  onSubmit(registerModel: RegisterModel) {
    this.authService.register(registerModel)
      .subscribe(
        success => {
          if (success) {
            this.router.navigate(['/login']);
            this.openSnackBar('רישום בוצע בהצלחה!', '');
          }
        },
        err => {
          console.log('error register')
        }
      );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: this.durationInSeconds,
      verticalPosition: 'top',
      horizontalPosition: "right",
      panelClass: ['success']
    });
  }
}
