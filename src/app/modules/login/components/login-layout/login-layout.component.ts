import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.scss']
})
export class LoginLayoutComponent implements OnInit {

  dark = false;

  constructor() { }

  ngOnInit() {
    this.dark = localStorage.getItem('dark') != null;
  }

}
