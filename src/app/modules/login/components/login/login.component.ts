import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginModel } from '../../models/login-model';
import { ThemeService } from 'src/app/modules/core/services/theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any;

  constructor(private authService: AuthService, private router: Router, private themeService: ThemeService) {

  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  onSubmit(loginModel: LoginModel) {
    this.authService.login(loginModel)
      .subscribe(
        success => {
        if (success) {
            this.themeService.getThemeType();
            this.router.navigate(['/home']);
          }

        },
        err => {
          console.log('error on login')
        }
      );
  }

}
