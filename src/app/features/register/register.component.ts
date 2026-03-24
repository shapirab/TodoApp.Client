import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../core/services/account.service';
import { Router } from '@angular/router';
import { Register } from '../../core/models/user/register';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private router = inject(Router);

  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  onRegister(){
    let register: Register = {
      firstName: this.registerForm.value.firstName ?? '',
      lastName: this.registerForm.value.lastName ?? '',
      email: this.registerForm.value.email ?? '',
      password: this.registerForm.value.password ?? '',
    }

    this.accountService.register(register).subscribe({
      next: res => {
        //this.accountService.currentUser.set()
        this.router.navigateByUrl('/todo');
      },
      error: err => console.log(err)
    });
  }
}
