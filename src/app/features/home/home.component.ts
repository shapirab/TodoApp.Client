import { Component, inject } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { AccountService } from '../../core/services/account.service';
import { TodoListComponent } from "../todo/todo-list/todo-list.component";

@Component({
  selector: 'app-home',
  imports: [LoginComponent, TodoListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  accountService = inject(AccountService);
  constructor(){
    let temp = this.accountService.currentUser();
    console.log(temp)
  }
}
