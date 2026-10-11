import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Profile } from '../model/profile.types';

@Injectable({
    providedIn: "root"
})
export class ProfileService {
    http = inject(HttpClient);

    getProfiles() {
        const url = "http://localhost:8000/yt-course/account/test_accounts";
        return this.http.get<Profile[]>(url);
    }

    getMe() {
        return this.http.get<Profile>('http://localhost:8000/yt-course/account/me');
    }
}
