import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ROUTE_LABELS } from '../../config/routerLabels';
import { SvgIcon } from '../svg-icon/svg-icon';
import { SubsriberCard } from '../subsriber-card/subsriber-card';
import { ProfileService } from '@/app/services/profile';
import { Profile } from '@/app/model/profile.types';
import { AsyncPipe } from '@angular/common';
import { firstValueFrom, map } from 'rxjs';
import { ImgUrlPipe } from '@/app/pipes/img-url-pipe';

@Component({
  imports: [RouterLink, RouterLinkActive, SvgIcon, SubsriberCard, ImgUrlPipe],
  selector: 'app-sidebar',
  styleUrl: './sidebar.scss',
  templateUrl: './sidebar.html',
})
export class Sidebar {
  routes = ROUTE_LABELS;
  profileService = inject(ProfileService);
  total = signal<string | null>(null)
  subscribers = signal<Profile[]>([])
  me = this.profileService.me;

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
    this.profileService.getSubscribers()
      .pipe(
        map(res => this.subscribers.set(res.items.slice(0, 3)))
      );
  }
}
