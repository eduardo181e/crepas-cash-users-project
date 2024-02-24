import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { bebidasFrias } from 'src/app/models/nameCrepas';
import { AuthService } from 'src/app/services/auth-service.service';
import { BebidasFriasService } from 'src/app/services/bebidas-frias.service';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-bebidas-frias',
  templateUrl: './bebidas-frias.component.html',
  styleUrls: ['./bebidas-frias.component.css']
})
export class BebidasFriasComponent {
  precio:number = 0;
  nombre: string = '';
  Orden:any;
  bebidaSeleccionada:any = {};
  bebidas:any = [];
  constructor(private service: BebidasFriasService, private add: CarritoService, private router: Router, private alertService: AlertDialogService, private authService: AuthService){}
  ngOnInit(){
    this.nombre = bebidasFrias;
    this.service.getBebidas().subscribe(
      res => (
        this.bebidas = res
      ),
      err => console.log(err)
    )
}
addBebida(bebida:any){
  if (bebida.existencia === 0) {
    if(this.authService.lang() === 'es'){
      this.alertService.mostrarAlerta('La bebida no esta disponible por el momento');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('The drink is not available at the moment');
      }
    return;
  }else{
  delete bebida.existencia;
  this.bebidaSeleccionada = bebida    
  }

}

addOrden(){
  if(Object.keys(this.bebidaSeleccionada).length === 0){
    if(this.authService.lang() === 'es'){
      this.alertService.mostrarAlerta('No has seleccionado ninguna bebida');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('You have not selected any drink');
      }
    return;
  }else{
  const bebida = {bebida: this.bebidaSeleccionada.bebida, id: this.bebidaSeleccionada.product_id}
  this.Orden = {orden: bebida};
  this.Orden.total = this.bebidaSeleccionada.precio;
  this.Orden.precio = this.bebidaSeleccionada.precio;
  this.Orden.nombre = this.nombre;
  this.add.addOrden(this.Orden).subscribe(
    res => {
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Su bebida ha sido agregada al carrito');
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('Your drink has been added to the cart');
        }
      this.router.navigate(['carrito']);
    },
    err => console.log(err)
  )    
  }

}

mostrarIngredientes():boolean{
  if(Object.keys(this.bebidaSeleccionada).length === 0){
    return false;
  }else{
    return true;
  }
}
}
