📘 Guía de Construcción: CRM Fullstack (Laravel 11 + Angular 21)
Autor: Mateo (Ingeniero de Software en formación) Fecha: Enero 2026 Objetivo: Crear un prototipo funcional de CRM con autenticación segura y dashboard de productos.
Nota: Tambien fijarse en el archivo setup.txt

🏗️ Fase 1: El Backend (Laravel API)
El cerebro de la aplicación. Se encarga de la base de datos y la seguridad.

1. Configuración del Entorno
Instalación de librerias 

Comando de inicio: composer create-project laravel/laravel backend

Base de Datos: Configuración del archivo .env (PostgreSQL/MySQL).

Servidor: Usamos php artisan serve (Puerto 8000).

Solución de error: Evitamos php -S localhost:8080 para prevenir conflictos de rutas y errores 404.

2. Modelos y Migraciones
Creamos la estructura de datos para Usuarios y Productos.

Usuario (User): Se modificó app/Models/User.php para incluir el trait HasApiTokens de Sanctum. (Crucial para poder generar tokens de acceso).

Producto: Migración con campos name, sku, price.

3. Seguridad (Laravel Sanctum)
Implementamos autenticación basada en Tokens.

Endpoint de Login: Recibe email/password y devuelve un Bearer Token.

Protección de Rutas: En routes/api.php, envolvimos la ruta /products dentro del middleware auth:sanctum.

Comando de prueba (Terminal):

Bash

curl -X POST http://127.0.0.1:8000/api/login ...
Lección: Siempre enviar el header Accept: application/json para ver errores reales y no HTML.

🎨 Fase 2: El Frontend (Angular 21)
La cara de la aplicación. Usamos la arquitectura moderna Standalone (sin app.module.ts).

1. Configuración del Núcleo (app.config.ts)
Habilitamos la capacidad de hacer peticiones HTTP modernas.

TypeScript

provideHttpClient(withFetch(), withInterceptors([authInterceptor]))
Solución de Error (NG0908): Angular 21 intenta ser "Zoneless", pero algunas dependencias requerían zone.js.

Fix: npm install zone.js --save

Fix: Importar import 'zone.js'; al inicio de main.ts.

2. Estilos (Tailwind CSS)
Integramos Tailwind para diseño rápido y responsivo.

Diseño de tarjetas, grid systems y formularios modernos sin escribir CSS manual.

3. Autenticación (Frontend)
AuthService: Servicio encargado de hablar con Laravel (/api/login) y guardar el token en localStorage.

AuthInterceptor: El "portero" que intercepta cada petición HTTP saliente y le pega el Token en la cabecera (Authorization: Bearer ...).

🚀 Fase 3: Componentes y Vistas
1. Login (/login)
Formulario reactivo (ReactiveFormsModule) con validaciones.

Manejo de errores visuales (alerta roja si la contraseña está mal).

Redirección automática al Dashboard tras éxito.

2. Dashboard (/dashboard)
Estructura: Sidebar lateral fijo + Área de contenido principal.

Tarjetas: Resumen de estadísticas (Productos, Clientes, Ventas).

Tabla Dinámica:

Usa ProductService para pedir datos a Laravel.

Usa *ngFor para renderizar la lista de productos (Ej: Arroz Cristal).

Muestra estado de carga o lista vacía.

🧠 Lecciones Aprendidas (Troubleshooting)
Documentación de los obstáculos superados durante el desarrollo:

Puertos Ocupados:

Problema: Error "Address already in use".

Solución: Usar sudo lsof -i :8080 y kill para liberar puertos, o confiar en el estándar 8000 de Laravel.

Errores de CORS/HTML en API:

Problema: Laravel devolvía la página 404 de HTML en vez de JSON.

Solución: Configurar headers correctos y asegurar que php artisan serve esté corriendo.

Sanctum Trait Faltante:

Problema: Error Call to undefined method createToken.

Solución: Agregar use Laravel\Sanctum\HasApiTokens; en el Modelo User.

Nombres de Componentes Angular:

Problema: Confusión entre importar Login vs LoginComponent.

Solución: Estandarizar nombres en app.routes.ts y en la definición de la clase (export class Login).
