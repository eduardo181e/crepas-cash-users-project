import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import { CrepaDulceService } from 'src/app/services/crepa-dulce.service';
import { crepasDulce } from 'src/app/models/nameCrepas';
import { sabor } from './modelos';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';


@Component({
  selector: 'app-crepa-dulce',
  templateUrl: './crepa-dulce.component.html',
  styleUrls: ['./crepa-dulce.component.css']
})
export class CrepaDulceComponent {
  nombre: string = '';
  precioRegular:any = [];
  precioExtra:any = [];
  precioNieve:any = [];
  precioDecoracion:any = [];

  harinas:any = [];
  ingredientes_unt:any = [];
  ingredientes_com:any = [];
  frutas:any = [];
  frutos_secos:any = [];
  Otros:any = [];
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
  Orden:any;
  addN:boolean = false;
  orden:any = {};
  precio:number = 0;
  constructor(private service: CrepaDulceService, private add: CarritoService, private router: Router,private alertService: AlertDialogService, private authService: AuthService ){}
  ngOnInit(){

    this.nombre = crepasDulce;



    this.service.getHarinas().subscribe(
      res => {
        this.harinas = res;
        console.log(res);
        const Vainilla = this.harinas.filter((harina:any) => harina.harina === sabor);
        if (Vainilla[0].existencia === 0) {
          if(this.authService.lang() === 'es'){
            this.alertService.mostrarAlerta('La harina sabor vainilla no esta disponible por el momento');
            }else if(this.authService.lang() === 'en'){
              this.alertService.mostrarAlerta('The vanilla flavor flour is not available at the moment');
            }
          this.crepa.harina = {};
          return;
        }else{
        this.crepa.harina = Vainilla[0];
        console.log(Vainilla);          
        }

      },
      err => console.error(err)
    )

    this.service.getIngredientesC().subscribe(
      (res:any) => {
        console.log(res);
        res.forEach((element:any) => {
          if(element.tipo === 'Fruta'){
            this.frutas.push(element);
          }else if(element.tipo === 'Frutos Secos'){
            this.frutos_secos.push(element);
          }else if(element.tipo === 'Otros'){
            this.Otros.push(element);
          }
        });
      },
      err => console.error(err)
    ) 

    this.service.getIngredientesU().subscribe(
      res => {
        console.log(res);
        this.ingredientes_unt = res;
      },
      err => console.error(err)
    ) 
    this.service.getDecoraciones().subscribe(
      res => {
        console.log(res);
        this.decoraciones = res;
      },
      err => console.error(err)
    ) 
    this.service.getNieves().subscribe(
      res => {
        console.log(res);
        this.nieves = res;
      },
      err => console.error(err)
    )  

    this.service.getPrecios().subscribe(
      (res:any) => {
        console.log(res);
        const precios:any = res
        const regular = precios.findIndex((objeto:any)=> objeto.descripcion === 'Regular');
        const extra = precios.findIndex((objeto:any)=> objeto.descripcion === 'Extra');
        const nieve = precios.findIndex((objeto:any)=> objeto.descripcion === 'Nieve');
        const decoracion = precios.findIndex((objeto:any)=> objeto.descripcion === 'Decoracion');
        this.precioRegular.push(precios[regular].precio);
        this.precioExtra.push(precios[extra].precio);
        this.precioNieve.push(precios[nieve].precio);
        this.precioDecoracion.push(precios[decoracion].precio);
      },
      err => console.error(err)
    )


    setTimeout(() => {
    this.crepa.precio = this.precioRegular[0]
    }, 300)

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
      this.crepa.precio = precio + (this.precioExtra[0]*(longDec - 1))    
      console.log(this.crepa.precio)
     }else if(this.crepa.harina.harina !== sabor){
      const precio = this.precioRegular[0] + this.precioExtra[0]*(long -2 + 1) + this.precioNieve[0]*(this.crepa.nieve.length); 
            this.crepa.precio = precio + (this.precioExtra[0]*(longDec - 1))  
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

  this.precio = this.crepa.precio
  this.Orden = {orden: this.orden}
  this.Orden.nombre = this.nombre;
  this.Orden.precio = this.precio;

  console.log(this.Orden)
  if(this.authService.lang() === 'es'){
    this.alertService.mostrarAlerta('Su crepa ha sido agregada al carrito');
    }else if(this.authService.lang() === 'en'){
      this.alertService.mostrarAlerta('Your crepe has been added to the cart');
    }
  console.log(Object.keys(this.crepa.harina).length);

  this.add.addOrden(this.Orden).subscribe(
    res => {
      console.log(res);
      this.router.navigate(['carrito']);
    },
    err => {
      console.log(err)
    }
  )  
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
  this.anadirOrden()
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
      console.log(this.decoraciones[index1])
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
