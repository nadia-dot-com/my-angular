import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Profile } from '../model/profile.types';
import { Pageble } from '../model/pagable.types';
import { map, tap } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class ProfileService {
    http = inject(HttpClient);
    me = signal<Profile | null>(null);

    getProfiles() {
        const url = "http://localhost:8000/yt-course/account/test_accounts";
        return this.http.get<Profile[]>(url);
    }

    getMe() {
        return this.http.get<Profile>('http://localhost:8000/yt-course/account/me/')
            .pipe(
                tap(res => this.me.set(res))
            )
    }

    getProfile(id: string) {
        return this.http.get<Profile>(`http://localhost:8000/yt-course/account/${id}`)
    }

    getSubscribers() {
        return this.http.get<Pageble<Profile>>('http://localhost:8000/yt-course/account/subscribers/')
    }
}
