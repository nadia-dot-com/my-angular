import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ROUTE_LABELS } from '../../config/routerLabels';

@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  logo = signal("My Logo");
  routes = ROUTE_LABELS;
}
