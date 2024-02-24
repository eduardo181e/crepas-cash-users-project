import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import { CrepaSaladaService } from 'src/app/services/crepa-salada.service';
import { crepasSalada } from 'src/app/models/nameCrepas';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-crepa-salada',
  templateUrl: './crepa-salada.component.html',
  styleUrls: ['./crepa-salada.component.css']
})
export class CrepaSaladaComponent {
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

  ingredientes_base1:any = [];
  adereso_base1:any = [];

  addAI:boolean = false;
  addAIA:boolean = false;

  long:any = this.crepa.ingredientes_base.length + this.crepa.adereso_base.length
  constructor(private service: CrepaSaladaService, private add: CarritoService, private router: Router, private alertService: AlertDialogService, private authService: AuthService){}
  ngOnInit() {
    this.service.getIngredientesB().subscribe(
      (res:any) => {
        res.forEach((element:any, index:any) => {
          if(index <= 2){
          if(element.existencia === 0){
            this.ingredientes_base1.push(element);
          }else if(element.existencia === 1){
          this.crepa.ingredientes_base.push(element);            
          }            
          }else{
            this.ingredientes_base1.push(element);
          }


        })
        console.log(this.ingredientes_base1);
      },
      err => console.error(err)
    )
    this.service.getAderesosB().subscribe(
      (res:any) => {
        console.log(res);
        res.forEach((element:any, index:any) => {
          if(index < 1){
          if(element.existencia === 0){
            this.adereso_base1.push(element);
          }else if(element.existencia === 1){
          this.crepa.adereso_base.push(element);            
          }            
          }else{
            this.adereso_base1.push(element);
          }


        })
        console.log(this.crepa.adereso_base);
      },
      err => console.error(err)
    )
    this.crepa.precio = this.precioRegular[0]
    this.nombre = crepasSalada;
    this.service.getAderesos().subscribe(
      res => {
        this.aderesos = res;
      },
      err => console.error(err)
    )  

    this.service.getIngredientesP().subscribe(
      res => {
        this.ingredientes_pri = res;
      },
      err => console.error(err)
    )  

    this.service.getPrecio(1).subscribe(
      (res:any) => {
        console.log(res[0].precio);
        this.precioExtra.push(res[0].precio);
        console.log(this.precioExtra);
      },
      err => console.error(err)
    )

    this.service.getPrecio(5).subscribe(
      (res:any) => {
        console.log(res[0].precio);
        this.precioRegular.push(res[0].precio);
        console.log(this.precioRegular);
        setTimeout(() => {
          this.anadirOrden()
        }, 200);

      },
      err => console.error(err)
    )

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
    console.log(precio)
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

    console.log(this.Orden)


    this.add.addOrden(this.Orden).subscribe(
      res => {  
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Su crepa ha sido agregada al carrito');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('Your crepe has been added to the cart');
          }
        this.router.navigate(['carrito']);
      },
      err => {
        console.log(err)
      }
    )  
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
