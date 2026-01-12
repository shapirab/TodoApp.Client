import { Component, inject, OnInit } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { AccountService } from '../../core/services/account.service';
import { TodoListComponent } from "../todo/todo-list/todo-list.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [LoginComponent, TodoListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  accountService = inject(AccountService);
  private router = inject(Router);

  ngOnInit(): void {
    if(this.accountService.currentUser()){
      this.router.navigateByUrl('/todo');
    }
  }

}
