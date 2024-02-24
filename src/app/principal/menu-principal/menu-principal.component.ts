import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent {
   constructor(private router: Router){}
  navigateCrepas(){
    this.router.navigate(['crepaMenu']);
  }
  navigateBebidas(){
    this.router.navigate(['bebidasMenu']);
  }
  navigateEnsaladaInd(){
    this.router.navigate(['ensaladaInd']);
  }
  navigateBotana(){
    this.router.navigate(['botana']);
  }
  navigateWaffle(){
    this.router.navigate(['wafflesMenu']);
  }
}
