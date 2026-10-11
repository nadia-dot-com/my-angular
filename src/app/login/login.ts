import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../services/login/login';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class LoginComponent {
  loginService = inject(LoginService);
  router = inject(Router);

  form = new FormGroup({
    username: new FormControl('', { validators: Validators.required, nonNullable: true }),
    password: new FormControl('', { validators: Validators.required, nonNullable: true }),
  })

  onSubmit() {
    if (this.form.valid) {
      this.loginService.login(this.form.getRawValue())
        .subscribe((value: any) => {
          this.router.navigate([''])
          console.log(value)
        })
    }
  }
}
