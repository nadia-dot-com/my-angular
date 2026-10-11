import { Component, input } from '@angular/core';
import { Profile } from '../../model/profile.types';
import { ImgUrlPipe } from '../../pipes/img-url-pipe';

@Component({
  imports: [ImgUrlPipe],
  selector: 'app-profile-card',
  styleUrl: './profile-card.scss',
  templateUrl: './profile-card.html',
})
export class ProfileCard {
  profile = input.required<Profile>()
}
