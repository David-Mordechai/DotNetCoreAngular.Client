import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/login/services/auth-service';
import { Observable, Subject } from 'rxjs';
import { ThemeService } from 'src/app/modules/core/services/theme.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  isDarkTheme: Observable<boolean>;
  update: Observable<boolean>;
  
  constructor(public authService: AuthService, private themeService: ThemeService,
    private overlayContainer: OverlayContainer) {
    
  }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.themeService.getThemeType();
    this.update = this.themeService.appUpdate;
    this.isDarkTheme.subscribe((isDark) => {
      if (isDark) {
        this.overlayContainer.getContainerElement().classList.add('dark-theme');
        this.overlayContainer.getContainerElement().classList.remove('light-theme');
      }
      else {
        this.overlayContainer.getContainerElement().classList.add('light-theme');
        this.overlayContainer.getContainerElement().classList.remove('dark-theme');
      }
    });
  }
}