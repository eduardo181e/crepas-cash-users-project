import { Component, ElementRef, ViewChild } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { Router } from '@angular/router';
import { crepasDulce, crepasSalada, bebidasCalientes, bebidasFrias, waffles, waffleCanasta, botanas, ensaladas } from '../models/nameCrepas';
import { CrepaDulceService } from '../services/crepa-dulce.service';
import { AlertDialogService } from '../alert-dialog.service';
import { CrepaSaladaService } from '../services/crepa-salada.service';
import { sabor } from '../crepas/crepaDulce/crepa-dulce/modelos';
import { WaffleService } from '../services/waffle.service';
import { WaffleCanastaService } from '../services/waffle-canasta.service';
import { BebidasFriasService } from '../services/bebidas-frias.service';
import { BebidasCalientesService } from '../services/bebidas-calientes.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { SalesServiceService } from '../services/sales-service.service';
import { AuthService } from '../services/auth-service.service';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  total:any = 0;
  invoice: any;

  seleccionHabilitada: boolean = false;
    // Configuraciones principales
    grupos:any ;
    ordenes:any = [];
    saladasWarning:any = [];
    dulcesWarning:any = [];
    wafflesWarning:any = [];
    wafflesCanastaWarning:any = [];
    bebidasFriasWarning:any = [];
    bebidasCalientesWarning:any = [];
    ensaladasWarning:any = [];
    botanasWarning:any = [];

    // Crepa Dulce 
    precioExtraCrepaDulce:any = [];
    precioRegularCrepaDulce:any = [];
    precioNieveCrepaDulce:any = [];
    precioDecoracionCrepaDulce:any = [];
    conteorepeticionesCrepaD:any;
    resultadosUntCrepaD:any = [];
    resultadosComCrepaD:any = [];
    crepasDulces:any = [];
    ingredientesComCrepaD:any = [];
    ingredientesComCrepaD1:any = [];
    inventarioIngredientesComCrepaD:any = [];
    existenciasingredientesComCrepaD:any = [];
    ingredientesUntCrepaD:any = [];
    ingredientesUntCrepaD1:any = [];
    inventarioIngredientesUntCrepaD:any = [];
    existenciasingredientesUntCrepaD:any = [];
    nievesCrepaD:any = [];
    nievesCrepaD1:any = [];
    inventarioNievesCrepaD:any = [];
    existenciasNievesCrepaD:any = [];
    existenciasDecoracionesCrepaD:any = [];
    invenatrioDecoracionesCrepaD:any = [];
    decoracionesCrepaD:any = [];
    decoracionesCrepaD1:any = [];
    invenatrioHarinasCrepaD:any = [];
    existenciasHarinasCrepaD:any = [];
    harinasCrepaD:any = [];


    // Crepa Salada
    precioExtraCrepaSalada:any = [];
    precioRegularCrepaSalada:any = [];
    crepasSaladas:any = [];
    ingredientesCrepaS:any = [];
    ingredientesCrepaS1:any = [];
    inventarioIngredientesCrepaS:any = [];
    existenciasIngredientesCrepaS:any = [];
    aderesosCrepaS:any = [];
    aderesosCrepaS1:any = [];
    inventarioAderesosCrepaS:any = [];
    existenciasAderesosCrepaS:any = [];
    ingredientesBaseCrepaS:any = [];
    ingredientesBaseCrepaS1:any = [];
    inventarioIngredientesBaseCrepaS:any = [];
    existenciasIngredientesBaseCrepaS:any = [];
    aderesosBaseCrepaS:any = [];
    aderesosBaseCrepaS1:any = [];
    inventarioAderesosBaseCrepaS:any = [];
    existenciasAderesosBaseCrepaS:any = [];

    // Waffles
    precioExtraWaffle:any = [];
    precioRegularWaffle:any = [];
    precioNieveWaffle:any = [];
    precioDecoracionWaffle:any = [];
    waffles:any = [];
    wafflesIngUnt:any = [];
    waffles1IngUnt:any = [];
    inventarioWafflesIngUnt:any = [];
    existenciasWafflesIngUnt:any = [];
    wafflesIngCom:any = [];
    waffles1IngCom:any = [];
    inventarioWafflesIngCom:any = [];
    existenciasWafflesIngCom:any = [];
    wafflesNieve:any = [];
    waffles1Nieve:any = [];
    inventarioWafflesNieve:any = [];
    existenciasWafflesNieve:any = [];
    existenciasWafflesDecoraciones:any = [];
    inventarioWafflesDecoraciones:any = [];
    wafflesDecoraciones:any = [];
    waffles1Decoraciones:any = [];

    // Waffles Canasta
    precioExtraWaffleCanasta:any = [];
    precioRegularWaffleCanasta:any = [];
    precioDecoracionWaffleCanasta:any = [];
    wafflesCanasta:any = [];
    wafflesCanastaIngUnt:any = [];
    wafflesCanasta1IngUnt:any = [];
    inventarioWafflesIngUntCanasta:any = [];
    existenciasWafflesIngUntCanasta:any = [];
    wafflesCanastaIngCom:any = [];
    wafflesCanasta1IngCom:any = [];
    inventarioWafflesIngComCanasta:any = [];
    existenciasWafflesIngComCanasta:any = [];
    wafflesCanastaNieve:any = [];
    wafflesCanasta1Nieve:any = [];
    inventarioWafflesNieveCanasta:any = [];
    existenciasWafflesNieveCanasta:any = [];
    existenciasWafflesDecoracionesCanasta:any = [];
    inventarioWafflesDecoracionesCanasta:any = [];
    wafflesCanastaDecoraciones:any = [];
    wafflesCanasta1Decoraciones:any = [];

    // Bebidas Calientes
    bebidasCalientes:any = [];
    bebidasCalientes1:any = [];
    inventarioBebidasCalientes:any = [];
    existenBebidasCalientes:any = [];

    // Bebidas Frias
    bebidasFrias:any = [];
    bebidasFrias1:any = [];
    inventarioBebidasFrias:any = [];
    existenBebidasFrias:any = [];

    // Botanas
    botanas:any = [];
    botanas1:any = [];
    inventarioBotanas:any = [];
    existenBotanas:any = [];
    // Ensalada Indivudual
    ensaladasIndividual:any = [];
    ensaladasIndividual1:any = [];
    inventarioEnsaladasIndividual:any = [];
    existenEnsaladasIndividual:any = [];
    mesa: number = 0;
    constructor(private service: CarritoService, private router: Router, private crepaDulceService: CrepaDulceService, private alertService: AlertDialogService,
    private crepaSaladaService: CrepaSaladaService,private waffleService: WaffleService,private waffleCanastaService: WaffleCanastaService, private bebidasFriasService: BebidasFriasService,
    private bebidasCalientesService: BebidasCalientesService, private ventas: SalesServiceService, private authService: AuthService){}

    ngOnInit() {
      this.stock();
    }

    ordenes1(){
      if((this.crepasSaladas.length + this.crepasDulces.length + this.bebidasCalientes.length + this.bebidasFrias.length + this.botanas.length + this.ensaladasIndividual.length + this.waffles.length + this.wafflesCanasta.length) > 0){
        return true;
      }else{
        return false;
      }
    }

 stock(){    
        // Creppas Saladas

        this.crepaSaladaService.getIngredientesP().subscribe(
          res => {
            this.existenciasIngredientesCrepaS = res;
            console.log(res)
          },
          err => {
            console.log(err)
          }
        )  
  
        this.crepaSaladaService.getAderesos().subscribe(
        res => {
          this.existenciasAderesosCrepaS = res;
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
  
      this.crepaSaladaService.getIngredientesB().subscribe(
        res => {
          this.existenciasIngredientesBaseCrepaS = res;
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
  
      this.crepaSaladaService.getAderesosB().subscribe(
        res => {
          this.existenciasAderesosBaseCrepaS = res;
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
  
  
      this.crepaSaladaService.getPrecios().subscribe(
        (res:any) => {
          console.log(res);
          const precios:any = res
          const regular = precios.findIndex((objeto:any)=> objeto.descripcion === 'Regular');
          const extra = precios.findIndex((objeto:any)=> objeto.descripcion === 'Extra');
          const ensalada = precios.findIndex((objeto:any)=> objeto.descripcion === 'Ensalada');
          this.precioRegularCrepaSalada.push(precios[regular].precio);
          this.precioExtraCrepaSalada.push(precios[extra].precio);
        },
        err => console.error(err)
      )
      
      // Crepas Dulces
      
      this.crepaDulceService.getHarinas().subscribe(
        res => {
          this.existenciasHarinasCrepaD = res;
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
  
      this.crepaDulceService.getIngredientesC().subscribe(
        res => {
          this.existenciasingredientesComCrepaD = res;
          console.log('-----------Complementario----------')
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
  
      this.crepaDulceService.getIngredientesU().subscribe(
        res => {
          this.existenciasingredientesUntCrepaD = res;
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
  
      this.crepaDulceService.getNieves().subscribe(
        res => {
          this.existenciasNievesCrepaD = res;
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )

      this.crepaDulceService.getDecoraciones().subscribe(
        res => {
          this.existenciasDecoracionesCrepaD = res;
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
  

      
      this.crepaDulceService.getPrecios().subscribe(
        (res:any) => {
          console.log(res);
          const precios:any = res
          const regular = precios.findIndex((objeto:any)=> objeto.descripcion === 'Regular');
          const extra = precios.findIndex((objeto:any)=> objeto.descripcion === 'Extra');
          const nieve = precios.findIndex((objeto:any)=> objeto.descripcion === 'Nieve');
          const decoracion = precios.findIndex((objeto:any)=> objeto.descripcion === 'Decoracion');
          this.precioRegularCrepaDulce.push(precios[regular].precio);
          this.precioExtraCrepaDulce.push(precios[extra].precio);
          this.precioNieveCrepaDulce.push(precios[nieve].precio);
          this.precioDecoracionCrepaDulce.push(precios[decoracion].precio);
        },
        err => console.error(err)
      )

  
      // Waffles
  
      this.waffleService.getIngredientesU().subscribe(
        res => {
          this.existenciasWafflesIngUnt = res;
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
  
      this.waffleService.getIngredientesC().subscribe(
        res => {
          this.existenciasWafflesIngCom = res;
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
  
      this.waffleService.getNieves().subscribe(
        res => {
          this.existenciasWafflesNieve = res;
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )

      this.waffleService.getDecoraciones().subscribe(
        res => {
          this.existenciasWafflesDecoraciones = res;
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
  
      this.waffleService.getPrecios().subscribe(
        (res:any) => {
          console.log(res);
          const precios:any = res
          const regular = precios.findIndex((objeto:any)=> objeto.descripcion === 'Regular');
          const extra = precios.findIndex((objeto:any)=> objeto.descripcion === 'Extra');
          const nieve = precios.findIndex((objeto:any)=> objeto.descripcion === 'Nieve');
          const decoracion = precios.findIndex((objeto:any)=> objeto.descripcion === 'Decoracion');
          this.precioRegularWaffle.push(precios[regular].precio);
          this.precioExtraWaffle.push(precios[extra].precio);
          this.precioNieveWaffle.push(precios[nieve].precio);
          this.precioDecoracionWaffle.push(precios[decoracion].precio);
        },
        err => console.error(err)
      )
      
      // Waffles Canasta
  
      this.waffleCanastaService.getIngredientesU().subscribe(
        res => {
          this.existenciasWafflesIngUntCanasta = res;
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
  
      this.waffleCanastaService.getIngredientesC().subscribe(
        res => {
          this.existenciasWafflesIngComCanasta = res;
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
  
      this.waffleCanastaService.getNieves().subscribe(
        res => {
          this.existenciasWafflesNieveCanasta = res;
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )

      this.waffleCanastaService.getDecoraciones().subscribe(
        res => {
          this.existenciasWafflesDecoracionesCanasta = res;
          console.log('-----decoraciones canasta----------------',res)
        },
        err => {
          console.log(err)
        }
      )
  
      this.waffleCanastaService.getPrecios().subscribe(
        (res:any) => {
          console.log(res);
          const precios:any = res
          const regular = precios.findIndex((objeto:any)=> objeto.descripcion === 'Regular');
          const extra = precios.findIndex((objeto:any)=> objeto.descripcion === 'Extra');
          const decoracion = precios.findIndex((objeto:any)=> objeto.descripcion === 'Decoracion');
          this.precioRegularWaffleCanasta.push(precios[regular].precio);
          this.precioExtraWaffleCanasta.push(precios[extra].precio);
          this.precioDecoracionWaffleCanasta.push(precios[decoracion].precio);
        },
        err => console.error(err)
      )
  
  
      // Bebidas Frias
  
      this.bebidasFriasService.getBebidas().subscribe(
        res => {
          this.existenBebidasFrias = res;
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
  
      this.bebidasCalientesService.getBebidas().subscribe(
        res => {
          this.existenBebidasCalientes = res;
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
  
  
      this.crepaSaladaService.getBotanas().subscribe(
        res => {
          this.existenBotanas = res;
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
  
      this.crepaSaladaService.getEnsaladas().subscribe(
        res => {
          this.existenEnsaladasIndividual = res;
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )

     // Organizar Ordenes 
     this.service.viewOrdem().subscribe(
      (res:any) => {
        console.log('orden')
        console.log(res)
        this.mesa = res[0].mesa
        this.ordenes = res;
        console.log(this.ordenes);
        const grupos = this.ordenes.reduce((acc:any, obj:any) => {
          if (!acc[obj.nombre]) {
            acc[obj.nombre] = [];
          }
          acc[obj.nombre].push(obj);
          return acc;
        }, {});
        this.grupos = grupos;
        setTimeout(() => {
          this.organizarOrdenes();

        }, 600)
      },
      err => {
        console.log(err);
      }
    );





 }

  

    calcularTotal(){
      this.total = 0;
      this.crepasDulces.forEach((element:any) => {
        this.total += element.total;
      });

      this.crepasSaladas.forEach((element:any) => {
        this.total += element.total;
      });

      this.waffles.forEach((element:any) => {
        this.total += element.total;
      });

      this.wafflesCanasta.forEach((element:any) => {
        this.total += element.total;
      });

      this.bebidasFrias1.forEach((element:any) => {
        this.total += element.total;
      });

      this.bebidasCalientes1.forEach((element:any) => {
        this.total += element.total;
      });

      this.botanas1.forEach((element:any) => {
        this.total += element.total;
      });

      this.ensaladasIndividual1.forEach((element:any) => {
        this.total += element.total;
      });
      console.log(this.total) 
    }
    
    contarRepeticionesDulce(arrays: any) {
      const resultados:any = {};
    
      arrays.forEach((array:any, index:any) => {
        array.forEach((item:any) =>{
          const id = item.id;
          if (!resultados[id]) {
            resultados[id] = 0;
          }
          resultados[id] += (parseInt(this.crepasDulces[index].cantidad))

      })
    });
      return resultados;
    }

    contarRepeticionesUnit(arrays: any, type: string) {
      const resultados:any = {};
      console.log('Repeticiones',arrays, type)
      arrays.forEach((array:any, index:any) => {
          const id = array.id;
          if (!resultados[id]) {
            resultados[id] = 0;
          }
            switch(type){
            case "bebidaFria":
              resultados[id] += (parseInt(this.bebidasFrias[index].cantidad))
              break
            case "bebidasCalientes":
              resultados[id] += (parseInt(this.bebidasCalientes[index].cantidad))
              break
            case "Ensaladas":
              resultados[id] += (parseInt(this.ensaladasIndividual[index].cantidad))
              break
            case "Botanas":
              resultados[id] += (parseInt(this.botanas[index].cantidad))
              break
          

          }
    });
      return resultados;
    }

    contarRepeticionesSalada(arrays: any) {
      const resultados:any = {};
    
      arrays.forEach((array:any, index:any) => {
        array.forEach((item:any) =>{
          const id = item.id;
          if (!resultados[id]) {
            resultados[id] = 0;
          }
          resultados[id] += (parseInt(this.crepasSaladas[index].cantidad))

      })
    });
      return resultados;
    }

    contarRepeticionesWaffle(arrays: any) {
      const resultados:any = {};
    
      arrays.forEach((array:any, index:any) => {
        array.forEach((item:any) =>{
          const id = item.id;
          if (!resultados[id]) {
            resultados[id] = 0;
          }
          resultados[id] += (parseInt(this.waffles[index].cantidad))

      })
    });
      return resultados;
    }

    contarRepeticionesWaffleCanasta(arrays: any) {
      const resultados:any = {};
    
      arrays.forEach((array:any, index:any) => {
        array.forEach((item:any) =>{
          const id = item.id;
          if (!resultados[id]) {
            resultados[id] = 0;
          }
          resultados[id] += (parseInt(this.wafflesCanasta[index].cantidad))

      })
    });
      return resultados;
    }

    contarRepeticiones(arrays: any) {
      const resultados:any = {};
    
      arrays.forEach((array:any, index:any) => {
        array.forEach((item:any) =>{
          const id = item.id;
          if (!resultados[id]) {
            resultados[id] = 0;
          }
          resultados[id]++

      })
    });
      return resultados;
    }

    contarRepeticionesDecoraciones(arrays: any) {
      const resultados:any = {};
      arrays.forEach((array:any, index:any) => {
        array.forEach((item:any) =>{
          const nombre = item.nombre
          if(!resultados[nombre]){
            resultados[nombre] = 0;
          }
          resultados[nombre] += (parseInt(this.crepasDulces[index].cantidad))
        })
      });
      return resultados;
    }

    contarRepeticionesDecoracionesWaffleCanasta(arrays: any) {
      const resultados:any = {};
      arrays.forEach((array:any, index:any) => {
        array.forEach((item:any) =>{
          const nombre = item.nombre
          if(!resultados[nombre]){
            resultados[nombre] = 0;
          }
          resultados[nombre] += (parseInt(this.wafflesCanasta[index].cantidad))
        })
      });
      return resultados;
    }

    contarRepeticionesDecoracionesWaffle(arrays: any) {
      const resultados:any = {};
      arrays.forEach((array:any, index:any) => {
        array.forEach((item:any) =>{
          const nombre = item.nombre
          if(!resultados[nombre]){
            resultados[nombre] = 0;
          }
          resultados[nombre] += (parseInt(this.waffles[index].cantidad))
        })
      });
      return resultados;
    }

    contarRepeticiones1(arrays: any) {
      const resultados:any = {};
    

        for (const item of arrays) {
          const id = item.id;
          if (!resultados[id]) {
            resultados[id] = 0;
          }
          resultados[id]++;
        }

      
      return resultados;
    }

    obtenerIdRepeticiones(diccionario:any) {
      // Usa la función map() para generar una lista de tuplas.
      return Object.entries(diccionario).map(([id, repeticiones]:[any, any]) => [id, repeticiones]);
    }

    updateMesa(){

      this.service.updateMesaOrden(this.mesa).subscribe(
        res => {
          console.log(res);
        },
        err => console.log(err)
      );
    }

    // Elimina la orden seleccionada

    deleteOrden(id: number, nombre:any){
      this.service.deleteOrden(id).subscribe(
        res => {
          console.log(res);




          if(nombre === crepasSalada){
            const index = this.crepasSaladas.findIndex((objeto:any)=> objeto.id === id);
            this.crepasSaladas.splice(index, 1);
            this.ingredientesCrepaS1.splice(index, 1);
            this.ingredientesCrepaS.splice(index, 1);
            this.aderesosCrepaS1.splice(index, 1);
            this.aderesosCrepaS.splice(index, 1);
            this.ingredientesBaseCrepaS1.splice(index, 1);
            this.ingredientesBaseCrepaS.splice(index, 1);
            this.aderesosBaseCrepaS1.splice(index, 1);
            this.aderesosBaseCrepaS.splice(index, 1);
            this.existenciasIngCrepaS(this.ingredientesCrepaS)
            this.existenciasAdCrepaS(this.aderesosCrepaS)
            this.existenciasIngBaseCrepaS(this.ingredientesBaseCrepaS)
            this.existenciasAdBaseCrepaS(this.aderesosBaseCrepaS);
            this.detectExistIngCrepaS();
            this.calcularTotal();
          }

          if(nombre === crepasDulce){
            const index = this.crepasDulces.findIndex((objeto:any)=> objeto.id === id);
            this.crepasDulces.splice(index, 1);
            this.ingredientesComCrepaD1.splice(index, 1);
            this.ingredientesComCrepaD.splice(index, 1);
            this.ingredientesUntCrepaD1.splice(index, 1);
            this.ingredientesUntCrepaD.splice(index, 1);
            this.nievesCrepaD1.splice(index, 1);
            this.nievesCrepaD.splice(index, 1);
            this.existenciasNievCrepaD(this.nievesCrepaD)
            this.existenciasIngComCrepaD(this.ingredientesComCrepaD)
            this.existenciasIngUntCrepaD(this.ingredientesUntCrepaD)
            const harinas:any = [];
            this.crepasDulces.forEach((element:any) => {
              const harina = element.orden.harina;
              harinas.push(harina);
            })
      
            const resultados:any = {};
            harinas.forEach((element:any) => {
              console.log(element.id);
              const id = element.id;
              if (!resultados[id]) {
                resultados[id] = 0;
              }
              resultados[id]++;
            });
            console.log(resultados);
            this.harinasCrepaD = resultados;
            console.log(this.harinasCrepaD)
            this.existenciasHarCrepaD(this.crepasDulces, this.harinasCrepaD);
            this.detectExistIngCrepaD();

            this.calcularTotal();
          }

          if(nombre === waffles){
            const index = this.waffles.findIndex((objeto:any)=> objeto.id === id);
            this.waffles.splice(index, 1);
            this.waffles1IngUnt.splice(index, 1);
            this.wafflesIngUnt.splice(index, 1);
            this.waffles1IngCom.splice(index, 1);
            this.wafflesIngCom.splice(index, 1);
            this.waffles1Nieve.splice(index, 1);
            this.wafflesNieve.splice(index, 1);
            this.existenciasIngComWaffle(this.wafflesIngCom)
            this.existenciasIngUntWaffle(this.wafflesIngUnt)
            this.existenciasNieveWaffle(this.wafflesNieve)
            this.detectExistIngWaffle();
            this.calcularTotal();
          }

          if(nombre === waffleCanasta){
            const index = this.wafflesCanasta.findIndex((objeto:any)=> objeto.id === id);
            this.wafflesCanasta.splice(index, 1);
            this.wafflesCanasta1IngUnt.splice(index, 1);
            this.wafflesCanastaIngUnt.splice(index, 1);
            this.wafflesCanasta1IngCom.splice(index, 1);
            this.wafflesCanastaIngCom.splice(index, 1);
            this.wafflesCanasta1Nieve.splice(index, 1);
            this.wafflesCanastaNieve.splice(index, 1);
            this.existenciasIngComWaffleCanasta(this.wafflesCanastaIngCom)
            this.existenciasIngUntWaffleCanasta(this.wafflesCanastaIngUnt)
            this.existenciasNieveWaffleCanasta(this.wafflesCanastaNieve)
            this.detectExistIngWaffleCanasta();
            this.calcularTotal();
          }

          if(nombre === bebidasFrias){
            const index = this.bebidasFrias1.findIndex((objeto:any)=> objeto.id === id);
            this.bebidasFrias1.splice(index, 1);
            this.bebidasFrias.splice(index, 1);
            this.existBebidasFrias(this.bebidasFrias);
            this.detectExistBebidasFrias();
            this.calcularTotal();
          }

          if(nombre === bebidasCalientes){
            const index = this.bebidasCalientes1.findIndex((objeto:any)=> objeto.id === id);
            this.bebidasCalientes1.splice(index, 1);
            this.bebidasCalientes.splice(index, 1);
            this.existBebidasCalientes(this.bebidasCalientes);
            this.calcularTotal();
          }

          if(nombre === botanas){
            const index = this.botanas1.findIndex((objeto:any)=> objeto.id === id);
            this.botanas1.splice(index, 1);
            this.botanas.splice(index, 1);
            this.existBotanas(this.botanas);
            this.calcularTotal();
          }

          if(nombre === ensaladas){
            const index = this.ensaladasIndividual1.findIndex((objeto:any)=> objeto.id === id);
            this.ensaladasIndividual1.splice(index, 1);
            this.ensaladasIndividual.splice(index, 1);
            this.existEnsaladas(this.ensaladasIndividual);
            this.calcularTotal();
          }

        },
        err => console.log(err)
      )
    }
    // redirecciona a la pagina de editar orden
    redirectUpdte(orden:any,id: any){
      if(orden.nombre === crepasDulce){
      this.router.navigate(['crepaDulce/', id]);        
      }
      if(orden.nombre === crepasSalada){
        this.router.navigate(['crepaSalada/', id]);
      }
      if(orden.nombre === botanas){
        this.router.navigate(['botana/', id]);        
      }
      if(orden.nombre === bebidasCalientes){
        this.router.navigate(['bebidasCalientes/', id]);        
      }
      if(orden.nombre === bebidasFrias){
        this.router.navigate(['bebidasFrias/', id]);        
      }
      if(orden.nombre === waffles){
        this.router.navigate(['waffle/', id]);        
      }
      if(orden.nombre === waffleCanasta){
        this.router.navigate(['waffleCanasta/', id]);        
      }
      if(orden.nombre === ensaladas){
        this.router.navigate(['ensaladaInd/', id]);        
      }



    }

    // Actualizar cantidades de ordenes

    actualizarCantidad(orden:any, id:any){
      console.log(orden.nombre);
      if(orden.nombre === crepasDulce){
      console.log(typeof(orden.cantidad));
      if(typeof(orden.cantidad) ===  'string'){
        orden.cantidad = parseInt(orden.cantidad)
      const dulce1:any = {orden: orden.orden, precio: orden.precio, userId: orden.userId, cantidad: orden.cantidad, nombre: orden.nombre}
      dulce1.total = (dulce1.precio)*(dulce1.cantidad)
      console.log(dulce1)
      console.log(id)
      
      this.service.updateOrden(id, dulce1).subscribe(
        res => {
          console.log(res)
          this.service.selectOrden(id).subscribe(
            (res:any) => {
              let indice = this.crepasDulces.findIndex((objeto:any)=> objeto.id === id);
              console.log(indice)
              console.log(res[0])
              this.crepasDulces[indice].total = res[0].total
              this.existenciasIngComCrepaD(this.ingredientesComCrepaD);
              this.existenciasIngUntCrepaD(this.ingredientesUntCrepaD);
              this.existenciasNievCrepaD(this.nievesCrepaD);
              this.existenciasDecoracionCrepaD(this.decoracionesCrepaD);
              const harinas:any = [];
              this.crepasDulces.forEach((element:any) => {
                const harina = element.orden.harina;
                harinas.push(harina);
              })
        
              const resultados:any = {};
              harinas.forEach((element:any) => {
                console.log(element.id);
                const id = element.id;
                if (!resultados[id]) {
                  resultados[id] = 0;
                }
                resultados[id]++;
              });
              console.log(resultados);
              this.harinasCrepaD = resultados;
              console.log(this.harinasCrepaD)
              this.existenciasHarCrepaD(this.crepasDulces, this.harinasCrepaD);
              this.detectExistIngCrepaD();
              this.calcularTotal();
            },
            err => {
              console.log(err)
            }
         ) 
        },
        err => {
          console.log(err)
        }
      )
      }
    }else if(orden.nombre === crepasSalada){
      if(typeof(orden.cantidad) ===  'string'){
        orden.cantidad = parseInt(orden.cantidad)
      const dulce1:any = {orden: orden.orden, precio: orden.precio, userId: orden.userId, cantidad: orden.cantidad, nombre: orden.nombre}
      dulce1.total = (dulce1.precio)*(dulce1.cantidad)
      console.log(dulce1)
      console.log(id)
      
      this.service.updateOrden(id, dulce1).subscribe(
        res => {
          console.log(res)
          this.service.selectOrden(id).subscribe(
            (res:any) => {
              let indice = this.crepasSaladas.findIndex((objeto:any)=> objeto.id === id);
              console.log(indice)
              console.log(res[0])
              this.crepasSaladas[indice].total = res[0].total
              this.existenciasIngCrepaS(this.ingredientesCrepaS);
              this.existenciasAdCrepaS(this.aderesosCrepaS);
              this.existenciasIngBaseCrepaS(this.ingredientesBaseCrepaS);
              this.existenciasAdBaseCrepaS(this.aderesosBaseCrepaS);
              this.detectExistIngCrepaS();
              this.calcularTotal();
            },
            err => {
              console.log(err)
            }
         ) 
        },
        err => {
          console.log(err)
        }
      )
      }
    }else if(orden.nombre === waffles){
      if(typeof(orden.cantidad) ===  'string'){
        orden.cantidad = parseInt(orden.cantidad)
      const dulce1:any = {orden: orden.orden, precio: orden.precio, userId: orden.userId, cantidad: orden.cantidad, nombre: orden.nombre}
      dulce1.total = (dulce1.precio)*(dulce1.cantidad)
      console.log(dulce1)
      console.log(id)
      
      this.service.updateOrden(id, dulce1).subscribe(
        res => {
          console.log(res)
          this.service.selectOrden(id).subscribe(
            (res:any) => {
              let indice = this.waffles.findIndex((objeto:any)=> objeto.id === id);
              console.log(indice)
              console.log(res[0])
              this.waffles[indice].total = res[0].total
              this.existenciasIngUntWaffle(this.wafflesIngUnt);
              this.existenciasIngComWaffle(this.wafflesIngCom);
              this.existenciasNieveWaffle(this.wafflesNieve);
              this.existenciasDecoracionWaffle(this.wafflesDecoraciones);
              this.detectExistIngWaffle();
              this.calcularTotal();
            },
            err => {
              console.log(err)
            }
         ) 
        },
        err => {
          console.log(err)
        }
      )
      }
    }else if(orden.nombre === waffleCanasta){
      if(typeof(orden.cantidad) ===  'string'){
        orden.cantidad = parseInt(orden.cantidad)
      const dulce1:any = {orden: orden.orden, precio: orden.precio, userId: orden.userId, cantidad: orden.cantidad, nombre: orden.nombre}
      dulce1.total = (dulce1.precio)*(dulce1.cantidad)
      console.log(dulce1)
      console.log(id)
      
      this.service.updateOrden(id, dulce1).subscribe(
        res => {
          console.log(res)
          this.service.selectOrden(id).subscribe(
            (res:any) => {
              let indice = this.wafflesCanasta.findIndex((objeto:any)=> objeto.id === id);
              console.log(indice)
              console.log(res[0])
              this.wafflesCanasta[indice].total = res[0].total
              this.existenciasIngUntWaffleCanasta(this.wafflesCanastaIngUnt);
              this.existenciasIngComWaffleCanasta(this.wafflesCanastaIngCom);
              this.existenciasNieveWaffleCanasta(this.wafflesCanastaNieve);
              this.existenciasDecoracionesWaffleCanasta(this.wafflesCanastaDecoraciones);
              this.detectExistIngWaffleCanasta();
              this.calcularTotal();
            },
            err => {
              console.log(err)
            }
         ) 
        },
        err => {
          console.log(err)
        }
      )
      }
    }else if(orden.nombre === bebidasCalientes){
      if(typeof(orden.cantidad) ===  'string'){
        orden.cantidad = parseInt(orden.cantidad)
      const dulce1:any = {orden: orden.orden, precio: orden.precio, userId: orden.userId, cantidad: orden.cantidad, nombre: orden.nombre}
      dulce1.total = (dulce1.precio)*(dulce1.cantidad)
      console.log(dulce1)
      console.log(id)
      
      this.service.updateOrden(id, dulce1).subscribe(
        res => {
          console.log(res)
          this.service.selectOrden(id).subscribe(
            (res:any) => {              

              let indice = this.bebidasCalientes1.findIndex((objeto:any)=> objeto.id === id);
              console.log(indice)
              console.log(res[0])
              this.bebidasCalientes1[indice].cantidad = orden.cantidad
              this.bebidasCalientes[indice].cantidad = orden.cantidad
              this.bebidasCalientes1[indice].total = res[0].total
              this.bebidasCalientes[indice].total = res[0].total
              this.existBebidasCalientes(this.bebidasCalientes); 
  
              this.calcularTotal();
            },
            err => {
              console.log(err)
            }
         ) 
        },
        err => {
          console.log(err)
        }
      )
      }
    }else if(orden.nombre === bebidasFrias){
      if(typeof(orden.cantidad) ===  'string'){
        orden.cantidad = parseInt(orden.cantidad)
      const dulce1:any = {orden: orden.orden, precio: orden.precio, userId: orden.userId, cantidad: orden.cantidad, nombre: orden.nombre}
      dulce1.total = (dulce1.precio)*(dulce1.cantidad)
      console.log(dulce1)
      console.log(id)
      
      this.service.updateOrden(id, dulce1).subscribe(
        res => {
          console.log(res)
          this.service.selectOrden(id).subscribe(
            (res:any) => {

              let indice = this.bebidasFrias1.findIndex((objeto:any)=> objeto.id === id);
              console.log(indice)
              console.log(res[0])
              this.bebidasFrias1[indice].cantidad = orden.cantidad
              this.bebidasFrias[indice].cantidad = orden.cantidad
              this.bebidasFrias1[indice].total = res[0].total
              this.bebidasFrias[indice].total = res[0].total
              this.existBebidasFrias(this.bebidasFrias);
              this.calcularTotal();
            },
            err => {
              console.log(err)
            }
         ) 
        },
        err => {
          console.log(err)
        }
      )
      }
    }else if(orden.nombre === botanas){
      if(typeof(orden.cantidad) ===  'string'){
        orden.cantidad = parseInt(orden.cantidad)
      const dulce1:any = {orden: orden.orden, precio: orden.precio, userId: orden.userId, cantidad: orden.cantidad, nombre: orden.nombre}
      dulce1.total = (dulce1.precio)*(dulce1.cantidad)
      console.log(dulce1)
      console.log(id)
      
      this.service.updateOrden(id, dulce1).subscribe(
        res => {
          console.log(res)
          this.service.selectOrden(id).subscribe(
            (res:any) => {

              let indice = this.botanas1.findIndex((objeto:any)=> objeto.id === id);
              console.log(indice)
              console.log(res[0])
              this.botanas1[indice].cantidad = orden.cantidad
              this.botanas[indice].cantidad = orden.cantidad
              this.botanas1[indice].total = res[0].total
              this.botanas[indice].total = res[0].total
              this.existBotanas(this.botanas);
              this.calcularTotal();
            },
            err => {
              console.log(err)
            }
         ) 
        },
        err => {
          console.log(err)
        }
      )
      }
    }else if(orden.nombre === ensaladas){
      if(typeof(orden.cantidad) ===  'string'){
        orden.cantidad = parseInt(orden.cantidad)
      const dulce1:any = {orden: orden.orden, precio: orden.precio, userId: orden.userId, cantidad: orden.cantidad, nombre: orden.nombre}
      dulce1.total = (dulce1.precio)*(dulce1.cantidad)
      console.log(dulce1)
      console.log(id)
      
      this.service.updateOrden(id, dulce1).subscribe(
        res => {
          console.log(res)
          this.service.selectOrden(id).subscribe(
            (res:any) => {              

              let indice = this.ensaladasIndividual1.findIndex((objeto:any)=> objeto.id === id);
              console.log(indice)
              console.log(res[0])
              this.ensaladasIndividual1[indice].cantidad = orden.cantidad
              this.ensaladasIndividual[indice].cantidad = orden.cantidad
              this.ensaladasIndividual1[indice].total = res[0].total
              this.ensaladasIndividual[indice].total = res[0].total
              this.existEnsaladas(this.ensaladasIndividual);
              this.calcularTotal();
            },
            err => {
              console.log(err)
            }
         ) 
        },
        err => {
          console.log(err)
        }
      )
      }
    }

    }

    // Crepas Saladas existencias de productos
  
     existenciasIngCrepaS(obj:any){
      const resultados:any = this.contarRepeticionesSalada(obj);
      this.ingredientesCrepaS1 = []
      this.inventarioIngredientesCrepaS = [];
      obj.forEach((element:any, indice:any) => {
        var ingredientes:any = [];
        var inventario:any = [];
        if(Object.keys(element).length > 0){
          element.forEach((elemento:any) => {
            console.log(elemento);
            const index = this.existenciasIngredientesCrepaS.findIndex((i:any) => i.id === elemento.id)
            console.log(this.existenciasIngredientesCrepaS[index])
            if(index === -1){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              ingredientes.push(obj)
            }else{
            if(this.existenciasIngredientesCrepaS[index].cantidad === 0){
            if(this.existenciasIngredientesCrepaS[index].existencia === 1){
              const obj = {id: elemento.id, existencia: true, nombre: elemento.nombre}
              console.log(obj)
              ingredientes.push(obj)
            }else if(this.existenciasIngredientesCrepaS[index].existencia === 0){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              ingredientes.push(obj)
            }
          }else if(this.existenciasIngredientesCrepaS[index].cantidad === 1){
          if(this.existenciasIngredientesCrepaS[index].existencia === 1 && (resultados[elemento.id]) <= this.existenciasIngredientesCrepaS[index].inventario){
            const obj = {id: elemento.id, existencia: true, nombre: elemento.nombre, inventario: this.existenciasIngredientesCrepaS[index].inventario, cantidad : this.existenciasIngredientesCrepaS[index].cantidad}
            console.log(obj)
            ingredientes.push(obj)
          }else if(this.existenciasIngredientesCrepaS[index].existencia === 1 && (resultados[elemento.id]) > this.existenciasIngredientesCrepaS[index].inventario){
            if(this.authService.lang() === 'es'){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasIngredientesCrepaS[index].inventario, cantidad : this.existenciasIngredientesCrepaS[index].cantidad}
              const warn = 'No hay suficientes '+ elemento.nombre + ' para realizar la orden solo quedan '+ this.existenciasIngredientesCrepaS[index].inventario + ', por favor elimine almenos ' + ((resultados[elemento.id]) - this.existenciasIngredientesCrepaS[index].inventario) + ' para poder continuar con su compra'
              inventario.push(warn)
              console.log(obj)
              ingredientes.push(obj)
              }else if(this.authService.lang() === 'en'){
                const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasIngredientesCrepaS[index].inventario, cantidad : this.existenciasIngredientesCrepaS[index].cantidad}
                const warn = 'There are not enough '+ elemento.nombre + ' to make the order, there are only '+ this.existenciasIngredientesCrepaS[index].inventario + ', please remove at least ' + ((resultados[elemento.id]) - this.existenciasIngredientesCrepaS[index].inventario) + ' to continue with your purchase'
                inventario.push(warn)
                console.log(obj)
                ingredientes.push(obj)
              }

          }else if(this.existenciasIngredientesCrepaS[index].existencia === 0){
            const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasIngredientesCrepaS[index].inventario, cantidad : this.existenciasIngredientesCrepaS[index].cantidad}
            console.log(obj)
            ingredientes.push(obj)
          }
          }
        }
          })
          this.inventarioIngredientesCrepaS.push(inventario)
        this.ingredientesCrepaS1.push(ingredientes)
      }else{
        this.inventarioIngredientesCrepaS.push([])
        this.ingredientesCrepaS1.push([])
        console.log('Este es un objeto vacio');
      }
      })
    }

    existenciasAdCrepaS(obj:any){
      const resultados:any = this.contarRepeticionesSalada(obj);
      this.aderesosCrepaS1 = []
      this.inventarioAderesosCrepaS = [];
        obj.forEach((element:any, indice: any) => {
          var aderezos:any = [];
          var inventario:any = [];
          if(Object.keys(element).length > 0){
            element.forEach((elemento:any) => {
              console.log(elemento);
              const index = this.existenciasAderesosCrepaS.findIndex((i:any) => i.id === elemento.id)
              console.log(this.existenciasAderesosCrepaS[index])
              if(index === -1){
                const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
                console.log(obj)
                aderezos.push(obj)
              }else{
              if(this.existenciasAderesosCrepaS[index].cantidad === 0){
              if(this.existenciasAderesosCrepaS[index].existencia === 1){
                const obj = {id: elemento.id, existencia: true, nombre: elemento.nombre}
                console.log(obj)
                aderezos.push(obj)
              }else if(this.existenciasAderesosCrepaS[index].existencia === 0){
                const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
                console.log(obj)
                aderezos.push(obj)
              }
            }else if(this.existenciasAderesosCrepaS[index].cantidad === 1){
            if(this.existenciasAderesosCrepaS[index].existencia === 1 && (resultados[elemento.id]) <= this.existenciasAderesosCrepaS[index].inventario){
              const obj = {id: elemento.id, existencia: true, nombre: elemento.nombre, inventario: this.existenciasAderesosCrepaS[index].inventario, cantidad : this.existenciasAderesosCrepaS[index].cantidad}
              console.log(obj)
              aderezos.push(obj)
            }else if(this.existenciasAderesosCrepaS[index].existencia === 1 && (resultados[elemento.id]) > this.existenciasAderesosCrepaS[index].inventario){
              if(this.authService.lang() === 'es'){
                const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasAderesosCrepaS[index].inventario, cantidad : this.existenciasAderesosCrepaS[index].cantidad}
                const warn = 'No hay suficientes '+ elemento.nombre + ' para realizar la orden solo quedan '+ this.existenciasAderesosCrepaS[index].inventario + ', por favor elimine almenos ' + ((resultados[elemento.id]) - this.existenciasAderesosCrepaS[index].inventario) + ' para poder continuar con su compra'
                inventario.push(warn)
                console.log(obj)
                aderezos.push(obj)
              }else if(this.authService.lang() === 'en'){
                const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasAderesosCrepaS[index].inventario, cantidad : this.existenciasAderesosCrepaS[index].cantidad}
                const warn = 'There are not enough '+ elemento.nombre + ' to make the order, there are only '+ this.existenciasAderesosCrepaS[index].inventario + ', please remove at least ' + ((resultados[elemento.id]) - this.existenciasAderesosCrepaS[index].inventario) + ' to continue with your purchase'
                inventario.push(warn)
                console.log(obj)
                aderezos.push(obj)
              }

            }else if(this.existenciasAderesosCrepaS[index].existencia === 0){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasAderesosCrepaS[index].inventario, cantidad : this.existenciasAderesosCrepaS[index].cantidad}
              console.log(obj)
              aderezos.push(obj)
            }
          }
        }
            })
            this.inventarioAderesosCrepaS.push(inventario)
          this.aderesosCrepaS1.push(aderezos)
        }else{
          this.inventarioAderesosCrepaS.push([])
          this.aderesosCrepaS1.push([])
          console.log('Este es un objeto vacio');
        }
        })
    }

    existenciasIngBaseCrepaS(obj:any){
      const resultado = this.contarRepeticionesSalada(obj);
      this.ingredientesBaseCrepaS1 = []
      this.inventarioIngredientesBaseCrepaS = [];
        
        obj.forEach((element:any, indice:any) => {
          var ingredientes:any = [];
          var inventario:any = [];
          if(Object.keys(element).length > 0){
            element.forEach((elemento:any) => {
              console.log(elemento);
              const index = this.existenciasIngredientesBaseCrepaS.findIndex((i:any) => i.id === elemento.id)
              console.log(this.existenciasIngredientesBaseCrepaS[index])
              if(index === -1){
                const obj = {id: elemento.id, existencia: false, ingrediente_base: elemento.ingrediente_base}
                console.log(obj)
                ingredientes.push(obj)
              }else{
              if(this.existenciasIngredientesBaseCrepaS[index].cantidad === 0){
              if(this.existenciasIngredientesBaseCrepaS[index].existencia === 1){
                const obj = {id: elemento.id, existencia: true, ingrediente_base: elemento.ingrediente_base}
                console.log(obj)
                ingredientes.push(obj)
              }else if(this.existenciasIngredientesBaseCrepaS[index].existencia === 0){
                const obj = {id: elemento.id, existencia: false, ingrediente_base: elemento.ingrediente_base}
                console.log(obj)
                ingredientes.push(obj)
              }
            }else if(this.existenciasIngredientesBaseCrepaS[index].cantidad === 1){
            if(this.existenciasIngredientesBaseCrepaS[index].existencia === 1 && (resultado[elemento.id]) <= this.existenciasIngredientesBaseCrepaS[index].inventario){
              const obj = {id: elemento.id, existencia: true, ingrediente_base: elemento.ingrediente_base, inventario: this.existenciasIngredientesBaseCrepaS[index].inventario, cantidad : this.existenciasIngredientesBaseCrepaS[index].cantidad}
              console.log(obj)
              ingredientes.push(obj)
            }else if(this.existenciasIngredientesBaseCrepaS[index].existencia === 1 && (resultado[elemento.id]) > this.existenciasIngredientesBaseCrepaS[index].inventario){
              if(this.authService.lang() === 'es'){
                const obj = {id: elemento.id, existencia: false, ingrediente_base: elemento.ingrediente_base, inventario: this.existenciasIngredientesBaseCrepaS[index].inventario, cantidad : this.existenciasIngredientesBaseCrepaS[index].cantidad}
                const warn = 'No hay suficientes '+ elemento.ingrediente_base + ' para realizar la orden solo quedan '+ this.existenciasIngredientesBaseCrepaS[index].inventario + ', por favor elimine almenos ' + ((resultado[elemento.id]) - this.existenciasIngredientesBaseCrepaS[index].inventario) + ' para poder continuar con su compra'
                console.log(obj)
                inventario.push(warn)
                ingredientes.push(obj)
              }else if(this.authService.lang() === 'en'){
                const obj = {id: elemento.id, existencia: false, ingrediente_base: elemento.ingrediente_base, inventario: this.existenciasIngredientesBaseCrepaS[index].inventario, cantidad : this.existenciasIngredientesBaseCrepaS[index].cantidad}
                const warn = 'There are not enough '+ elemento.ingrediente_base + ' to make the order, there are only '+ this.existenciasIngredientesBaseCrepaS[index].inventario + ', please remove at least ' + ((resultado[elemento.id]) - this.existenciasIngredientesBaseCrepaS[index].inventario) + ' to continue with your purchase'
                console.log(obj)
                inventario.push(warn)
                ingredientes.push(obj)
              }

          }else if(this.existenciasIngredientesBaseCrepaS[index].existencia === 0){
            const obj = {id: elemento.id, existencia: false, ingrediente_base: elemento.ingrediente_base, inventario: this.existenciasIngredientesBaseCrepaS[index].inventario, cantidad : this.existenciasIngredientesBaseCrepaS[index].cantidad}
            console.log(obj)
            ingredientes.push(obj)
          }
        }
      }
            })
            this.inventarioIngredientesBaseCrepaS.push(inventario)
          this.ingredientesBaseCrepaS1.push(ingredientes)
        }else{
          this.inventarioIngredientesBaseCrepaS.push([])
          this.ingredientesBaseCrepaS1.push([])
          console.log('Este es un objeto vacio');
        }


        })
     }

     existenciasAdBaseCrepaS(obj:any){
      const resultado = this.contarRepeticionesSalada(obj);
      this.aderesosBaseCrepaS1 = [];
      this.inventarioAderesosBaseCrepaS = [];
          
          obj.forEach((element:any, indice: any) => {
            var aderezos:any = [];
            var inventario:any = [];
            if(Object.keys(element).length > 0){
              element.forEach((elemento:any) => {
                console.log(elemento);
                const index = this.existenciasAderesosBaseCrepaS.findIndex((i:any) => i.id === elemento.id)
                console.log(this.existenciasAderesosBaseCrepaS[index])
                if(index === -1){
                  const obj = {id: elemento.id, existencia: false, adereso_base: elemento.adereso_base}
                  console.log(obj)
                  aderezos.push(obj)
                }else{
                if(this.existenciasAderesosBaseCrepaS[index].cantidad === 0){
                if(this.existenciasAderesosBaseCrepaS[index].existencia === 1){
                  const obj = {id: elemento.id, existencia: true, adereso_base: elemento.adereso_base}
                  console.log(obj)
                  aderezos.push(obj)
                }else if(this.existenciasAderesosBaseCrepaS[index].existencia === 0){
                  const obj = {id: elemento.id, existencia: false, adereso_base: elemento.adereso_base}
                  console.log(obj)
                  aderezos.push(obj)
                }
              }else if(this.existenciasAderesosBaseCrepaS[index].cantidad === 1){
              if(this.existenciasAderesosBaseCrepaS[index].existencia === 1 && (resultado[elemento.id]) <= this.existenciasAderesosBaseCrepaS[index].inventario){
                const obj = {id: elemento.id, existencia: true, adereso_base: elemento.adereso_base, inventario: this.existenciasAderesosBaseCrepaS[index].inventario, cantidad : this.existenciasAderesosBaseCrepaS[index].cantidad}
                console.log(obj)
                aderezos.push(obj)
              }else if(this.existenciasAderesosBaseCrepaS[index].existencia === 1 && (resultado[elemento.id]) > this.existenciasAderesosBaseCrepaS[index].inventario){
                if(this.authService.lang() === 'es'){
                  const obj = {id: elemento.id, existencia: false, adereso_base: elemento.adereso_base, inventario: this.existenciasAderesosBaseCrepaS[index].inventario, cantidad : this.existenciasAderesosBaseCrepaS[index].cantidad}
                  const warn = 'No hay suficientes '+ elemento.adereso_base + ' para realizar la orden solo quedan '+ this.existenciasAderesosBaseCrepaS[index].inventario + ', por favor elimine almenos ' + ((resultado[elemento.id]) - this.existenciasAderesosBaseCrepaS[index].inventario) + ' para poder continuar con su compra'
                  console.log(obj)
                  inventario.push(warn)
                  aderezos.push(obj)
                }else if(this.authService.lang() === 'en'){
                  const obj = {id: elemento.id, existencia: false, adereso_base: elemento.adereso_base, inventario: this.existenciasAderesosBaseCrepaS[index].inventario, cantidad : this.existenciasAderesosBaseCrepaS[index].cantidad}
                  const warn = 'There are not enough '+ elemento.adereso_base + ' to make the order, there are only '+ this.existenciasAderesosBaseCrepaS[index].inventario + ', please remove at least ' + ((resultado[elemento.id]) - this.existenciasAderesosBaseCrepaS[index].inventario) + ' to continue with your purchase'
                  console.log(obj)
                  inventario.push(warn)
                  aderezos.push(obj)
                }

              }else if(this.existenciasAderesosBaseCrepaS[index].existencia === 0){
                const obj = {id: elemento.id, existencia: false, adereso_base: elemento.adereso_base, inventario: this.existenciasAderesosBaseCrepaS[index].inventario, cantidad : this.existenciasAderesosBaseCrepaS[index].cantidad}
                console.log(obj)
                aderezos.push(obj)
              }
            }
          }
              })
              this.inventarioAderesosBaseCrepaS.push(inventario)
            this.aderesosBaseCrepaS1.push(aderezos)
          }else{
            this.inventarioAderesosBaseCrepaS.push([])
            this.aderesosBaseCrepaS1.push([])
            console.log('Este es un objeto vacio');
          }
          })
     }



     OrganizarCrepasSaladas(){
      this.existenciasIngCrepaS(this.ingredientesCrepaS);
      this.existenciasAdCrepaS(this.aderesosCrepaS);
      this.existenciasIngBaseCrepaS(this.ingredientesBaseCrepaS);
      this.existenciasAdBaseCrepaS(this.aderesosBaseCrepaS);
      this.detectExistIngCrepaS();
     }

    // Crepa Dulce existencias de productos

    existenciasIngComCrepaD(obj:any){
      this.resultadosComCrepaD = this.contarRepeticionesDulce(this.ingredientesComCrepaD);
      console.log('resulatdos', this.resultadosComCrepaD)
      this.ingredientesComCrepaD1 = []
      this.inventarioIngredientesComCrepaD = [];
      obj.forEach((element:any, indice:any) => {
        var ingredientes:any = [];
        var inventario:any = [];
        if(Object.keys(element).length > 0){
          element.forEach((elemento:any) => {
            const index = this.existenciasingredientesComCrepaD.findIndex((i:any) => i.id === elemento.id)
            if(index === -1){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              ingredientes.push(obj)
            }else{
            if(this.existenciasingredientesComCrepaD[index].cantidad === 0){
            console.log(elemento);
            console.log(this.existenciasingredientesComCrepaD[index])
            if(this.existenciasingredientesComCrepaD[index].existencia === 1){
              const obj = {id: elemento.id, existencia: true, nombre: elemento.nombre}
              console.log(obj)
              ingredientes.push(obj)
            }else if(this.existenciasingredientesComCrepaD[index].existencia === 0){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              ingredientes.push(obj)
            }              
            }else if(this.existenciasingredientesComCrepaD[index].cantidad === 1){
              console.log(elemento);
              console.log(this.existenciasingredientesComCrepaD[index])
              if(this.existenciasingredientesComCrepaD[index].existencia === 1 && (this.resultadosComCrepaD[elemento.id]) <= this.existenciasingredientesComCrepaD[index].inventario){
                const obj = {id: elemento.id, existencia: true, nombre: elemento.nombre, inventario: this.existenciasingredientesComCrepaD[index].inventario, cantidad : this.existenciasingredientesComCrepaD[index].cantidad}
                console.log(obj)
                ingredientes.push(obj)
              }else if(this.existenciasingredientesComCrepaD[index].existencia === 1 && (this.resultadosComCrepaD[elemento.id]) > this.existenciasingredientesComCrepaD[index].inventario){
                if(this.authService.lang() === 'es'){
                  const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasingredientesComCrepaD[index].inventario, cantidad : this.existenciasingredientesComCrepaD[index].cantidad}
                  const warn = 'No hay suficientes '+ elemento.nombre + ' para realizar la orden solo quedan '+ this.existenciasingredientesComCrepaD[index].inventario + ', por favor elimine almenos ' + ((this.resultadosComCrepaD[elemento.id]) - this.existenciasingredientesComCrepaD[index].inventario) + ' para poder continuar con su compra'
                  inventario.push(warn)
                  console.log(obj)
                  ingredientes.push(obj)
                }else if(this.authService.lang() === 'en'){
                  const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasingredientesComCrepaD[index].inventario, cantidad : this.existenciasingredientesComCrepaD[index].cantidad}
                  const warn = 'There are not enough '+ elemento.nombre + ' to make the order, there are only '+ this.existenciasingredientesComCrepaD[index].inventario + ', please remove at least ' + ((this.resultadosComCrepaD[elemento.id]) - this.existenciasingredientesComCrepaD[index].inventario) + ' to continue with your purchase'
                  inventario.push(warn)
                  console.log(obj)
                  ingredientes.push(obj)
                }

              }
              else if(this.existenciasingredientesComCrepaD[index].existencia === 0){
                const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasingredientesComCrepaD[index].inventario, cantidad : this.existenciasingredientesComCrepaD[index].cantidad}
                console.log(obj)
                ingredientes.push(obj)
              }   
            }
          }
          })
          this.inventarioIngredientesComCrepaD.push(inventario)
        this.ingredientesComCrepaD1.push(ingredientes)
      }else{
        this.inventarioIngredientesComCrepaD.push([])
        this.ingredientesComCrepaD1.push([])
        console.log('Este es un objeto vacio');
      }
      })
    }

    existenciasIngUntCrepaD(obj:any){
      this.resultadosUntCrepaD = this.contarRepeticionesDulce(this.ingredientesUntCrepaD);
      this.ingredientesUntCrepaD1 = []
      this.inventarioIngredientesUntCrepaD = [];
      obj.forEach((element:any, indice: any) => {
        var ingredientes:any = [];
        var inventario:any = [];
        if(Object.keys(element).length > 0){
          element.forEach((elemento:any) => {
            console.log(elemento);
            const index = this.existenciasingredientesUntCrepaD.findIndex((i:any) => i.id === elemento.id);
            if(index === -1){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              ingredientes.push(obj)
            }else{
            if(this.existenciasingredientesUntCrepaD[index].cantidad === 0){
            console.log(this.existenciasingredientesUntCrepaD[index])
            if(this.existenciasingredientesUntCrepaD[index].existencia === 1){
              const obj = {id: elemento.id, existencia: true, nombre: elemento.nombre}
              console.log(obj)
              ingredientes.push(obj)
            }else if(this.existenciasingredientesUntCrepaD[index].existencia === 0){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              ingredientes.push(obj)
            }
          }else if(this.existenciasingredientesUntCrepaD[index].cantidad === 1){
            console.log(this.existenciasingredientesUntCrepaD[index])
            if(this.existenciasingredientesUntCrepaD[index].existencia === 1 && (this.resultadosUntCrepaD[elemento.id]) <= this.existenciasingredientesUntCrepaD[index].inventario){
              const obj = {id: elemento.id, existencia: true, nombre: elemento.nombre, inventario: this.existenciasingredientesUntCrepaD[index].inventario, cantidad : this.existenciasingredientesUntCrepaD[index].cantidad}
              console.log(obj)
              ingredientes.push(obj)
            }else if(this.existenciasingredientesUntCrepaD[index].existencia === 1 && (this.resultadosUntCrepaD[elemento.id]) > this.existenciasingredientesUntCrepaD[index].inventario){
              if(this.authService.lang() === 'es'){
                const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasingredientesUntCrepaD[index].inventario, cantidad : this.existenciasingredientesUntCrepaD[index].cantidad}
                const warn = 'No hay suficientes '+ elemento.nombre + ' para realizar la orden solo quedan '+ this.existenciasingredientesUntCrepaD[index].inventario + ', por favor elimine almenos ' + ((this.resultadosUntCrepaD[elemento.id]) - this.existenciasingredientesUntCrepaD[index].inventario) + ' para poder continuar con su compra'
                inventario.push(warn)
                console.log(obj)
                ingredientes.push(obj)
              }else if(this.authService.lang() === 'en'){
                const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasingredientesUntCrepaD[index].inventario, cantidad : this.existenciasingredientesUntCrepaD[index].cantidad}
                const warn = 'There are not enough '+ elemento.nombre + ' to make the order, there are only '+ this.existenciasingredientesUntCrepaD[index].inventario + ', please remove at least ' + ((this.resultadosUntCrepaD[elemento.id]) - this.existenciasingredientesUntCrepaD[index].inventario) + ' to continue with your purchase'
                inventario.push(warn)
                console.log(obj)
                ingredientes.push(obj)
              
              }
            }
            else if(this.existenciasingredientesUntCrepaD[index].existencia === 0){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasingredientesUntCrepaD[index].inventario, cantidad : this.existenciasingredientesUntCrepaD[index].cantidad}
              console.log(obj)
              ingredientes.push(obj)
            }
          }
        }
          })
          this.inventarioIngredientesUntCrepaD.push(inventario)
        this.ingredientesUntCrepaD1.push(ingredientes)
      }else{
        this.inventarioIngredientesUntCrepaD.push([])
        this.ingredientesUntCrepaD1.push([])
        console.log('Este es un objeto vacio');
      }
      })
    }

    existenciasNievCrepaD(obj:any){
      const resultados = this.contarRepeticionesDulce(this.nievesCrepaD);
      this.nievesCrepaD1 = []
      this.inventarioNievesCrepaD = [];
      obj.forEach((element:any, indice:any) => {
        var nieves:any = [];
        var inventario:any = [];
        if(Object.keys(element).length > 0){
          element.forEach((elemento:any) => {
            console.log(elemento);
            const index = this.existenciasNievesCrepaD.findIndex((i:any) => i.id === elemento.id)
            console.log(this.existenciasNievesCrepaD[index])
            if(index === -1){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              nieves.push(obj)
            }else{
            if(this.existenciasNievesCrepaD[index].cantidad === 0){
            if(this.existenciasNievesCrepaD[index].existencia === 1){
              const obj = {id: elemento.id, existencia: true, nombre: elemento.nombre}
              console.log(obj)
              nieves.push(obj)
            }else if(this.existenciasNievesCrepaD[index].existencia === 0){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              nieves.push(obj)
            }
          }else if(this.existenciasNievesCrepaD[index].cantidad === 1){
            if(this.existenciasNievesCrepaD[index].existencia === 1 && (resultados[elemento.id]) <= this.existenciasNievesCrepaD[index].inventario){
              const obj = {id: elemento.id, existencia: true, nombre: elemento.nombre, inventario: this.existenciasNievesCrepaD[index].inventario, cantidad : this.existenciasNievesCrepaD[index].cantidad}
              console.log(obj)
              nieves.push(obj)
            }else if(this.existenciasNievesCrepaD[index].existencia === 1 && (resultados[elemento.id]) > this.existenciasNievesCrepaD[index].inventario){
              if(this.authService.lang() === 'es'){
                const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasNievesCrepaD[index].inventario, cantidad : this.existenciasNievesCrepaD[index].cantidad}
                const warn = 'No hay suficientes '+ elemento.nombre + ' para realizar la orden solo quedan '+ this.existenciasNievesCrepaD[index].inventario + ', por favor elimine almenos ' + ((resultados[elemento.id]) - this.existenciasNievesCrepaD[index].inventario) + ' para poder continuar con su compra'
                inventario.push(warn)
                console.log(obj)
                nieves.push(obj)
              }else if(this.authService.lang() === 'en'){
                const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasNievesCrepaD[index].inventario, cantidad : this.existenciasNievesCrepaD[index].cantidad}
                const warn = 'There are not enough '+ elemento.nombre + ' to make the order, there are only '+ this.existenciasNievesCrepaD[index].inventario + ', please remove at least ' + ((resultados[elemento.id]) - this.existenciasNievesCrepaD[index].inventario) + ' to continue with your purchase'
                inventario.push(warn)
                console.log(obj)
                nieves.push(obj)
              
              }
            }
            else if(this.existenciasNievesCrepaD[index].existencia === 0){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasNievesCrepaD[index].inventario, cantidad : this.existenciasNievesCrepaD[index].cantidad}
              console.log(obj)
              nieves.push(obj)
            }
          }
        }
          })
          this.inventarioNievesCrepaD.push(inventario)
        this.nievesCrepaD1.push(nieves)
      }else{
        this.inventarioNievesCrepaD.push([])
        this.nievesCrepaD1.push([])
        console.log('Este es un objeto vacio');
      }
      })
    }

    existenciasDecoracionCrepaD(obj:any){
      const resultados = this.contarRepeticionesDecoraciones(this.decoracionesCrepaD);
      this.decoracionesCrepaD1 = []
      this.invenatrioDecoracionesCrepaD = [];
      obj.forEach((element:any, indice:any) => {
        var decoraciones:any = [];
        var inventario:any = [];
        if(Object.keys(element).length > 0){
          element.forEach((elemento:any) => {
            console.log(elemento);
            const index = this.existenciasDecoracionesCrepaD.findIndex((i:any) => i.decoracion === elemento.nombre)
            console.log(this.existenciasDecoracionesCrepaD[index])
            if(index === -1){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              decoraciones.push(obj)
            }else{
            if(this.existenciasDecoracionesCrepaD[index].cantidad === 0){
            if(this.existenciasDecoracionesCrepaD[index].existencia === 1){
              const obj = {id: elemento.id, existencia: true, nombre: elemento.nombre}
              console.log(obj)
              decoraciones.push(obj)
            }else if(this.existenciasDecoracionesCrepaD[index].existencia === 0){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              decoraciones.push(obj)
            }
          }else if(this.existenciasDecoracionesCrepaD[index].cantidad === 1){
            if(this.existenciasDecoracionesCrepaD[index].existencia === 1 && (resultados[elemento.nombre]) <= this.existenciasDecoracionesCrepaD[index].inventario){
              const obj = {id: elemento.nombre, existencia: true, nombre: elemento.nombre, inventario: this.existenciasDecoracionesCrepaD[index].inventario, cantidad : this.existenciasDecoracionesCrepaD[index].cantidad}
              console.log(obj)
              decoraciones.push(obj)
            }else if(this.existenciasDecoracionesCrepaD[index].existencia === 1 && (resultados[elemento.nombre]) > this.existenciasDecoracionesCrepaD[index].inventario){
              if(this.authService.lang() === 'es'){
                
                const obj = {id: elemento.nombre, existencia: false, nombre: elemento.nombre, inventario: this.existenciasDecoracionesCrepaD[index].inventario, cantidad : this.existenciasDecoracionesCrepaD[index].cantidad}
                const warn = 'No hay suficientes '+ elemento.nombre + ' para realizar la orden solo quedan '+ this.existenciasDecoracionesCrepaD[index].inventario + ', por favor elimine almenos ' + (resultados[elemento.nombre] - this.existenciasDecoracionesCrepaD[index].inventario) + ' para poder continuar con su compra'
                inventario.push(warn)
                console.log(obj)
                decoraciones.push(obj)
              }else if(this.authService.lang() === 'en'){
                const obj = {id: elemento.nombre, existencia: false, nombre: elemento.nombre, inventario: this.existenciasDecoracionesCrepaD[index].inventario, cantidad : this.existenciasDecoracionesCrepaD[index].cantidad}
                const warn = 'There are not enough '+ elemento.nombre + ' to make the order, there are only '+ this.existenciasDecoracionesCrepaD[index].inventario + ', please remove at least ' + (resultados[elemento.nombre] - this.existenciasDecoracionesCrepaD[index].inventario) + ' to continue with your purchase'
                inventario.push(warn)
                console.log(obj)
                decoraciones.push(obj)
              
              }
            }
            else if(this.existenciasDecoracionesCrepaD[index].existencia === 0){
              const obj = {id: elemento.nombre, existencia: false, nombre: elemento.nombre, inventario: this.existenciasDecoracionesCrepaD[index].inventario, cantidad : this.existenciasDecoracionesCrepaD[index].cantidad}
              console.log(obj)
              decoraciones.push(obj)
            }
          }
        }
          })
          this.invenatrioDecoracionesCrepaD.push(inventario)
        this.decoracionesCrepaD1.push(decoraciones)
      }else{
        this.invenatrioDecoracionesCrepaD.push([])
        this.decoracionesCrepaD1.push([])
        console.log('Este es un objeto vacio');
      }
      })
    }

    existenciasHarCrepaD(obj:any, harinas1:any){

      obj.forEach((element:any, index1:any) => {
        var harinas:any = [];
        var inventario:any = [];
         const harina = element.orden.harina;
         const index = this.existenciasHarinasCrepaD.findIndex((i:any) => i.id === harina.id)
         console.log(this.existenciasHarinasCrepaD[index]) 
         if(this.existenciasHarinasCrepaD[index].cantidad === 0){
          if(index === -1){
            const obj = {id: harina.id, existencia: false, harina: harina.harina}
            console.log(obj)
            harinas.push(obj)
          }else{
         if(this.existenciasHarinasCrepaD[index].existencia === 1){
          const obj = {id: harina.id, existencia: true, harina: harina.harina}
          inventario.push()
          console.log(obj)
          harinas.push(obj)
         }else if(this.existenciasHarinasCrepaD[index].existencia === 0){
          const obj = {id: harina.id, existencia: false, harina: harina.harina}
          console.log(obj)
          inventario.push()
          harinas.push(obj)
         }
        }
        }else if(this.existenciasHarinasCrepaD[index].cantidad === 1){
          if(index === -1){
            const obj = {id: harina.id, existencia: false, harina: harina.harina}
            console.log(obj)
            harinas.push(obj)
          }else{
          if(this.existenciasHarinasCrepaD[index].existencia === 1 && (harinas1[harina.id]) <= this.existenciasHarinasCrepaD[index].inventario){
            const obj = {id: harina.id, existencia: true, harina: harina.harina, inventario: this.existenciasHarinasCrepaD[index].inventario, cantidad : this.existenciasHarinasCrepaD[index].cantidad}
            console.log(obj)
            harinas.push(obj)
            inventario.push()
          }else if(this.existenciasHarinasCrepaD[index].existencia === 1 && (harinas1[harina.id]) > this.existenciasHarinasCrepaD[index].inventario){
            if(this.authService.lang() === 'es'){
              const obj = {id: harina.id, existencia: false, harina: harina.harina, inventario: this.existenciasHarinasCrepaD[index].inventario, cantidad : this.existenciasHarinasCrepaD[index].cantidad}
              const warn = 'No hay suficientes '+ harina.harina + ' para realizar la orden solo quedan '+ this.existenciasHarinasCrepaD[index].inventario + ', por favor elimine almenos ' + ((harinas1[harina.id]) - this.existenciasHarinasCrepaD[index].inventario) + ' para poder continuar con su compra'
              console.log(obj)
              harinas.push(obj)
              inventario.push(warn)
            }else if(this.authService.lang() === 'en'){
              const obj = {id: harina.id, existencia: false, harina: harina.harina, inventario: this.existenciasHarinasCrepaD[index].inventario, cantidad : this.existenciasHarinasCrepaD[index].cantidad}
              const warn = 'There are not enough '+ harina.harina + ' to make the order, there are only '+ this.existenciasHarinasCrepaD[index].inventario + ', please remove at least ' + ((harinas1[harina.id]) - this.existenciasHarinasCrepaD[index].inventario) + ' to continue with your purchase'
              console.log(obj)
              harinas.push(obj)
              inventario.push(warn)
            }

          }
          else if(this.existenciasHarinasCrepaD[index].existencia === 0){
            const obj = {id: harina.id, existencia: false, harina: harina.harina, inventario: this.existenciasHarinasCrepaD[index].inventario, cantidad : this.existenciasHarinasCrepaD[index].cantidad}
            console.log(obj)
            harinas.push(obj)
            inventario.push()
          }
        }
        }
        if(inventario.length > 0){
        this.invenatrioHarinasCrepaD[index1] = inventario
        }else{
          this.invenatrioHarinasCrepaD[index1] = ''
        }
        this.crepasDulces[index1].orden.harina = harinas[0];
      })

      console.log(this.crepasDulces)

    }

    OrganizarCrepasDulces(){
      this.existenciasIngComCrepaD(this.ingredientesComCrepaD);
      this.existenciasIngUntCrepaD(this.ingredientesUntCrepaD);
      this.existenciasNievCrepaD(this.nievesCrepaD);
      this.existenciasDecoracionCrepaD(this.decoracionesCrepaD);
      const harinas:any = [];
      this.crepasDulces.forEach((element:any) => {
        const harina = element.orden.harina;
        harinas.push(harina);
      })

      const resultados:any = {};
      harinas.forEach((element:any, index:any) => {
        console.log(element.id);
        const id = element.id;
        if (!resultados[id]) {
          resultados[id] = 0;
        }
        resultados[id] += (parseInt(this.crepasDulces[index].cantidad))
      });
      console.log(resultados);
      this.harinasCrepaD = resultados;
      console.log(this.harinasCrepaD)
      this.existenciasHarCrepaD(this.crepasDulces, this.harinasCrepaD);
      this.detectExistIngCrepaD();
    }

    // Waffles

    existenciasIngUntWaffle(obj:any){
      const resultados = this.contarRepeticionesWaffle(obj);
      this.waffles1IngUnt = [];
      this.inventarioWafflesIngUnt = [];
      obj.forEach((element:any, indice:any) => {
        var ingredientes:any = [];
        var inventario:any = [];  
        if(Object.keys(element).length > 0){
          element.forEach((elemento:any) => {
            console.log(elemento);
            const index = this.existenciasWafflesIngUnt.findIndex((i:any) => i.id === elemento.id)
            console.log(this.existenciasWafflesIngUnt[index])
            if(this.existenciasWafflesIngUnt[index].cantidad === 0){
              if(index === -1){
                const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
                console.log(obj)
                ingredientes.push(obj)
              }else{
            if(this.existenciasWafflesIngUnt[index].existencia === 1){
              const obj = {id: elemento.id, existencia: true, nombre: elemento.nombre}
              console.log(obj)
              ingredientes.push(obj)
            }else if(this.existenciasWafflesIngUnt[index].existencia === 0){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              ingredientes.push(obj)
            }
          }
          }else if(this.existenciasWafflesIngUnt[index].cantidad === 1){
            if(index === -1){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              ingredientes.push(obj)
            }else{
            if(this.existenciasWafflesIngUnt[index].existencia === 1 && (resultados[elemento.id]) <= this.existenciasWafflesIngUnt[index].inventario){
              const obj = {id: elemento.id, existencia: true, nombre: elemento.nombre, inventario: this.existenciasWafflesIngUnt[index].inventario, cantidad : this.existenciasWafflesIngUnt[index].cantidad}
              console.log(obj)
              ingredientes.push(obj)
            }else if(this.existenciasWafflesIngUnt[index].existencia === 1 && (resultados[elemento.id]) > this.existenciasWafflesIngUnt[index].inventario){
              if(this.authService.lang() === 'es'){
                const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasWafflesIngUnt[index].inventario, cantidad : this.existenciasWafflesIngUnt[index].cantidad}
                const warn = 'No hay suficientes '+ elemento.nombre + ' para realizar la orden solo quedan '+ this.existenciasWafflesIngUnt[index].inventario + ', por favor elimine almenos ' + ((resultados[elemento.id]) - this.existenciasWafflesIngUnt[index].inventario) + ' para poder continuar con su compra'
                console.log(obj)
                inventario.push(warn)
                ingredientes.push(obj)
              }else if(this.authService.lang() === 'en'){
                const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasWafflesIngUnt[index].inventario, cantidad : this.existenciasWafflesIngUnt[index].cantidad}
                const warn = 'There are not enough '+ elemento.nombre + ' to make the order, there are only '+ this.existenciasWafflesIngUnt[index].inventario + ', please remove at least ' + ((resultados[elemento.id]) - this.existenciasWafflesIngUnt[index].inventario) + ' to continue with your purchase'
                console.log(obj)
                inventario.push(warn)
                ingredientes.push(obj)
              }
            }
            else if(this.existenciasWafflesIngUnt[index].existencia === 0){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasWafflesIngUnt[index].inventario, cantidad : this.existenciasWafflesIngUnt[index].cantidad}
              console.log(obj)
              ingredientes.push(obj)
            }
          }
          }
          })
          this.inventarioWafflesIngUnt.push(inventario)
        this.waffles1IngUnt.push(ingredientes)
      }else{
        this.inventarioWafflesIngUnt.push([])
        this.waffles1IngUnt.push([])
        console.log('Este es un objeto vacio');
      }
      })
    }

    existenciasIngComWaffle(obj:any){
      const resultados = this.contarRepeticionesWaffle(obj);
      this.waffles1IngCom = [];
      this.inventarioWafflesIngCom = [];
      obj.forEach((element:any, indice: any) => {
        var ingredientes:any = [];
        var inventario:any = [];
        if(Object.keys(element).length > 0){
          element.forEach((elemento:any) => {
            console.log(elemento);
            const index = this.existenciasWafflesIngCom.findIndex((i:any) => i.id === elemento.id)
            console.log(this.existenciasWafflesIngCom[index])
            if(this.existenciasWafflesIngCom[index].cantidad === 0){
            if(index === -1){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              ingredientes.push(obj)
            }else{
            if(this.existenciasWafflesIngCom[index].existencia === 1){
              const obj = {id: elemento.id, existencia: true, nombre: elemento.nombre}
              console.log(obj)
              ingredientes.push(obj)
            }else if(this.existenciasWafflesIngCom[index].existencia === 0){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              ingredientes.push(obj)
            }              
            }
          }else if(this.existenciasWafflesIngCom[index].cantidad === 1){
            if(index === -1){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              ingredientes.push(obj)
            }else{
            if(this.existenciasWafflesIngCom[index].existencia === 1 && (resultados[elemento.id]) <= this.existenciasWafflesIngCom[index].inventario){
              const obj = {id: elemento.id, existencia: true, nombre: elemento.nombre, inventario: this.existenciasWafflesIngCom[index].inventario, cantidad : this.existenciasWafflesIngCom[index].cantidad}
              console.log(obj)
              ingredientes.push(obj)
            }else if(this.existenciasWafflesIngCom[index].existencia === 1 && (resultados[elemento.id]) > this.existenciasWafflesIngCom[index].inventario){
              if(this.authService.lang() === 'es'){
                const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasWafflesIngCom[index].inventario, cantidad : this.existenciasWafflesIngCom[index].cantidad}
                const warn = 'No hay suficientes '+ elemento.nombre + ' para realizar la orden solo quedan '+ this.existenciasWafflesIngCom[index].inventario + ', por favor elimine almenos ' + ((resultados[elemento.id]) - this.existenciasWafflesIngCom[index].inventario) + ' para poder continuar con su compra'
                console.log(obj)
                inventario.push(warn)
                ingredientes.push(obj)
              }else if(this.authService.lang() === 'en'){
                const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasWafflesIngCom[index].inventario, cantidad : this.existenciasWafflesIngCom[index].cantidad}
                const warn = 'There are not enough '+ elemento.nombre + ' to make the order, there are only '+ this.existenciasWafflesIngCom[index].inventario + ', please remove at least ' + ((resultados[elemento.id]) - this.existenciasWafflesIngCom[index].inventario) + ' to continue with your purchase'
                console.log(obj)
                inventario.push(warn)
                ingredientes.push(obj)
              }
            }else if(this.existenciasWafflesIngCom[index].existencia === 0){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasWafflesIngCom[index].inventario, cantidad : this.existenciasWafflesIngCom[index].cantidad}
              console.log(obj)
              ingredientes.push(obj)
            }
          }
        }

          })
          this.inventarioWafflesIngCom.push(inventario)
        this.waffles1IngCom.push(ingredientes)
      }else{
        this.inventarioWafflesIngCom.push([])
        this.waffles1IngCom.push([])
        console.log('Este es un objeto vacio');
      }
      })
    }

    existenciasNieveWaffle(obj:any){
      const resultados = this.contarRepeticionesWaffle(obj);
      this.waffles1Nieve = [];
      this.inventarioWafflesNieve = [];
      obj.forEach((element:any, indice:any) => {
        var nieves:any = [];
        var inventario:any = [];
        if(Object.keys(element).length > 0){
          element.forEach((elemento:any) => {
            console.log(elemento);
            const index = this.existenciasWafflesNieve.findIndex((i:any) => i.id === elemento.id)
            console.log(this.existenciasWafflesNieve[index])
            if(this.existenciasWafflesNieve[index].cantidad === 0){
            if(this.existenciasWafflesNieve[index].existencia === 1){
              const obj = {id: elemento.id, existencia: true, nombre: elemento.nombre}
              console.log(obj)
              nieves.push(obj)
            }else if(this.existenciasWafflesNieve[index].existencia === 0){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              nieves.push(obj)
            }
          }else if(this.existenciasWafflesNieve[index].cantidad === 1){
            if(this.existenciasWafflesNieve[index].existencia === 1 && (resultados[elemento.id]) <= this.existenciasWafflesNieve[index].inventario){
              const obj = {id: elemento.id, existencia: true, nombre: elemento.nombre, inventario: this.existenciasWafflesNieve[index].inventario, cantidad : this.existenciasWafflesNieve[index].cantidad}
              console.log(obj)
              nieves.push(obj)
            }else if(this.existenciasWafflesNieve[index].existencia === 1 && (resultados[elemento.id]) > this.existenciasWafflesNieve[index].inventario){
              if(this.authService.lang() === 'es'){
                const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasWafflesNieve[index].inventario, cantidad : this.existenciasWafflesNieve[index].cantidad}
                const warn = 'No hay suficientes '+ elemento.nombre + ' para realizar la orden solo quedan '+ this.existenciasWafflesNieve[index].inventario + ', por favor elimine almenos ' + ((resultados[elemento.id]) - this.existenciasWafflesNieve[index].inventario) + ' para poder continuar con su compra'
                console.log(obj)
                inventario.push(warn)
                nieves.push(obj)
              }else if(this.authService.lang() === 'en'){
                const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasWafflesNieve[index].inventario, cantidad : this.existenciasWafflesNieve[index].cantidad}
                const warn = 'There are not enough '+ elemento.nombre + ' to make the order, there are only '+ this.existenciasWafflesNieve[index].inventario + ', please remove at least ' + ((resultados[elemento.id]) - this.existenciasWafflesNieve[index].inventario) + ' to continue with your purchase'
                console.log(obj)
                inventario.push(warn)
                nieves.push(obj)
              }
            }else if(this.existenciasWafflesNieve[index].existencia === 0){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasWafflesNieve[index].inventario, cantidad : this.existenciasWafflesNieve[index].cantidad}
              console.log(obj)
              nieves.push(obj)
            }
          }
          })
          this.inventarioWafflesNieve.push(inventario)
        this.waffles1Nieve.push(nieves)
      }else{
        this.inventarioWafflesNieve.push([])
        this.waffles1Nieve.push([])
        console.log('Este es un objeto vacio');
      }
      })
    }

    existenciasDecoracionWaffle(obj:any){
      const resultados = this.contarRepeticionesDecoracionesWaffle(obj);
      console.log('result', resultados)
      this.waffles1Decoraciones = [];
      this.inventarioWafflesDecoraciones = [];
      obj.forEach((element:any, indice:any) => {
        var decoraciones:any = [];
        var inventario:any = [];
        if(Object.keys(element).length > 0){
          element.forEach((elemento:any) => {
            console.log(elemento);
            const index = this.existenciasWafflesDecoraciones.findIndex((i:any) => i.decoracion === elemento.nombre)
            console.log(this.existenciasWafflesDecoraciones[index])
            if(this.existenciasWafflesDecoraciones[index].cantidad === 0){
            if(this.existenciasWafflesDecoraciones[index].existencia === 1){
              const obj = {id: elemento.id, existencia: true, nombre: elemento.nombre}
              console.log(obj)
              decoraciones.push(obj)
            }else if(this.existenciasWafflesDecoraciones[index].existencia === 0){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              decoraciones.push(obj)
            }
          }else if(this.existenciasWafflesDecoraciones[index].cantidad === 1){
            if(this.existenciasWafflesDecoraciones[index].existencia === 1 && (resultados[elemento.nombre]) <= this.existenciasWafflesDecoraciones[index].inventario){
              const obj = {id: elemento.nombre, existencia: true, nombre: elemento.nombre, inventario: this.existenciasWafflesDecoraciones[index].inventario, cantidad : this.existenciasWafflesDecoraciones[index].cantidad}
              console.log(obj)
              decoraciones.push(obj)
            }else if(this.existenciasWafflesDecoraciones[index].existencia === 1 && (resultados[elemento.nombre]) > this.existenciasWafflesDecoraciones[index].inventario){
              if(this.authService.lang() === 'es'){
                const obj = {id: elemento.nombre, existencia: false, nombre: elemento.nombre, inventario: this.existenciasWafflesDecoraciones[index].inventario, cantidad : this.existenciasWafflesDecoraciones[index].cantidad}
                const warn = 'No hay suficientes '+ elemento.nombre + ' para realizar la orden solo quedan '+ this.existenciasWafflesDecoraciones[index].inventario + ', por favor elimine almenos ' + ((resultados[elemento.nombre]) - this.existenciasWafflesDecoraciones[index].inventario) + ' para poder continuar con su compra'
                console.log(obj)
                inventario.push(warn)
                decoraciones.push(obj)
              }else if(this.authService.lang() === 'en'){
                const obj = {id: elemento.nombre, existencia: false, nombre: elemento.nombre, inventario: this.existenciasWafflesDecoraciones[index].inventario, cantidad : this.existenciasWafflesDecoraciones[index].cantidad}
                const warn = 'There are not enough '+ elemento.nombre + ' to make the order, there are only '+ this.existenciasWafflesDecoraciones[index].inventario + ', please remove at least ' + ((resultados[elemento.nombre]) - this.existenciasWafflesDecoraciones[index].inventario) + ' to continue with your purchase'
                console.log(obj)
                inventario.push(warn)
                decoraciones.push(obj)
              }
            }else if(this.existenciasWafflesDecoraciones[index].existencia === 0){
              const obj = {id: elemento.nombre, existencia: false, nombre: elemento.nombre, inventario: this.existenciasWafflesDecoraciones[index].inventario, cantidad : this.existenciasWafflesDecoraciones[index].cantidad}
              console.log(obj)
              decoraciones.push(obj)
            }
          }
          })
          this.inventarioWafflesDecoraciones.push(inventario)
        this.waffles1Decoraciones.push(decoraciones)
      }else{
        this.inventarioWafflesDecoraciones.push([])
        this.waffles1Decoraciones.push([])
        console.log('Este es un objeto vacio');
      }
      })
    }

    OrganizarWaffles(){
      this.existenciasIngUntWaffle(this.wafflesIngUnt);
      this.existenciasIngComWaffle(this.wafflesIngCom);
      this.existenciasNieveWaffle(this.wafflesNieve);
      this.existenciasDecoracionWaffle(this.wafflesDecoraciones);
      this.detectExistIngWaffle();
    }

    // Waffles Canasta

    existenciasIngUntWaffleCanasta(obj:any){
      const resultados = this.contarRepeticionesWaffleCanasta(obj);
      this.wafflesCanasta1IngUnt = [];
      this.inventarioWafflesIngUntCanasta = [];
      obj.forEach((element:any, indice:any) => {
        var ingredientes:any = [];
        var inventario:any = [];
        if(Object.keys(element).length > 0){
          element.forEach((elemento:any) => {
            console.log(elemento);
            const index = this.existenciasWafflesIngUntCanasta.findIndex((i:any) => i.id === elemento.id)
            console.log(this.existenciasWafflesIngUntCanasta[index])
            if(this.existenciasWafflesIngUntCanasta[index].cantidad === 0){
            if(index === -1){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              ingredientes.push(obj)
            }else{
            if(this.existenciasWafflesIngUntCanasta[index].existencia === 1){
              const obj = {id: elemento.id, existencia: true, nombre: elemento.nombre}
              console.log(obj)
              ingredientes.push(obj)
            }else if(this.existenciasWafflesIngUntCanasta[index].existencia === 0){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              ingredientes.push(obj)
            }              
            }
          }else if(this.existenciasWafflesIngUntCanasta[index].cantidad === 1){
            if(index === -1){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              ingredientes.push(obj)
            }else{
            if(this.existenciasWafflesIngUntCanasta[index].existencia === 1 &&  (resultados[elemento.id]) <= this.existenciasWafflesIngUntCanasta[index].inventario){
              const obj = {id: elemento.id, existencia: true, nombre: elemento.nombre, inventario: this.existenciasWafflesIngUntCanasta[index].inventario, cantidad : this.existenciasWafflesIngUntCanasta[index].cantidad}
              console.log(obj)
              ingredientes.push(obj)
            }else if(this.existenciasWafflesIngUntCanasta[index].existencia === 1 && (resultados[elemento.id]) > this.existenciasWafflesIngUntCanasta[index].inventario){
              if(this.authService.lang() === 'es'){
                const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasWafflesIngUntCanasta[index].inventario, cantidad : this.existenciasWafflesIngUntCanasta[index].cantidad}
                const warn = 'No hay suficientes '+ elemento.nombre + ' para realizar la orden solo quedan '+ this.existenciasWafflesIngUntCanasta[index].inventario + ', por favor elimine almenos ' + ((resultados[elemento.id]) - this.existenciasWafflesIngUntCanasta[index].inventario) + ' para poder continuar con su compra'
                console.log(obj)
                inventario.push(warn)
                ingredientes.push(obj)
              }else if(this.authService.lang() === 'en'){
                const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasWafflesIngUntCanasta[index].inventario, cantidad : this.existenciasWafflesIngUntCanasta[index].cantidad}
                const warn = 'There are not enough '+ elemento.nombre + ' to make the order, there are only '+ this.existenciasWafflesIngUntCanasta[index].inventario + ', please remove at least ' + ((resultados[elemento.id]) - this.existenciasWafflesIngUntCanasta[index].inventario) + ' to continue with your purchase'
                console.log(obj)
                inventario.push(warn)
                ingredientes.push(obj)
              }
            }else if(this.existenciasWafflesIngUntCanasta[index].existencia === 0){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasWafflesIngUntCanasta[index].inventario, cantidad : this.existenciasWafflesIngUntCanasta[index].cantidad}
              console.log(obj)
              ingredientes.push(obj)
            }
          }
          }

          })
          this.inventarioWafflesIngUntCanasta.push(inventario)
        this.wafflesCanasta1IngUnt.push(ingredientes)
      }else{
        this.inventarioWafflesIngUntCanasta.push([])
        this.wafflesCanasta1IngUnt.push([])
        console.log('Este es un objeto vacio');
      }
      })
    }


    existenciasIngComWaffleCanasta(obj:any){
      const resultados = this.contarRepeticionesWaffleCanasta(obj);
      this.wafflesCanasta1IngCom = [];
      this.inventarioWafflesIngComCanasta = [];
      obj.forEach((element:any, indice:any) => {
        var ingredientes:any = [];
        var inventario:any = [];
        if(Object.keys(element).length > 0){
          element.forEach((elemento:any) => {
            console.log(elemento);
            const index = this.existenciasWafflesIngComCanasta.findIndex((i:any) => i.id === elemento.id)
            console.log(index)
            if(this.existenciasWafflesIngComCanasta[index].cantidad === 0){
            console.log(this.existenciasWafflesIngComCanasta[index])
            if(index === -1){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              ingredientes.push(obj)
            }else{
            if(this.existenciasWafflesIngComCanasta[index].existencia === 1){
              const obj = {id: elemento.id, existencia: true, nombre: elemento.nombre}
              console.log(obj)
              ingredientes.push(obj)
            }else if(this.existenciasWafflesIngComCanasta[index].existencia === 0){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              ingredientes.push(obj)
            }              
            }
          }else if(this.existenciasWafflesIngComCanasta[index].cantidad === 1){
            console.log(this.existenciasWafflesIngComCanasta[index])
            if(index === -1){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              ingredientes.push(obj)
            }else{
            if(this.existenciasWafflesIngComCanasta[index].existencia === 1 && (resultados[elemento.id]) <= this.existenciasWafflesIngComCanasta[index].inventario){
              const obj = {id: elemento.id, existencia: true, nombre: elemento.nombre, inventario: this.existenciasWafflesIngComCanasta[index].inventario, cantidad : this.existenciasWafflesIngComCanasta[index].cantidad}
              console.log(obj)
              ingredientes.push(obj)
            }else if(this.existenciasWafflesIngComCanasta[index].existencia === 1 && (resultados[elemento.id]) > this.existenciasWafflesIngComCanasta[index].inventario){
              if(this.authService.lang() === 'es'){
                const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasWafflesIngComCanasta[index].inventario, cantidad : this.existenciasWafflesIngComCanasta[index].cantidad}
                const warn = 'No hay suficientes '+ elemento.nombre + ' para realizar la orden solo quedan '+ this.existenciasWafflesIngComCanasta[index].inventario + ', por favor elimine almenos ' + ((resultados[elemento.id]) - this.existenciasWafflesIngComCanasta[index].inventario) + ' para poder continuar con su compra'
                console.log(obj)
                inventario.push(warn)
                ingredientes.push(obj)
              }else if(this.authService.lang() === 'en'){
                const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasWafflesIngComCanasta[index].inventario, cantidad : this.existenciasWafflesIngComCanasta[index].cantidad}
                const warn = 'There are not enough '+ elemento.nombre + ' to make the order, there are only '+ this.existenciasWafflesIngComCanasta[index].inventario + ', please remove at least ' + ((resultados[elemento.id]) - this.existenciasWafflesIngComCanasta[index].inventario) + ' to continue with your purchase'
                console.log(obj)
                inventario.push(warn)
                ingredientes.push(obj)
              }
            }else if(this.existenciasWafflesIngComCanasta[index].existencia === 0){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasWafflesIngComCanasta[index].inventario, cantidad : this.existenciasWafflesIngComCanasta[index].cantidad}
              console.log(obj)
              ingredientes.push(obj)
            }
          }
        }

          })
        this.inventarioWafflesIngComCanasta.push(inventario)
        this.wafflesCanasta1IngCom.push(ingredientes)
      }else{
        this.inventarioWafflesIngComCanasta.push([])
        this.wafflesCanasta1IngCom.push([])
        console.log('Este es un objeto vacio');
      }
      })
    }


    existenciasNieveWaffleCanasta(obj:any){
      const resultados = this.contarRepeticionesWaffleCanasta(obj);
      this.wafflesCanasta1Nieve = [];
      this.inventarioWafflesNieveCanasta = [];
      obj.forEach((element:any, indice:any) => {
        var nieves:any = [];
        var inventario:any = [];
        if(Object.keys(element).length > 0){
          element.forEach((elemento:any) => {
            console.log(elemento);
            const index = this.existenciasWafflesNieveCanasta.findIndex((i:any) => i.id === elemento.id)
            console.log(this.existenciasWafflesNieveCanasta[index])
            if(this.existenciasWafflesNieveCanasta[index].cantidad === 0){
            if(index === -1){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              nieves.push(obj)
            }else{
            if(this.existenciasWafflesNieveCanasta[index].existencia === 1){
              const obj = {id: elemento.id, existencia: true, nombre: elemento.nombre}
              console.log(obj)
              nieves.push(obj)
            }else if(this.existenciasWafflesNieveCanasta[index].existencia === 0){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              nieves.push(obj)
            }              
            }
          }else if(this.existenciasWafflesNieveCanasta[index].cantidad === 1){
            if(index === -1){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              nieves.push(obj)
            }else{
            if(this.existenciasWafflesNieveCanasta[index].existencia === 1 && (resultados[elemento.id]) <= this.existenciasWafflesNieveCanasta[index].inventario){
              const obj = {id: elemento.id, existencia: true, nombre: elemento.nombre, inventario: this.existenciasWafflesNieveCanasta[index].inventario, cantidad : this.existenciasWafflesNieveCanasta[index].cantidad}
              console.log(obj)
              nieves.push(obj)
            }else if(this.existenciasWafflesNieveCanasta[index].existencia === 1 && (resultados[elemento.id]) > this.existenciasWafflesNieveCanasta[index].inventario){
              if(this.authService.lang() === 'es'){
                const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasWafflesNieveCanasta[index].inventario, cantidad : this.existenciasWafflesNieveCanasta[index].cantidad}
                const warn = 'No hay suficientes '+ elemento.nombre + ' para realizar la orden solo quedan '+ this.existenciasWafflesNieveCanasta[index].inventario + ', por favor elimine almenos ' + ((resultados[elemento.id]) - this.existenciasWafflesNieveCanasta[index].inventario) + ' para poder continuar con su compra'
                console.log(obj)
                inventario.push(warn)
                nieves.push(obj)
              }else if(this.authService.lang() === 'en'){
                const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasWafflesNieveCanasta[index].inventario, cantidad : this.existenciasWafflesNieveCanasta[index].cantidad}
                const warn = 'There are not enough '+ elemento.nombre + ' to make the order, there are only '+ this.existenciasWafflesNieveCanasta[index].inventario + ', please remove at least ' + ((resultados[elemento.id]) - this.existenciasWafflesNieveCanasta[index].inventario) + ' to continue with your purchase'
                console.log(obj)
                inventario.push(warn)
                nieves.push(obj)
              }
            }else if(this.existenciasWafflesNieveCanasta[index].existencia === 0){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre, inventario: this.existenciasWafflesNieveCanasta[index].inventario, cantidad : this.existenciasWafflesNieveCanasta[index].cantidad}
              console.log(obj)
              nieves.push(obj)
            }
          }
          }
          })
        this.inventarioWafflesNieveCanasta.push(inventario)
        this.wafflesCanasta1Nieve.push(nieves)
      }else{
        this.inventarioWafflesNieveCanasta.push([])
        this.wafflesCanasta1Nieve.push([])
        console.log('Este es un objeto vacio');
      }
      })
    }

    existenciasDecoracionesWaffleCanasta(obj:any){
      const resultados = this.contarRepeticionesDecoracionesWaffleCanasta(obj);
      this.wafflesCanasta1Decoraciones = [];
      this.inventarioWafflesDecoracionesCanasta = [];
      obj.forEach((element:any, indice:any) => {
        var decoraciones:any = [];
        var inventario:any = [];
        if(Object.keys(element).length > 0){
          element.forEach((elemento:any) => {
            console.log(elemento);
            const index = this.existenciasWafflesDecoracionesCanasta.findIndex((i:any) => i.decoracion === elemento.nombre)
            console.log(this.existenciasWafflesDecoracionesCanasta)
            if(this.existenciasWafflesDecoracionesCanasta[index].cantidad === 0){
            if(index === -1){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              decoraciones.push(obj)
            }else{
            if(this.existenciasWafflesDecoracionesCanasta[index].existencia === 1){
              const obj = {id: elemento.id, existencia: true, nombre: elemento.nombre}
              console.log(obj)
              decoraciones.push(obj)
            }else if(this.existenciasWafflesDecoracionesCanasta[index].existencia === 0){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              decoraciones.push(obj)
            }              
            }
          }else if(this.existenciasWafflesDecoracionesCanasta[index].cantidad === 1){
            if(index === -1){
              const obj = {id: elemento.id, existencia: false, nombre: elemento.nombre}
              console.log(obj)
              decoraciones.push(obj)
            }else{
            if(this.existenciasWafflesDecoracionesCanasta[index].existencia === 1 && (resultados[elemento.nombre]) <= this.existenciasWafflesDecoracionesCanasta[index].inventario){
              const obj = {id: elemento.nombre, existencia: true, nombre: elemento.nombre, inventario: this.existenciasWafflesDecoracionesCanasta[index].inventario, cantidad : this.existenciasWafflesDecoracionesCanasta[index].cantidad}
              console.log(obj)
              decoraciones.push(obj)
            }else if(this.existenciasWafflesDecoracionesCanasta[index].existencia === 1 && (resultados[elemento.nombre]) > this.existenciasWafflesDecoracionesCanasta[index].inventario){
              if(this.authService.lang() === 'es'){
                const obj = {id: elemento.nombre, existencia: false, nombre: elemento.nombre, inventario: this.existenciasWafflesDecoracionesCanasta[index].inventario, cantidad : this.existenciasWafflesDecoracionesCanasta[index].cantidad}
                const warn = 'No hay suficientes '+ elemento.nombre + ' para realizar la orden solo quedan '+ this.existenciasWafflesDecoracionesCanasta[index].inventario + ', por favor elimine almenos ' + ((resultados[elemento.nombre]) - this.existenciasWafflesDecoracionesCanasta[index].inventario) + ' para poder continuar con su compra'
                console.log(obj)
                inventario.push(warn)
                decoraciones.push(obj)
              }else if(this.authService.lang() === 'en'){
                const obj = {id: elemento.nombre, existencia: false, nombre: elemento.nombre, inventario: this.existenciasWafflesDecoracionesCanasta[index].inventario, cantidad : this.existenciasWafflesDecoracionesCanasta[index].cantidad}
                const warn = 'There are not enough '+ elemento.nombre + ' to make the order, there are only '+ this.existenciasWafflesDecoracionesCanasta[index].inventario + ', please remove at least ' + ((resultados[elemento.nombre]) - this.existenciasWafflesDecoracionesCanasta[index].inventario) + ' to continue with your purchase'
                console.log(obj)
                inventario.push(warn)
                decoraciones.push(obj)
              }
            }else if(this.existenciasWafflesDecoracionesCanasta[index].existencia === 0){
              const obj = {id: elemento.nombre, existencia: false, nombre: elemento.nombre, inventario: this.existenciasWafflesDecoracionesCanasta[index].inventario, cantidad : this.existenciasWafflesDecoracionesCanasta[index].cantidad}
              console.log(obj)
              decoraciones.push(obj)
            }
          }
          }
          })
        this.inventarioWafflesDecoracionesCanasta.push(inventario)
        this.wafflesCanasta1Decoraciones.push(decoraciones)
      }else{
        this.inventarioWafflesDecoracionesCanasta.push([])
        this.wafflesCanasta1Decoraciones.push([])
        console.log('Este es un objeto vacio');
      }
      })
    }


    // Bebidas Frias

    existBebidasFrias(obj:any){
      const resultados1:any = [];
      this.bebidasFrias.forEach((element:any) => {
        console.log(element);
        const botana = element.orden;
        resultados1.push(botana);
      });
      const resultados = this.contarRepeticionesUnit(resultados1, 'bebidaFria');
      console.log(resultados);
      this.bebidasFrias1 = [];
      this.inventarioBebidasFrias = [];
      console.log('Estas son las bebidas frias'+ this.bebidasFrias);
      console.log(this.bebidasFrias);
      console.log(this.existenBebidasFrias);
      obj.forEach((element:any, indice: any) => {
        console.log(element);
        const index = this.existenBebidasFrias.findIndex((i:any) => i.product_id === element.orden.id)
        console.log(this.existenBebidasFrias[index])
        console.log(this.bebidasFrias[indice].cantidad)
        if(index === -1){
          const obj = {id: element.id, existencia: false, orden: element.orden, cantidad: element.cantidad, precio: element.precio, nombre: element.nombre, total: element.total}
          this.bebidasFrias1.push(obj)
          this.inventarioBebidasFrias.push([]);
        }else{
          if(this.existenBebidasFrias[index].cantidad === 0){
          if(this.existenBebidasFrias[index].existencia === 1){
            const obj = {id: element.id, existencia: true, orden: element.orden, cantidad: element.cantidad, precio: element.precio, nombre: element.nombre, total: element.total}
            this.bebidasFrias1.push(obj)
            this.inventarioBebidasFrias.push([]);
          }else if(this.existenBebidasFrias[index].existencia === 0){
            const obj = {id: element.id, existencia: false, orden: element.orden, cantidad: element.cantidad, precio: element.precio, nombre: element.nombre, total: element.total}
            this.bebidasFrias1.push(obj)
            this.inventarioBebidasFrias.push([]);
          }
        }else if(this.existenBebidasFrias[index].cantidad === 1){
          if(this.existenBebidasFrias[index].existencia === 1 && (resultados[element.orden.id]) <= this.existenBebidasFrias[index].inventario){
            const obj = {id: element.id, existencia: true, orden: element.orden, cantidad: element.cantidad, precio: element.precio, nombre: element.nombre, total: element.total}
            this.bebidasFrias1.push(obj)
            this.inventarioBebidasFrias.push([]);
          }else if(this.existenBebidasFrias[index].existencia === 1 && (resultados[element.orden.id]) > this.existenBebidasFrias[index].inventario){
            if(this.authService.lang() === 'es'){
              const obj = {id: element.id, existencia: false, orden: element.orden, cantidad: element.cantidad, precio: element.precio, nombre: element.nombre, total: element.total}
              const warn = 'No hay suficientes '+ element.orden.bebida + ' para realizar la orden solo quedan '+ this.existenBebidasFrias[index].inventario + ', por favor elimine almenos ' + ((resultados[element.orden.id]) - this.existenBebidasFrias[index].inventario) + ' para poder continuar con su compra'
              this.inventarioBebidasFrias.push([warn])
              this.bebidasFrias1.push(obj)
            }else if(this.authService.lang() === 'en'){
              const obj = {id: element.id, existencia: false, orden: element.orden, cantidad: element.cantidad, precio: element.precio, nombre: element.nombre, total: element.total}
              const warn = 'There are not enough '+ element.orden.bebida + ' to make the order, there are only '+ this.existenBebidasFrias[index].inventario + ', please remove at least ' + ((resultados[element.orden.id]) - this.existenBebidasFrias[index].inventario) + ' to continue with your purchase'
              this.inventarioBebidasFrias.push([warn])
              this.bebidasFrias1.push(obj)
            }
          }else if(this.existenBebidasFrias[index].existencia === 0){
            const obj = {id: element.id, existencia: false, orden: element.orden, cantidad: element.cantidad, precio: element.precio, nombre: element.nombre, total: element.total}
            this.bebidasFrias1.push(obj)
            this.inventarioBebidasFrias.push([]);
          }
        }
        }
      })

      this.detectExistBebidasFrias();
    }

    // Bebidas Calientes
    existBebidasCalientes(obj:any){
      const resultados1:any = [];
      this.bebidasCalientes.forEach((element:any) => {
        console.log(element);
        const botana = element.orden;
        resultados1.push(botana);
      });
      const resultados = this.contarRepeticionesUnit(resultados1, 'bebidasCalientes');
      this.bebidasCalientes1 = [];
      this.inventarioBebidasCalientes = [];
      obj.forEach((element:any, indice :any) => {
        const index = this.existenBebidasCalientes.findIndex((i:any) => i.product_id === element.orden.id)
        if(this.existenBebidasCalientes[index].cantidad === 0){
        if(index === -1){
          const obj = {id: element.id, existencia: false, orden: element.orden, cantidad: element.cantidad, precio: element.precio, nombre: element.nombre, total: element.total}
          this.bebidasCalientes1.push(obj)
          this.inventarioBebidasCalientes.push([]);
        }else{
          if(this.existenBebidasCalientes[index].existencia === 1){
            const obj = {id: element.id, existencia: true, orden: element.orden, cantidad: element.cantidad, precio: element.precio, nombre: element.nombre, total: element.total}
            this.bebidasCalientes1.push(obj)
            this.inventarioBebidasCalientes.push([]);
          }else if(this.existenBebidasCalientes[index].existencia === 0){
            const obj = {id: element.id, existencia: false, orden: element.orden, cantidad: element.cantidad, precio: element.precio, nombre: element.nombre, total: element.total}
            this.bebidasCalientes1.push(obj)
            this.inventarioBebidasCalientes.push([]);
          }
        }
      }else if(this.existenBebidasCalientes[index].cantidad === 1){
        if(index === -1){
          const obj = {id: element.id, existencia: false, orden: element.orden, cantidad: element.cantidad, precio: element.precio, nombre: element.nombre, total: element.total}
          this.bebidasCalientes1.push(obj)
          this.inventarioBebidasCalientes.push([]);
        }else{
          if(this.existenBebidasCalientes[index].existencia === 1 && (resultados[element.orden.id]) <= this.existenBebidasCalientes[index].inventario){
            const obj = {id: element.id, existencia: true, orden: element.orden, cantidad: element.cantidad, precio: element.precio, nombre: element.nombre, total: element.total}
            this.bebidasCalientes1.push(obj)
            this.inventarioBebidasCalientes.push([]);
          }else if(this.existenBebidasCalientes[index].existencia === 1 && (resultados[element.orden.id]) > this.existenBebidasCalientes[index].inventario){
            if(this.authService.lang() === 'es'){
              const obj = {id: element.id, existencia: false, orden: element.orden, cantidad: element.cantidad, precio: element.precio, nombre: element.nombre, total: element.total}
              const warn = 'No hay suficientes '+ element.orden.bebida + ' para realizar la orden solo quedan '+ this.existenBebidasCalientes[index].inventario + ', por favor elimine almenos ' + ((resultados[element.orden.id]) - this.existenBebidasCalientes[index].inventario) + ' para poder continuar con su compra'
              this.inventarioBebidasCalientes.push([warn])
              this.bebidasCalientes1.push(obj)
            }else if(this.authService.lang() === 'en'){
              const obj = {id: element.id, existencia: false, orden: element.orden, cantidad: element.cantidad, precio: element.precio, nombre: element.nombre, total: element.total}
              const warn = 'There are not enough '+ element.orden.bebida + ' to make the order, there are only '+ this.existenBebidasCalientes[index].inventario + ', please remove at least ' + ((resultados[element.orden.id]) - this.existenBebidasCalientes[index].inventario) + ' to continue with your purchase'
              this.inventarioBebidasCalientes.push([warn])
              this.bebidasCalientes1.push(obj)
            }
          }else if(this.existenBebidasCalientes[index].existencia === 0){
            const obj = {id: element.id, existencia: false, orden: element.orden, cantidad: element.cantidad, precio: element.precio, nombre: element.nombre, total: element.total}
            this.bebidasCalientes1.push(obj)
            this.inventarioBebidasCalientes.push([]);
          }
        }
      }
      })
      this.detectExistBebidasCalientes();
    }

    // Botanas
    existBotanas(obj:any){
      const resultados1:any = [];
      this.botanas.forEach((element:any) => {
        console.log(element);
        const botana = element.orden;
        resultados1.push(botana);
      });
      const resultados = this.contarRepeticionesUnit(resultados1, 'Botanas');
      this.botanas1 = [];
      this.inventarioBotanas = [];
      obj.forEach((element:any, indice: any) => {
        const index = this.existenBotanas.findIndex((i:any) => i.product_id === element.orden.id)
        if(index === -1){
          const obj = {id: element.id, existencia: false, orden: element.orden, cantidad: element.cantidad, precio: element.precio, nombre: element.nombre, total: element.total}
          this.botanas1.push(obj)
          this.inventarioBotanas.push([]);
        }else{
          if(this.existenBotanas[index].cantidad === 0){
          if(this.existenBotanas[index].existencia === 1){
            const obj = {id: element.id, existencia: true, orden: element.orden, cantidad: element.cantidad, precio: element.precio, nombre: element.nombre, total: element.total}
            this.botanas1.push(obj)
            this.inventarioBotanas.push([]);
          }else if(this.existenBotanas[index].existencia === 0){
            const obj = {id: element.id, existencia: false, orden: element.orden, cantidad: element.cantidad, precio: element.precio, nombre: element.nombre, total: element.total}
            this.botanas1.push(obj)
            this.inventarioBotanas.push([]);
          }
        }else if(this.existenBotanas[index].cantidad === 1){
          if(this.existenBotanas[index].existencia === 1 && (resultados[element.orden.id]) <= this.existenBotanas[index].inventario){
            const obj = {id: element.id, existencia: true, orden: element.orden, cantidad: element.cantidad, precio: element.precio, nombre: element.nombre, total: element.total}
            this.botanas1.push(obj)
            this.inventarioBotanas.push([]);
          }else if(this.existenBotanas[index].existencia === 1 && (resultados[element.orden.id]) > this.existenBotanas[index].inventario){
            if(this.authService.lang() === 'es'){
              const obj = {id: element.id, existencia: false, orden: element.orden, cantidad: element.cantidad, precio: element.precio, nombre: element.nombre, total: element.total}
              const warn = 'No hay suficientes '+ element.orden.botana + ' para realizar la orden solo quedan '+ this.existenBotanas[index].inventario + ', por favor elimine almenos ' + ((resultados[element.orden.id]) - this.existenBotanas[index].inventario) + ' para poder continuar con su compra'
              this.inventarioBotanas.push([warn])
              this.botanas1.push(obj)
            }else if(this.authService.lang() === 'en'){
              const obj = {id: element.id, existencia: false, orden: element.orden, cantidad: element.cantidad, precio: element.precio,nombre: element.nombre, total: element.total}
              const warn = 'There are not enough '+ element.orden.botana + ' to make the order, there are only '+ this.existenBotanas[index].inventario + ', please remove at least ' + ((resultados[element.orden.id]) - this.existenBotanas[index].inventario) + ' to continue with your purchase'
              this.inventarioBotanas.push([warn])
              this.botanas1.push(obj)
            }
          }else if(this.existenBotanas[index].existencia === 0){
            const obj = {id: element.id, existencia: false, orden: element.orden, cantidad: element.cantidad, precio: element.precio, nombre: element.nombre, total: element.total} 
            this.botanas1.push(obj)
            this.inventarioBotanas.push([]);
          }
        }
      }
      })
      this.detectExistBotanas();
    }

    // Ensaladas
    existEnsaladas(obj:any){
      const resultados1:any = [];
      this.ensaladasIndividual.forEach((element:any) => {
        console.log(element);
        const botana = element.orden;
        resultados1.push(botana);
      });
      const resultados = this.contarRepeticionesUnit(resultados1, 'Ensaladas');
      this.ensaladasIndividual1 = [];
      this.inventarioEnsaladasIndividual = [];
      obj.forEach((element:any, indice:any) => {
        const index = this.existenEnsaladasIndividual.findIndex((i:any) => i.product_id === element.orden.id)
        console.log(index)
        console.log(this.existenEnsaladasIndividual)
        console.log(element)
        if(index === -1){
          const obj = {id: element.id, existencia: false, orden: element.orden, cantidad: element.cantidad, precio: element.precio, nombre: element.nombre, total: element.total}
          this.ensaladasIndividual1.push(obj)
          this.inventarioEnsaladasIndividual.push([]);
        }else{
          if(this.existenEnsaladasIndividual[index].cantidad === 0){
          if(this.existenEnsaladasIndividual[index].existencia === 1){
            const obj = {id: element.id, existencia: true, orden: element.orden, cantidad: element.cantidad, precio: element.precio, nombre: element.nombre, total: element.total}
            this.ensaladasIndividual1.push(obj)
            this.inventarioEnsaladasIndividual.push([]);
          }else if(this.existenEnsaladasIndividual[index].existencia === 0){
            const obj = {id: element.id, existencia: false, orden: element.orden, cantidad: element.cantidad, precio: element.precio, nombre: element.nombre, total: element.total}
            this.ensaladasIndividual1.push(obj)
            this.inventarioEnsaladasIndividual.push([]);
          }
        }else if(this.existenEnsaladasIndividual[index].cantidad === 1){
          if(this.existenEnsaladasIndividual[index].existencia === 1 && (resultados[element.orden.id]) <= this.existenEnsaladasIndividual[index].inventario){
            const obj = {id: element.id, existencia: true, orden: element.orden, cantidad: element.cantidad, precio: element.precio, nombre: element.nombre, total: element.total} 
            this.ensaladasIndividual1.push(obj)
            this.inventarioEnsaladasIndividual.push([]);
          }else if(this.existenEnsaladasIndividual[index].existencia === 1 && (resultados[element.orden.id]) > this.existenEnsaladasIndividual[index].inventario){
            if(this.authService.lang() === 'es'){
              const obj = {id: element.id, existencia: false, orden: element.orden, cantidad: element.cantidad, precio: element.precio, nombre: element.nombre,total: element.total}
              const warn = 'No hay suficientes '+ element.orden.ensalada + ' para realizar la orden solo quedan '+ this.existenEnsaladasIndividual[index].inventario + ', por favor elimine almenos ' + ((resultados[element.orden.id]) - this.existenEnsaladasIndividual[index].inventario) + ' para poder continuar con su compra'
              this.inventarioEnsaladasIndividual.push([warn])
              this.ensaladasIndividual1.push(obj)
            }else if(this.authService.lang() === 'en'){
              const obj = {id: element.id, existencia: false, orden: element.orden, cantidad: element.cantidad, precio: element.precio,nombre: element.nombre, total: element.total}
              const warn = 'There are not enough '+ element.orden.ensalada + ' to make the order, there are only '+ this.existenEnsaladasIndividual[index].inventario + ', please remove at least ' + ((resultados[element.orden.id]) - this.existenEnsaladasIndividual[index].inventario) + ' to continue with your purchase'
              this.inventarioEnsaladasIndividual.push([warn])
              this.ensaladasIndividual1.push(obj)
            }
          }else if(this.existenEnsaladasIndividual[index].existencia === 0){
            const obj = {id: element.id, existencia: false, orden: element.orden, cantidad: element.cantidad, precio: element.precio,nombre: element.nombre, total: element.total}
            this.ensaladasIndividual1.push(obj)
            this.inventarioEnsaladasIndividual.push([]);
          }
        }
        }
      })
      this.detectExistEnsaladas();
    }

    OrganizarWafflesCanasta(){
      this.existenciasIngUntWaffleCanasta(this.wafflesCanastaIngUnt);
      this.existenciasIngComWaffleCanasta(this.wafflesCanastaIngCom);
      this.existenciasNieveWaffleCanasta(this.wafflesCanastaNieve);
      this.existenciasDecoracionesWaffleCanasta(this.wafflesCanastaDecoraciones);
      this.detectExistIngWaffleCanasta();
    }

    organizarOrdenes(){

      // Crepas Saladas
      console.log(this.grupos);
      if(this.verificarPropiedad(crepasSalada)){
      this.grupos[crepasSalada].forEach((orden: any) => {
        const ingredientes = orden.orden.ingredientes;
        const aderezos = orden.orden.aderesos;
        const ingredientesBase = orden.orden.ingredientes_base;
        const aderezosBase = orden.orden.adereso_base;
        this.crepasSaladas.push(orden);
        this.ingredientesCrepaS.push(ingredientes);
        this.aderesosCrepaS.push(aderezos);
        this.ingredientesBaseCrepaS.push(ingredientesBase);
        this.aderesosBaseCrepaS.push(aderezosBase);
      })
      this.OrganizarCrepasSaladas();
      }

      
      if(this.verificarPropiedad(crepasDulce)){
      this.grupos[crepasDulce].forEach((orden: any) => {
        const ingredientesUntables = orden.orden.ingredientes_unt;
        const ingredientesComplementos = orden.orden.ingredientes_com;
        const nieves = orden.orden.nieve;
        const decoarciones = orden.orden.decoracion;
        this.crepasDulces.push(orden);
        this.nievesCrepaD.push(nieves);
        this.ingredientesComCrepaD.push(ingredientesComplementos);
        this.ingredientesUntCrepaD.push(ingredientesUntables);
        this.decoracionesCrepaD.push(decoarciones)
      });

      this.OrganizarCrepasDulces();
    }

    if(this.verificarPropiedad(bebidasCalientes)){
      this.grupos[bebidasCalientes].forEach((orden: any) => {
        this.bebidasCalientes.push(orden);
      });
      this.existBebidasCalientes(this.bebidasCalientes);    
    }


    if(this.verificarPropiedad(bebidasFrias)){
      this.grupos[bebidasFrias].forEach((orden: any) => {
        this.bebidasFrias.push(orden);
      });

      this.existBebidasFrias(this.bebidasFrias);
    }
      if(this.verificarPropiedad(waffles)){
      this.grupos[waffles].forEach((orden: any) => {
        const ingredientesUntables = orden.orden.ingredientes_unt;
        const ingredientesComplementos = orden.orden.ingredientes_com;
        const nieves = orden.orden.nieve;
        const decoraciones = orden.orden.decoracion;
        this.waffles.push(orden);
        this.wafflesIngUnt.push(ingredientesUntables);
        this.wafflesIngCom.push(ingredientesComplementos);
        this.wafflesNieve.push(nieves);
        this.wafflesDecoraciones.push(decoraciones);
      });

      this.OrganizarWaffles();
    }
    if(this.verificarPropiedad(waffleCanasta)){
      this.grupos[waffleCanasta].forEach((orden: any) => {
        const ingredientesUntables = orden.orden.ingredientes_unt;
        const ingredientesComplementos = orden.orden.ingredientes_com;
        const nieves = orden.orden.nieve;
        const decoraciones = orden.orden.decoracion;
        this.wafflesCanasta.push(orden);
        this.wafflesCanastaIngUnt.push(ingredientesUntables);
        this.wafflesCanastaIngCom.push(ingredientesComplementos);
        this.wafflesCanastaNieve.push(nieves);
        this.wafflesCanastaDecoraciones.push(decoraciones);
      })
      this.OrganizarWafflesCanasta();
    }

    if(this.verificarPropiedad(botanas)){
      this.grupos[botanas].forEach((orden: any) => {
        this.botanas.push(orden);
      })
      this.existBotanas(this.botanas);
    }

    if(this.verificarPropiedad(ensaladas)){
      this.grupos[ensaladas].forEach((orden: any) => {
        this.ensaladasIndividual.push(orden);
      })
      this.existEnsaladas(this.ensaladasIndividual);
    }

    setTimeout(() => {
      this.calcularTotal();
    }, 300);


    }

    verificarPropiedad(nombre:any):any {
      var arr:any = [];
      for (var categoria in this.grupos) {
          arr.push(categoria);
      }
      if(arr.includes(nombre)){
        return true;
      }else{
        return false;
      }
      
  }

  // Eliminar ingredientes crepas saladas

  deleteAdereso(idOrden:any, id:any, id1:any){
    const index1 = this.crepasSaladas.findIndex((i:any) => i.id === id1);
    const long = (this.aderesosCrepaS1[index1].length)+(this.aderesosBaseCrepaS1[index1].length)+(this.ingredientesCrepaS1[index1].length)+(this.ingredientesBaseCrepaS1[index1].length);
    if(long > 1){
      if(idOrden.nombre === crepasSalada){
        const index = idOrden.orden.aderesos.findIndex((i:any) => i.id === id);
        console.log(index);
        idOrden.orden.aderesos.splice(index, 1);
        console.log(idOrden.orden);
        console.log(idOrden.id); 
        const index1 = this.crepasSaladas.findIndex((i:any) => i.id === id1);
        const precio = this.calclularPrecioSalda(idOrden.orden.ingredientes, idOrden.orden.aderesos)
        console.log(this.aderesosCrepaS1[index1]);
        console.log(this.crepasSaladas[index1]);
        const orden:any = {
          cantidad: idOrden.cantidad,
          nombre: idOrden.nombre,
          orden:idOrden.orden,
          precio: precio,
          total: precio*idOrden.cantidad,
         userId: idOrden.userId
        }
        console.log(orden);
        
        this.service.updateOrden(id1, orden).subscribe(
          res => {
            console.log(res);
            this.service.selectOrden(id1).subscribe(
              (res:any) => {
                this.aderesosCrepaS[index1] = [];
                const aderezos:any = [];
                res[0].orden.aderesos.forEach((element:any) => {
                  aderezos.push(element)
                })
                this.crepasSaladas[index1].precio = res[0].precio
                this.crepasSaladas[index1].total = res[0].total
                this.aderesosCrepaS[index1] = aderezos
                  this.existenciasAdCrepaS(this.aderesosCrepaS);
                this.detectExistIngCrepaS();
                this.calcularTotal();
              },
              err => {
                console.log(err)
              }
           ) 
          },
          err => console.log(err)
        )
        }
    }else{
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('La crepa salada debe de tener almenos un ingrediente edita o elimina esta orden para poder completar la compra')
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('The salty crepe must have at least one ingredient, edit or delete this order to be able to complete the purchase')
        }
    }

    

  }

  deletIngrediente(idOrden:any, id:any, id1:any){
    const index1 = this.crepasSaladas.findIndex((i:any) => i.id === id1);
    const long = (this.aderesosCrepaS1[index1].length)+(this.aderesosBaseCrepaS1[index1].length)+(this.ingredientesCrepaS1[index1].length)+(this.ingredientesBaseCrepaS1[index1].length);


    if(long > 1){
    if(idOrden.nombre === crepasSalada){
    const index = idOrden.orden.ingredientes.findIndex((i:any) => i.id === id);
    console.log(index);
    idOrden.orden.ingredientes.splice(index, 1);
    console.log(idOrden.orden);
    console.log(idOrden.id); 
    const index1 = this.crepasSaladas.findIndex((i:any) => i.id === id1);
    const precio = this.calclularPrecioSalda(idOrden.orden.ingredientes, idOrden.orden.aderesos)
    console.log(this.ingredientesCrepaS1[index1]);
    console.log(this.crepasSaladas[index1]);
    const orden:any = {
      cantidad: idOrden.cantidad,
      nombre: idOrden.nombre,
      orden:idOrden.orden,
      precio: precio,
      total: precio*idOrden.cantidad,
     userId: idOrden.userId
    }
    console.log(orden);
    
    this.service.updateOrden(id1, orden).subscribe(
      res => {
        console.log(res);
        this.service.selectOrden(id1).subscribe(
          (res:any) => {
            this.ingredientesCrepaS[index1] = [];
            const ingredientes:any = [];
            res[0].orden.ingredientes.forEach((element:any) => {
              ingredientes.push(element)
            })
            this.crepasSaladas[index1].precio = res[0].precio
            this.crepasSaladas[index1].total = res[0].total
            this.ingredientesCrepaS[index1] = ingredientes
              this.existenciasIngCrepaS(this.ingredientesCrepaS);
            this.detectExistIngCrepaS();
            this.calcularTotal();
          },
          err => {
            console.log(err)
          }
       ) 
      },
      err => console.log(err)
    )
    }
  }else{
    if(this.authService.lang() === 'es'){
      this.alertService.mostrarAlerta('La crepa salada debe de tener almenos un ingrediente edita o elimina esta orden para poder completar la compra')
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('The salty crepe must have at least one ingredient, edit or delete this order to be able to complete the purchase')
      }
  }


  }

  deleteAderesoBase(idOrden:any, id:any, id1:any){
    const index1 = this.crepasSaladas.findIndex((i:any) => i.id === id1);
    const long = (this.aderesosCrepaS1[index1].length)+(this.aderesosBaseCrepaS1[index1].length)+(this.ingredientesCrepaS1[index1].length)+(this.ingredientesBaseCrepaS1[index1].length);


    
    if(long > 1){
    if(idOrden.nombre === crepasSalada){
    const index = idOrden.orden.adereso_base.findIndex((i:any) => i.id === id);
    console.log(index);
    idOrden.orden.adereso_base.splice(index, 1);
    console.log(idOrden.orden);
    console.log(idOrden.id); 
    const index1 = this.crepasSaladas.findIndex((i:any) => i.id === id1);
    console.log(this.aderesosBaseCrepaS1[index1]);
    console.log(this.crepasSaladas[index1]);
    const orden:any = {
      cantidad: idOrden.cantidad,
      nombre: idOrden.nombre,
      orden:idOrden.orden,
      precio: idOrden.precio,
      total: idOrden.total,
     userId: idOrden.userId
    }
    console.log(orden);
    
    this.service.updateOrden(id1, orden).subscribe(
      res => {
        console.log(res);
        this.service.selectOrden(id1).subscribe(
          (res:any) => {
            this.aderesosBaseCrepaS[index1] = [];
            const aderezos:any = [];
            res[0].orden.adereso_base.forEach((element:any) => {
              aderezos.push(element)
            })
            this.crepasSaladas[index1].precio = res[0].precio
            this.crepasSaladas[index1].total = res[0].total
            this.aderesosBaseCrepaS[index1] = aderezos
            this.detectExistIngCrepaS();
              this.existenciasAdBaseCrepaS(this.aderesosBaseCrepaS);
            this.calcularTotal();
          },
          err => {
            console.log(err)
          }
       ) 
      },
      err => console.log(err)
    )
    }}else{
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('La crepa salada debe de tener almenos un ingrediente edita o elimina esta orden para poder completar la compra')
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('The salty crepe must have at least one ingredient, edit or delete this order to be able to complete the purchase')
        }
    }
  }

  deleteIngredienteBase(idOrden:any, id:any, id1:any){
    const index1 = this.crepasSaladas.findIndex((i:any) => i.id === id1);
    const long = (this.aderesosCrepaS1[index1].length)+(this.aderesosBaseCrepaS1[index1].length)+(this.ingredientesCrepaS1[index1].length)+(this.ingredientesBaseCrepaS1[index1].length);

    if(long > 1){
    if(idOrden.nombre === crepasSalada){
    const index = idOrden.orden.ingredientes_base.findIndex((i:any) => i.id === id);
    console.log(index);
    idOrden.orden.ingredientes_base.splice(index, 1);
    console.log(idOrden.orden);
    console.log(idOrden.id); 
    const index1 = this.crepasSaladas.findIndex((i:any) => i.id === id1);
    console.log(this.ingredientesBaseCrepaS1[index1]);
    console.log(this.crepasSaladas[index1]);
    const orden:any = {
      cantidad: idOrden.cantidad,
      nombre: idOrden.nombre,
      orden:idOrden.orden,
      precio: idOrden.precio,
      total: idOrden.total,
     userId: idOrden.userId
    }
    console.log(orden);
    
    this.service.updateOrden(id1, orden).subscribe(
      res => {
        console.log(res);
        this.service.selectOrden(id1).subscribe(
          (res:any) => {
            this.ingredientesBaseCrepaS[index1] = [];
            const ingredientes:any = [];
            res[0].orden.ingredientes_base.forEach((element:any) => {
              ingredientes.push(element)
            })
            this.crepasSaladas[index1].precio = res[0].precio
            this.crepasSaladas[index1].total = res[0].total
            this.ingredientesBaseCrepaS[index1] = ingredientes
              this.existenciasIngBaseCrepaS(this.ingredientesBaseCrepaS);
            this.detectExistIngCrepaS();
            this.calcularTotal();
          },
          err => {
            console.log(err)
          }
       ) 
      },
      err => console.log(err)
    )
    }}else{
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('La crepa salada debe de tener almenos un ingrediente edita o elimina esta orden para poder completar la compra')
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('The salty crepe must have at least one ingredient, edit or delete this order to be able to complete the purchase')
        }
    }
  }

  // Eliminar ingredientes crepas dulces

  deleteIngredienteCom(idOrden:any, id:any, id1:any){
    const index1 = this.crepasDulces.findIndex((i:any) => i.id === id1);
    const long = (this.ingredientesComCrepaD1[index1].length)+(this.ingredientesUntCrepaD1[index1].length);
    if(long > 2){
    if(idOrden.nombre === crepasDulce){
    const index = idOrden.orden.ingredientes_com.findIndex((i:any) => i.id === id.id);
    console.log(index);
    idOrden.orden.ingredientes_com.splice(index, 1);
    console.log(idOrden.orden);
    console.log(idOrden.id); 
    const precio = this.calcularPrecioCrepaDulce(idOrden.orden.ingredientes_unt, idOrden.orden.ingredientes_com,  idOrden.orden.nieve, idOrden.orden.harina.harina, idOrden.orden.decoracion);
    const index1 = this.crepasDulces.findIndex((i:any) => i.id === id1);
    console.log(this.ingredientesComCrepaD1[index1]);
    console.log(this.crepasDulces[index1]);
    const orden:any = {
      cantidad: idOrden.cantidad,
      nombre: idOrden.nombre,
      orden:idOrden.orden,
      precio: precio,
      total: precio*idOrden.cantidad,
     userId: idOrden.userId
    }
    console.log(orden);
    
    this.service.updateOrden(id1, orden).subscribe(
      res => {
        console.log(res);
        this.service.selectOrden(id1).subscribe(
          (res:any) => {

              this.ingredientesComCrepaD[index1] = [];
            
              const ingredientes:any = [];
              res[0].orden.ingredientes_com.forEach((element:any) => {
                ingredientes.push(element)
              })
              this.crepasDulces[index1].precio = res[0].precio
              this.crepasDulces[index1].total = res[0].total
              this.ingredientesComCrepaD[index1] = ingredientes
              this.existenciasIngComCrepaD(this.ingredientesComCrepaD);
            
            this.detectExistIngCrepaD();
            this.calcularTotal();
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )
    }}else{
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('La crepa dulce debe de tener almenos dos ingredientes edita o elimina esta orden para poder completar la compra')
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('The sweet crepe must have at least two ingredients, edit or delete this order to be able to complete the purchase')
        }
    }
  }

  deleteIngredienteUnt(idOrden:any, id:any, id1:any){
    const index1 = this.crepasDulces.findIndex((i:any) => i.id === id1);
    const long = (this.ingredientesComCrepaD1[index1].length)+(this.ingredientesUntCrepaD1[index1].length);
    if(long > 2){
    if(idOrden.nombre === crepasDulce){
    const index = idOrden.orden.ingredientes_unt.findIndex((i:any) => i.id === id);
    console.log(index);
    idOrden.orden.ingredientes_unt.splice(index, 1);
    console.log(idOrden.orden);
    console.log(idOrden.id); 
    const precio = this.calcularPrecioCrepaDulce(idOrden.orden.ingredientes_unt, idOrden.orden.ingredientes_com,  idOrden.orden.nieve, idOrden.orden.harina.harina, idOrden.orden.decoracion);
    const index1 = this.crepasDulces.findIndex((i:any) => i.id === id1);
    console.log(this.ingredientesUntCrepaD1[index1]);
    console.log(this.crepasDulces[index1]);
    const orden:any = {
      cantidad: idOrden.cantidad,
      nombre: idOrden.nombre,
      orden:idOrden.orden,
      precio: precio,
      total: precio*idOrden.cantidad,
     userId: idOrden.userId
    }
    console.log(orden);
    
    this.service.updateOrden(id1, orden).subscribe(
      res => {
        console.log(res);
        this.service.selectOrden(id1).subscribe(
          (res:any) => {
            this.ingredientesUntCrepaD[index1] = [];
            const ingredientes:any = [];
            res[0].orden.ingredientes_unt.forEach((element:any) => {

              ingredientes.push(element)
            }
            )
            this.crepasDulces[index1].precio = res[0].precio
            this.crepasDulces[index1].total = res[0].total
            this.ingredientesUntCrepaD[index1] = ingredientes
              this.existenciasIngUntCrepaD(this.ingredientesUntCrepaD);
            this.detectExistIngCrepaD();
            this.calcularTotal();
          },
          er => console.log(er)
        )
      },
      err => console.log(err)
    )
    }}else{
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('La crepa dulce debe de tener almenos dos ingredientes edita o elimina esta orden para poder completar la compra')
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('The sweet crepe must have at least two ingredients, edit or delete this order to be able to complete the purchase')
        }
    }
  }



  deleteNieve(idOrden:any, id:any, id1:any){
    const index1 = this.crepasDulces.findIndex((i:any) => i.id === id1);
    if(idOrden.nombre === crepasDulce){
    const index = idOrden.orden.nieve.findIndex((i:any) => i.id === id);
    console.log(index);
    idOrden.orden.nieve.splice(index, 1);
    console.log(idOrden.orden);
    console.log(idOrden.id); 
    const precio = this.calcularPrecioCrepaDulce(idOrden.orden.ingredientes_unt, idOrden.orden.ingredientes_com,  idOrden.orden.nieve, idOrden.orden.harina.harina, idOrden.orden.decoracion);
    const index1 = this.crepasDulces.findIndex((i:any) => i.id === id1);
    console.log(this.nievesCrepaD1[index1]);
    console.log(this.crepasDulces[index1]);
    const orden:any = {
      cantidad: idOrden.cantidad,
      nombre: idOrden.nombre,
      orden:idOrden.orden,
      precio: precio,
      total: precio*idOrden.cantidad,
     userId: idOrden.userId
    }
    console.log(orden);
    
    this.service.updateOrden(id1, orden).subscribe(
      res => {
        console.log(res);
        this.service.selectOrden(id1).subscribe(
          (res:any) => {
            this.nievesCrepaD[index1] = [];
            const nieves:any = [];
            res[0].orden.nieve.forEach((element:any) => {
  
              nieves.push(element)

            }
            )
            this.crepasDulces[index1].precio = res[0].precio
            this.crepasDulces[index1].total = res[0].total
            this.nievesCrepaD[index1] = nieves
              this.existenciasNievCrepaD(this.nievesCrepaD);
            this.detectExistIngCrepaD();
            this.calcularTotal();
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )}
  }

  deleteDecoracion(idOrden:any, nombre:any, id1:any){
    if(idOrden.nombre === crepasDulce){
    const index = idOrden.orden.decoracion.findIndex((i:any) => i.nombre === nombre);
    console.log(index);
    idOrden.orden.decoracion.splice(index, 1);
    console.log(idOrden.orden);
    console.log(idOrden.id); 
    const precio = this.calcularPrecioCrepaDulce(idOrden.orden.ingredientes_unt, idOrden.orden.ingredientes_com,  idOrden.orden.nieve, idOrden.orden.harina.harina, idOrden.orden.decoracion);
    const index1 = this.crepasDulces.findIndex((i:any) => i.id === id1);
    console.log(this.nievesCrepaD1[index1]);
    console.log(this.crepasDulces[index1]);
    const orden:any = {
      cantidad: idOrden.cantidad,
      nombre: idOrden.nombre,
      orden:idOrden.orden,
      precio: precio,
      total: precio*idOrden.cantidad,
     userId: idOrden.userId
    }
    console.log(orden);
    
    this.service.updateOrden(id1, orden).subscribe(
      res => {
        console.log(res);
        this.service.selectOrden(id1).subscribe(
          (res:any) => {
            this.decoracionesCrepaD[index1] = [];
            const decoraciones:any = [];
            res[0].orden.decoracion.forEach((element:any) => {
  
              decoraciones.push(element)

            }
            )
            this.crepasDulces[index1].precio = res[0].precio
            this.crepasDulces[index1].total = res[0].total
            this.decoracionesCrepaD[index1] = decoraciones
              this.existenciasDecoracionCrepaD(this.decoracionesCrepaD);
            this.detectExistIngCrepaD();
            this.calcularTotal();
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )}
  }


  deletharinas(){
    if(this.authService.lang() === 'es'){
      this.alertService.mostrarAlerta('Lo sentimos pero la harina no se puede eliminar de una crepa dulce desde el carrito por favor elimina la orden o editala para poder continuar con tu compra')
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('Sorry but the flour cannot be removed from a sweet crepe from the cart please delete the order or edit it to continue with your purchase')
      }
  }

    // Waffle

    deleteIngredienteComWaffle(idOrden:any, id:any, id1:any){
      const index1 = this.waffles.findIndex((i:any) => i.id === id1);
      const long = (this.waffles1IngCom[index1].length)+(this.waffles1IngUnt[index1].length);
      if(long > 2){
      if(idOrden.nombre === waffles){
      const index = idOrden.orden.ingredientes_com.findIndex((i:any) => i.id === id);
      console.log(index);
      idOrden.orden.ingredientes_com.splice(index, 1);
      console.log(idOrden.orden);
      console.log(idOrden.id);
      const index1 = this.waffles.findIndex((i:any) => i.id === id1);
      const precio = this.calcuarPrecioWaffle(idOrden.orden.ingredientes_com, idOrden.orden.ingredientes_unt,  idOrden.orden.nieve,  idOrden.orden.decoracion);
      console.log(this.waffles1IngCom[index1]);
      console.log(this.waffles[index1]);
      const orden:any = {
        cantidad: idOrden.cantidad,
        nombre: idOrden.nombre,
        orden:idOrden.orden,
        precio: precio,
        total: precio*idOrden.cantidad,
       userId: idOrden.userId
      }
      console.log(orden);

      this.service.updateOrden(id1, orden).subscribe(
        res => {
          console.log(res);
          this.service.selectOrden(id1).subscribe(
            (res:any) => {
              this.wafflesIngCom[index1] = [];
              const ingredientes:any = [];
              res[0].orden.ingredientes_com.forEach((element:any) => {
                ingredientes.push(element)
              })
              this.waffles[index1].precio = res[0].precio
              this.waffles[index1].total = res[0].total
              this.wafflesIngCom[index1] = ingredientes
                this.existenciasIngComWaffle(this.wafflesIngCom);
              this.detectExistIngWaffle();
              this.calcularTotal();
            },
            err => console.log(err)
          )
        },
        err => console.log(err)
      )
      }}else{
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('El waffle debe de tener almenos dos ingredientes edita o elimina esta orden para poder completar la compra')
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('The waffle must have at least two ingredients, edit or delete this order to be able to complete the purchase')
          }
      }
  }


  deleteIngredienteUntWaffle(idOrden:any, id:any, id1:any){
    const index1 = this.waffles.findIndex((i:any) => i.id === id1);
    const long = (this.waffles1IngCom[index1].length)+(this.waffles1IngUnt[index1].length);
    if(long > 2){
    if(idOrden.nombre === waffles){
    const index = idOrden.orden.ingredientes_unt.findIndex((i:any) => i.id === id);
    console.log(index);
    idOrden.orden.ingredientes_unt.splice(index, 1);
    console.log(idOrden.orden);
    console.log(idOrden.id);
    const index1 = this.waffles.findIndex((i:any) => i.id === id1);
    const precio = this.calcuarPrecioWaffle(idOrden.orden.ingredientes_com, idOrden.orden.ingredientes_unt,  idOrden.orden.nieve,  idOrden.orden.decoracion);
    console.log(this.wafflesIngUnt[index1]);
    console.log(this.waffles[index1]);
    const orden:any = {
      cantidad: idOrden.cantidad,
      nombre: idOrden.nombre,
      orden:idOrden.orden,
      precio: precio,
      total: precio*idOrden.cantidad,
     userId: idOrden.userId
    }
    console.log(orden);

    this.service.updateOrden(id1, orden).subscribe(
      res => {
        console.log(res);
        this.service.selectOrden(id1).subscribe(
          (res:any) => {
            this.wafflesIngUnt[index1] = [];
            const ingredientes:any = [];
            res[0].orden.ingredientes_unt.forEach((element:any) => {         
                ingredientes.push(element)
            })
            this.waffles[index1].precio = res[0].precio
            this.waffles[index1].total = res[0].total
            this.wafflesIngUnt[index1] = ingredientes
              this.existenciasIngUntWaffle(this.wafflesIngUnt);
            this.detectExistIngWaffle();
            this.calcularTotal();
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )
  }}else{
    if(this.authService.lang() === 'es'){
      this.alertService.mostrarAlerta('El waffle debe de tener almenos dos ingredientes edita o elimina esta orden para poder completar la compra')
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('The waffle must have at least two ingredients, edit or delete this order to be able to complete the purchase')
      }
  }}

  deleteNieveWaffle(idOrden:any, id:any, id1:any){
    const index1 = this.waffles.findIndex((i:any) => i.id === id1);
    if(idOrden.nombre === waffles){
    const index = idOrden.orden.nieve.findIndex((i:any) => i.id === id);
    console.log(index);
    idOrden.orden.nieve.splice(index, 1);
    console.log(idOrden.orden);
    console.log(idOrden.id);
    const index1 = this.waffles.findIndex((i:any) => i.id === id1);
    const precio = this.calcuarPrecioWaffle(idOrden.orden.ingredientes_com, idOrden.orden.ingredientes_unt,  idOrden.orden.nieve,  idOrden.orden.decoracion);
    console.log(this.waffles1Nieve[index1]);
    console.log(this.waffles[index1]);
    const orden:any = {
      cantidad: idOrden.cantidad,
      nombre: idOrden.nombre,
      orden:idOrden.orden,
      precio: precio,
      total: precio*idOrden.cantidad,
     userId: idOrden.userId
    }
    console.log(orden);

    this.service.updateOrden(id1, orden).subscribe(
      res => {
        console.log(res);
        this.service.selectOrden(id1).subscribe(
          (res:any) => {
            this.wafflesNieve[index1] = [];
            const nieves:any = [];
            res[0].orden.nieve.forEach((element:any) => {
                nieves.push(element)
            }
            )
            this.waffles[index1].precio = res[0].precio
            this.waffles[index1].total = res[0].total
            this.wafflesNieve[index1] = nieves
              this.existenciasNieveWaffle(this.wafflesNieve);
            this.detectExistIngWaffle();
            this.calcularTotal();
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )}

  }

  deleteDecoracionWaffle(idOrden:any, nombre:any, id1:any){
    if(idOrden.nombre === waffles){
    const index = idOrden.orden.decoracion.findIndex((i:any) => i.nombre === nombre);
    console.log(index);
    idOrden.orden.decoracion.splice(index, 1);
    console.log(idOrden.orden);
    console.log(idOrden.id);
    const index1 = this.waffles.findIndex((i:any) => i.id === id1);
    const precio = this.calcuarPrecioWaffle(idOrden.orden.ingredientes_com, idOrden.orden.ingredientes_unt,  idOrden.orden.nieve,  idOrden.orden.decoracion);
    console.log(this.waffles1Decoraciones[index1]);
    console.log(this.waffles[index1]);
    const orden:any = {
      cantidad: idOrden.cantidad,
      nombre: idOrden.nombre,
      orden:idOrden.orden,
      precio: precio,
      total: precio*idOrden.cantidad,
     userId: idOrden.userId
    }
    console.log(orden);

    this.service.updateOrden(id1, orden).subscribe(
      res => {
        console.log(res);
        this.service.selectOrden(id1).subscribe(
          (res:any) => {
            this.wafflesDecoraciones[index1] = [];
            const decoracions:any = [];
            res[0].orden.decoracion.forEach((element:any) => {
                decoracions.push(element)
            }
            )
            this.waffles[index1].precio = res[0].precio
            this.waffles[index1].total = res[0].total
            this.wafflesDecoraciones[index1] = decoracions
              this.existenciasDecoracionWaffle(this.wafflesDecoraciones);
            this.detectExistIngWaffle();
            this.calcularTotal();
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )}

  }

      // Waffle Canasta

    deleteIngredienteComWaffleCanasta(idOrden:any, id:any, id1:any){
      const index1 = this.wafflesCanasta.findIndex((i:any) => i.id === id1);
      const long = (this.wafflesCanasta1IngCom[index1].length)+(this.wafflesCanasta1IngUnt[index1].length);
      if(long > 2){
      if(idOrden.nombre === waffleCanasta){
      const index = idOrden.orden.ingredientes_com.findIndex((i:any) => i.id === id);
      console.log(index);
      idOrden.orden.ingredientes_com.splice(index, 1);
      console.log(idOrden.orden);
      console.log(idOrden.id);
      const index1 = this.wafflesCanasta.findIndex((i:any) => i.id === id1);
      const precio = this.calcuarPrecioWaffleCanasta(idOrden.orden.ingredientes_com, idOrden.orden.ingredientes_unt, idOrden.orden.decoracion);
      console.log(this.wafflesCanasta1IngCom[index1]);
      console.log(this.wafflesCanasta[index1]);
      const orden:any = {
        cantidad: idOrden.cantidad,
        nombre: idOrden.nombre,
        orden:idOrden.orden,
        precio: precio,
        total: precio*idOrden.cantidad,
       userId: idOrden.userId
      }
      console.log(orden);

      this.service.updateOrden(id1, orden).subscribe(
        res => {
          console.log(res);
          this.service.selectOrden(id1).subscribe(
            (res:any) => {
              this.wafflesCanastaIngCom[index1] = [];
              const ingredientes:any = [];
              res[0].orden.ingredientes_com.forEach((element:any) => {
                ingredientes.push(element)
              })
              this.wafflesCanasta[index1].precio = res[0].precio
              this.wafflesCanasta[index1].total = res[0].total
              this.wafflesCanastaIngCom[index1] = ingredientes
                this.existenciasIngComWaffleCanasta(this.wafflesCanastaIngCom);
              this.detectExistIngWaffleCanasta();
              this.calcularTotal();
            },
            err => console.log(err)
          )
        },
        err => console.log(err)
      )
      }}else{
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('El waffle debe de tener almenos dos ingredientes edita o elimina esta orden para poder completar la compra')
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('The waffle must have at least two ingredients, edit or delete this order to be able to complete the purchase')
          }
      }
  }


  deleteIngredienteUntWaffleCanasta(idOrden:any, id:any, id1:any){
    const index1 = this.wafflesCanasta.findIndex((i:any) => i.id === id1);
    const long = (this.wafflesCanasta1IngCom[index1].length)+(this.wafflesCanasta1IngUnt[index1].length);
    if(long > 2){
    if(idOrden.nombre === waffleCanasta){
    const index = idOrden.orden.ingredientes_unt.findIndex((i:any) => i.id === id);
    console.log(index);
    idOrden.orden.ingredientes_unt.splice(index, 1);
    console.log(idOrden.orden);
    console.log(idOrden.id);
    const index1 = this.wafflesCanasta.findIndex((i:any) => i.id === id1);
    const precio = this.calcuarPrecioWaffleCanasta(idOrden.orden.ingredientes_com, idOrden.orden.ingredientes_unt, idOrden.orden.decoracion);
    console.log(this.wafflesCanasta1IngUnt[index1]);
    console.log(this.wafflesCanasta[index1]);
    const orden:any = {
      cantidad: idOrden.cantidad,
      nombre: idOrden.nombre,
      orden:idOrden.orden,
      precio: precio,
      total: precio*idOrden.cantidad,
     userId: idOrden.userId
    }
    console.log(orden);

    this.service.updateOrden(id1, orden).subscribe(
      res => {
        console.log(res);
        this.service.selectOrden(id1).subscribe(
          (res:any) => {
            this.wafflesCanastaIngUnt[index1] = [];
            const ingredientes:any = [];
            res[0].orden.ingredientes_unt.forEach((element:any) => {
                ingredientes.push(element)
            })
            this.wafflesCanasta[index1].precio = res[0].precio
            this.wafflesCanasta[index1].total = res[0].total
            this.wafflesCanastaIngUnt[index1] = ingredientes
              this.existenciasIngUntWaffleCanasta(this.wafflesCanastaIngUnt);
            this.detectExistIngWaffleCanasta();
            this.calcularTotal();
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )
  }}else{
    if(this.authService.lang() === 'es'){
      this.alertService.mostrarAlerta('El waffle debe de tener almenos dos ingredientes edita o elimina esta orden para poder completar la compra')
      }else if(this.authService.lang() === 'en'){
        this.alertService.mostrarAlerta('The waffle must have at least two ingredients, edit or delete this order to be able to complete the purchase')
      }
  }}

  deleteNieveWaffleCanasta(idOrden:any, id:any, id1:any){
    if(idOrden.nombre === waffleCanasta){
    const index = idOrden.orden.nieve.findIndex((i:any) => i.id === id);
    console.log(index);
    idOrden.orden.nieve.splice(index, 1);
    console.log(idOrden.orden);
    console.log(idOrden.id);
    const index1 = this.wafflesCanasta.findIndex((i:any) => i.id === id1);
    const precio = this.calcuarPrecioWaffleCanasta(idOrden.orden.ingredientes_com, idOrden.orden.ingredientes_unt, idOrden.orden.decoracion);
    console.log(this.wafflesCanasta1Nieve[index1]);
    console.log(this.wafflesCanasta[index1]);
    const orden:any = {
      cantidad: idOrden.cantidad,
      nombre: idOrden.nombre,
      orden:idOrden.orden,
      precio: precio,
      total: precio*idOrden.cantidad,
     userId: idOrden.userId
    }
    console.log(orden);

    this.service.updateOrden(id1, orden).subscribe(
      res => {
        console.log(res);
        this.service.selectOrden(id1).subscribe(
          (res:any) => {
            this.wafflesCanastaNieve[index1] = [];
            const nieves:any = [];
            res[0].orden.nieve.forEach((element:any) => {
                nieves.push(element)
            }
            )
            this.wafflesCanasta[index1].precio = res[0].precio
            this.wafflesCanasta[index1].total = res[0].total
            this.wafflesCanastaNieve[index1] = nieves
              this.existenciasNieveWaffleCanasta(this.wafflesCanastaNieve);
            this.detectExistIngWaffleCanasta();
            this.calcularTotal();
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )}

  }

  deleteDecoracionWaffleCanasta(idOrden:any, nombre:any, id1:any){
    if(idOrden.nombre === waffleCanasta){
    const index = idOrden.orden.decoracion.findIndex((i:any) => i.nombre === nombre);
    console.log(index);
    idOrden.orden.decoracion.splice(index, 1);
    console.log(idOrden.orden);
    console.log(idOrden.id);
    const index1 = this.wafflesCanasta.findIndex((i:any) => i.id === id1);
    const precio = this.calcuarPrecioWaffleCanasta(idOrden.orden.ingredientes_com, idOrden.orden.ingredientes_unt, idOrden.orden.decoracion);
    console.log(this.wafflesCanasta1Decoraciones[index1]);
    console.log(this.wafflesCanasta[index1]);
    const orden:any = {
      cantidad: idOrden.cantidad,
      nombre: idOrden.nombre,
      orden:idOrden.orden,
      precio: precio,
      total: precio*idOrden.cantidad,
     userId: idOrden.userId
    }
    console.log(orden);

    this.service.updateOrden(id1, orden).subscribe(
      res => {
        console.log(res);
        this.service.selectOrden(id1).subscribe(
          (res:any) => {
            this.wafflesCanastaDecoraciones[index1] = [];
            const decoracions:any = [];
            res[0].orden.decoracion.forEach((element:any) => {
                decoracions.push(element)
            }
            )
            this.wafflesCanasta[index1].precio = res[0].precio
            this.wafflesCanasta[index1].total = res[0].total
            this.wafflesCanastaDecoraciones[index1] = decoracions
              this.existenciasDecoracionesWaffleCanasta(this.wafflesCanastaDecoraciones);
            this.detectExistIngWaffleCanasta();
            this.calcularTotal();
          },
          err => console.log(err)
        )
      },
      err => console.log(err)
    )}

  }



  // Existencias Waffles

  detectExistIngWaffle(){
    const i:any = [];
      this.waffles1IngUnt.forEach((element:any) => {
        if(element.length === 0){
          i.push([0])
        }else if (element.length > 0){
          var e:any = 0;
          element.forEach((elemento:any) => {
            if(elemento.existencia === true){
   
            }else if(elemento.existencia === false){
              e ++;
            }
          })
          i.push([e]);
        }
      })
      const r:any = [];
      i.forEach((element:any) => {
        if(element[0] === 0){
          r.push(false)
        }else if(element[0] > 0){
          r.push(true)
        }
      })
      console.log('-----Ingredientes Untables-----')
      console.log(r)

      const i1:any = [];
      this.waffles1IngCom.forEach((element:any) => {
        if(element.length === 0){
          i1.push([0])
        }else if (element.length > 0){
          var e:any = 0;
          element.forEach((elemento:any) => {
            if(elemento.existencia === true){
   
            }else if(elemento.existencia === false){
              e ++;
            }
          })
          i1.push([e]);
        }
      })
      const r1:any = [];
      i1.forEach((element:any) => {
        if(element[0] === 0){
          r1.push(false)
        }else if(element[0] > 0){
          r1.push(true)
        }
      })
      console.log('-----Ingredientes Complementos-----')
      console.log(r1)

      const i2:any = [];
      this.waffles1Nieve.forEach((element:any) => {
        if(element.length === 0){
          i2.push([0])
        }else if (element.length > 0){
          var e:any = 0;
          element.forEach((elemento:any) => {
            if(elemento.existencia === true){
   
            }else if(elemento.existencia === false){
              e ++;
            }
          })
          i2.push([e]);
        }
      })
      const r2:any = [];
      i2.forEach((element:any) => {
        if(element[0] === 0){
          r2.push(false)
        }else if(element[0] > 0){
          r2.push(true)
        }
      })
      console.log('-----Nieves-----')
      console.log(r2)

      const i3:any = [];
      this.waffles1Decoraciones.forEach((element:any) => {
        if(element.length === 0){
          i3.push([0])
        }else if (element.length > 0){
          var e:any = 0;
          element.forEach((elemento:any) => {
            if(elemento.existencia === true){
   
            }else if(elemento.existencia === false){
              e ++;
            }
          })
          i3.push([e]);
        }
      })
      const r3:any = [];
      i3.forEach((element:any) => {
        if(element[0] === 0){
          r3.push(false)
        }else if(element[0] > 0){
          r3.push(true)
        }

      })
      console.log('---------decoraciones---------')
      console.log(r3)

      const mergedArray = r.map((value:any, index:any) => {
        return value || r1[index] || r2[index] || r3[index];
      });

      console.log(mergedArray);

      this.wafflesWarning = mergedArray;
  }

 // Existencias Crepas Dulces

  detectExistIngCrepaD(){
    const i:any = [];
      this.ingredientesComCrepaD1.forEach((element:any) => {
        if(element.length === 0){
          i.push([0])
        }else if (element.length > 0){
          var e:any = 0;
          element.forEach((elemento:any) => {
            if(elemento.existencia === true){
   
            }else if(elemento.existencia === false){
              e ++;
            }
          })
          i.push([e]);
        }
      })
      const r:any = [];
      i.forEach((element:any) => {
        if(element[0] === 0){
          r.push(false)
        }else if(element[0] > 0){
          r.push(true)
        }
      })
      console.log('-----Ingredientes-----')
      console.log(r)   

    const i1:any = [];
      this.ingredientesUntCrepaD1.forEach((element:any) => {
        if(element.length === 0){
          i1.push([0])
        }else if (element.length > 0){
          var e:any = 0;
          element.forEach((elemento:any) => {
            if(elemento.existencia === true){
   
            }else if(elemento.existencia === false){
              e ++;
            }
          })
          i1.push([e]);
        }
      })
      const r1:any = [];
      i1.forEach((element:any) => {
        if(element[0] === 0){
          r1.push(false)
        }else if(element[0] > 0){
          r1.push(true)
        }
      })
      console.log('---------Untables---------')
      console.log(r1)   

      const i2:any = [];
      this.nievesCrepaD1.forEach((element:any) => {
        if(element.length === 0){
          i2.push([0])
        }else if (element.length > 0){
          var e:any = 0;
          element.forEach((elemento:any) => {
            if(elemento.existencia === true){
   
            }else if(elemento.existencia === false){
              e ++;
            }
          })
          i2.push([e]);
        }
      })
      const r2:any = [];
      i2.forEach((element:any) => {
        if(element[0] === 0){
          r2.push(false)
        }else if(element[0] > 0){
          r2.push(true)
        }

      })
      console.log('---------Nieves---------')
      console.log(r2)

      const i4:any = [];
      this.decoracionesCrepaD1.forEach((element:any) => {
        if(element.length === 0){
          i4.push([0])
        }else if (element.length > 0){
          var e:any = 0;
          element.forEach((elemento:any) => {
            if(elemento.existencia === true){
   
            }else if(elemento.existencia === false){
              e ++;
            }
          })
          i4.push([e]);
        }
      })
      const r4:any = [];
      i4.forEach((element:any) => {
        if(element[0] === 0){
          r4.push(false)
        }else if(element[0] > 0){
          r4.push(true)
        }

      })
      console.log('---------decoraciones---------')
      console.log(r4)

      const i3:any = [];
      this.crepasDulces.forEach((element:any) => {
        if(Object.keys(element.orden.harina).length === 0){
          i3.push([0])
        }else if (Object.keys(element.orden.harina).length > 0){
          var e:any = 0;
            if(element.orden.harina.existencia === true){
   
            }else if(element.orden.harina.existencia === false){
              e ++;
            }

          i3.push([e]);
        }
      })
      const r3:any = [];
      i3.forEach((element:any) => {
        if(element[0] === 0){
          r3.push(false)
        }else if(element[0] > 0){
          r3.push(true)
        }
      })
      console.log('---------Harinas---------')
      console.log(r3)

      const mergedArray = r.map((value:any, index:any) => {
        return value || r1[index] || r2[index] || r3[index] || r4[index];
      });

      console.log(mergedArray);

      this.dulcesWarning = mergedArray;
        

  }

  // Existencias Crepas Saladas

  detectExistIngCrepaS(){       
    const i:any = [];
      this.ingredientesCrepaS1.forEach((element:any) => {
        if(element.length === 0){
          i.push([0])
        }else if (element.length > 0){
          var e:any = 0;
          element.forEach((elemento:any) => {
            if(elemento.existencia === true){
   
            }else if(elemento.existencia === false){
              e ++;
            }
          })
          i.push([e]);
        }
      })
      const r:any = [];
      i.forEach((element:any) => {
        if(element[0] === 0){
          r.push(false)
        }else if(element[0] > 0){
          r.push(true)
        }
      })
      console.log('-----Ingredientes-----')
      console.log(r)   

    const i1:any = [];
      this.aderesosCrepaS1.forEach((element:any) => {
        if(element.length === 0){
          i1.push([0])
        }else if (element.length > 0){
          var e:any = 0;
          element.forEach((elemento:any) => {
            if(elemento.existencia === true){
   
            }else if(elemento.existencia === false){
              e ++;
            }
          })
          i1.push([e]);
        }
      })
      const r1:any = [];
      i1.forEach((element:any) => {
        if(element[0] === 0){
          r1.push(false)
        }else if(element[0] > 0){
          r1.push(true)
        }
      })
      console.log('---------aderesos---------')
      console.log(r1)   

      const i2:any = [];
      this.ingredientesBaseCrepaS1.forEach((element:any) => {
        if(element.length === 0){
          i2.push([0])
        }else if (element.length > 0){
          var e:any = 0;
          element.forEach((elemento:any) => {
            if(elemento.existencia === true){
   
            }else if(elemento.existencia === false){
              e ++;
            }
          })
          i2.push([e]);
        }
      })
      const r2:any = [];
      i2.forEach((element:any) => {
        if(element[0] === 0){
          r2.push(false)
        }else if(element[0] > 0){
          r2.push(true)
        }
      })
      console.log('---------Ingredientes Base---------')
      console.log(r2)   

      const i3:any = [];
      this.aderesosBaseCrepaS1.forEach((element:any) => {
        if(element.length === 0){
          i3.push([0])
        }else if (element.length > 0){
          var e:any = 0;
          element.forEach((elemento:any) => {
            if(elemento.existencia === true){
   
            }else if(elemento.existencia === false){
              e ++;
            }
          })
          i3.push([e]);
        }
      })
      const r3:any = []
      i3.forEach((element:any) => {
        if(element[0] === 0){
          r3.push(false)
        }else if(element[0] > 0){
          r3.push(true)
        }
      })
      console.log('---------aderesos Base---------')
      console.log(r3)
      const mergedArray = r.map((value:any, index:any) => {
        return value || r1[index] || r2[index] || r3[index];
      });

      console.log(mergedArray);

      this.saladasWarning = mergedArray;
  }

  // Existencias Waffle Canasta

  detectExistIngWaffleCanasta(){
    const i:any = [];
      this.wafflesCanasta1IngCom.forEach((element:any) => {
        if(element.length === 0){
          i.push([0])
        }else if (element.length > 0){
          var e:any = 0;
          element.forEach((elemento:any) => {
            if(elemento.existencia === true){

            }else if(elemento.existencia === false){
              e ++;
            }
          })
          i.push([e]);
        }
      })
      const r:any = [];
      i.forEach((element:any) => {
        if(element[0] === 0){
          r.push(false)
        }else if(element[0] > 0){
          r.push(true)
        }
      })
      console.log('-----Ingredientes Complementarios-----')
      console.log(r)

      const i1:any = [];
      this.wafflesCanasta1IngUnt.forEach((element:any) => {
        if(element.length === 0){
          i1.push([0])
        }else if (element.length > 0){
          var e:any = 0;
          element.forEach((elemento:any) => {
            if(elemento.existencia === true){

            }else if(elemento.existencia === false){
              e ++;
            }
          })
          i1.push([e]);
        }
      })
      const r1:any = [];
      i1.forEach((element:any) => {
        if(element[0] === 0){
          r1.push(false)
        }else if(element[0] > 0){
          r1.push(true)
        }
      })
      console.log('-----Ingredientes Untables-----')
      console.log(r1)

      const i2:any = [];
      this.wafflesCanasta1Nieve.forEach((element:any) => {
        if(element.length === 0){
          i2.push([0])
        }else if (element.length > 0){
          var e:any = 0;
          element.forEach((elemento:any) => {
            if(elemento.existencia === true){

            }else if(elemento.existencia === false){
              e ++;
            }
          })
          i2.push([e]);
        }
      })
      const r2:any = [];
      i2.forEach((element:any) => {
        if(element[0] === 0){
          r2.push(false)
        }else if(element[0] > 0){
          r2.push(true)
        }
      })
      console.log('-----Nieves-----')
      console.log(r2)

      const i3:any = [];
      this.wafflesCanasta1Decoraciones.forEach((element:any) => {
        if(element.length === 0){
          i3.push([0])
        }else if (element.length > 0){
          var e:any = 0;
          element.forEach((elemento:any) => {
            if(elemento.existencia === true){
   
            }else if(elemento.existencia === false){
              e ++;
            }
          })
          i3.push([e]);
        }
      })
      const r3:any = [];
      i3.forEach((element:any) => {
        if(element[0] === 0){
          r3.push(false)
        }else if(element[0] > 0){
          r3.push(true)
        }

      })
      console.log('---------decoraciones---------')
      console.log(r3)

      const mergedArray = r.map((value:any, index:any) => {
        return value || r1[index] || r2[index] || r3[index];
      });

      console.log(mergedArray);

      this.wafflesCanastaWarning = mergedArray;
  }


  // Existencias Bebidas Frias
  detectExistBebidasFrias(){  
    var i:any = 0;
    this.bebidasFrias1.forEach((element:any) => {
      if(element.existencia === true){
        
      }else if(element.existencia === false){
        i ++
      }
    })
    if(i === 0){
      this.bebidasFriasWarning = false;
    }else{
      this.bebidasFriasWarning = true;
    }

    console.log(this.bebidasFriasWarning)
  }

  // Existencias Bebidas Calientes

  detectExistBebidasCalientes(){
    var i:any = 0;
    this.bebidasCalientes1.forEach((element:any) => {
      if(element.existencia === true){
        
      }else if(element.existencia === false){
        i ++
      }
    })
    if(i === 0){
      this.bebidasCalientesWarning = false;
    }else{
      this.bebidasCalientesWarning = true;
    }

    console.log(this.bebidasCalientesWarning)
  }

  // Existencias Ensaladas
  detectExistEnsaladas(){
    var i:any = 0;
    this.ensaladasIndividual1.forEach((element:any) => {
      if(element.existencia === true){
        
      }else if(element.existencia === false){
        i ++
      }
    })
    if(i === 0){
      this.ensaladasWarning = false;
    }else{
      this.ensaladasWarning = true;
    }

    console.log(this.ensaladasWarning)
  }

  // Existencias Botanas

  detectExistBotanas(){
    var i:any = 0;
    this.botanas1.forEach((element:any) => {
      if(element.existencia === true){
        
      }else if(element.existencia === false){
        i ++
      }
    })
    if(i === 0){
      this.botanasWarning = false;
    }else{
      this.botanasWarning = true;
    }

    console.log(this.botanasWarning)
  }

  calclularPrecioSalda(aderesos:any, ingredientes:any){
    const long = (aderesos.length)+(ingredientes.length);
    const extra = (long)*(this.precioExtraCrepaSalada[0]);
    const precio = (this.precioRegularCrepaSalada[0])+(extra);
    return precio;
  }
    

  calcularPrecioCrepaDulce(ingredientes_unt:any, ingredientes_com:any, nieve:any, harina: any, decoracion: any){
    const long = ingredientes_unt.length + ingredientes_com.length
    const longDec = decoracion.length   
    console.log('Decoracion: lon' + longDec)
    console.log(this.precioRegularCrepaDulce[0], this.precioExtraCrepaDulce[0], this.precioNieveCrepaDulce[0], this.precioDecoracionCrepaDulce[0]);
  if(longDec < 2){
    if(long > 1){
    if (harina === sabor){
     const precio = this.precioRegularCrepaDulce[0] + this.precioExtraCrepaDulce[0]*(long - 2) + this.precioNieveCrepaDulce[0]*(nieve.length); 
      return precio    
     }else if(harina !== sabor){
      const precio = this.precioRegularCrepaDulce[0] + this.precioExtraCrepaDulce[0]*(long -2 + 1) + this.precioNieveCrepaDulce[0]*(nieve.length); 
      return precio
     }
    }else{
      if(harina === sabor){
        const precio = this.precioRegularCrepaDulce[0] + this.precioNieveCrepaDulce[0]*(nieve.length); 
        return precio
      }else if(harina !== sabor){
        const precio = this.precioRegularCrepaDulce[0] + this.precioExtraCrepaDulce[0] + this.precioNieveCrepaDulce[0]*(nieve.length); 
        return precio
      }
  
    }
  }else if(longDec > 1){
    if(long > 1){
      if (harina === sabor){
    
        const precio = this.precioRegularCrepaDulce[0] + this.precioExtraCrepaDulce[0]*(long - 2) + this.precioNieveCrepaDulce[0]*(nieve.length); 
        return precio + (this.precioDecoracionCrepaDulce[0]*(longDec - 1))    
       }else if(harina !== sabor){
        const precio = this.precioRegularCrepaDulce[0] + this.precioExtraCrepaDulce[0]*(long -2 + 1) + this.precioNieveCrepaDulce[0]*(nieve.length); 
              return precio + (this.precioDecoracionCrepaDulce[0]*(longDec - 1))  
       }
      }else{
        if(harina === sabor){
          return this.precioRegularCrepaDulce[0] + this.precioNieveCrepaDulce[0]*(nieve.length) + (this.precioDecoracionCrepaDulce[0]*(longDec - 1))  ; 
        }else if(harina !== sabor){
          return this.precioRegularCrepaDulce[0] + this.precioExtraCrepaDulce[0] + this.precioNieveCrepaDulce[0]*(nieve.length) + (this.precioDecoracionCrepaDulce[0]*(longDec - 1)); 
        }
    
      }
  }
  }

  calcuarPrecioWaffle(ingredientes_com:any, ingredientes_unt:any, nieve:any, decoracion: any){

    const long = ingredientes_unt.length + ingredientes_com.length
    const longDec = decoracion.length
    if(long > 1){
      if(longDec < 2){
       const precio = this.precioRegularWaffle[0] + this.precioExtraWaffle[0]*(long - 2) + this.precioNieveWaffle[0]*nieve.length; 
      return precio         
      }else if(longDec > 1){
        const precio = this.precioRegularWaffle[0] + this.precioExtraWaffle[0]*(long - 2) + this.precioNieveWaffle[0]*nieve.length; 
        return precio + (this.precioDecoracionWaffle[0]*(longDec - 1 ))   
      }
       
    }else{  
      if(longDec < 2){        
      return this.precioRegularWaffle[0];
      }else if(longDec > 1){
      const precio = this.precioRegularWaffle[0] + (this.precioDecoracionWaffle[0]*(longDec - 1 )) ;
      return precio
      }
    }
  }

    calcuarPrecioWaffleCanasta(ingredientes_com:any, ingredientes_unt:any, decoracion:any){
      const long = ingredientes_unt.length + ingredientes_com.length
      const longDec = decoracion.length
      if(longDec < 2){
      if(long > 0){
        const precio = this.precioRegularWaffleCanasta[0] + this.precioExtraWaffleCanasta[0]*(long - 1);
        return precio
      }else{      
        const precio = this.precioRegularWaffleCanasta[0];
        return precio
      }
    }else if(longDec > 1){
      if(long > 0){
        const precio = this.precioRegularWaffleCanasta[0] + this.precioExtraWaffleCanasta[0]*(long - 1);
       return precio + (this.precioDecoracionWaffleCanasta[0]*(longDec - 1 )) 
  }else{      
      const precio = this.precioRegularWaffleCanasta[0] + (this.precioDecoracionWaffleCanasta[0]*(longDec - 1 )) ;
      return precio
  }
    }  
  }  

  comprar(){
    this.grupos = [];
    this.ordenes = [];
    this.saladasWarning = [];
    this.dulcesWarning = [];
    this.wafflesWarning = [];
    this.wafflesCanastaWarning = [];
    this.bebidasFriasWarning = [];
    this.bebidasCalientesWarning = [];
    this.ensaladasWarning = [];
    this.botanasWarning = [];

    // Crepa Dulce 
    this.crepasDulces = [];
    this.ingredientesComCrepaD = [];
    this.ingredientesComCrepaD1 = [];
    this.ingredientesUntCrepaD = [];
    this.ingredientesUntCrepaD1 = [];
    this.nievesCrepaD = [];
    this.nievesCrepaD1 = [];



    // Crepa Salada
    this.crepasSaladas = [];
    this.ingredientesCrepaS = [];
    this.ingredientesCrepaS1 = [];

    this.aderesosCrepaS = [];
    this.aderesosCrepaS1 = [];
    this.ingredientesBaseCrepaS = [];
    this.ingredientesBaseCrepaS1 = [];
    this.aderesosBaseCrepaS = [];
    this.aderesosBaseCrepaS1 = [];

    // Waffles
    this.waffles = [];
    this.wafflesIngUnt = [];
    this.waffles1IngUnt = [];
    this.wafflesIngCom = [];
    this.waffles1IngCom = [];
    this.wafflesNieve = [];
    this.waffles1Nieve = [];

    // Waffles Canasta
    this.wafflesCanasta = [];
    this.wafflesCanastaIngUnt = [];
    this.wafflesCanasta1IngUnt = [];

    this.wafflesCanastaIngCom = [];
    this.wafflesCanasta1IngCom = [];
    this.wafflesCanastaNieve = [];
    this.wafflesCanasta1Nieve = [];


    // Bebidas Calientes
    this.bebidasCalientes = [];
    this.bebidasCalientes1 = [];


    // Bebidas Frias
    this.bebidasFrias = [];
    this.bebidasFrias1 = [];


    // Botanas
    this.botanas = [];
    this.botanas1 = [];
    // Ensalada Indivudual
    this.ensaladasIndividual = [];
    this.ensaladasIndividual1 = [];
    this.stock();
    setTimeout(() => {
      console.log(this.saladasWarning);
    console.log(this.dulcesWarning);
    console.log(this.wafflesWarning);
    console.log(this.wafflesCanastaWarning);
    console.log(this.bebidasFriasWarning);
    console.log(this.bebidasCalientesWarning);
    console.log(this.ensaladasWarning);
    console.log(this.botanasWarning);
    const array = [];
    array.push(this.saladasWarning);
    array.push(this.dulcesWarning);
    array.push(this.wafflesWarning);
    array.push(this.wafflesCanastaWarning);
    array.push([this.bebidasFriasWarning]);
    array.push([this.bebidasCalientesWarning]);
    array.push([this.ensaladasWarning]);
    array.push([this.botanasWarning]);
    console.log(array);

    const result = this.verificarAlMenosUnTrueEnArrays(array);
    console.log(result);
    if(result === true){
      if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('No se puede completar la compra, revisa tu carrito de compra')
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('The purchase cannot be completed, check your shopping cart')
        }

    }else if(result === false){
      const date = new Date();
      const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
      this.ventas.sales(this.ordenes, dateString, this.mesa).subscribe((res:any) => {
        console.log(res);      
        if(this.authService.lang() === 'es'){
          this.alertService.mostrarAlerta('Compra realizada con exito')
          }else if(this.authService.lang() === 'en'){
            this.alertService.mostrarAlerta('Purchase made successfully')
          }
        this.service.getFactura(res.id).subscribe((res:any) => {
          this.invoice = res;
          let body = document.createElement('body');
          let div = document.createElement('div');
      
          div.classList.add('tabla-container');
          body.innerHTML = `
      <style>
      .tabla-container {
      padding-bottom: 40px;
      }
      .tabla-container table {
      width: 900px;
      }
      
      .tabla-container th,
      .tabla-container td {
      
        text-align: inherit;
        width: 5%;
      }
      .tabla-container li {
        list-style: none;
      
      }
      
      ul{
        margin: 0px;
        padding: 0px;
      }
      
      .tabla-container a {
        text-decoration: none;
      }
      
      .total{
        border-radius: 10px;
        height: 50px;
        width: 870px;
      }
      
      .totalCant p{
        display: block;
        float: right;
        height: 50px;
        width: 10%;
        padding: 0px;
        padding-top: 12px;
        padding-left: 165px;
      }
      
      .one{
        width: 1000px;
      }
      
      .info{
      margin-bottom: 5px;
      }
      
      </style>`;
      
      const año = this.invoice[0].fecha_hora.substr(0, 4);
      const mes = this.invoice[0].fecha_hora.substr(5, 2);
      const dia = this.invoice[0].fecha_hora.substr(8, 2);
      const hora = this.invoice[0].fecha_hora.substr(11, 2);
      const minuto = this.invoice[0].fecha_hora.substr(14, 2);
      const segundo = this.invoice[0].fecha_hora.substr(17, 2);
      
      // Construye la fecha legible
      this.invoice[0].fecha_hora =`${dia}/${mes}/${año} a las ${hora}:${minuto}:${segundo}`;
      const token:any = localStorage.getItem('token');
      const tokenData = token.split('.')[1]; // Obtén la parte de los datos del token
      const decodedTokenData = JSON.parse(atob(tokenData)); // Decodifica y parsea los datos
      console.log(tokenData)
      // Accede a los datos del usuario
      const userData = {

        lang: decodedTokenData.lang,
        // Agrega otros datos del usuario si los necesitas
      };     
     const language = userData.lang;
     if(language === 'es'){
      
      let info:any = `<div style="position: relative; width: 855px;"><div class="info">Fecha y hora: ${this.invoice[0].fecha_hora}</div>
      <div class="info">Factura ID: ${this.invoice[0].id}</div>
      <div class="info">Mesa: ${this.invoice[0].mesa}</div>
      <div class="info">Numero de caja: ${this.invoice[0].numero_caja}</div>
      <div class="info">Numero de productos: ${this.invoice[0].numero_productos}</div>
      <div class="info">Sucursal ID: ${this.invoice[0].sucursal_id}</div>
      <div class="info">Total: ${this.invoice[0].total}</div>
      <div class="info">User ID: ${this.invoice[0].userId}</div></div>
      `
      div.innerHTML += info;
          this.invoice[0].orden.forEach((objeto:any) => {
            console.log(objeto.nombre);
            let tabla = '';
            switch (objeto.nombre) {
      
              case crepasDulce:
            tabla = `
        <div class='tabla-container'>
        <table style="width: 902px;">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Complementos</th>
              <th>Untables</th>
              <th>Harina</th>
              <th>Nieve</th>
              <th>Decoracion</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${objeto.nombre}</td>
              <td>${objeto.cantidad}</td>
              <td>${objeto.precio}</td>
              <td>
                <ul class="ingredient-list">
                  ${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
                </ul>
              </td>
              <td>
                <ul>
                  ${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
                </ul>
              </td>
              <td>${objeto.orden.harina.harina}</td>
              <td>
                <ul>
                  ${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
                </ul>
              </td>
              <td>
              <ul>
              ${objeto.orden.decoracion.map((decoracion: any) => `<li>${decoracion.nombre}</li>`).join('')}
              </ul>
            </td>
              <td>${objeto.total}</td>
            </tr>
          </tbody>
        </table>
        </div>
      `;
      
      div.innerHTML += tabla;
      break;
      case crepasSalada:
        tabla = `
        <div  class='tabla-container'>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Ingredientes Base</th>
              <th>Adereso Base</th>
              <th>Ingredientes</th>
              <th>Aderesos</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${objeto.nombre}</td>
              <td>${objeto.cantidad}</td>
              <td>${objeto.precio}</td>
              <td>
                <ul class="ingredient-list">
                  ${objeto.orden.ingredientes_base.map((ing: any) => `<li>${ing.ingrediente_base}</li>`).join('')}
                </ul>
              </td>
              <td>
                <ul>
                  ${objeto.orden.adereso_base.map((ing: any) => `<li>${ing.adereso_base}</li>`).join('')}
                </ul>
              </td>
              <td>
              <ul class="ingredient-list">
                ${objeto.orden.ingredientes.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
              </ul>
            </td>
            <td>
              <ul>
                ${objeto.orden.aderesos.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
              </ul>
            </td>
              <td>${objeto.total}</td>
            </tr>
          </tbody>
        </table>
        </div>
        `
        div.innerHTML += tabla;
        break;
      
        case waffles:
          tabla = `
      <div class='tabla-container'>
      <table style="width: 920px;">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Complementos</th>
            <th>Untables</th>
            <th>Nieve</th>
            <th>Decoracion</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${objeto.nombre}</td>
            <td>${objeto.cantidad}</td>
            <td>${objeto.precio}</td>
            <td>
              <ul class="ingredient-list">
                ${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
              </ul>
            </td>
            <td>
              <ul>
                ${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
              </ul>
            </td>
            <td>
              <ul>
                ${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
              </ul>
            </td>
            <td>
            <ul>
            ${objeto.orden.decoracion.map((decoracion: any) => `<li>${decoracion.nombre}</li>`).join('')}
            </ul>
          </td>
            <td>${objeto.total}</td>
          </tr>
        </tbody>
      </table>
      </div>
      `;
      
      div.innerHTML += tabla;
      break;
      
      case waffleCanasta:
      tabla = `
      <div class='tabla-container'>
      <table style="width: 923px;">
      <thead>
      <tr>
        <th>Nombre</th>
        <th>Cantidad</th>
        <th>Precio</th>
        <th>Complementos</th>
        <th>Untables</th>
        <th>Nieve</th>
        <th>Decoracion</th>
        <th>Total</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>${objeto.nombre}</td>
        <td>${objeto.cantidad}</td>
        <td>${objeto.precio}</td>
        <td>
          <ul class="ingredient-list">
            ${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
          </ul>
        </td>
        <td>
          <ul>
            ${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
          </ul>
        </td>
        <td>
          <ul>
            ${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
          </ul>
        </td>
        <td>
        <ul>
        ${objeto.orden.decoracion.map((decoracion: any) => `<li>${decoracion.nombre}</li>`).join('')}
        </ul>
      </td>
        <td>${objeto.total}</td>
      </tr>
      </tbody>
      </table>
      </div>
      `;
      
      div.innerHTML += tabla;
      break;
      
      case bebidasCalientes:
      tabla = `
      <div class='tabla-container'>
      <table style="width: 1005px;">
      <thead>
      <tr>
        <th>Nombre</th>
        <th>Cantidad</th>
        <th>Precio</th>
        <th>Bebida</th>
        <th>Total</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>${objeto.nombre}</td>
        <td>${objeto.cantidad}</td>
        <td>${objeto.precio}</td>
        <td>
          <ul class="ingredient-list">
            ${objeto.orden.bebida}
          </ul>
        </td>
        <td>${objeto.total}</td>
      </tr>
      </tbody>
      </table>
      </div>
      `;
      
      div.innerHTML += tabla;
      break;
      
      case bebidasFrias:
      tabla = `
      <div class='tabla-container'>
      <table style="width: 1005px;">
      <thead>
      <tr>
        <th>Nombre</th>
        <th>Cantidad</th>
        <th>Precio</th>
        <th>Bebida</th>
        <th>Total</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>${objeto.nombre}</td>
        <td>${objeto.cantidad}</td>
        <td>${objeto.precio}</td>
        <td>
          <ul class="ingredient-list">
            ${objeto.orden.bebida}
          </ul>
        </td>
        <td>${objeto.total}</td>
      </tr>
      </tbody>
      </table>
      </div>
      `;
      
      div.innerHTML += tabla;
      break;
      
      case botanas:
      tabla = `
      <div class='tabla-container'>
      <table style="width: 1005px;">
      <thead>
      <tr>
        <th>Nombre</th>
        <th>Cantidad</th>
        <th>Precio</th>
        <th>Botana</th>
        <th>Total</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>${objeto.nombre}</td>
        <td>${objeto.cantidad}</td>
        <td>${objeto.precio}</td>
        <td>
          <ul class="ingredient-list">
            ${objeto.orden.botana}
          </ul>
        </td>
        <td>${objeto.total}</td>
      </tr>
      </tbody>
      </table>
      </div>
      `;
      
      div.innerHTML += tabla;
      break;
      
      case ensaladas:
      tabla = `
      <div class='tabla-container'>
      <table style="width: 1000px;">
      <thead>
      <tr>
        <th>Nombre</th>
        <th>Cantidad</th>
        <th>Precio</th>
        <th>Ensalada</th>
        <th>Total</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>${objeto.nombre}</td>
        <td>${objeto.cantidad}</td>
        <td>${objeto.precio}</td>
        <td>
          <ul class="ingredient-list">
            ${objeto.orden.ensalada}
          </ul>
        </td>
        <td>${objeto.total}</td>
      </tr>
      </tbody>
      </table>
      </div>
      `;
      
      div.innerHTML += tabla;
      break;
            }
          });
        }else if(language === 'en'){
                    
  let info:any = `<div style="position: relative; width: 855px;"><div class="info">Date and time: ${this.invoice[0].fecha_hora}</div>
  <div class="info">Invoice ID: ${this.invoice[0].id}</div>
  <div class="info">Table: ${this.invoice[0].mesa}</div>
  <div class="info">Box number: ${this.invoice[0].numero_caja}</div>
  <div class="info">Number of products: ${this.invoice[0].numero_productos}</div>
  <div class="info">Branch ID: ${this.invoice[0].sucursal_id}</div>
  <div class="info">Total: ${this.invoice[0].total}</div>
  <div class="info">User ID: ${this.invoice[0].userId}</div></div>
  `
  div.innerHTML += info;
            this.ordenes.forEach((objeto:any) => {
              console.log(objeto.nombre);
              let tabla = '';
              switch (objeto.nombre) {
          
                case crepasDulce:
              tabla = `
          <div class='tabla-container'>
          <table style="width: 902px;">
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Price</th>
                <th>Complements</th>
                <th>Spreads</th>
                <th>Flour</th>
                <th>Snow</th>
                <th>Decor</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Sweet Crepes</td>
                <td>${objeto.cantidad}</td>
                <td>${objeto.precio}</td>
                <td>
                  <ul class="ingredient-list">
                    ${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
                  </ul>
                </td>
                <td>
                  <ul>
                    ${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
                  </ul>
                </td>
                <td>${objeto.orden.harina.harina}</td>
                <td>
                  <ul>
                    ${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
                  </ul>
                </td>
                <td>
                <ul>
                ${objeto.orden.decoracion.map((decoracion: any) => `<li>${decoracion.nombre}</li>`).join('')}
                </ul>
              </td>
                <td>${objeto.total}</td>
              </tr>
            </tbody>
          </table>
          </div>
          `;
          
          div.innerHTML += tabla;
          break;
          case crepasSalada:
          tabla = `
          <div  class='tabla-container'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Price</th>
                <th>Base Ingredients</th>
                <th>Base Dressings</th>
                <th>Ingredients</th>
                <th>Dressings</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Salty Crepes</td>
                <td>${objeto.cantidad}</td>
                <td>${objeto.precio}</td>
                <td>
                  <ul class="ingredient-list">
                    ${objeto.orden.ingredientes_base.map((ing: any) => `<li>${ing.ingrediente_base}</li>`).join('')}
                  </ul>
                </td>
                <td>
                  <ul>
                    ${objeto.orden.adereso_base.map((ing: any) => `<li>${ing.adereso_base}</li>`).join('')}
                  </ul>
                </td>
                <td>
                <ul class="ingredient-list">
                  ${objeto.orden.ingredientes.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
                </ul>
              </td>
              <td>
                <ul>
                  ${objeto.orden.aderesos.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
                </ul>
              </td>
                <td>${objeto.total}</td>
              </tr>
            </tbody>
          </table>
          </div>
          `
          div.innerHTML += tabla;
          break;
          
          case waffles:
            tabla = `
          <div class='tabla-container'>
          <table style="width: 920px;">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Complements</th>
              <th>Spreads</th>
              <th>Snow</th>
              <th>Decor</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Waffles</td>
              <td>${objeto.cantidad}</td>
              <td>${objeto.precio}</td>
              <td>
                <ul class="ingredient-list">
                  ${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
                </ul>
              </td>
              <td>
                <ul>
                  ${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
                </ul>
              </td>
              <td>
                <ul>
                  ${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
                </ul>
              </td>
              <td>
              <ul>
              ${objeto.orden.decoracion.map((decoracion: any) => `<li>${decoracion.nombre}</li>`).join('')}
              </ul>
            </td>
              <td>${objeto.total}</td>
            </tr>
          </tbody>
          </table>
          </div>
          `;
          
          div.innerHTML += tabla;
          break;
          
          case waffleCanasta:
          tabla = `
          <div class='tabla-container'>
          <table style="width: 923px;">
          <thead>
          <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Price</th>
          <th>Complements</th>
          <th>Spreads</th>
          <th>Snow</th>
          <th>Decor</th>
          <th>Total</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td>Waffles Basket</td>
          <td>${objeto.cantidad}</td>
          <td>${objeto.precio}</td>
          <td>
            <ul class="ingredient-list">
              ${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
            </ul>
          </td>
          <td>
            <ul>
              ${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
            </ul>
          </td>
          <td>
            <ul>
              ${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
            </ul>
          </td>
          <td>
          <ul>
          ${objeto.orden.decoracion.map((decoracion: any) => `<li>${decoracion.nombre}</li>`).join('')}
          </ul>
          </td>
          <td>${objeto.total}</td>
          </tr>
          </tbody>
          </table>
          </div>
          `;
          
          div.innerHTML += tabla;
          break;
          
          case bebidasCalientes:
          tabla = `
          <div class='tabla-container'>
          <table style="width: 1005px;">
          <thead>
          <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Price</th>
          <th>Drink</th>
          <th>Total</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td>Hot Drinks</td>
          <td>${objeto.cantidad}</td>
          <td>${objeto.precio}</td>
          <td>
            <ul class="ingredient-list">
              ${objeto.orden.bebida}
            </ul>
          </td>
          <td>${objeto.total}</td>
          </tr>
          </tbody>
          </table>
          </div>
          `;
          
          div.innerHTML += tabla;
          break;
          
          case bebidasFrias:
          tabla = `
          <div class='tabla-container'>
          <table style="width: 1005px;">
          <thead>
          <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Price</th>
          <th>Drink</th>
          <th>Total</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td>Cold Drinks</td>
          <td>${objeto.cantidad}</td>
          <td>${objeto.precio}</td>
          <td>
            <ul class="ingredient-list">
              ${objeto.orden.bebida}
            </ul>
          </td>
          <td>${objeto.total}</td>
          </tr>
          </tbody>
          </table>
          </div>
          `;
          
          div.innerHTML += tabla;
          break;
          
          case botanas:
          tabla = `
          <div class='tabla-container'>
          <table style="width: 1005px;">
          <thead>
          <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Price</th>
          <th>Snack</th>
          <th>Total</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td>Snack</td>
          <td>${objeto.cantidad}</td>
          <td>${objeto.precio}</td>
          <td>
            <ul class="ingredient-list">
              ${objeto.orden.botana}
            </ul>
          </td>
          <td>${objeto.total}</td>
          </tr>
          </tbody>
          </table>
          </div>
          `;
          
          div.innerHTML += tabla;
          break;
          
          case ensaladas:
          tabla = `
          <div class='tabla-container'>
          <table style="width: 1000px;">
          <thead>
          <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Price</th>
          <th>Salad</th>
          <th>Total</th>
          </tr>
          </thead>
          <tbody>
          <tr>
          <td>Individual Salads</td>
          <td>${objeto.cantidad}</td>
          <td>${objeto.precio}</td>
          <td>
            <ul class="ingredient-list">
              ${objeto.orden.ensalada}
            </ul>
          </td>
          <td>${objeto.total}</td>
          </tr>
          </tbody>
          </table>
          </div>
          `;
          
          div.innerHTML += tabla;
          break;
              }
            });
          }
      
          let div2 = document.createElement('div');
          div2.innerHTML = div.innerHTML;
          div2.style.width = '100%';
      
          body.appendChild(div2);
          let total = document.createElement('div');
          total.innerHTML = `
         <div class="total">
            <div class="totalCant"><p>total: ${this.invoice[0].total}</p></div>
        </div>
      `
      body.innerHTML += total.innerHTML;

      const doc = new jsPDF('p', 'pt', 'letter');
      doc.html(body, {
        x: 10,
        y: 10,
        html2canvas: {
          scale: 0.68,
  
        },
        callback: function (doc) {
          doc.save("carrito.pdf");
        }
      });
      console.log(body.innerHTML);
        })

        this.service.deleteAll().subscribe((res:any) => {
          console.log(res);
          this.stockInsuficiente();
        },
        err => console.log(err)
        )
      },
      err => {     
        this.stockInsuficiente();
        if(err.error.message === '404'){
          if(this.authService.lang() === 'es'){
            this.alertService.mostrarAlerta('No hay suficiente inventario para completar su compra por favor revise su carrito de compra')
            }else if(this.authService.lang() === 'en'){
              this.alertService.mostrarAlerta('There is not enough inventory to complete your purchase, please check your shopping cart')
            }
        }else if(err.error.message === '400'){
          if(this.authService.lang() === 'es'){
            this.alertService.mostrarAlerta('No hay productos en la orden')
            }else if(this.authService.lang() === 'en'){
              this.alertService.mostrarAlerta('There are no products in the order')
            }
        }else{
        if(this.authService.lang() === 'es'){
        this.alertService.mostrarAlerta('Error al realizar la compra')
        }else if(this.authService.lang() === 'en'){
          this.alertService.mostrarAlerta('Error making the purchase')
        }          
        }

      })
    }
    }
    
    , 1000);
  }

  verificarAlMenosUnTrueEnArrays(arrays: boolean[][]): boolean {
    // Verificar si al menos un array tiene al menos un true
    return arrays.some(arr => arr.some(variable => variable === true));
    
}

imprimir(){
  let body = document.createElement('body');
  let div = document.createElement('div');

  div.classList.add('tabla-container');
  body.innerHTML = `
<style>
.tabla-container {
padding-bottom: 40px;
}
.tabla-container table {
width: 900px;
}

.tabla-container th,
.tabla-container td {

text-align: inherit;
width: 5%;
}
.tabla-container li {
list-style: none;

}

ul{
margin: 0px;
padding: 0px;
}

.tabla-container a {
text-decoration: none;
}

.total{
border-radius: 10px;
height: 50px;
width: 870px;
}

.totalCant p{
display: block;
float: right;
height: 50px;
width: 10%;
padding: 0px;
padding-top: 12px;
padding-left: 165px;
}

.one{
width: 1000px;
}

.info{
margin-bottom: 5px;
}

</style>`;

const token:any = localStorage.getItem('token');
const tokenData = token.split('.')[1]; // Obtén la parte de los datos del token
const decodedTokenData = JSON.parse(atob(tokenData)); // Decodifica y parsea los datos
console.log(tokenData)
// Accede a los datos del usuario
const userData = {

lang: decodedTokenData.lang,
// Agrega otros datos del usuario si los necesitas
};     
const language = userData.lang;
if(language === 'es'){

  let info:any = `<div style="position: relative; width: 855px;">
  <div class="info">Mesa: ${this.mesa}</div>
  </div>
  `
div.innerHTML += info;
  this.ordenes.forEach((objeto:any) => {
    console.log(objeto.nombre);
    let tabla = '';
    switch (objeto.nombre) {

      case crepasDulce:
    tabla = `
<div class='tabla-container'>
<table style="width: 902px;">
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Cantidad</th>
      <th>Precio</th>
      <th>Complementos</th>
      <th>Untables</th>
      <th>Harina</th>
      <th>Nieve</th>
      <th>Decoracion</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${objeto.nombre}</td>
      <td>${objeto.cantidad}</td>
      <td>${objeto.precio}</td>
      <td>
        <ul class="ingredient-list">
          ${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
        </ul>
      </td>
      <td>
        <ul>
          ${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
        </ul>
      </td>
      <td>${objeto.orden.harina.harina}</td>
      <td>
        <ul>
          ${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
        </ul>
      </td>
      <td>
      <ul>
      ${objeto.orden.decoracion.map((decoracion: any) => `<li>${decoracion.nombre}</li>`).join('')}
      </ul>
    </td>
      <td>${objeto.total}</td>
    </tr>
  </tbody>
</table>
</div>
`;

div.innerHTML += tabla;
break;
case crepasSalada:
tabla = `
<div  class='tabla-container'>
<table>
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Cantidad</th>
      <th>Precio</th>
      <th>Ingredientes Base</th>
      <th>Adereso Base</th>
      <th>Ingredientes</th>
      <th>Aderesos</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${objeto.nombre}</td>
      <td>${objeto.cantidad}</td>
      <td>${objeto.precio}</td>
      <td>
        <ul class="ingredient-list">
          ${objeto.orden.ingredientes_base.map((ing: any) => `<li>${ing.ingrediente_base}</li>`).join('')}
        </ul>
      </td>
      <td>
        <ul>
          ${objeto.orden.adereso_base.map((ing: any) => `<li>${ing.adereso_base}</li>`).join('')}
        </ul>
      </td>
      <td>
      <ul class="ingredient-list">
        ${objeto.orden.ingredientes.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
      </ul>
    </td>
    <td>
      <ul>
        ${objeto.orden.aderesos.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
      </ul>
    </td>
      <td>${objeto.total}</td>
    </tr>
  </tbody>
</table>
</div>
`
div.innerHTML += tabla;
break;

case waffles:
  tabla = `
<div class='tabla-container'>
<table style="width: 920px;">
<thead>
  <tr>
    <th>Nombre</th>
    <th>Cantidad</th>
    <th>Precio</th>
    <th>Complementos</th>
    <th>Untables</th>
    <th>Nieve</th>
    <th>Decoracion</th>
    <th>Total</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>${objeto.nombre}</td>
    <td>${objeto.cantidad}</td>
    <td>${objeto.precio}</td>
    <td>
      <ul class="ingredient-list">
        ${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
      </ul>
    </td>
    <td>
      <ul>
        ${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
      </ul>
    </td>
    <td>
      <ul>
        ${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
      </ul>
    </td>
    <td>
    <ul>
    ${objeto.orden.decoracion.map((decoracion: any) => `<li>${decoracion.nombre}</li>`).join('')}
    </ul>
  </td>
    <td>${objeto.total}</td>
  </tr>
</tbody>
</table>
</div>
`;

div.innerHTML += tabla;
break;

case waffleCanasta:
tabla = `
<div class='tabla-container'>
<table style="width: 923px;">
<thead>
<tr>
<th>Nombre</th>
<th>Cantidad</th>
<th>Precio</th>
<th>Complementos</th>
<th>Untables</th>
<th>Nieve</th>
<th>Decoracion</th>
<th>Total</th>
</tr>
</thead>
<tbody>
<tr>
<td>${objeto.nombre}</td>
<td>${objeto.cantidad}</td>
<td>${objeto.precio}</td>
<td>
  <ul class="ingredient-list">
    ${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
  </ul>
</td>
<td>
  <ul>
    ${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
  </ul>
</td>
<td>
  <ul>
    ${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
  </ul>
</td>
<td>
<ul>
${objeto.orden.decoracion.map((decoracion: any) => `<li>${decoracion.nombre}</li>`).join('')}
</ul>
</td>
<td>${objeto.total}</td>
</tr>
</tbody>
</table>
</div>
`;

div.innerHTML += tabla;
break;

case bebidasCalientes:
tabla = `
<div class='tabla-container'>
<table style="width: 1005px;">
<thead>
<tr>
<th>Nombre</th>
<th>Cantidad</th>
<th>Precio</th>
<th>Bebida</th>
<th>Total</th>
</tr>
</thead>
<tbody>
<tr>
<td>${objeto.nombre}</td>
<td>${objeto.cantidad}</td>
<td>${objeto.precio}</td>
<td>
  <ul class="ingredient-list">
    ${objeto.orden.bebida}
  </ul>
</td>
<td>${objeto.total}</td>
</tr>
</tbody>
</table>
</div>
`;

div.innerHTML += tabla;
break;

case bebidasFrias:
tabla = `
<div class='tabla-container'>
<table style="width: 1005px;">
<thead>
<tr>
<th>Nombre</th>
<th>Cantidad</th>
<th>Precio</th>
<th>Bebida</th>
<th>Total</th>
</tr>
</thead>
<tbody>
<tr>
<td>${objeto.nombre}</td>
<td>${objeto.cantidad}</td>
<td>${objeto.precio}</td>
<td>
  <ul class="ingredient-list">
    ${objeto.orden.bebida}
  </ul>
</td>
<td>${objeto.total}</td>
</tr>
</tbody>
</table>
</div>
`;

div.innerHTML += tabla;
break;

case botanas:
tabla = `
<div class='tabla-container'>
<table style="width: 1005px;">
<thead>
<tr>
<th>Nombre</th>
<th>Cantidad</th>
<th>Precio</th>
<th>Botana</th>
<th>Total</th>
</tr>
</thead>
<tbody>
<tr>
<td>${objeto.nombre}</td>
<td>${objeto.cantidad}</td>
<td>${objeto.precio}</td>
<td>
  <ul class="ingredient-list">
    ${objeto.orden.botana}
  </ul>
</td>
<td>${objeto.total}</td>
</tr>
</tbody>
</table>
</div>
`;

div.innerHTML += tabla;
break;

case ensaladas:
tabla = `
<div class='tabla-container'>
<table style="width: 1000px;">
<thead>
<tr>
<th>Nombre</th>
<th>Cantidad</th>
<th>Precio</th>
<th>Ensalada</th>
<th>Total</th>
</tr>
</thead>
<tbody>
<tr>
<td>${objeto.nombre}</td>
<td>${objeto.cantidad}</td>
<td>${objeto.precio}</td>
<td>
  <ul class="ingredient-list">
    ${objeto.orden.ensalada}
  </ul>
</td>
<td>${objeto.total}</td>
</tr>
</tbody>
</table>
</div>
`;

div.innerHTML += tabla;
break;
    }
  });
}else if(language === 'en'){
        
let info:any = `<div style="position: relative; width: 855px;">
<div class="info">Table: ${this.mesa}</div>
</div>
`
div.innerHTML += info;
  this.ordenes.forEach((objeto:any) => {
    console.log(objeto.nombre);
    let tabla = '';
    switch (objeto.nombre) {

      case crepasDulce:
    tabla = `
<div class='tabla-container'>
<table style="width: 902px;">
  <thead>
    <tr>
      <th>Name</th>
      <th>Amount</th>
      <th>Price</th>
      <th>Complements</th>
      <th>Spreads</th>
      <th>Flour</th>
      <th>Snow</th>
      <th>Decor</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Sweet Crepes</td>
      <td>${objeto.cantidad}</td>
      <td>${objeto.precio}</td>
      <td>
        <ul class="ingredient-list">
          ${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
        </ul>
      </td>
      <td>
        <ul>
          ${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
        </ul>
      </td>
      <td>${objeto.orden.harina.harina}</td>
      <td>
        <ul>
          ${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
        </ul>
      </td>
      <td>
      <ul>
      ${objeto.orden.decoracion.map((decoracion: any) => `<li>${decoracion.nombre}</li>`).join('')}
      </ul>
    </td>
      <td>${objeto.total}</td>
    </tr>
  </tbody>
</table>
</div>
`;

div.innerHTML += tabla;
break;
case crepasSalada:
tabla = `
<div  class='tabla-container'>
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Amount</th>
      <th>Price</th>
      <th>Base Ingredients</th>
      <th>Base Dressings</th>
      <th>Ingredients</th>
      <th>Dressings</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Salty Crepes</td>
      <td>${objeto.cantidad}</td>
      <td>${objeto.precio}</td>
      <td>
        <ul class="ingredient-list">
          ${objeto.orden.ingredientes_base.map((ing: any) => `<li>${ing.ingrediente_base}</li>`).join('')}
        </ul>
      </td>
      <td>
        <ul>
          ${objeto.orden.adereso_base.map((ing: any) => `<li>${ing.adereso_base}</li>`).join('')}
        </ul>
      </td>
      <td>
      <ul class="ingredient-list">
        ${objeto.orden.ingredientes.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
      </ul>
    </td>
    <td>
      <ul>
        ${objeto.orden.aderesos.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
      </ul>
    </td>
      <td>${objeto.total}</td>
    </tr>
  </tbody>
</table>
</div>
`
div.innerHTML += tabla;
break;

case waffles:
  tabla = `
<div class='tabla-container'>
<table style="width: 920px;">
<thead>
  <tr>
    <th>Name</th>
    <th>Amount</th>
    <th>Price</th>
    <th>Complements</th>
    <th>Spreads</th>
    <th>Snow</th>
    <th>Decor</th>
    <th>Total</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Waffles</td>
    <td>${objeto.cantidad}</td>
    <td>${objeto.precio}</td>
    <td>
      <ul class="ingredient-list">
        ${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
      </ul>
    </td>
    <td>
      <ul>
        ${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
      </ul>
    </td>
    <td>
      <ul>
        ${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
      </ul>
    </td>
    <td>
    <ul>
    ${objeto.orden.decoracion.map((decoracion: any) => `<li>${decoracion.nombre}</li>`).join('')}
    </ul>
  </td>
    <td>${objeto.total}</td>
  </tr>
</tbody>
</table>
</div>
`;

div.innerHTML += tabla;
break;

case waffleCanasta:
tabla = `
<div class='tabla-container'>
<table style="width: 923px;">
<thead>
<tr>
<th>Name</th>
<th>Amount</th>
<th>Price</th>
<th>Complements</th>
<th>Spreads</th>
<th>Snow</th>
<th>Decor</th>
<th>Total</th>
</tr>
</thead>
<tbody>
<tr>
<td>Waffles Basket</td>
<td>${objeto.cantidad}</td>
<td>${objeto.precio}</td>
<td>
  <ul class="ingredient-list">
    ${objeto.orden.ingredientes_com.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
  </ul>
</td>
<td>
  <ul>
    ${objeto.orden.ingredientes_unt.map((ing: any) => `<li>${ing.nombre}</li>`).join('')}
  </ul>
</td>
<td>
  <ul>
    ${objeto.orden.nieve.map((nieve: any) => `<li>${nieve.nombre}</li>`).join('')}
  </ul>
</td>
<td>
<ul>
${objeto.orden.decoracion.map((decoracion: any) => `<li>${decoracion.nombre}</li>`).join('')}
</ul>
</td>
<td>${objeto.total}</td>
</tr>
</tbody>
</table>
</div>
`;

div.innerHTML += tabla;
break;

case bebidasCalientes:
tabla = `
<div class='tabla-container'>
<table style="width: 1005px;">
<thead>
<tr>
<th>Name</th>
<th>Amount</th>
<th>Price</th>
<th>Drink</th>
<th>Total</th>
</tr>
</thead>
<tbody>
<tr>
<td>Hot Drinks</td>
<td>${objeto.cantidad}</td>
<td>${objeto.precio}</td>
<td>
  <ul class="ingredient-list">
    ${objeto.orden.bebida}
  </ul>
</td>
<td>${objeto.total}</td>
</tr>
</tbody>
</table>
</div>
`;

div.innerHTML += tabla;
break;

case bebidasFrias:
tabla = `
<div class='tabla-container'>
<table style="width: 1005px;">
<thead>
<tr>
<th>Name</th>
<th>Amount</th>
<th>Price</th>
<th>Drink</th>
<th>Total</th>
</tr>
</thead>
<tbody>
<tr>
<td>Cold Drinks</td>
<td>${objeto.cantidad}</td>
<td>${objeto.precio}</td>
<td>
  <ul class="ingredient-list">
    ${objeto.orden.bebida}
  </ul>
</td>
<td>${objeto.total}</td>
</tr>
</tbody>
</table>
</div>
`;

div.innerHTML += tabla;
break;

case botanas:
tabla = `
<div class='tabla-container'>
<table style="width: 1005px;">
<thead>
<tr>
<th>Name</th>
<th>Amount</th>
<th>Price</th>
<th>Snack</th>
<th>Total</th>
</tr>
</thead>
<tbody>
<tr>
<td>Snack</td>
<td>${objeto.cantidad}</td>
<td>${objeto.precio}</td>
<td>
  <ul class="ingredient-list">
    ${objeto.orden.botana}
  </ul>
</td>
<td>${objeto.total}</td>
</tr>
</tbody>
</table>
</div>
`;

div.innerHTML += tabla;
break;

case ensaladas:
tabla = `
<div class='tabla-container'>
<table style="width: 1000px;">
<thead>
<tr>
<th>Name</th>
<th>Amount</th>
<th>Price</th>
<th>Salad</th>
<th>Total</th>
</tr>
</thead>
<tbody>
<tr>
<td>Individual Salads</td>
<td>${objeto.cantidad}</td>
<td>${objeto.precio}</td>
<td>
  <ul class="ingredient-list">
    ${objeto.orden.ensalada}
  </ul>
</td>
<td>${objeto.total}</td>
</tr>
</tbody>
</table>
</div>
`;

div.innerHTML += tabla;
break;
    }
  });
}

  let div2 = document.createElement('div');
  div2.innerHTML = div.innerHTML;
  div2.style.width = '100%';

  body.appendChild(div2);

const doc = new jsPDF('p', 'pt', 'letter');
doc.html(body, {
x: 10,
y: 10,
html2canvas: {
  scale: 0.68,

},
callback: function (doc) {
  doc.save("carrito.pdf");
}
})
}


stockInsuficiente(){
  this.grupos = [];
  this.ordenes = [];
  this.saladasWarning = [];
  this.dulcesWarning = [];
  this.wafflesWarning = [];
  this.wafflesCanastaWarning = [];
  this.bebidasFriasWarning = [];
  this.bebidasCalientesWarning = [];
  this.ensaladasWarning = [];
  this.botanasWarning = [];

  // Crepa Dulce 
  this.crepasDulces = [];
  this.ingredientesComCrepaD = [];
  this.ingredientesComCrepaD1 = [];
  this.ingredientesUntCrepaD = [];
  this.ingredientesUntCrepaD1 = [];
  this.nievesCrepaD = [];
  this.nievesCrepaD1 = [];
  this.decoracionesCrepaD = [];
  this.decoracionesCrepaD1 = [];



  // Crepa Salada
  this.crepasSaladas = [];
  this.ingredientesCrepaS = [];
  this.ingredientesCrepaS1 = [];

  this.aderesosCrepaS = [];
  this.aderesosCrepaS1 = [];
  this.ingredientesBaseCrepaS = [];
  this.ingredientesBaseCrepaS1 = [];
  this.aderesosBaseCrepaS = [];
  this.aderesosBaseCrepaS1 = [];

  // Waffles
  this.waffles = [];
  this.wafflesIngUnt = [];
  this.waffles1IngUnt = [];
  this.wafflesIngCom = [];
  this.waffles1IngCom = [];
  this.wafflesNieve = [];
  this.waffles1Nieve = [];
  this.waffles1Decoraciones = [];
  this.wafflesDecoraciones = [];

  // Waffles Canasta
  this.wafflesCanasta = [];
  this.wafflesCanastaIngUnt = [];
  this.wafflesCanasta1IngUnt = [];

  this.wafflesCanastaIngCom = [];
  this.wafflesCanasta1IngCom = [];
  this.wafflesCanastaNieve = [];
  this.wafflesCanasta1Nieve = [];
  this.wafflesCanasta1Decoraciones = [];
  this.wafflesCanastaDecoraciones = [];


  // Bebidas Calientes
  this.bebidasCalientes = [];
  this.bebidasCalientes1 = [];


  // Bebidas Frias
  this.bebidasFrias = [];
  this.bebidasFrias1 = [];


  // Botanas
  this.botanas = [];
  this.botanas1 = [];
  // Ensalada Indivudual
  this.ensaladasIndividual = [];
  this.ensaladasIndividual1 = [];
  this.stock();
}


}