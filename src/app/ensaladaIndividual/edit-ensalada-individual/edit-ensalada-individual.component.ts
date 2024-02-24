import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { CrepaSaladaService } from 'src/app/services/crepa-salada.service';
import { ensaladas } from 'src/app/models/nameCrepas';
import { AuthService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-edit-ensalada-individual',
  templateUrl: './edit-ensalada-individual.component.html',
  styleUrls: ['./edit-ensalada-individual.component.css']
})
export class EditEnsaladaIndividualComponent {
      Orden:any;
      nombre: string = '';
      precio:number = 0;
      precioEnsalada:any = [55];
      ensaladas:any = [];
      ensaladaSeleccionada:any = {};
      cantidad:any;
  constructor(private service: CrepaSaladaService, private router: Router, private add: CarritoService, private alertService: AlertDialogService, private activatedRoute: ActivatedRoute, private authService: AuthService){}
  ngOnInit(){
    this.nombre = ensaladas;
    this.service.getEnsaladas().subscribe(res=>{
      this.ensaladas = res;
      console.log(this.ensaladas);
    },
    err=>{
      console.log(err);
    });

    setTimeout(() => {
      const params = this.activatedRoute.snapshot.params;
      const id:string = params['id'];
  
      this.add.selectOrden(id).subscribe(
        (res:any) => {
          this.cantidad = res[0].cantidad;
          console.log(res[0].orden);
          const id = res[0].orden.id;
          console.log(id);
          const index = this.ensaladas.findIndex((e:any) => e.product_id === id);
          console.log(this.ensaladas[index]);
          if(this.ensaladas[index].existencia === 1){
            console.log(res[0].orden);
          this.cantidad = res[0].cantidad;
          this.ensaladaSeleccionada.ensalada_ind = this.ensaladas[index].ensalada_ind;
          this.ensaladaSeleccionada.descripcion = this.ensaladas[index].descripcion;
          this.ensaladaSeleccionada.product_id = this.ensaladas[index].product_id;
          console.log(this.ensaladaSeleccionada);
          }else{
            if(this.authService.lang() === 'es'){
              this.alertService.mostrarAlerta('La ensalada '+res[0].orden.ensalada+ ' no esta disponible por el momento');
              }else if(this.authService.lang() === 'en'){
                this.alertService.mostrarAlerta('The salad '+res[0].orden.ensalada+ ' is not available at the moment');
              }
            this.cantidad = res[0].cantidad;
            this.ensaladaSeleccionada = {};
            return;

          }
  
        },
        err => console.log(err)
      )
    }, 500)

  }

  addEnsalada(ensalada:any){
    if(ensalada.existencia === 0){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('La ensalada no esta disponible por el momento');
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('The salad is not available at the moment');
        }
      return;
    }else{
      delete ensalada.existencia;
      this.ensaladaSeleccionada = ensalada;
    }
  }

  addOrden(){
    if(Object.keys(this.ensaladaSeleccionada).length === 0){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('No has seleccionado ninguna ensalada');
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('You have not selected any salad');
        }
      return;
    }else{
    const ensalada = {ensalada: this.ensaladaSeleccionada.ensalada_ind, id: this.ensaladaSeleccionada.product_id}
    this.Orden = {orden: ensalada};
    this.Orden.cantidad = this.cantidad
    this.Orden.total = (this.precioEnsalada[0])*(this.cantidad);
    this.Orden.precio = this.precioEnsalada[0];
    this.Orden.nombre = this.nombre;
    console.log(this.Orden)   

    const params = this.activatedRoute.snapshot.params;
    const id:string = params['id'];
    this.add.updateOrden(id, this.Orden).subscribe(
      res => {
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Su ensalada a sido actualizada');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('Your salad has been updated');
          }
        this.router.navigate(['carrito']);
      },
      err => console.log(err)
    )
    }

  }

  mostrarIngredientes():boolean{
    if(Object.keys(this.ensaladaSeleccionada).length === 0){
      return false;
    }else{
      return true;
    }
  }
}
