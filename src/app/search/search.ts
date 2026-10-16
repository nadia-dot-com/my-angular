import { Component, inject, signal } from '@angular/core';
import { ProfileFilters } from '../components/profile-filters/profile-filters';
import { ProfileService } from '../services/profile';
import { Profile } from '../model/profile.types';
import { ProfileCard } from '../components/profile-card/profile-card';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [ProfileFilters, ProfileCard],
  selector: 'app-search',
  styleUrl: './search.scss',
  templateUrl: './search.html',
})
export class Search {
  profileService = inject(ProfileService);
  profiles = this.profileService.filteredProfiles;
  loading = signal(false);
}
