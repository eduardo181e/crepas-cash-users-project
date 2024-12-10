import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  authService: any = {};
  constructor(private router: Router, private AuthService: AuthService){}

  ngOnInit(){
    this.authService = this.AuthService;
  }

    aparecer(){
      const navElement = document.querySelector("#navAn") as HTMLElement;
      const capa = document.querySelector(".capa") as HTMLElement;
      const back = document.querySelector(".back") as HTMLElement;
      const back1 = document.querySelector(".back1") as HTMLElement;
      if (navElement && capa && back) {
        back1.style.display = 'block';
        back.style.display = 'block';
        capa.style.display = 'block';
        navElement.style.left = '-25%';
        navElement.classList.add("aparecer");
        setTimeout(() => {
          back1.style.display = 'none';
          capa.style.display = 'none';
        navElement.classList.remove("desaparecer");
        }, 200);
      }
    }

    desaparecer(){
      const navElement = document.querySelector("#navAn") as HTMLElement;
      const capa = document.querySelector(".capa") as HTMLElement;
      const back = document.querySelector(".back") as HTMLElement;
      const back1 = document.querySelector(".back1") as HTMLElement;
      if (navElement && capa && back) {
        back1.style.display = 'block';
        capa.style.display = 'block';
        navElement.classList.add("desaparecer");
        setTimeout(() => {
          back1.style.display = 'none';
          back.style.display = 'none';
          navElement.style.left = '-480%';
          navElement.classList.remove("aparecer");
          navElement.classList.remove("desaparecer");
        }, 180);

        setTimeout(() => {
          capa.style.display = 'none';
        }, 210);
      }
    }
  

    waffles(){
      this.router.navigate(['wafflesMenu']);
      this.desaparecer();
    }
  crepas(){
    this.router.navigate(['crepaMenu']);
    this.desaparecer();
  }

  bebidas(){
    this.router.navigate(['bebidasMenu']);
    this.desaparecer();
  }

  navigateMenuPrincipal(){
    this.router.navigate(['principal']);
    this.desaparecer();
  }

  ensaladaInd(){
    this.router.navigate(['ensaladaInd']);
    this.desaparecer();
  }
  crepaDulce(){
    this.router.navigate(['crepaDulce']);
    this.desaparecer();
  }

  crepaSalada(){
    this.router.navigate(['crepaSalada']);
    this.desaparecer();
  }

  waffle(){
    this.router.navigate(['waffle']);
    this.desaparecer();
  }

  waffleCanasta(){
    this.router.navigate(['waffleCanasta']);
    this.desaparecer();
  }

  botana(){
    this.router.navigate(['botana']);
    this.desaparecer();
  }

  bebidaCaliente(){
    this.router.navigate(['bebidasCalientes']);
    this.desaparecer();
  }

  bebidaFria(){
    this.router.navigate(['bebidasFrias']);
    this.desaparecer();
  }

  logout() {
    // Elimina el token del localStorage u otras acciones de limpieza
    localStorage.removeItem('token');

    // Redirige a la página de inicio de sesión u otra ruta deseada
    this.router.navigate(['signin']);
    this.desaparecer();
  }

  login(){
    this.router.navigate(['signin']);
    this.desaparecer();
  }

  carrito(){
    this.router.navigate(['carrito']);
    this.desaparecer();
  }
  navigateAccountConfig(){
    this.router.navigate(['accountConfig']);
    this.desaparecer();
  }

  lenguage(): any{
    const token:any = localStorage.getItem('token');
    if(!token){
      return false
    }else{
    const tokenData = token.split('.')[1]; // Obtén la parte de los datos del token
const decodedTokenData = JSON.parse(atob(tokenData)); // Decodifica y parsea los datos
console.log(tokenData)
// Accede a los datos del usuario
const userData = {

  lang: decodedTokenData.lang,
  // Agrega otros datos del usuario si los necesitas
};     
const language = userData.lang;


if(language === 'es'){
return true;
} else if(language === 'en') {
  return false;
}
  
    }

  }
}
