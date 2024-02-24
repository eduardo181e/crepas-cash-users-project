import { Component } from '@angular/core';
import { WaffleService } from '../../services/waffle.service';
import { CarritoService } from '../../services/carrito.service';
import { Router } from '@angular/router';
import { waffles } from '../../models/nameCrepas';
import { AlertDialogService } from '../../alert-dialog.service';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-waffle',
  templateUrl: './waffle.component.html',
  styleUrls: ['./waffle.component.css']
})
export class WaffleComponent {

    nombre: string = '';
    precioRegular: any = [];
    precioExtra: any = [];
    precioNieve: any = [];

    ingredientes_unt:any = [];
    ingredientes_com:any = [];
    nieves:any = [];
    frutas:any = [];
    frutos_secos:any = [];
    Otros:any = [];

    waffle:any = {
      ingredientes_unt: [],
      ingredientes_com: [],
      nieve: [],
      decoracion: [],
      precio: 0
    }

    Orden:any = {
      orden: {
        ingredientes_unt: [],
        ingredientes_com: [],
        nieve: [],
        precio: 0
      },
    };
    addN:boolean = false;
    orden:any = {};
    precio:number = 0;
    constructor(private service: WaffleService, private add: CarritoService, private router: Router, private alertService: AlertDialogService, private authService: AuthService){}

    ngOnInit(){
      this.nombre = waffles;
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
          this.ingredientes_unt = res;
        },
        err => console.error(err)
      ) 
      this.service.getNieves().subscribe(
        res => {
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
          this.precioRegular.push(precios[regular].precio);
          this.precioExtra.push(precios[extra].precio);
          this.precioNieve.push(precios[nieve].precio);
          this.waffle.precio = this.precioRegular[0]
        },
        err => console.error(err)
      )
    }

    actualizarIngredienteUnt(ingrediente: string, id: number, existencia: any) {
      if (existencia === 0) {
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('El ingrediente no esta disponible por el momento');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('The ingredient is not available at the moment');
          }
        return;
      }else{
      // Verifica si ya hay 7 ingredientes en el array
      const long = this.waffle.ingredientes_unt.length + this.waffle.ingredientes_com.length
      if (long === 7) {
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('No se pueden agregar más ingredientes, ya hay 7.');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('You can not add more ingredients, there are already 7.');
          }
        this.anadirOrden();
        return; // Sale de la función si se alcanza el límite
      }
    
      // Busca la posición del ingrediente en el array de ingredientes
      const index = this.waffle.ingredientes_unt.findIndex((i:any) => i.nombre === ingrediente);
    
      if (index === -1) {
        // Si el ingrediente no está en el array, agrégalo
        this.waffle.ingredientes_unt.push({nombre: ingrediente, id: id});
        this.anadirOrden();
      } else {
        // Si el ingrediente está en el array, muestra un mensaje en la consola
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('El ingrediente ya existe en el waffle.');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('The ingredient already exists in the waffle.');
          }
        this.anadirOrden();
      }        
      }

    }

    actualizarIngredienteCom(ingrediente: string, id: number, existencia: any) {
      if (existencia === 0) {
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('El ingrediente no esta disponible por el momento');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('The ingredient is not available at the moment');
          }
        return;
      }else{
      // Verifica si ya hay 7 ingredientes en el array
      const long = this.waffle.ingredientes_unt.length + this.waffle.ingredientes_com.length
      if (long === 7) {
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('No se pueden agregar más ingredientes, ya hay 7.');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('You can not add more ingredients, there are already 7.');
          }
        this.anadirOrden();
        return; // Sale de la función si se alcanza el límite
      }
    
      // Busca la posición del ingrediente en el array de ingredientes
      const index = this.waffle.ingredientes_com.findIndex((i:any) => i.nombre === ingrediente);
    
      if (index === -1) {
        // Si el ingrediente no está en el array, agrégalo
        this.waffle.ingredientes_com.push({nombre: ingrediente, id: id});
        this.anadirOrden();
      } else {
        // Si el ingrediente está en el array, muestra un mensaje en la consola
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('El ingrediente ya existe en el waffle.');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('The ingredient already exists in the waffle.');
          }
        this.anadirOrden();
      }
    }
    }

    eliminarIngredienteUnt(ingrediente: string) {
      const index = this.waffle.ingredientes_unt.findIndex((i:any) => i.nombre === ingrediente);
      if (index !== -1) {
        this.waffle.ingredientes_unt.splice(index, 1); // Elimina el ingrediente del array
        this.anadirOrden();
      }
    }
    
    eliminarIngredienteCom(ingrediente: string) {
      const index = this.waffle.ingredientes_com.findIndex((i:any) => i.nombre === ingrediente);
      if (index !== -1) {
        this.waffle.ingredientes_com.splice(index, 1); // Elimina el ingrediente del array
        this.anadirOrden();
      }
    }
    
    actualizarNieve(nieve: string, id: number, existencia: any) {
      if (existencia === 0) {
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('La nieve no esta disponible por el momento');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('The ice cream is not available at the moment');
          }
        return;
      }else{
      // Verifica si ya hay 7 ingredientes en el array
      if (this.waffle.nieve.length === 1) {
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Ya seleccionaste una nieve.');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('You have already selected an ice cream.');
          }
        this.anadirOrden();
        return; // Sale de la función si se alcanza el límite
      }
    
      // Busca la posición del ingrediente en el array de ingredientes
      const index = this.waffle.nieve.findIndex((i:any) => i.nombre === nieve);
    
      if (index === -1) {
        // Si el ingrediente no está en el array, agrégalo
        this.waffle.nieve.push({nombre: nieve, id: id});
        this.addN = true;
        this.anadirOrden();
      } else {
        // Si el ingrediente está en el array, muestra un mensaje en la consola
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Ya seleccionaste una nieve');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('You have already selected an ice cream');
          }
        this.anadirOrden();
      }
    }
    }
    
    
    eliminarNieve(nieve: string) {
      const index = this.waffle.nieve.findIndex((i:any) => i.nombre === nieve);
      if (index !== -1) {
        this.waffle.nieve.splice(index, 1); // Elimina el ingrediente del array
        this.addN = false;
        this.anadirOrden();
      }
    }

    anadirOrden(){
  
      const long = this.waffle.ingredientes_unt.length + this.waffle.ingredientes_com.length
      console.log(this.waffle)
      if(long > 1){
        const precio = this.precioRegular[0] + this.precioExtra[0]*(long - 2) + this.precioNieve[0]*this.waffle.nieve.length; 
        this.waffle.precio = precio         
      }else{          
        this.waffle.precio = this.precioRegular[0];
      }
    }

    anadirWaffle(){
      const long = this.waffle.ingredientes_unt.length + this.waffle.ingredientes_com.length
      if(long > 1){
      this.orden = {
        ingredientes_unt: this.waffle.ingredientes_unt,
        ingredientes_com: this.waffle.ingredientes_com,
        nieve: this.waffle.nieve,
        decoracion: this.waffle.decoracion,
        precio: this.waffle.precio
      }
    
      this.precio = this.waffle.precio
      this.Orden = {orden: this.orden}
      this.Orden.nombre = this.nombre;
      this.Orden.precio = this.precio;
    
      console.log(this.Orden)
      this.add.addOrden(this.Orden).subscribe(
        res => {
          if(this.authService.lang() === 'es'){
            this.alertService.mostrarAlerta('Su waffle ha sido agregado al carrito');
            }else if(this.authService.lang() === 'en'){
              this.alertService.mostrarAlerta('Your waffle has been added to the cart');
            }
          this.router.navigate(['carrito']);
        },
        err => {
          console.log(err)
        }
      )
    }else{    if(this.authService.lang() === 'es'){
      this.alertService.mostrarAlerta('necesitas agregar al menos dos ingredientes');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('you need to add at least two ingredients');
      }
    }
    }

    mostrarUnt(){
      if(this.waffle.ingredientes_unt.length > 0){
        return true;
      }else{
        return false;
      }
    }
    
    
    mostrarCom(){
      if(this.waffle.ingredientes_com.length > 0){
        return true;
      }else{
        return false;
      }
    }
    
    mostrarNieve(){
      if(this.waffle.nieve.length > 0){
        return true;
      }else{
        return false;
      }
    }
    
    mostrarIngredientes(){
      if(this.waffle.ingredientes_unt.length > 0 || this.waffle.ingredientes_com.length > 0 || this.waffle.nieve.length > 0){
        return true;
      }else{
        return false;
      }
    }

    mostrarDecoracion(){
      if(this.waffle.decoracion.length > 0){
        return true;
      }else{
        return false;
      }
    }

      
  eliminarDecoracion(nieve: string) {
    const index = this.waffle.decoracion.findIndex((i:any) => i.nombre === nieve);
    if (index !== -1) {
      this.waffle.decoracion.splice(index, 1); // Elimina el ingrediente del array
    }
  }
  
    // Función para agregar o mostrar mensaje si el ingrediente ya existe
    actualizarDecoracion(ingrediente: string) {
      // Verifica si ya hay 7 ingredientes en el array
      const long = this.waffle.decoracion.length
      if (long === 2) {
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('No se pueden agregar más decoraciones, ya hay 2.');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('You can not add more decorations, there are already 2.');
          }
      }else{
      // Busca la posición del ingrediente en el array de ingredientes
      const index = this.waffle.decoracion.findIndex((i:any) => i.nombre === ingrediente);
    
      if (index === -1) {
        // Si el ingrediente no está en el array, agrégalo
        this.waffle.decoracion.push({nombre: ingrediente});
      } else {
        // Si el ingrediente está en el array, muestra un mensaje en la consola
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('La decoracion ya existe en el waffle.');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('The decoration already exists in the waffle.');
          
      }  
      }      
      }
    
  
    }

}
