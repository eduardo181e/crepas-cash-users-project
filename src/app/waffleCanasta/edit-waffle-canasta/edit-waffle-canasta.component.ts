import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertDialogService } from 'src/app/alert-dialog.service';
import { CarritoService } from 'src/app/services/carrito.service';
import { WaffleCanastaService } from 'src/app/services/waffle-canasta.service';
import { waffleCanasta } from 'src/app/models/nameCrepas';
import { AuthService } from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-edit-waffle-canasta',
  templateUrl: './edit-waffle-canasta.component.html',
  styleUrls: ['./edit-waffle-canasta.component.css']
})
export class EditWaffleCanastaComponent {
  nombre: string = '';
  precioRegular: any = [];
  precioExtra: any = [];
  precioDecoracion: any = [];

  ingredientes_unt:any = [];
  ingredientes_com:any = [];
  nieves:any = [];
  decoraciones:any = [];
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
  cantidad:any;
  Orden:any;
  addN:boolean = false;
  orden:any = {};
  precio:number = 0;
  constructor(private service: WaffleCanastaService, private add: CarritoService, private router: Router, private alertService: AlertDialogService, private activatedRoute: ActivatedRoute, private authService: AuthService){}

  ngOnInit(){
    this.nombre = waffleCanasta;
    this.waffle.precio = this.precioRegular[0]
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
        this.ingredientes_com = res;
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
    this.service.getDecoraciones().subscribe(
      res => {
        console.log(res);
        this.decoraciones = res;
      },
      err => console.error(err)
    ) 
    this.service.getPrecios().subscribe(
      (res:any) => {
        console.log(res);
        const precios:any = res
        const regular = precios.findIndex((objeto:any)=> objeto.descripcion === 'Regular');
        const extra = precios.findIndex((objeto:any)=> objeto.descripcion === 'Extra');
        const decoracion = precios.findIndex((objeto:any)=> objeto.descripcion === 'Decoracion');
        this.precioRegular.push(precios[regular].precio);
        this.precioExtra.push(precios[extra].precio);
        this.precioDecoracion.push(precios[decoracion].precio);
      },
      err => console.error(err)
    )

    setTimeout(() => {
      const params = this.activatedRoute.snapshot.params;
      const id:string = params['id'];

      this.add.selectOrden(id).subscribe(
        (res: any) => {
          console.log('---------Untables----------');
          res[0].orden.ingredientes_unt.forEach((element:any) => {
            const index = this.ingredientes_unt.findIndex((i:any) => i.id === element.id);
            console.log(this.ingredientes_unt[index]);
            if(index === -1){
              if(this.authService.lang() === 'es'){
                this.alertService.mostrarAlerta('El ingrediente '+ element.nombre + ' fue retirado del menu');
                }else if(this.authService.lang() === 'en'){
                  this.alertService.mostrarAlerta('The ingredient '+ element.nombre + ' was removed from the menu');
                }
            }else{
              if(this.ingredientes_unt[index].existencia === 1){
              this.waffle.ingredientes_unt.push({nombre: this.ingredientes_unt[index].ingrediente_unt, id: this.ingredientes_unt[index].id});
              this.anadirOrden();
              }else if(this.ingredientes_unt[index].existencia === 0){
                if(this.authService.lang() === 'es'){
                  this.alertService.mostrarAlerta('El ingrediente '+ element.nombre + ' no esta disponible por el momento');
                  }else if(this.authService.lang() === 'en'){
                    this.alertService.mostrarAlerta('The ingredient '+ element.nombre + ' is not available at the moment');
                  }
              }
            }
          })
          console.log('----------Complementarios---------');
          console.log(res[0].orden.ingredientes_com);
          res[0].orden.ingredientes_com.forEach((element:any) => {
            const index = this.ingredientes_com.findIndex((i:any) => i.id === element.id);
            console.log(this.ingredientes_com[index]);
            if(index === -1){
              if(this.authService.lang() === 'es'){
                this.alertService.mostrarAlerta('El ingrediente '+ element.nombre + ' fue retirado del menu');
                }else if(this.authService.lang() === 'en'){
                  this.alertService.mostrarAlerta('The ingredient '+ element.nombre + ' was removed from the menu');
                }
            }else{
              if(this.ingredientes_com[index].existencia === 1){
              this.waffle.ingredientes_com.push({nombre: this.ingredientes_com[index].ingrediente_com, id: this.ingredientes_com[index].id});
              this.anadirOrden();
              }else if(this.ingredientes_com[index].existencia === 0){
                if(this.authService.lang() === 'es'){
                  this.alertService.mostrarAlerta('El ingrediente '+ element.nombre + ' no esta disponible por el momento');
                  }else if(this.authService.lang() === 'en'){
                    this.alertService.mostrarAlerta('The ingredient '+ element.nombre + ' is not available at the moment');
                  }
              }
            }
          })

          console.log('----------Nieves---------');
          console.log(res[0].orden.nieve);
          res[0].orden.nieve.forEach((element:any) => {
            const index = this.nieves.findIndex((i:any) => i.id === element.id);
            console.log(this.nieves[index]);
            if(index === -1){
              if(this.authService.lang() === 'es'){
                this.alertService.mostrarAlerta('La nieve '+ element.nombre + ' fue retirado del menu');
                }else if(this.authService.lang() === 'en'){
                  this.alertService.mostrarAlerta('The ice cream '+ element.nombre + ' was removed from the menu');
                }
            }else{
              if(this.nieves[index].existencia === 1){
              this.waffle.nieve.push({nombre: this.nieves[index].nieve, id: this.nieves[index].id});
              this.anadirOrden();
              this.addN = true;
              }else if(this.nieves[index].existencia === 0){
                if(this.authService.lang() === 'es'){
                  this.alertService.mostrarAlerta('La nieve '+ element.nombre + ' no esta disponible por el momento');
                  }else if(this.authService.lang() === 'en'){
                    this.alertService.mostrarAlerta('The ice cream '+ element.nombre + ' is not available at the moment');
                  }
              }
            }
          })


          this.waffle.decoracion = res[0].orden.decoracion;

          this.cantidad = res[0].cantidad;

        }, 
        err => console.error(err)
      )
    }, 500);
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
    const longDec = this.waffle.decoracion.length
    console.log(this.waffle)
    
    if(longDec < 2){
    if(long > 0){
             const precio = this.precioRegular[0] + this.precioExtra[0]*(long - 1);
      this.waffle.precio = precio
    }else{      
      this.waffle.precio = this.precioRegular[0];
    }
  }else if(longDec > 1){
    if(long > 0){
      const precio = this.precioRegular[0] + this.precioExtra[0]*(long - 1);
this.waffle.precio = precio + (this.precioDecoracion[0]*(longDec - 1 )) 
}else{      
this.waffle.precio = this.precioRegular[0] + (this.precioDecoracion[0]*(longDec - 1 )) ;
}
  }  
  }

  anadirWaffle(){
    const long = this.waffle.ingredientes_unt.length + this.waffle.ingredientes_com.length
    if(long > 0){
    this.orden = {
      ingredientes_unt: this.waffle.ingredientes_unt,
      ingredientes_com: this.waffle.ingredientes_com,
      nieve: this.waffle.nieve,
      decoracion: this.waffle.decoracion,
      precio: this.waffle.precio
    }
  
    this.precio = this.waffle.precio
    this.Orden = {orden: this.orden}
    this.Orden.cantidad = this.cantidad;
    this.Orden.total = (this.precio)*(this.cantidad);
    this.Orden.nombre = this.nombre;
    this.Orden.precio = this.precio;
  
    console.log(this.Orden)

    const params = this.activatedRoute.snapshot.params;
    const id:string = params['id'];

    this.add.updateOrden( id, this.Orden).subscribe(
      res => {
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Su waffle canasta fue actualizado');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('Your waffle basket was updated');
          }
        this.router.navigate(['carrito']);
      },
      err => {
        console.log(err)
      }
    )
    /*
    console.log(this.Orden)
    this.add.addOrden(this.Orden).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['carrito']);
      },
      err => {
        console.log(err)
      }
    )*/
  }else{
    if(this.authService.lang() === 'es'){
      this.alertService.mostrarAlerta('necesitas agregar al menos un ingredientes');
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('You need to add at least one ingredient');
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
    this.anadirOrden()
  }
  
    // Función para agregar o mostrar mensaje si el ingrediente ya existe
    actualizarDecoracion(ingrediente: string) {
      // Verifica si ya hay 7 ingredientes en el array
      const long = this.waffle.decoracion.length
      if (long === 4) {
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('No se pueden agregar más decoraciones, ya hay 4.');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('You can not add more decorations, there are already 4.');
          }
      }else{
      // Busca la posición del ingrediente en el array de ingredientes
      const index = this.waffle.decoracion.findIndex((i:any) => i.nombre === ingrediente);
    
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
        this.waffle.decoracion.push({nombre: ingrediente});
        }
      } else {
        // Si el ingrediente está en el array, muestra un mensaje en la consola
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('La decoracion ya existe en el waffle.');
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('The decoration already exists in the waffle.');
          }
      }      
      }
      this.anadirOrden()
    
  
    }

}
