import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { CrepaSaladaService } from 'src/app/services/crepa-salada.service';
import { ensaladas } from 'src/app/models/nameCrepas';
import { AuthService } from 'src/app/services/auth-service.service';
import { forkJoin, switchMap } from 'rxjs';
@Component({
  selector: 'app-edit-ensalada-individual',
  templateUrl: './edit-ensalada-individual.component.html',
  styleUrls: ['./edit-ensalada-individual.component.css']
})
export class EditEnsaladaIndividualComponent {
      Orden:any;
      nombre: string = '';
      precio:number = 0;
      precioEnsalada:any = [];
      ensaladas:any = [];
      ensaladaSeleccionada:any = {};
      cantidad:any;
  constructor(private service: CrepaSaladaService, private router: Router, private add: CarritoService, private alertService: AlertDialogService, private activatedRoute: ActivatedRoute, private authService: AuthService){}
  ngOnInit() {
    this.nombre = ensaladas;
  
    // Usamos forkJoin para ejecutar las peticiones en paralelo
    forkJoin({
      ensaladas: this.service.getEnsaladas(),
      precios: this.service.getPrecios()
    }).pipe(
      switchMap(({ ensaladas, precios }) => {
        // Guardamos las ensaladas
        this.ensaladas = ensaladas;
        console.log(this.ensaladas);
        const precios1:any = precios
        // Procesamos los precios
        const index = precios1.findIndex((objeto: any) => objeto.descripcion === 'Ensalada');
        this.precioEnsalada.push(precios1[index].precio);
        console.log('problem', this.precioEnsalada);
  
        // Ahora que las ensaladas y precios están cargados, obtenemos la orden
        const params = this.activatedRoute.snapshot.params;
        const id: string = params['id'];
        return this.add.selectOrden(id); // Se hace la llamada para obtener la orden
      })
    ).subscribe({
      next: (res: any) => {
        res[0].orden = JSON.parse(res[0].orden);
        this.cantidad = res[0].cantidad;
        console.log(res[0].orden);
  
        // Procesamos la ensalada seleccionada
        const id = res[0].orden.id;
        const index = this.ensaladas.findIndex((e: any) => e.product_id === id);
        if (this.ensaladas[index].existencia === 1) {
          this.ensaladaSeleccionada.ensalada_ind = this.ensaladas[index].ensalada_ind;
          this.ensaladaSeleccionada.descripcion = this.ensaladas[index].descripcion;
          this.ensaladaSeleccionada.product_id = this.ensaladas[index].product_id;
          console.log(this.ensaladaSeleccionada);
        } else {
          // Si la ensalada no está disponible
          const mensaje = this.authService.lang() === 'es'
            ? `La ensalada ${res[0].orden.ensalada} no está disponible por el momento`
            : `The salad ${res[0].orden.ensalada} is not available at the moment`;
  
          this.alertService.mostrarAlerta(mensaje);
          this.cantidad = res[0].cantidad;
          this.ensaladaSeleccionada = {};
          return;
        }
      },
      error: (err) => {
        console.log(err);
      }
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
