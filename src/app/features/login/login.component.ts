import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../core/services/account.service';
import { Login } from '../../core/models/user/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  onLogin(){
    let login: Login = {
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? ''
    }
    this.accountService.login(login).subscribe({
      next: res => this.router.navigateByUrl('/todo')
    });
  }

}
