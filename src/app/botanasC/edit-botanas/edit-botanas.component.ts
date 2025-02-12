import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { CrepaSaladaService } from 'src/app/services/crepa-salada.service';
import { botanas } from 'src/app/models/nameCrepas';
import { AuthService } from 'src/app/services/auth-service.service';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-edit-botanas',
  templateUrl: './edit-botanas.component.html',
  styleUrls: ['./edit-botanas.component.css']
})
export class EditBotanasComponent {
  Orden:any;
  nombre: string = '';
  precio:number = 0;
  botanaSeleccionada:any = {
    botana: '',
    precio: 0,
    product_id: 0
  };
  cantidad: any;
  botanas:any = [];
  constructor(private service: CrepaSaladaService, private add: CarritoService, private router: Router, private alertService: AlertDialogService, private activatedRoute: ActivatedRoute, private authService: AuthService){}
  ngOnInit() {
    this.nombre = botanas;
  
    this.service.getBotanas().pipe(
      switchMap((res: any) => {
        this.botanas = res;
  
        // Ahora obtenemos la orden solo cuando las botanas están listas
        const params = this.activatedRoute.snapshot.params;
        const id: string = params['id'];
        return this.add.selectOrden(id);
      })
    ).subscribe({
      next: (res: any) => {
        res[0].orden = JSON.parse(res[0].orden);
        console.log(res[0].orden);
  
        const id = res[0].orden.id;
        console.log(id);
  
        // Buscamos la botana en la lista
        const index = this.botanas.findIndex((e: any) => e.product_id === id);
        console.log(this.botanas[index]);
  
        if (this.botanas[index].existencia === 1) {
          this.cantidad = res[0].cantidad;
          this.botanaSeleccionada.botana = res[0].orden.botana;
          this.botanaSeleccionada.product_id = res[0].orden.id;
  
          const index1 = this.botanas.findIndex((botana: any) => botana.product_id === res[0].orden.id);
          this.botanaSeleccionada.precio = this.botanas[index1].precio;
          console.log(this.botanaSeleccionada);
        } else {
          const mensaje = this.authService.lang() === 'es'
            ? `La botana ${res[0].orden.botana} no está disponible por el momento`
            : `The snack ${res[0].orden.botana} is not available at the moment`;
  
          this.alertService.mostrarAlerta(mensaje);
          this.cantidad = res[0].cantidad;
          this.botanaSeleccionada = {};
          return;
        }
      },
      error: (err) => console.log(err)
    });
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
  this.Orden.cantidad = this.cantidad;
  this.Orden.total = (this.botanaSeleccionada.precio) * (this.cantidad);
  this.Orden.precio = this.botanaSeleccionada.precio;
  this.Orden.nombre = this.nombre;
  console.log(this.Orden);

  const params = this.activatedRoute.snapshot.params;
  const id:string = params['id'];
  console.log(id);


  this.add.updateOrden(id, this.Orden).subscribe(
    res => {
      console.log(res)
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Su Botana ha sido actualizada');
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('Your snack has been updated');
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
