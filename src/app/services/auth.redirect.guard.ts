import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth-service.service'; // Importa tu servicio de autenticación

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['menu']); // Redirige a la página de dashboard si el usuario está autenticado
      return false; // No permite el acceso a la ruta de login o signup
    } else {
      return true; // Permite el acceso a la ruta de login o signup si el usuario no está autenticado
    }
  }
}
