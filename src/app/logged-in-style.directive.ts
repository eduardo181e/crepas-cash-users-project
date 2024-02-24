import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { AuthService } from './services/auth-service.service';

@Directive({
  selector: '[appLoggedInStyle]'
})
export class LoggedInStyleDirective {

  constructor(private el: ElementRef, private renderer: Renderer2, private authService: AuthService) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.renderer.setStyle(this.el.nativeElement, 'margin-top', '-30px');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'margin-top', '-60px');
    }
  }
}