import { Routes } from '@angular/router';
import { TodoDetailComponent } from './features/todo/todo-detail/todo-detail.component';
import { TodoListComponent } from './features/todo/todo-list/todo-list.component';

export const routes: Routes = [
  { path: '', component: TodoListComponent, pathMatch: 'full' },
  { path: 'todo', component: TodoListComponent },
  { path: 'todo/:id', component: TodoDetailComponent },
  { path: '**', redirectTo: '' }
];
