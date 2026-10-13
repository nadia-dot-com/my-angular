import { Component } from '@angular/core';
import { PostInput } from '../post-input/post-input';
import { PostComponent } from '../post/post';

@Component({
  imports: [PostInput, PostComponent],
  selector: 'app-post-feed',
  styleUrl: './post-feed.scss',
  templateUrl: './post-feed.html',
})
export class PostFeed {
}
