import { Component } from '@angular/core';
import { CrepaSaladaService } from '../../services/crepa-salada.service';
import { CarritoService } from '../../services/carrito.service';
import { botanas } from '../../models/nameCrepas';
import { Router } from '@angular/router';
import { AlertDialogService } from '../../alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-botanas',
  templateUrl: './botanas.component.html',
  styleUrls: ['./botanas.component.css']
})
export class BotanasComponent {
  Orden:any;
  nombre: string = '';
  precio:number = 0;
  botanaSeleccionada:any = {};
  botanas:any = [];
  constructor(private service: CrepaSaladaService, private add: CarritoService, private router: Router, private alertService: AlertDialogService, private authService: AuthService){}
  ngOnInit(){
    this.nombre = botanas;
    this.service.getBotanas().subscribe(
      res => (
        this.botanas = res
      ),
      err => console.log(err)
    )
}
addBotana(botana:any){
  if (botana.existencia === 0) {
    if(this.authService.lang() === 'es'){
      this.alertService.mostrarAlerta('La botana no esta disponible por el momento');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('The snack is not available at the moment');
      }
    return;
  }else{
  delete botana.existencia;
  this.botanaSeleccionada = botana    
  }

}

addOrden(){
  if(Object.keys(this.botanaSeleccionada).length === 0){
    if(this.authService.lang() === 'es'){
      this.alertService.mostrarAlerta('No has seleccionado ninguna botana');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('You have not selected any snack');
      }
    return;
  }else{
  const botana = {botana: this.botanaSeleccionada.botana, id: this.botanaSeleccionada.product_id}
  this.Orden = {orden: botana};
  this.Orden.total = this.botanaSeleccionada.precio;
  this.Orden.precio = this.botanaSeleccionada.precio;
  this.Orden.nombre = this.nombre;
  this.add.addOrden(this.Orden).subscribe(
    res => {
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Su Botana a sido agregada al carrito');
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('Your snack has been added to the cart');
        }
      this.router.navigate(['carrito']);
    },
    err => console.log(err)
  )    
  }

}

mostrarIngredientes():boolean{
  if(Object.keys(this.botanaSeleccionada).length === 0){
    return false;
  }else{
    return true;
  }
}
}
