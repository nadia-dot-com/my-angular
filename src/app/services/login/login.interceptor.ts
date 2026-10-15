import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http"
import { LoginService } from "./login"
import { inject } from "@angular/core";
import { BehaviorSubject, catchError, filter, finalize, switchMap, throwError } from "rxjs";

let isRefreshing$ = new BehaviorSubject<boolean>(false);

export const loginTokenInterceptorFn: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const loginService = inject(LoginService);
    const token = loginService.token;

    if (!token) return next(req);

    if (isRefreshing$.value) {
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
    if (!isRefreshing$.value) {
        isRefreshing$.next(true);
        return loginService.refreshLoginToken()
            .pipe(
                switchMap((res) => {
                    if (!loginService.token) {
                        return throwError(() => new Error('No token after refresh'));
                    }
                    return next(addToken(req, res.access_token))
                }),
                finalize(() => isRefreshing$.next(false))
            )
    }

    if (req.url.includes('refresh')) return next(addToken(req, loginService.token!));

    return isRefreshing$.pipe(
        filter(isRefreshing$ => !isRefreshing$),
        switchMap(() => {
            return next(addToken(req, loginService.token!));
        })
    )
}


const addToken = (req: HttpRequest<any>, token: string) =>
    req = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    })