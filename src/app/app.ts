import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { ProfileService } from './services/profile';

@Component({
  imports: [RouterOutlet, Sidebar],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  profileService = inject(ProfileService);
  title = 'my-angular';

  ngOnInit() {
    console.log('ngOnInit');
    this.profileService.getMe().subscribe(val => console.log(val))
  }
}
