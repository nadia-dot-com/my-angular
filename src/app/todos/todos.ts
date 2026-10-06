import { Component, inject, OnInit, signal } from '@angular/core';
import { TodosService } from '../services/todos';
import { Todo } from '../model/todo.types';
import { catchError, throwError } from 'rxjs';
import { TodoItem } from '../components/todo-item/todo-item';
import { FormsModule } from '@angular/forms';
import { FilterTodosPipe } from '../pipes/filter-todos-pipe';

@Component({
  imports: [TodoItem, FormsModule, FilterTodosPipe],
  selector: 'app-todos',
  styleUrl: './todos.scss',
  templateUrl: './todos.html',
})
export class Todos implements OnInit {
  todoServices = inject(TodosService);
  todoItems = signal<Todo[]>([]);
  loading = signal(true);
  searchTerm = signal('');

  ngOnInit(): void {
    this.todoServices
      .getTodosFromApi()
      .pipe(
        catchError((error) => {
          const message = error instanceof Error ? error.message : error;
          this.loading.set(false);
          return throwError(() => new Error(`Error: ${message}`));
        }))
      .subscribe((todos) => {
        this.todoItems.set(todos);
        this.loading.set(false);
      })
  }

  updateTodoItem(todoItem: Todo) {
    this.todoItems.update((todos: Todo[]) => {
      return todos.map(todo => {
        if(todo.id === todoItem.id) {
          return {
            ...todo,
            completed: !todo.completed
          }
        }
        return todo;
      })
    })
  }
}
