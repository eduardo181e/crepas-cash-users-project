import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { BebidasCalientesService } from 'src/app/services/bebidas-calientes.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { bebidasCalientes } from 'src/app/models/nameCrepas';
import { AuthService } from 'src/app/services/auth-service.service';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-edit-bebidas-calientes',
  templateUrl: './edit-bebidas-calientes.component.html',
  styleUrls: ['./edit-bebidas-calientes.component.css']
})
export class EditBebidasCalientesComponent {
  cantidad: any; 
  precio:number = 0;
  nombre: string = '';
  Orden:any;
  bebidaSeleccionada:any = {};
  bebidas:any = [];
  constructor(private service: BebidasCalientesService, private add: CarritoService, private router: Router, private alertService: AlertDialogService, private activatedRoute: ActivatedRoute, private authService: AuthService){}
  ngOnInit() {
    this.nombre = bebidasCalientes;
  
    // Primero obtenemos las bebidas
    this.service.getBebidas().pipe(
      switchMap((res: any) => {
        this.bebidas = res;
  
        // Luego obtenemos la orden solo cuando las bebidas están listas
        const params = this.activatedRoute.snapshot.params;
        const id: string = params['id'];
        return this.add.selectOrden(id);
      })
    ).subscribe({
      next: (res: any) => {
        res[0].orden = JSON.parse(res[0].orden);
        this.cantidad = res[0].cantidad;
        console.log(res[0].orden);
  
        const id = res[0].orden.id;
        console.log(id);
  
        // Buscamos la bebida en la lista
        const index = this.bebidas.findIndex((e: any) => e.product_id === id);
        console.log(this.bebidas[index]);
  
        if (this.bebidas[index].existencia === 1) {
          console.log(res[0].orden);
          this.cantidad = res[0].cantidad;
          this.bebidaSeleccionada.bebida = this.bebidas[index].bebida;
          this.bebidaSeleccionada.descripcion = this.bebidas[index].descripcion;
          this.bebidaSeleccionada.product_id = this.bebidas[index].product_id;
          
          const index1 = this.bebidas.findIndex((botana: any) => botana.product_id === res[0].orden.id);
          this.bebidaSeleccionada.precio = this.bebidas[index1].precio;
          console.log(this.bebidaSeleccionada);
        } else {
          const mensaje = this.authService.lang() === 'es'
            ? `La bebida ${res[0].orden.bebida} no está disponible por el momento`
            : `The drink ${res[0].orden.bebida} is not available at the moment`;
  
          this.alertService.mostrarAlerta(mensaje);
          this.cantidad = res[0].cantidad;
          this.bebidaSeleccionada = {};
          return;
        }
      },
      error: (err) => console.log(err)
    });
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
  this.Orden.cantidad = this.cantidad;
  this.Orden.total = (this.bebidaSeleccionada.precio)*(this.cantidad);
  this.Orden.precio = this.bebidaSeleccionada.precio;
  this.Orden.nombre = this.nombre;

  console.log(this.Orden);
  
  const params = this.activatedRoute.snapshot.params;
  const id:string = params['id'];
  this.add.updateOrden(id, this.Orden).subscribe(
    res => {
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Su bebida ha sido actualizada');
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('Your drink has been updated');
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
