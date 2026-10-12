import { Profile } from '@/app/model/profile.types';
import { ImgUrlPipe } from '@/app/pipes/img-url-pipe';
import { Component, input } from '@angular/core';

@Component({
  imports: [ImgUrlPipe],
  selector: 'app-subsriber-card',
  styleUrl: './subsriber-card.scss',
  templateUrl: './subsriber-card.html',
})
export class SubsriberCard {
  subscriber = input<Profile>();
}
