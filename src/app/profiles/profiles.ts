import { Component, inject, signal } from '@angular/core';
import { ProfileCard } from '../components/profile-card/profile-card';
import { Profile } from '../model/profile.types';
import { ProfileService } from '../services/profile';

@Component({
  imports: [
    ProfileCard, 
  ],
  selector: 'app-profiles',
  styleUrl: './profiles.scss',
  templateUrl: './profiles.html',
})
export class Profiles {
  profileService = inject(ProfileService);
  profiles = signal<Profile[]>([]);
  loading = signal(false);

  constructor() {
    this.profileService.getProfiles()
      .subscribe(value => {
        this.profiles.set(value);
      })
  }
}
