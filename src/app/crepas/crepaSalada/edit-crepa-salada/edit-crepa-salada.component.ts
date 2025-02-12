
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { CrepaSaladaService } from 'src/app/services/crepa-salada.service';
import { crepasSalada } from 'src/app/models/nameCrepas';
import { AuthService } from 'src/app/services/auth-service.service';
import { forkJoin, switchMap } from 'rxjs';
@Component({
  selector: 'app-edit-crepa-salada',
  templateUrl: './edit-crepa-salada.component.html',
  styleUrls: ['./edit-crepa-salada.component.css']
})
export class EditCrepaSaladaComponent {
  Orden:any = [];
  orden: any = {};
  nombre: string = '';
  precio: number = 0;
  precioRegular:any = [];
  precioExtra:any = [];

  ingredientes_pri:any = [];
  aderesos:any = [];

  ingredientes_base:any = [];
  aderesos_base:any = [];

  base: Boolean = false;

  ing_base:any = [];
  ade_base:any = [];

  crepa:any = {
    ingredientes_base: [],
    adereso_base: [],
    ingredientes: [],
    aderesos: [],
    precio: 0
  }

  cantidad:any;
  ingredientes_base1:any = [];
  adereso_base1:any = [];

  addAI:boolean = false;
  addAIA:boolean = false;

  long:any = this.crepa.ingredientes_base.length + this.crepa.adereso_base.length
  constructor(private service: CrepaSaladaService, private add: CarritoService, private router: Router, private alertService: AlertDialogService, private activatedRoute: ActivatedRoute, private authService: AuthService){}
  ngOnInit() {
    this.nombre = crepasSalada;
  
    // Usamos forkJoin para ejecutar todas las peticiones en paralelo
    forkJoin({
      ingredientesBase: this.service.getIngredientesB(),
      aderezosBase: this.service.getAderesosB(),
      aderezos: this.service.getAderesos(),
      ingredientesPri: this.service.getIngredientesP(),
      precios: this.service.getPrecios()
    }).pipe(
      switchMap(({ ingredientesBase, aderezosBase, aderezos, ingredientesPri, precios }) => {
        // Guardamos los ingredientes y aderezos
        this.ingredientes_base1 = ingredientesBase;
        this.adereso_base1 = aderezosBase;
        this.aderesos = aderezos;
        this.ingredientes_pri = ingredientesPri;
        const precios1:any = precios
        // Procesamos los precios
        this.precioRegular.push(precios1.find((i: any) => i.descripcion === 'Regular').precio);
        this.precioExtra.push(precios1.find((i: any) => i.descripcion === 'Extra').precio);
  
        // Ahora que todos los datos están cargados, obtenemos la orden
        const params = this.activatedRoute.snapshot.params;
        const id: string = params['id'];
        return this.add.selectOrden(id);
      })
    ).subscribe({
      next: (res: any) => {
        console.log(res);
        this.cantidad = res[0].cantidad;
        res[0].orden = JSON.parse(res[0].orden)
        res[0].orden.adereso_base.forEach((element:any) => {
          const index = this.adereso_base1.findIndex((i:any) => i.id === element.id);
          if(index === -1){
            if(this.authService.lang() === 'es'){
              this.alertService.mostrarAlerta('El adereso que seleccionaste se elimino del menu');
              }else if(this.authService.lang() === 'en'){
                this.alertService.mostrarAlerta('The dressing you selected was removed from the menu');
              }
          }else{
          if(this.adereso_base1[index].existencia === 0){
            if(this.authService.lang() === 'es'){
              this.alertService.mostrarAlerta('El adereso que seleccionaste no esta disponible por el momento');
              }else if(this.authService.lang() === 'en'){
                this.alertService.mostrarAlerta('The dressing you selected is not available at the moment');
              }
            return;
          }else if(this.adereso_base1[index].existencia === 1){
            this.crepa.adereso_base.push(this.adereso_base1[index]);
            this.adereso_base1.splice(index, 1);
            this.anadirOrden();
          }
        } 
        this.anadirOrden();
        })
          
          
        res[0].orden.ingredientes_base.forEach((element:any) => {
          const index = this.ingredientes_base1.findIndex((i:any) => i.id === element.id);
          if(index === -1){
            if(this.authService.lang() === 'es'){
              this.alertService.mostrarAlerta('El ingrediente que seleccionaste se elimino del menu');
              }else if(this.authService.lang() === 'en'){
                this.alertService.mostrarAlerta('The ingredient you selected was removed from the menu');
              }
          }else{
          if(this.ingredientes_base1[index].existencia === 0){
            if(this.authService.lang() === 'es'){
              this.alertService.mostrarAlerta('El ingrediente que seleccionaste no esta disponible por el momento');
              }else if(this.authService.lang() === 'en'){
                this.alertService.mostrarAlerta('The ingredient you selected is not available at the moment');
              }
            return;
          }else if(this.ingredientes_base1[index].existencia === 1){
            this.crepa.ingredientes_base.push(this.ingredientes_base1[index]);
            this.ingredientes_base1.splice(index, 1);
            this.anadirOrden();
          } 
        }
        this.anadirOrden();
        })
          

        res[0].orden.aderesos.forEach((element:any) => {
          const index = this.aderesos.findIndex((i:any) => i.id === element.id);
          if(index === -1){
            if(this.authService.lang() === 'es'){
              this.alertService.mostrarAlerta('El adereso que seleccionaste se elimino del menu');
              }else if(this.authService.lang() === 'en'){
                this.alertService.mostrarAlerta('The dressing you selected was removed from the menu');
              }
          }else{
         if(this.aderesos[index].existencia === 1){
            this.crepa.aderesos.push({nombre: this.aderesos[index].adereso, id: this.aderesos[index].id});
            this.anadirOrden();
          } else if(this.aderesos[index].existencia === 0){
            if(this.authService.lang() === 'es'){
              this.alertService.mostrarAlerta('El adereso que seleccionaste no esta disponible por el momento');
              }else if(this.authService.lang() === 'en'){
                this.alertService.mostrarAlerta('The dressing you selected is not available at the moment');
              }
            return;
          }
        }
        this.anadirOrden();
        })

        res[0].orden.ingredientes.forEach((element:any) => {
          const index = this.ingredientes_pri.findIndex((i:any) => i.id === element.id);
          if(index === -1){
            if(this.authService.lang() === 'es'){
              this.alertService.mostrarAlerta('El ingrediente que seleccionaste se elimino del menu');
              }else if(this.authService.lang() === 'en'){
                this.alertService.mostrarAlerta('The ingredient you selected was removed from the menu');
              }
          }else{
          if(this.ingredientes_pri[index].existencia === 1){
            this.crepa.ingredientes.push({nombre: this.ingredientes_pri[index].ingrediente_pri, id: this.ingredientes_pri[index].id});
            this.anadirOrden();
          }else if(this.ingredientes_pri[index].existencia === 0){
            if(this.authService.lang() === 'es'){
              this.alertService.mostrarAlerta('El ingrediente que seleccionaste no esta disponible por el momento');
              }else if(this.authService.lang() === 'en'){
                this.alertService.mostrarAlerta('The ingredient you selected is not available at the moment');
              }
            return;
          }
        }
        this.anadirOrden();
      })
        this.anadirOrden();
      },
      error: (err) => console.error(err)
    });
  }
  
  

  actualizarIngredientes(ingrediente: string, id: number, existencia: any){
    if(existencia === 0){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('El ingrediente que seleccionaste no esta disponible por el momento');
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('The ingredient you selected is not available at the moment');
        }
      return;
    }else{
  // Verifica si ya hay 7 ingredientes en el array
  const long = this.crepa.ingredientes.length + this.crepa.aderesos.length
  if (long === 3) {
    if(this.authService.lang() === 'es'){
      this.alertService.mostrarAlerta('No se pueden agregar más ingredientes, ya hay 3.');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('You cannot add more ingredients, there are already 3.');
      }
    this.anadirOrden();
    return; // Sale de la función si se alcanza el límite
  }

  // Busca la posición del ingrediente en el array de ingredientes
  const index = this.crepa.ingredientes.findIndex((i:any) => i.nombre === ingrediente);

  if (index === -1) {
    // Si el ingrediente no está en el array, agrégalo
    this.crepa.ingredientes.push({nombre: ingrediente, id: id});
    this.anadirOrden();
  } else {
    // Si el ingrediente está en el array, muestra un mensaje en la consola
    if(this.authService.lang() === 'es'){
      this.alertService.mostrarAlerta('El ingrediente ya existe en la crepa.');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('The ingredient already exists in the crepe.');
      }
    this.anadirOrden();
  }      
    }

  }

  actualizarAderesos(adereso: string, id:string, existencia: any){
    if(existencia === 0){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('El adereso que seleccionaste no esta disponible por el momento');
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('The dressing you selected is not available at the moment');
        }
      return;
    }else{
  // Verifica si ya hay 7 ingredientes en el array
  const long = this.crepa.ingredientes.length + this.crepa.aderesos.length
  if (long === 3) {
    if(this.authService.lang() === 'es'){
      this.alertService.mostrarAlerta('No se pueden agregar más ingredientes, ya hay 3.');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('You cannot add more ingredients, there are already 3.');
      }
    this.anadirOrden();
    return; // Sale de la función si se alcanza el límite
  }

  // Busca la posición del ingrediente en el array de ingredientes
  const index = this.crepa.aderesos.findIndex((i:any) => i.nombre === adereso);

  if (index === -1) {
    // Si el ingrediente no está en el array, agrégalo
    this.crepa.aderesos.push({nombre: adereso, id: id});
    this.anadirOrden();
  } else {
    // Si el ingrediente está en el array, muestra un mensaje en la consola
    if(this.authService.lang() === 'es'){
      this.alertService.mostrarAlerta('El ingrediente ya existe en la crepa.');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('The ingredient already exists in the crepe.');
      }
    this.anadirOrden();
  }
  }
  }

  eliminarIngrediente(ingrediente: string) {
    const index = this.crepa.ingredientes.indexOf(ingrediente);
    if (index !== -1) {
      this.crepa.ingredientes.splice(index, 1); // Elimina el ingrediente del array
      this.anadirOrden();
    }
  }

  eliminarAdereso(adereso: string) {
    const index = this.crepa.aderesos.indexOf(adereso);
    if (index !== -1) {
      this.crepa.aderesos.splice(index, 1); // Elimina el ingrediente del array
      this.anadirOrden();
    }
  }

  eliminarAdereso_base(adereso1: string){
    const index = this.crepa.adereso_base.indexOf(adereso1);
    if (index !== -1) {
      this.crepa.adereso_base.splice(index, 1); // Elimina el ingrediente del array
      this.adereso_base1.push(adereso1)
      this.anadirOrden();
      this.addAI = true;
    }
    this.showBase
  }

  eliminarIngrediente_base(ingrediente:string){
    const index = this.crepa.ingredientes_base.indexOf(ingrediente);
    if (index !== -1) {
      this.crepa.ingredientes_base.splice(index, 1); // Elimina el ingrediente del array
      this.ingredientes_base1.push(ingrediente);
      this.anadirOrden();
      this.addAIA = true;
    }
    this.showBase
  }

  actualizarIngredienteBase(ingrediente_base: string, id: string, existencia: any){
    if(existencia === 0){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('El ingrediente que seleccionaste no esta disponible por el momento');
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('The ingredient you selected is not available at the moment');
        }
      return;
    }else{
    const long = this.crepa.ingredientes_base.length + this.crepa.adereso_base.length
    if (long === 3) {
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('No se pueden agregar más ingredientes, ya hay 3.');
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('You cannot add more ingredients, there are already 3.');
        }
      this.anadirOrden();
      this.addAI = false;
      return; // Sale de la función si se alcanza el límite
    }
  // Busca la posición del ingrediente en el array de ingredientes
  const index = this.crepa.ingredientes.findIndex((i:any) => i.ingrediente_base === ingrediente_base);

  if (index === -1) {
    // Si el ingrediente no está en el array, agrégalo
    this.crepa.ingredientes_base.push({ingrediente_base: ingrediente_base, id: id});
    const index1 = this.ingredientes_base1.findIndex((i:any) => i.ingrediente_base === ingrediente_base);
    this.ingredientes_base1.splice(index1, 1);
    this.anadirOrden();
  } else {
    // Si el ingrediente está en el array, muestra un mensaje en la consola
    if(this.authService.lang() === 'es'){
      this.alertService.mostrarAlerta('El ingrediente ya existe en la crepa.');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('The ingredient already exists in the crepe.');
      }
    this.anadirOrden();
  }
}
  this.showBase

  }

  actualizarAderesoBase(adereso_base: string, id: string, existencia: any){
    if(existencia === 0){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('El adereso que seleccionste no esta disponible por el momento');
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('The dressing you selected is not available at the moment');
        }
      return;
    }else{
    const long = this.crepa.ingredientes_base.length + this.crepa.adereso_base.length
    if (long === 3) {
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('No se pueden agregar más ingredientes, ya hay 3.');
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('You cannot add more ingredients, there are already 3.');
        }
      this.anadirOrden();
      this.addAIA = false;
      return; // Sale de la función si se alcanza el límite
    }
  // Busca la posición del ingrediente en el array de ingredientes
  const index = this.crepa.aderesos.findIndex((i:any) => i.adereso_base === adereso_base);

  if (index === -1) {
    // Si el ingrediente no está en el array, agrégalo
    this.crepa.adereso_base.push({adereso_base: adereso_base, id: id});
    const index1 = this.adereso_base1.findIndex((i:any) => i.adereso_base === adereso_base);
    this.adereso_base1.splice(index1, 1);
    this.anadirOrden();
  } else {
    // Si el ingrediente está en el array, muestra un mensaje en la consola
    if(this.authService.lang() === 'es'){
      this.alertService.mostrarAlerta('El ingrediente ya existe en la crepa.');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('The ingredient already exists in the crepe.');
      }
    this.anadirOrden();
  }
}
  this.showBase
  }

  showBase(){
    const long = this.crepa.ingredientes_base.length + this.crepa.adereso_base.length
    if(long > 2){
      this.addAI = false
    }else{
      this.addAI = true
    }
  }

  debeMostrarA():any{
    if(this.adereso_base1.length > 0){
      return true
    }else(
      false
    )
  }

  debeMostrarAB():any{
    if(this.crepa.adereso_base.length > 0){
      return true
    }else(
      false
    )
  }

  debeMostrarI():any{
    if(this.ingredientes_base1.length > 0){
      return true
    }else(
      false
    )
  }

  debeMostrarIB():any{
    if(this.crepa.ingredientes_base.length > 0){
      return true
    }else(
      false
    )
  }

  ingredientePri():any{
    if(this.crepa.ingredientes.length > 0){
      return true
    }else{
      false
    }
  }

  Adereso():any{
    if(this.crepa.aderesos.length > 0){
      return true
    }else{
      false
    }
  }

  anadirOrden(){
    const long = this.crepa.ingredientes.length + this.crepa.aderesos.length
    const precio = this.precioRegular[0] + this.precioExtra[0]*long
    this.crepa.precio = precio
  }

  anadirCrepa(){
    const long1 = this.crepa.ingredientes_base.length + this.crepa.adereso_base.length
    const long = this.crepa.ingredientes.length + this.crepa.aderesos.length
    if(long1 === 0 && long === 0){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Necesitas seleccionar almenos un ingrediente');
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('You need to select at least one ingredient');
        }
      return;
    }else{
      this.crepa.ingredientes_base.forEach((element:any) => {

        const element1 :any = {
          id: element.id,
          ingrediente_base: element.ingrediente_base
        }
        this.ing_base.push(element1);
      })
      this.crepa.adereso_base.forEach((element:any) => {
          
          const element1 :any = {
            id: element.id,
            adereso_base: element.adereso_base
          }
          this.ade_base.push(element1);
      })
      this.crepa.ingredientes_base = this.ing_base;
      this.crepa.adereso_base = this.ade_base;
    this.orden.ingredientes_base = this.crepa.ingredientes_base;
    this.orden.adereso_base = this.crepa.adereso_base;
    this.orden.ingredientes = this.crepa.ingredientes;
    this.orden.aderesos = this.crepa.aderesos;
    this.precio = this.crepa.precio;

    this.Orden = {orden: this.orden}
    this.Orden.nombre = this.nombre;
    this.Orden.precio = this.precio;
    this.Orden.cantidad = this.cantidad;
    this.Orden.total = this.precio*this.cantidad;

    console.log(this.Orden)

    const params = this.activatedRoute.snapshot.params;
    const id:string = params['id'];

    this.add.updateOrden(id, this.Orden).subscribe(
      res => {        if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Su crepa ha sido actualizada');
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('Your crepe has been updated');
        }
        this.router.navigate(['carrito']);
      },
      err => {
        console.log(err)
      }
    )

    /**


    this.add.addOrden(this.Orden).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['carrito']);
      },
      err => {
        console.log(err)
      }
    )   */
    }
    

  }
  mostrarIngredientes(){
    if(this.crepa.ingredientes_base.length > 0 || this.crepa.adereso_base.length > 0 || this.crepa.ingredientes.length || this.crepa.aderesos.length > 0){
      return true;
    }else{
      return false;
    }
  }
}
