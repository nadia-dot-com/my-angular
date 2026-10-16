import { ProfileService } from '@/app/services/profile';
import { Component, inject, OnDestroy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, startWith, Subscription, switchMap } from 'rxjs';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-profile-filters',
  styleUrl: './profile-filters.scss',
  templateUrl: './profile-filters.html',
})
export class ProfileFilters {
  fb = inject(FormBuilder);
  profileService = inject(ProfileService);

  searchForms = this.fb.group({
    firstName: [''],
    lastName: [''],
    city: [''],
    stack: [''],
  });

  searchFormSubscription!: Subscription;

  constructor() {
    this.searchFormSubscription = this.searchForms.valueChanges
      .pipe(
        startWith({}),
        debounceTime(500),
        switchMap(formValue => this.profileService.filterProfiles(formValue)),
        takeUntilDestroyed()
      )
      .subscribe()
  }
}
