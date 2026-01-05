import { Component, inject, OnInit } from '@angular/core'; // Importamos OnInit
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ProductService } from '../../services/product'; // Importamos el servicio

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  private authService = inject(AuthService);
  private productService = inject(ProductService); // Inyectamos servicio
  private router = inject(Router);

  // Lista vacía para recibir el arroz
  products: any[] = [];

  stats = [
    { title: 'Productos', value: '...', icon: '📦', color: 'bg-blue-500' }, // Puse '...' para que veas cuando cargue
    { title: 'Clientes', value: '45', icon: '👥', color: 'bg-green-500' },
    { title: 'Ventas Hoy', value: '$1.2M', icon: '💰', color: 'bg-purple-500' },
  ];

  // Cuando la página inicia...
  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data; // ¡Aquí guardamos el Arroz Cristal que llega de Laravel!
        this.stats[0].value = data.length.toString(); // Actualizamos el contador de la tarjeta
      },
      error: (e) => console.error('Error cargando productos:', e)
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}