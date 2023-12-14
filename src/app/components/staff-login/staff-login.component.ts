import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-staff-login',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule,MatButtonModule],
  templateUrl: './staff-login.component.html',
  styleUrl: './staff-login.component.scss'
})
export class StaffLoginComponent {
  
  loginForm: FormGroup;
  hide = true;
  errorMessage: string = '';

  constructor(private fb: FormBuilder,private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Dados do formulário:', this.loginForm.value);
      this.authService.login(this.loginForm.value)
      .subscribe({
        next: (response) => {
          localStorage.setItem('jwtToken', response.data.jwt)
          console.log('Resposta do login:', response);
          this.router.navigate(['staff']);
        },
        error: (error) => {
          this.errorMessage = error.error?.errorMessages[0] || 'erro no front';
          console.error('Erro no login:', error);
        }
      });
    }
  }
  
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }
}