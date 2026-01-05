import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Buscamos el token en la caja fuerte
  const token = localStorage.getItem('auth_token');

  // 2. Si existe, lo clonamos en la petición
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }

  // 3. Si no hay token, que pase normal
  return next(req);
};