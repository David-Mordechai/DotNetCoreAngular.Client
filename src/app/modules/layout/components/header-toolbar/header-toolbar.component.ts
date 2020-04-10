import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/modules/login/services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-toolbar',
  templateUrl: './header-toolbar.component.html',
  styleUrls: ['./header-toolbar.component.scss']
})
export class HeaderToolbarComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  @Output() public settingsSidenavToggle = new EventEmitter();
  userFullName: string;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authService.getUserDetails().subscribe((data) => {
      this.userFullName = data.userFullName;
    });
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  public onToggleSettingsSidenav = () => {
    this.settingsSidenavToggle.emit();
  }

  public logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/login');
      location.reload(true);
    });
  }
}
