import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../enviroments/environment';
import { MessaggiService } from '../../service/messaggi.service';
import { Utente } from '../../model/utente'; // Adjust the path as necessary
import { ModelloService } from '../../service/modello.service';
import { C } from '../../service/c';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  http = inject(HttpClient);

  constructor(
    private router: Router,
    private messagi: MessaggiService,
    private modello: ModelloService) {

  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('admin@unibas.it', [Validators.required, Validators.email]),
    password: new FormControl('Admin!', [Validators.required]),
  });
  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  lgFAct: boolean = true; // login form active by default

  toggleForm(islg: boolean): void {
    this.lgFAct = islg;
  }


  // login form controls
  get lgEmailFControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }
  get lgPwordFControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  // register form controls
  get rgFNameFControl(): FormControl {
    return this.registerForm.get('firstName') as FormControl;
  }

  get rgLNameFControl(): FormControl {
    return this.registerForm.get('lastName') as FormControl;
  }

  get rgEmailFControl(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get rgPwordFControl(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  onSubmitLogin() {
    const path = `${environment.backendUrl}/auth/authenticate`;
    this.http.post(path,
      { email: this.lgEmailFControl.value, password: this.lgPwordFControl.value }
    )
    .subscribe({
      next: (response) => {
        //console.log('Response received:', response);
        const utente = Utente.fromApiResponse(response);
        console.log(`Utente: ${JSON.stringify(utente, null, 2)}`);
        
        this.modello.putBean(C.UTENTE_LOGIN, utente);
        // Handle the response
      },
      error: (err) => {
        
        this.messagi.mostraMessaggioErrore(err.error.message);
      }
    });
  }
  onSubmitRegister() {
    throw new Error('Method not implemented. onsubmitRegister');
  }
}
