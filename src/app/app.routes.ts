import { Routes } from '@angular/router';
import { TodoDetailComponent } from './features/todo/todo-detail/todo-detail.component';

export const routes: Routes = [
  { path: '', component: TodoDetailComponent, pathMatch: 'full' },
  { path: 'todo/:id', component: TodoDetailComponent },
  { path: '**', redirectTo: '' }
];
