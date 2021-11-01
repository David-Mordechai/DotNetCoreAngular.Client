import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _darkTheme = new Subject<boolean>();
  isDarkTheme = this._darkTheme.asObservable();

  private _update = new Subject<boolean>();
  appUpdate = this._update.asObservable();

  private URL: string = environment.baseApiUrl

  constructor(private _http: HttpClient, private updates: SwUpdate) {
    updates.available.subscribe(event => {
      console.log('current version is', event.current);
      console.log('available version is', event.available);
      this._update.next(true);
    });
    updates.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version was', event.current);
    });
  }

  getThemeType() {
    this.getUserTheme().subscribe((data) => {
      let getLoginTheme = this.getLoginTheme();
      if (data !== getLoginTheme)
        data = getLoginTheme;
      this._darkTheme.next(data === 1 ? true : false);
    });
  }

  setDarkTheme(isDarkTheme: boolean): void {
    const themeType = isDarkTheme ? 1 : 0;
    this.saveUserTheme(themeType).subscribe();
    this._darkTheme.next(isDarkTheme);
  }

  getUserTheme(): Observable<number> {
    return this._http.get<number>(`${this.URL}usersettings/getusertheme`);
  }

  getLoginTheme() {
    return localStorage.getItem('isLoginDarkTheme') === "1" ? 1 : 0;
  }

  saveUserTheme(isDarkTheme: number): Observable<boolean> {
    const themeType = isDarkTheme ? 1 : 0;
    localStorage.setItem('isLoginDarkTheme', `${themeType}`);
    return this._http.post<boolean>(`${this.URL}userSettings/saveusertheme`, themeType);
  }
}
