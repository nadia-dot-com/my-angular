import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Login, LoginResponse } from '../../model/login.types';
import { catchError, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { REFRESH_TOKEN, TOKEN } from '../../config/app';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    http = inject(HttpClient);
    cookiesService = inject(CookieService);
    router = inject(Router);

    token: string | null = this.cookiesService.get(TOKEN) || null;
    refreshToken: string | null = this.cookiesService.get(REFRESH_TOKEN) || null;

    get isLogin() {
        return !!this.token
    }

    login(payload: Login) {
        const fd = new FormData();

        fd.append('username', payload.username);
        fd.append('password', payload.password);
        return this.http.post<LoginResponse>('http://localhost:8000/yt-course/auth/token', fd)
            .pipe(
                tap(res => this.saveTokens(res))
            )
    }

    refreshLoginToken() {
        return this.http.post<LoginResponse>('http://localhost:8000/yt-course/auth/refresh', { refresh_token: this.refreshToken })
            .pipe(
                tap(res => this.saveTokens(res)),
                catchError(err => {
                    this.logout();
                    return throwError(err)
                })
            )
    }

    logout() {
        this.cookiesService.delete(TOKEN);
        this.cookiesService.delete(REFRESH_TOKEN);
        this.token = null;
        this.refreshToken = null;
        this.router.navigate(['login'])
    }

    saveTokens(val: LoginResponse) {
        this.token = val.access_token;
        this.refreshToken = val.refresh_token;

        this.cookiesService.set(TOKEN, this.token);
        this.cookiesService.set(REFRESH_TOKEN, this.refreshToken);
    }
}
