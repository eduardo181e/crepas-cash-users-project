import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { SigninCajaService } from 'src/app/services/signin-caja.service';
import { TranslateService } from 'src/app/translate/translate.service';
@Component({
  selector: 'app-account-config',
  templateUrl: './account-config.component.html',
  styleUrls: ['./account-config.component.css']
})
export class AccountConfigComponent {
  constructor(private signinAdminService: SigninCajaService, private router: Router, private alertService: AlertDialogService, private translateService: TranslateService) { }
  token:any
  username:any
  fullname:any
  password:any
  lang:any
  caja:any
  sucursal:any


  ngOnInit(){
    this.token = localStorage.getItem('token');
    const tokenData = this.token.split('.')[1]; // Obtén la parte de los datos del token
    const decodedTokenData = JSON.parse(atob(tokenData)); // Decodifica y parsea los datos
   console.log(tokenData)
    // Accede a los datos del usuario
    const userData = {
      fullname: decodedTokenData.fullname,
      username: decodedTokenData.username,
      id: decodedTokenData.id,
      lang: decodedTokenData.lang,
      password: decodedTokenData.password,
      caja: decodedTokenData.caja,
      sucursal: decodedTokenData.sucursal
      // Agrega otros datos del usuario si los necesitas
    };
    this.username = userData.username;
    this.lang = userData.lang;
    this.password = userData.password;
    this.fullname = userData.fullname;
    this.caja = userData.caja;
    this.sucursal = userData.sucursal;
    console.log(userData)
  }
  changeLanguage(){
    this.signinAdminService.changelang(this.lang).subscribe(
      (res: any) => {
        this.token = res.token;
        const tokenData = this.token.split('.')[1]; // Obtén la parte de los datos del token
        const decodedTokenData = JSON.parse(atob(tokenData)); // Decodifica y parsea los datos
       console.log(tokenData)
        // Accede a los datos del usuario
        const userData = {
          fullname: decodedTokenData.fullname,
          username: decodedTokenData.username,
          id: decodedTokenData.id,
          lang: decodedTokenData.lang,
          password: decodedTokenData.password
          // Agrega otros datos del usuario si los necesitas
        };
        this.lang = userData.lang;
        console.log(userData)
        this.changeLanguage1(userData.lang)
        
      },
      err => {
        console.log(err)
        if(err.error.message === 'Token expired'){
          if(this.lang === 'es'){
          this.alertService.mostrarAlerta('Tu sesión ha expirado, inicia sesión nuevamente');
          }else if (this.lang === 'en'){
            this.alertService.mostrarAlerta('Your session has expired, login again');
          }
          this.router.navigate(['admin']);
        }else {
          this.alertService.mostrarAlerta(err.error.message);
        }
      }
    )

  }
  async changeLanguage1(language: string) {
    await this.translateService.getData('assets/i18n/', language);
  }
}
