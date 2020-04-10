import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _darkTheme = new Subject<boolean>();
  isDarkTheme = this._darkTheme.asObservable();

  private URL: string = environment.baseApiUrl

  constructor(private _http: HttpClient) { }

  getThemeType(){
    this.getUserTheme().subscribe((data) =>{
      this._darkTheme.next(data === 1 ? true : false);
    });
  }

  setDarkTheme(isDarkTheme: boolean): void {
    const themeType = isDarkTheme ? 1 : 0;
    this.saveUserTheme(themeType).subscribe();
    this._darkTheme.next(isDarkTheme);
  }

  getUserTheme(): Observable<number>{
    return this._http.get<number>(`${this.URL}usersettings/getusertheme`);
  }

  saveUserTheme(isDarkTheme: number): Observable<boolean> {
    const themeType = isDarkTheme ? 1 : 0;
    return this._http.post<boolean>(`${this.URL}userSettings/saveusertheme`, themeType);
  }
}
