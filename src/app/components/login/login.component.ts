import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  onSubmitLogin() {
    throw new Error('Method not implemented. onsubmitLogin');
  }
  onSubmitRegister() {
    throw new Error('Method not implemented. onsubmitRegister');
  }
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('admin@unibas.it', [Validators.required, Validators.email]),
    password: new FormControl('Admin!', [Validators.required]),
  });
  registerForm: FormGroup = new FormGroup({});
  loginFormActive: boolean = true;

  toggleForm(isLogin: boolean): void {
    console.log('toggleForm', isLogin);

    this.loginFormActive = isLogin;
  }

  get loginEmailFormControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get loginPasswordFormControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}
