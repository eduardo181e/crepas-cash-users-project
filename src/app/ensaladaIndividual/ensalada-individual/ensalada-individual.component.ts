import { Component } from '@angular/core';
import { CrepaSaladaService } from '../../services/crepa-salada.service';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import { ensaladas } from '../../models/nameCrepas';
import { AlertDialogService } from '../../alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-ensalada-individual',
  templateUrl: './ensalada-individual.component.html',
  styleUrls: ['./ensalada-individual.component.css']
})
export class EnsaladaIndividualComponent {
Orden:any;
nombre: string = '';
precio:number = 0;
precioEnsalada:any = [];
ensaladas:any = [];
ensaladaSeleccionada:any = {};
  constructor(private service: CrepaSaladaService, private router: Router, private add: CarritoService, private alertService: AlertDialogService, private authService: AuthService){}
  ngOnInit(){
    this.nombre = ensaladas;
    this.service.getPrecios().subscribe(
      (res:any) => {
        const precios:any = res
        const index = precios.findIndex((objeto:any) => objeto.descripcion === 'Ensalada')
        this.precioEnsalada.push(precios[index].precio)
        console.log('problem',this.precioEnsalada);

      },
      err => {
        console.log(err);
      }
    )
    this.service.getEnsaladas().subscribe(res=>{
      this.ensaladas = res;
      console.log(this.ensaladas);
    },
    err=>{
      console.log(err);
    });
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
    this.Orden.total = this.precioEnsalada[0];
    this.Orden.precio = this.precioEnsalada[0];
    this.Orden.nombre = this.nombre;
    console.log(this.Orden)
    this.add.addOrden(this.Orden).subscribe(
      res => {
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Su ensalada ha sido agregada al carrito');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('Your salad has been added to the cart');
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
