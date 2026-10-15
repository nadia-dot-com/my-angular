import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Profile } from '../model/profile.types';
import { Pageble } from '../model/pagable.types';
import { catchError, map, tap, throwError } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class ProfileService {
    http = inject(HttpClient);
    me = signal<Profile | null>(null);
    private readonly baseUrl = 'http://localhost:8000/yt-course';

    private withAbsoluteAvatar(profile: Profile): Profile {
        if(!profile.avatarUrl || profile.avatarUrl.startsWith('http')) return profile;
        return { ...profile, avatarUrl: `${this.baseUrl}/${profile.avatarUrl}` };
    }

    getProfiles() {
        const url = "http://localhost:8000/yt-course/account/test_accounts";
        return this.http.get<Profile[]>(url);
    }

    getMe() {
        return this.http.get<Profile>('http://localhost:8000/yt-course/account/me/')
            .pipe(
                 map(res => this.withAbsoluteAvatar(res)),
                tap(res => this.me.set(res))
            )
    }

    getProfile(id: string) {
        return this.http.get<Profile>(`http://localhost:8000/yt-course/account/${id}`)
        .pipe( map(res => this.withAbsoluteAvatar(res)))
    }

    getSubscribers() {
        return this.http.get<Pageble<Profile>>('http://localhost:8000/yt-course/account/subscribers/')
        .pipe( map(res => ({ ...res, items: res.items.map(p => this.withAbsoluteAvatar(p)) })))
    }

    patchProfile(profile: Partial<Profile>) {
        return this.http.patch<Profile>(`http://localhost:8000/yt-course/account/me`, profile)
            .pipe(
                map(res => this.withAbsoluteAvatar(res)),
                tap(res =>
                    this.me.set(res)
                ),
                catchError(err => {
                    console.error("Patch profile Error")
                    return throwError(err);
                })
            )
    }

    uploadAvatar(file: File) {
        const fd = new FormData();
        fd.append('image', file);

        return this.http.post<Profile>(`http://localhost:8000/yt-course/account/upload_image`, fd)
            .pipe(
                 map(res => this.withAbsoluteAvatar(res)),
                tap((res: Profile) => {
                    const current = this.me();
                    if (!current) return;

                    this.me.set({ ...current, avatarUrl: `http://localhost:8000/yt-course/${res.avatarUrl}` });
                }),
                catchError(err => {
                    console.error("Add Avatar Error")
                    return throwError(err);
                })
            )
    }
}
