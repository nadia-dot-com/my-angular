import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TodosService } from '../../services/todos';

@Component({
  imports: [RouterLink],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  logo = signal("My Logo")
}
