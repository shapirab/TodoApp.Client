import { Routes } from '@angular/router';
import { TodoDetailComponent } from './features/todo/todo-detail/todo-detail.component';
import { TodoListComponent } from './features/todo/todo-list/todo-list.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { todoGuard } from './core/guards/todo.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'todo', component: TodoListComponent, canActivate:[todoGuard] },
  { path: 'todo/:id', component: TodoDetailComponent },
  { path: '**', redirectTo: '' }
];
