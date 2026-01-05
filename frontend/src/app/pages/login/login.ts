import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login { // 👈 AHORA SE LLAMA SOLO "Login"
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  errorMessage: string = '';

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!
      };

      this.authService.login(credentials).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']); 
        },
        error: (err) => {
          this.errorMessage = 'Credenciales incorrectas.';
          console.error('Error login:', err);
        }
      });
    }
  }
}