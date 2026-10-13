import { Component, inject, signal } from '@angular/core';
import { ProfileHeader } from '../components/profile-header/profile-header';
import { ProfileService } from '../services/profile';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap, map, tap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { SvgIcon } from '../components/svg-icon/svg-icon';
import { ImgUrlPipe } from '../pipes/img-url-pipe';
import { Profile } from '../model/profile.types';
import { PostFeed } from '../profile-page/post-feed/post-feed';

@Component({
  imports: [ProfileHeader, AsyncPipe, SvgIcon, RouterLink, ImgUrlPipe, PostFeed],
  selector: 'app-my-profile',
  styleUrl: './profile.scss',
  templateUrl: './profile.html',
})
export class ProfileComponent {
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);
  total = signal<number | null>(null)
  subscribers = signal<Profile[]>([]);
  me$ = toObservable(this.profileService.me);
  profile$ = this.route.params
    .pipe(
      switchMap(({ id }) => {
        if (id === 'me') return this.me$;
        return this.profileService.getProfile(id);
      })
    );
  skillsExpanded = signal(false);

  toggleExpanded() {
  this.skillsExpanded.set(!this.skillsExpanded());
  }

  ngOnInit() {
    this.profileService.getSubscribers().pipe(
      tap(res => this.total.set(res.total)),
      tap(res => this.subscribers.set(res.items.slice(0, 9))),
    )
    .subscribe();
  }
}
