import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { SigninCajaService } from 'src/app/services/signin-caja.service';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent {

  username: string = ''
  password: string = ''
  
errorMessage: string = '';

  constructor(private signinAdminService: SigninCajaService, private router: Router, private alertService: AlertDialogService){}
  Login2(){
    console.log(this.password, this.username)
  }
  
  Login() {
    const token:any = localStorage.getItem('token');
    if(!token){
      if(this.username === '' && this.password === ''){
        this.alertService.mostrarAlerta('Enter a username and password');
      }else{
           if(this.username === ''){
        this.alertService.mostrarAlerta('Enter a username');
      }else if(this.password === ''){
        this.alertService.mostrarAlerta('Enter a password');
      }else{
        this.signinAdminService.login(this.username, this.password).pipe(
          catchError(error => {
            // Maneja el error aquí

              if(error.error.message === '404'){
              
                this.alertService.mostrarAlerta( 'Username does not exist');
                }else if(error.error.message === '405'){
                  this.alertService.mostrarAlerta( 'Incorrect password');
                }
    
            return throwError(error); // Lanza el error nuevamente
          })
        ).subscribe(
      
          (res: any) => {
            if (res.token) {
              // Redirige a la ruta deseada con los datos del usuario
              this.router.navigate(['principal'])
            }
          }
        );
      }
    }
  } 

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
      if(this.username === '' && this.password === ''){
        this.alertService.mostrarAlerta('Ingresa un usuario y contraseña');
      }else{
           if(this.username === ''){
        this.alertService.mostrarAlerta('Ingresa un usuario');
      }else if(this.password === ''){
        this.alertService.mostrarAlerta('Ingresa una contraseña');
      }else {
        this.signinAdminService.login(this.username, this.password).pipe(
          catchError(error => {
            // Maneja el error aquí
            if(error.error.message === '404'){
              
            this.alertService.mostrarAlerta( 'El usuario no existe');
            }else if(error.error.message === '405'){
              this.alertService.mostrarAlerta( 'Contraseña incorrecta');
            }
    
            return throwError(error); // Lanza el error nuevamente
          })
        ).subscribe(
      
          (res: any) => {
            if (res.token) {
              // Redirige a la ruta deseada con los datos del usuario
              this.router.navigate(['principal'])
            }
          }
        );
      }
    
  }      
    } else if(language === 'en'){
      if(this.username === '' && this.password === ''){
        this.alertService.mostrarAlerta('Enter a username and password');
      }else{
           if(this.username === ''){
        this.alertService.mostrarAlerta('Enter a username');
      }else if(this.password === ''){
        this.alertService.mostrarAlerta('Enter a password');
      }else{
        this.signinAdminService.login(this.username, this.password).pipe(
          catchError(error => {
            // Maneja el error aquí

              if(error.error.message === '404'){
              
                this.alertService.mostrarAlerta( 'Username does not exist');
                }else if(error.error.message === '405'){
                  this.alertService.mostrarAlerta( 'Incorrect password');
                }
    
            return throwError(error); // Lanza el error nuevamente
          })
        ).subscribe(
      
          (res: any) => {
            if (res.token) {
              // Redirige a la ruta deseada con los datos del usuario
              this.router.navigate(['principal'])
            }
          }
        );
      }
    }
    }

    }


}
