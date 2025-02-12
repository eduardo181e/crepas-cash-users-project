import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { CrepaDulceService } from 'src/app/services/crepa-dulce.service';
import { sabor } from './modelos';
import { crepasDulce } from 'src/app/models/nameCrepas';
import { AuthService } from 'src/app/services/auth-service.service';
import { forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-crepa-dulce',
  templateUrl: './edit-crepa-dulce.component.html',
  styleUrls: ['./edit-crepa-dulce.component.css']
})
export class EditCrepaDulceComponent {
  nombre: string = '';
  precioRegular:any = [];
  precioExtra:any = [];
  precioNieve:any = [];
  precioDecoracion:any = [];

  harinas:any = [];
  frutas:any = [];
  frutos_secos:any = [];
  Otros:any = [];
  ingredientes_unt:any = [];
  ingredientes_com:any = [];
  nieves:any = [];
  decoraciones:any = [];
  crepa:any = {
    harina: [],
    ingredientes_unt: [],
    ingredientes_com: [],
    nieve: [],
    decoracion: [],
    precio: 0
  }
  cantidad:any = [];
  Orden:any = {
    cantidad: 0,
    orden: {}
  };
  addN:boolean = false;
  orden:any = {};
  precio:number = 0;
  constructor(private service: CrepaDulceService, private add: CarritoService, private router: Router,private alertService: AlertDialogService, private activatedRoute: ActivatedRoute, private authService: AuthService ){}
  ngOnInit() {
    this.nombre = crepasDulce;
  
    // Obtener los datos en paralelo
    forkJoin({
      precios: this.service.getPrecios(),
      harinas: this.service.getHarinas(),
      ingredientesCom: this.service.getIngredientesC(),
      ingredientesUnt: this.service.getIngredientesU(),
      nieves: this.service.getNieves(),
      decoraciones: this.service.getDecoraciones()
    }).pipe(
      switchMap(({ precios, harinas, ingredientesCom, ingredientesUnt, nieves, decoraciones }) => {
        console.log(precios);
  
        // Procesar los precios
        this.procesarPrecios(precios);
  
        // Guardar los ingredientes y decoraciones
        this.ingredientes_com = ingredientesCom;
        this.ingredientes_com.forEach((element:any) => {
          if(element.tipo === 'Fruta'){
            this.frutas.push(element);
          }else if(element.tipo === 'Frutos Secos'){
            this.frutos_secos.push(element);
          }else if(element.tipo === 'Otros'){
            this.Otros.push(element);
          }
        });
        this.ingredientes_unt = ingredientesUnt;
        this.nieves = nieves;
        this.decoraciones = decoraciones;
  
        // Procesar harinas
        this.harinas = harinas;
        this.procesarHarinas(harinas);
  
        // Obtener la orden después de cargar todos los datos
        const id: string = this.activatedRoute.snapshot.params['id'];
        return this.add.selectOrden(id);
      })
    ).subscribe({
      next: (res: any) => {
        this.cantidad.push(res[0].cantidad);
        this.crepa = JSON.parse(res[0].orden);
        console.log(this.crepa);
        const index = this.harinas.findIndex((i:any) => i.id === this.crepa.harina.id);
        console.log(this.harinas[index].existencia)
        if(index === -1){
          if(this.authService.lang() === 'es'){
            this.alertService.mostrarAlerta('La harina '+ this.crepa.harina.harina + ' fue retirado del menu');
            }else if(this.authService.lang() === 'en'){
              this.alertService.mostrarAlerta('The flour '+ this.crepa.harina.harina + ' was removed from the menu');
            }
          this.crepa.harina = [];
          this.anadirOrden();
        }else if(this.harinas[index].existencia === 0){
          this.crepa.harina = [];
          if(this.authService.lang() === 'es'){
            this.alertService.mostrarAlerta('La harina '+ this.crepa.harina.harina + ' no esta disponible por el momento');
            }else if(this.authService.lang() === 'en'){
              this.alertService.mostrarAlerta('The flour '+ this.crepa.harina.harina + ' is not available at the moment');
            }
            this.anadirOrden();
        }
        this.crepa.ingredientes_unt.forEach((element:any) => {
          const index = this.ingredientes_unt.findIndex((i:any) => i.id === element.id);
          console.log(this.ingredientes_unt[index])
          if(index === -1){
            if(this.authService.lang() === 'es'){
              this.alertService.mostrarAlerta('El ingrediente '+ element.nombre + ' fue retirado del menu');
              }else if(this.authService.lang() === 'en'){
                this.alertService.mostrarAlerta('The ingredient '+ element.nombre + ' was removed from the menu');
              }
            const index1 = this.crepa.ingredientes_unt.findIndex((i:any) => i.id === element.id);
            this.crepa.ingredientes_unt.splice(index1, 1);
          } else if(this.ingredientes_unt[index].existencia === 0){
            if(this.authService.lang() === 'es'){
              this.alertService.mostrarAlerta('El ingrediente '+ element.nombre + ' no esta disponible por el momento');
              }else if(this.authService.lang() === 'en'){
                this.alertService.mostrarAlerta('The ingredient '+ element.nombre + ' is not available at the moment');
              }
            const index1 = this.crepa.ingredientes_unt.findIndex((i:any) => i.id === element.id);
            this.crepa.ingredientes_unt.splice(index1, 1);
          }
          this.anadirOrden();
        });
        this.crepa.ingredientes_com.forEach((element:any) => {
            console.log(element.id)
            const index = this.ingredientes_com.findIndex((i:any) => i.id === element.id);
            console.log(index)
            console.log(this.ingredientes_com)
            if(index === -1){
              if(this.authService.lang() === 'es'){
                this.alertService.mostrarAlerta('El ingrediente '+ element.nombre + ' fue retirado del menu');
                }else if(this.authService.lang() === 'en'){
                  this.alertService.mostrarAlerta('The ingredient '+ element.nombre + ' was removed from the menu');
                }
              const index1 = this.crepa.ingredientes_com.findIndex((i:any) => i.id === element.id);
              this.crepa.ingredientes_com.splice(index1, 1);
            } else if(this.ingredientes_com[index].existencia === 0){
              if(this.authService.lang() === 'es'){
                this.alertService.mostrarAlerta('El ingrediente '+ element.nombre + ' no esta disponible por el momento');
                }else if(this.authService.lang() === 'en'){
                  this.alertService.mostrarAlerta('The ingredient '+ element.nombre + ' is not available at the moment');
                }
              const index1 = this.crepa.ingredientes_com.findIndex((i:any) => i.id === element.id);
              this.crepa.ingredientes_com.splice(index1, 1);
            }
            this.anadirOrden();
        });
        this.crepa.nieve.forEach((element:any) => {
          console.log(element)
          const index = this.nieves.findIndex((i:any) => i.id === element.id);
          console.log(index)
          console.log(this.nieves)
          if(index === -1){
            if(this.authService.lang() === 'es'){
              this.alertService.mostrarAlerta('La nieve '+ element.nombre + ' fue retirado del menu');
              }else if(this.authService.lang() === 'en'){
                this.alertService.mostrarAlerta('The snow '+ element.nombre + ' was removed from the menu');
              }
              const index1 = this.crepa.nieve.findIndex((i:any) => i.id === element.id);
              this.crepa.nieve.splice(index1, 1);
            } else if(this.nieves[index].existencia === 0){
              if(this.authService.lang() === 'es'){
                this.alertService.mostrarAlerta('La nieve '+ element.nombre + ' no esta disponible por el momento');
                }else if(this.authService.lang() === 'en'){
                  this.alertService.mostrarAlerta('The snow '+ element.nombre + ' is not available at the moment');
                }
              const index1 = this.crepa.nieve.findIndex((i:any) => i.id === element.id);
              this.crepa.nieve.splice(index1, 1);
            }else{
              this.anadirOrden();
            }
            this.anadirOrden();
        });

        this.crepa.decoracion.forEach((element:any) => {
          console.log(element)
          const index = this.decoraciones.findIndex((i:any) => i.decoracion === element.nombre);
          console.log(index)
          console.log('Problem',this.decoraciones, this.crepa.decoracion)
          if(index === -1){
            if(this.authService.lang() === 'es'){
              this.alertService.mostrarAlerta('La decoracion '+ element.nombre + ' fue retirado del menu');
              }else if(this.authService.lang() === 'en'){
                this.alertService.mostrarAlerta('The decoration '+ element.nombre + ' was removed from the menu');
              }
              const index1 = this.crepa.decoracion.findIndex((i:any) => i.nombre === element.nombre);
              this.crepa.decoracion.splice(index1, 1);
            } else if(this.decoraciones[index].existencia === 0){
              if(this.authService.lang() === 'es'){
                this.alertService.mostrarAlerta('La decoracion '+ element.nombre + ' no esta disponible por el momento');
                }else if(this.authService.lang() === 'en'){
                  this.alertService.mostrarAlerta('The decoration '+ element.nombre + ' is not available at the moment');
                }
              const index1 = this.crepa.decoracion.findIndex((i:any) => i.nombre === element.nombre);
              this.crepa.decoracion.splice(index1, 1);
            }else{
              this.anadirOrden();
            }
            this.anadirOrden();
        });
        console.log(this.crepa)
        if(Object.keys(this.crepa.nieve).length > 0){
          this.addN = true;
          this.anadirOrden();
        }
        this.anadirOrden();
      },
      error: (err) => console.error(err)
    });
  }
  
  // Métodos auxiliares
  private procesarPrecios(precios: any) {
    const regular = precios.find((p: any) => p.descripcion === 'Regular');
    const extra = precios.find((p: any) => p.descripcion === 'Extra');
    const nieve = precios.find((p: any) => p.descripcion === 'Nieve');
    const decoracion = precios.find((p: any) => p.descripcion === 'Decoracion');
  
    this.precioRegular.push(regular?.precio || 0);
    this.precioExtra.push(extra?.precio || 0);
    this.precioNieve.push(nieve?.precio || 0);
    this.precioDecoracion.push(decoracion?.precio || 0);
    this.crepa.precio = this.precioRegular[0];
  }
  
  private procesarHarinas(harinas: any) {
    const vainilla = harinas.find((h: any) => h.harina === 'Vainilla');
    if (vainilla?.existencia === 0) {
      this.mostrarAlerta(
        'La harina sabor vainilla no está disponible por el momento',
        'The vanilla flavor flour is not available at the moment'
      );
      this.crepa.harina = {};
    } else {
      this.crepa.harina = vainilla;
    }
  }
  
  private mostrarAlerta(mensajeEs: string, mensajeEn: string) {
    if (this.authService.lang() === 'es') {
      this.alertService.mostrarAlerta(mensajeEs);
    } else {
      this.alertService.mostrarAlerta(mensajeEn);
    }
  }
  
  
  
  actualizarHarinaSeleccionada(harina: string, id: number, existencia: any) {
    if(existencia === 0){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por el momento esta harina no se encuentra en existencia');
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('At the moment this flour is not in stock');
        }
    }else{
    // Solo actualiza la harina si es diferente a la harina actual
    if (this.crepa.harina !== harina) {
      this.crepa.harina = {harina: harina, id: id};
      this.anadirOrden();
    }
    }

  }

  // Función para agregar o mostrar mensaje si el ingrediente ya existe
actualizarIngredienteUnt(ingrediente: string, id: number, existencia: any) {
  if(existencia === 0){
    if(this.authService.lang() === 'es'){
      this.alertService.mostrarAlerta('Por el momento este ingrediente no se encuentra en existencia');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('At the moment this ingredient is not in stock');
      }
  }else{
  // Verifica si ya hay 7 ingredientes en el array
  const long = this.crepa.ingredientes_unt.length + this.crepa.ingredientes_com.length
  if (long === 7) {
    if(this.authService.lang() === 'es'){
      this.alertService.mostrarAlerta('No se pueden agregar más ingredientes, ya hay 7.');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('You cannot add more ingredients, there are already 7.');
      }
    this.anadirOrden();
    return; // Sale de la función si se alcanza el límite
  }

  // Busca la posición del ingrediente en el array de ingredientes
  const index = this.crepa.ingredientes_unt.findIndex((i:any) => i.nombre === ingrediente);

  if (index === -1) {
    // Si el ingrediente no está en el array, agrégalo
    this.crepa.ingredientes_unt.push({nombre: ingrediente, id: id});
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

  // Función para agregar o mostrar mensaje si el ingrediente ya existe
  actualizarIngredienteCom(ingrediente: string, id: number, existencia: any) {
    if(existencia === 0){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Por el momento este ingrediente no se encuentra en existencia');
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('At the moment this ingredient is not in stock');
        }
    }else{
    // Verifica si ya hay 7 ingredientes en el array
    const long = this.crepa.ingredientes_unt.length + this.crepa.ingredientes_com.length
    if (long === 7) {
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('No se pueden agregar más ingredientes, ya hay 7.');
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('You cannot add more ingredients, there are already 7.');
        }
      this.anadirOrden();
      return; // Sale de la función si se alcanza el límite
    }
  
    // Busca la posición del ingrediente en el array de ingredientes
    const index = this.crepa.ingredientes_com.findIndex((i:any) => i.nombre === ingrediente);
  
    if (index === -1) {
      // Si el ingrediente no está en el array, agrégalo
      this.crepa.ingredientes_com.push({nombre: ingrediente, id: id});
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

eliminarIngredienteUnt(ingrediente: string) {
  const index = this.crepa.ingredientes_unt.findIndex((i:any) => i.nombre === ingrediente);
  if (index !== -1) {
    this.crepa.ingredientes_unt.splice(index, 1); // Elimina el ingrediente del array
    this.anadirOrden();
  }
}

eliminarIngredienteCom(ingrediente: string) {
  const index = this.crepa.ingredientes_com.findIndex((i:any) => i.nombre === ingrediente);
  if (index !== -1) {
    this.crepa.ingredientes_com.splice(index, 1); // Elimina el ingrediente del array
    this.anadirOrden();
  }
}

actualizarNieve(nieve: string, id: number, existencia: any) {
  if(existencia === 0){
    if(this.authService.lang() === 'es'){
      this.alertService.mostrarAlerta('Por el momento esta nieve encuentra en existencia');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('At the moment this snow is in stock');
      }
  }else{
  // Verifica si ya hay 7 ingredientes en el array
  if (this.crepa.nieve.length === 1) {
    if(this.authService.lang() === 'es'){
      this.alertService.mostrarAlerta('Ya seleccionaste una nieve.');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('You have already selected a snow.');
      }
    this.anadirOrden();
    return; // Sale de la función si se alcanza el límite
  }

  // Busca la posición del ingrediente en el array de ingredientes
  const index = this.crepa.nieve.findIndex((i:any) => i.nombre === nieve);

  if (index === -1) {
    // Si el ingrediente no está en el array, agrégalo
    this.crepa.nieve.push({nombre: nieve, id: id});
    this.addN = true;
    this.anadirOrden();
  } else {
    // Si el ingrediente está en el array, muestra un mensaje en la consola
    if(this.authService.lang() === 'es'){
      this.alertService.mostrarAlerta('Ya seleccionaste una nieve');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('You have already selected a snow');
      }
    this.anadirOrden();
  }
}
}


eliminarNieve(nieve: string) {
  const index = this.crepa.nieve.findIndex((i:any) => i.nombre === nieve);
  if (index !== -1) {
    this.crepa.nieve.splice(index, 1); // Elimina el ingrediente del array
    this.addN = false;
    this.anadirOrden();
  }
}

anadirOrden(){
  
  const long = this.crepa.ingredientes_unt.length + this.crepa.ingredientes_com.length
  console.log(this.crepa)
  const longDec = this.crepa.decoracion.length
  if(longDec < 2){
  if(long > 1){
  if (this.crepa.harina.harina === sabor){

    const precio = this.precioRegular[0] + this.precioExtra[0]*(long - 2) + this.precioNieve[0]*(this.crepa.nieve.length); 
    this.crepa.precio = precio    
    console.log(this.crepa.precio)
   }else if(this.crepa.harina.harina !== sabor){
    const precio = this.precioRegular[0] + this.precioExtra[0]*(long -2 + 1) + this.precioNieve[0]*(this.crepa.nieve.length); 
          this.crepa.precio = precio


    console.log(this.crepa.precio)
   }
  }else{
    if(this.crepa.harina.harina === sabor){
      this.crepa.precio = this.precioRegular[0] + this.precioNieve[0]*(this.crepa.nieve.length); 
    }else if(this.crepa.harina.harina !== sabor){
      this.crepa.precio = this.precioRegular[0] + this.precioExtra[0] + this.precioNieve[0]*(this.crepa.nieve.length); 
    }

  }
}else if(longDec > 1){
  if(long > 1){
    if (this.crepa.harina.harina === sabor){
  
      const precio = this.precioRegular[0] + this.precioExtra[0]*(long - 2) + this.precioNieve[0]*(this.crepa.nieve.length); 
      this.crepa.precio = precio + (this.precioDecoracion[0]*(longDec - 1))    
      console.log(this.crepa.precio)
     }else if(this.crepa.harina.harina !== sabor){
      const precio = this.precioRegular[0] + this.precioExtra[0]*(long -2 + 1) + this.precioNieve[0]*(this.crepa.nieve.length); 
            this.crepa.precio = precio + (this.precioDecoracion[0]*(longDec - 1))  
      console.log(this.crepa.precio)
     }
    }else{
      if(this.crepa.harina.harina === sabor){
        this.crepa.precio = this.precioRegular[0] + this.precioNieve[0]*(this.crepa.nieve.length) + (this.precioDecoracion[0]*(longDec - 1))  ; 
      }else if(this.crepa.harina.harina !== sabor){
        this.crepa.precio = this.precioRegular[0] + this.precioExtra[0] + this.precioNieve[0]*(this.crepa.nieve.length) + (this.precioDecoracion[0]*(longDec - 1)); 
      }
  
    }
}
}


anadirCrepa(){

  const long = this.crepa.ingredientes_unt.length + this.crepa.ingredientes_com.length
  if(long > 1 && Object.keys(this.crepa.harina).length > 0){
  this.orden = {
    harina: {harina: this.crepa.harina.harina, id: this.crepa.harina.id},
    ingredientes_unt: this.crepa.ingredientes_unt,
    ingredientes_com: this.crepa.ingredientes_com,
    nieve: this.crepa.nieve,
    decoracion: this.crepa.decoracion,
    precio: this.crepa.precio
  }

  console.log(this.cantidad)
  const cant = this.cantidad
  console.log(cant[0]) 
  this.precio = this.crepa.precio
  this.Orden.cantidad = cant[0];
  this.Orden.total = this.precio*this.cantidad;
  this.Orden.orden = this.orden
  this.Orden.nombre = this.nombre;
  this.Orden.precio = this.precio;

  console.log(this.Orden)


  const params = this.activatedRoute.snapshot.params;
  const id:string = params['id'];
  this.add.updateOrden(id, this.Orden).subscribe(
    (res:any) => {
      if(this.authService.lang() === 'es'){
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
  /*
  this.add.addOrden(this.Orden).subscribe(
    res => {
      console.log(res);
      this.router.navigate(['carrito']);
    },
    err => {
      console.log(err)
    }
  ) */   
  }else{
    if(long < 2 && Object.keys(this.crepa.harina).length === 0){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Selecciona una harina y agrega al menos dos ingredientes');
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('Select a flour and add at least two ingredients');
        }
    }else{
          if(long < 2){
            if(this.authService.lang() === 'es'){
              this.alertService.mostrarAlerta('Necesitas agregar al menos dos ingredientes');
              }else if(this.authService.lang() === 'en'){
                this.alertService.mostrarAlerta('You need to add at least two ingredients');
              }
      }
      if(Object.keys(this.crepa.harina).length === 0){
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Necesitas selecciona una harina');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('You need to select a flour');
          }
      }  
    }


  }



}

mostrarUnt(){
  if(this.crepa.ingredientes_unt.length > 0){
    return true;
  }else{
    return false;
  }
}


mostrarCom(){
  if(this.crepa.ingredientes_com.length > 0){
    return true;
  }else{
    return false;
  }
}

mostrarNieve(){
  if(this.crepa.nieve.length > 0){
    return true;
  }else{
    return false;
  }
}

mostrarIngredientes(){
  if(this.crepa.ingredientes_unt.length > 0 || this.crepa.ingredientes_com.length > 0 || this.crepa.nieve.length > 0){
    return true;
  }else{
    return false;
  }
}

mostrarDecoracion(){
  if(this.crepa.decoracion.length > 0){
    return true;
  }else{
    return false;
  }
}

eliminarDecoracion(nieve: string) {
  const index = this.crepa.decoracion.findIndex((i:any) => i.nombre === nieve);
  if (index !== -1) {
    this.crepa.decoracion.splice(index, 1); // Elimina el ingrediente del array
  }
  this.anadirOrden();
}

  // Función para agregar o mostrar mensaje si el ingrediente ya existe
  actualizarDecoracion(ingrediente: string) {
    // Verifica si ya hay 7 ingredientes en el array
    const long = this.crepa.decoracion.length
    if (long === 4) {
      
      if(this.authService.lang() === 'es'){
      this.alertService.mostrarAlerta('No se pueden agregar más decoraciones, ya hay 4.');
      } else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('No more decorations can be added, there are already 4.');
        }
    }else{
    // Busca la posición del ingrediente en el array de ingredientes
    const index = this.crepa.decoracion.findIndex((i:any) => i.nombre === ingrediente);
  
    if (index === -1) {
      const index1 = this.decoraciones.findIndex((i:any) => i.decoracion === ingrediente);
      const decoracion = this.decoraciones[index1];
      if(decoracion.existencia === 0){
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Por el momento esta decoracion no se encuentra en existencia');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('At the moment this decoration is not in stock');
          }
      }else{
      // Si el ingrediente no está en el array, agrégalo
      this.crepa.decoracion.push({nombre: ingrediente});
      }
    } else {
      // Si el ingrediente está en el array, muestra un mensaje en la consola
      if(this.authService.lang() === 'es'){
      this.alertService.mostrarAlerta('La decoracion ya existe en la crepa.');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('The decoration already exists on the crepe.');
        }
    }      
    }
    this.anadirOrden()
  

  }

}
