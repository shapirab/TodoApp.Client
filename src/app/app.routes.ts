import { Routes } from '@angular/router';
import { TodoDetailComponent } from './features/todo/todo-detail/todo-detail.component';
import { TodoListComponent } from './features/todo/todo-list/todo-list.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'todo', component: TodoListComponent },
  { path: 'todo/:id', component: TodoDetailComponent },
  { path: '**', redirectTo: '' }
];
