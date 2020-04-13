import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Tokens } from '../models/tokens';
import { RegisterModel } from '../models/register-model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly JWT_TOKEN = 'JWT_TOKEN';
    private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

    private URL: string = environment.baseApiUrl

    constructor(private http: HttpClient) { }

    register(registerModel: RegisterModel) {
        return this.http.post<any>(`${this.URL}account/signup`, registerModel)
            .pipe(
                mapTo(true),
                catchError(error => {
                    console.error(error.error);
                    return of(false);
                }));
    }

    login(user: { username: string, password: string }): Observable<boolean> {
        return this.http.post<any>(`${this.URL}account/login`, user)
            .pipe(
                tap(tokens => this.doLoginUser(tokens)),
                mapTo(true),
                catchError(error => {
                    console.error(error.error);
                    return of(false);
                }));
    }

    logout() {
        return this.http.post<any>(`${this.URL}account/revoke`, null).pipe(
            tap(() => this.doLogoutUser()),
            mapTo(true),
            catchError(error => {
                console.error(error.error);
                return of(false);
            }));
    }

    isLoggedIn() {
        return !!this.getJwtToken();
    }

    refreshToken() {
        return this.http.post<any>(`${this.URL}account/refresh`, {
            'token': this.getJwtToken(),
            'refreshToken': this.getRefreshToken()
        }).pipe(tap((tokens: Tokens) => {
            this.storeTokens(tokens);
        }));
    }

    getUserDetails(): Observable<any> {
        return this.http.get<any>(`${this.URL}account/getuserdetails`);
    }

    isUsernameUnique(value: string): Observable<boolean> {
        return this.http.get<any>(`${this.URL}account/isUsernameUnique?username=${value}`);
    }

    isEmailUnique(value: string): Observable<boolean> {
        return this.http.get<any>(`${this.URL}account/isEmailUnique?email=${value}`);
    }

    getJwtToken() {
        return localStorage.getItem(this.JWT_TOKEN);
    }

    private doLoginUser(tokens: Tokens) {
        this.storeTokens(tokens);
    }

    private doLogoutUser() {
        this.removeTokens();
    }

    private getRefreshToken() {
        return localStorage.getItem(this.REFRESH_TOKEN);
    }

    private storeJwtToken(jwt: string) {
        localStorage.setItem(this.JWT_TOKEN, jwt);
    }

    private storeTokens(tokens: Tokens) {
        localStorage.setItem(this.JWT_TOKEN, tokens.token);
        localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
    }

    removeTokens() {
        localStorage.removeItem(this.JWT_TOKEN);
        localStorage.removeItem(this.REFRESH_TOKEN);
    }
}