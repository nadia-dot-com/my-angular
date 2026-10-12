import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ROUTE_LABELS } from '../../config/routerLabels';
import { SvgIcon } from '../svg-icon/svg-icon';
import { SubsriberCard } from '../subsriber-card/subsriber-card';
import { ProfileService } from '@/app/services/profile';
import { Profile } from '@/app/model/profile.types';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { ImgUrlPipe } from '@/app/pipes/img-url-pipe';

@Component({
  imports: [RouterLink, RouterLinkActive, SvgIcon, SubsriberCard, AsyncPipe, ImgUrlPipe],
  selector: 'app-sidebar',
  styleUrl: './sidebar.scss',
  templateUrl: './sidebar.html',
})
export class Sidebar {
  routes = ROUTE_LABELS;
  profileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribers();
  me = this.profileService.me;

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
