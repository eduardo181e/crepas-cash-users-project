import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-crepas',
  templateUrl: './menu-crepas.component.html',
  styleUrls: ['./menu-crepas.component.css']
})
export class MenuCrepasComponent {
  constructor(private router: Router){}

  navigateCrepasDulce(){
    this.router.navigate(['crepaDulce']);
  }
  navigateCrepasSalada(){
    this.router.navigate(['crepaSalada']);
  }
}
