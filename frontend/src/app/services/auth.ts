import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Inyección de dependencias moderna
  private http = inject(HttpClient);
  
  // URL de tu Backend (Laravel)
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor() { }

  // 1. Función para Loguearse
  login(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // Si el login es exitoso, guardamos el Token
        if (response.access_token) {
          localStorage.setItem('auth_token', response.access_token);
        }
      })
    );
  }

  // 2. Función para cerrar sesión
  logout() {
    localStorage.removeItem('auth_token');
  }

  // 3. Ver si estoy logueado
  get isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}