import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BebidasCalientesComponent } from './bebidas/bebidasCalientes/bebidas-calientes/bebidas-calientes.component';
import { CrepaDulceComponent } from './crepas/crepaDulce/crepa-dulce/crepa-dulce.component';
import { CrepaSaladaComponent } from './crepas/crepaSalada/crepa-salada/crepa-salada.component';
import { CajaComponent } from './acount/1caja/caja.component';
import { MenuPrincipalComponent } from './principal/menu-principal/menu-principal.component';
import { BebidasFriasComponent } from './bebidas/bebidasFrias/bebidas-frias/bebidas-frias.component';
import { MenuCrepasComponent } from './crepas/menu-crepas/menu-crepas.component';
import { MenuBebidasComponent } from './menu-bebidas/menu-bebidas.component';
import { CarritoComponent } from './carrito/carrito.component';
import { WaffleComponent } from './waffles/waffle/waffle.component';
import { EnsaladaIndividualComponent } from './ensaladaIndividual/ensalada-individual/ensalada-individual.component';
import { BotanasComponent } from './botanasC/botanas/botanas.component';
import { WaffleCanastaComponent } from './waffleCanasta/waffle-canasta/waffle-canasta.component';
import { AuthGuard } from './services/auth.guard';
import { AuthRedirectGuard } from './services/auth.redirect.guard';
import { EditCrepaDulceComponent } from './crepas/crepaDulce/edit-crepa-dulce/edit-crepa-dulce.component';
import { EditBotanasComponent } from './botanasC/edit-botanas/edit-botanas.component';
import { EditCrepaSaladaComponent } from './crepas/crepaSalada/edit-crepa-salada/edit-crepa-salada.component';
import { EditWaffleCanastaComponent } from './waffleCanasta/edit-waffle-canasta/edit-waffle-canasta.component';
import { EditEnsaladaIndividualComponent } from './ensaladaIndividual/edit-ensalada-individual/edit-ensalada-individual.component';
import { EditWaffleComponent } from './waffles/edit-waffle/edit-waffle.component';
import { EditBebidasFriasComponent } from './bebidas/bebidasFrias/edit-bebidas-frias/edit-bebidas-frias.component';
import { EditBebidasCalientesComponent } from './bebidas/bebidasCalientes/edit-bebidas-calientes/edit-bebidas-calientes.component';
import { WafflesMenuComponent } from './waffles-menu/waffles-menu.component';
import { AccountConfigComponent } from './acount/account-config/account-config.component';

const routes: Routes = [
  {path: 'accountConfig', component: AccountConfigComponent, canActivate: [AuthGuard]},
  {path: 'bebidasCalientes', component:BebidasCalientesComponent, canActivate:[AuthGuard]},
  {path: 'bebidasCalientes/:id', component:EditBebidasCalientesComponent, canActivate:[AuthGuard]},
  {path: 'bebidasFrias', component:BebidasFriasComponent, canActivate:[AuthGuard]},
  {path: 'bebidasFrias/:id', component:EditBebidasFriasComponent, canActivate:[AuthGuard]},
  {path: 'crepaDulce', component:CrepaDulceComponent, canActivate:[AuthGuard]},
  {path: 'crepaDulce/:id', component:EditCrepaDulceComponent, canActivate:[AuthGuard]},
  {path: 'crepaSalada', component:CrepaSaladaComponent, canActivate:[AuthGuard]},
  {path: 'crepaSalada/:id', component:EditCrepaSaladaComponent, canActivate:[AuthGuard]}, 
  {path: 'signin', component: CajaComponent, canActivate:[AuthRedirectGuard]},
  {path: 'principal', component: MenuPrincipalComponent, canActivate:[AuthGuard]},
  {path: 'bebidasMenu', component: MenuBebidasComponent, canActivate:[AuthGuard]},
  {path: 'crepaMenu', component: MenuCrepasComponent, canActivate:[AuthGuard]},
  {path: 'carrito', component: CarritoComponent, canActivate:[AuthGuard]},
  {path: 'waffle', component: WaffleComponent, canActivate:[AuthGuard]},
  {path: 'waffle/:id', component: EditWaffleComponent, canActivate:[AuthGuard]},
  {path: 'wafflesMenu', component: WafflesMenuComponent, canActivate:[AuthGuard]},
  {path: 'ensaladaInd', component: EnsaladaIndividualComponent, canActivate:[AuthGuard]},
  {path: 'ensaladaInd/:id', component: EditEnsaladaIndividualComponent, canActivate:[AuthGuard]},
  {path: 'botana', component: BotanasComponent, canActivate:[AuthGuard]},
  {path: 'botana/:id', component: EditBotanasComponent, canActivate:[AuthGuard]},
  {path: 'waffleCanasta', component: WaffleCanastaComponent, canActivate:[AuthGuard]},
  {path: 'waffleCanasta/:id', component: EditWaffleCanastaComponent, canActivate:[AuthGuard]},
  {path: '', redirectTo: 'principal', pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
