import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http"
import { LoginService } from "./login"
import { inject } from "@angular/core";
import { catchError, switchMap, throwError } from "rxjs";

let isRefreshing = false;

export const loginTokenInterceptorFn: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const loginService = inject(LoginService);
    const token = loginService.token;

    if (!token) return next(req);

    if (isRefreshing) {
        return refreshAndProceed(loginService, req, next);
    }

    return next(addToken(req, token))
        .pipe(
            catchError(error => {
                if (error.status === 403) {
                    return refreshAndProceed(loginService, req, next);
                }
                return throwError(error);
            })
        )
}

const refreshAndProceed = (loginService: LoginService, req: HttpRequest<any>, next: HttpHandlerFn) => {
    if (!isRefreshing) {
        isRefreshing = true;
        return loginService.refreshLoginToken()
            .pipe(
                switchMap((res) => {
                    if (!loginService.token) {
                        return throwError(() => new Error('No token after refresh'));
                    }
                    isRefreshing = false;
                    return next(addToken(req, res.access_token))
                })
            )
    }
    return next(addToken(req, loginService.token!));
}


const addToken = (req: HttpRequest<any>, token: string) =>
    req = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    })