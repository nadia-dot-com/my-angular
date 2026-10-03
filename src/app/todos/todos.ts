import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos';
import { Todo } from '../model/todo.types';
import { catchError, throwError } from 'rxjs';

@Component({
  imports: [],
  selector: 'app-todos',
  styleUrl: './todos.scss',
  templateUrl: './todos.html',
})
export class Todos implements OnInit {
  todoServices = inject(TodosService);
  JSON = JSON;
  todoItems = signal<Todo[]>([]);

  ngOnInit(): void {
    this.todoServices
      .getTodosFromApi()
      .pipe(
        catchError((error) => {
          const message = error instanceof Error ? error.message : error;
          return throwError(() => new Error(`Error: ${message}`));
        }))
      .subscribe((todos) => {
        this.todoItems.set(todos);
        console.log(todos);
      })
  }
}
