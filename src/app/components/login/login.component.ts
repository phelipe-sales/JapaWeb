import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ErrorResult } from '../../types/apiResponse.interface';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.authService.login(credentials)
        .pipe(
          catchError((error: any) => {
            const errorMessage = error.error?.errorMessage[0] || 'Erro desconhecido ao fazer login';

            this.errorMessage = errorMessage;

            return of();
          })
        )
        .subscribe({
          next: (response) => {
            localStorage.setItem('jwtToken', response.data.jwt)
            console.log('Resposta do login:', response);
            this.router.navigate(['staff']);
          },
          error: (error: ErrorResult) => {
            this.errorMessage = error.errorMessage[0];
            console.error('Erro no login:', error);
          }
        });
    }
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }
}