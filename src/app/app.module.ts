import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuPrincipalComponent } from './principal/menu-principal/menu-principal.component';
import { MenuCrepasComponent } from './crepas/menu-crepas/menu-crepas.component';
import { CrepaDulceComponent } from './crepas/crepaDulce/crepa-dulce/crepa-dulce.component';
import { CrepaSaladaComponent } from './crepas/crepaSalada/crepa-salada/crepa-salada.component';

import { BotanasComponent } from './botanasC/botanas/botanas.component';
import { BebidasCalientesComponent } from './bebidas/bebidasCalientes/bebidas-calientes/bebidas-calientes.component';
import { BebidasFriasComponent } from './bebidas/bebidasFrias/bebidas-frias/bebidas-frias.component';
import { EnsaladaIndividualComponent } from './ensaladaIndividual/ensalada-individual/ensalada-individual.component';
import { CajaComponent } from './acount/1caja/caja.component';
import { MenuBebidasComponent } from './menu-bebidas/menu-bebidas.component';
import { CarritoComponent } from './carrito/carrito.component';
import { AuthInterceptor } from './auth.interceptor';
import { WaffleComponent } from './waffles/waffle/waffle.component';
import { WaffleCanastaComponent } from './waffleCanasta/waffle-canasta/waffle-canasta.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { AlertDialogService } from './alert-dialog.service';
import { MatDialogModule } from '@angular/material/dialog';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './services/auth-service.service';
import { EditCrepaDulceComponent } from './crepas/crepaDulce/edit-crepa-dulce/edit-crepa-dulce.component';
import { EditCrepaSaladaComponent } from './crepas/crepaSalada/edit-crepa-salada/edit-crepa-salada.component';
import { EditBebidasFriasComponent } from './bebidas/bebidasFrias/edit-bebidas-frias/edit-bebidas-frias.component';
import { EditBebidasCalientesComponent } from './bebidas/bebidasCalientes/edit-bebidas-calientes/edit-bebidas-calientes.component';
import { EditBotanasComponent } from './botanasC/edit-botanas/edit-botanas.component';
import { EditEnsaladaIndividualComponent } from './ensaladaIndividual/edit-ensalada-individual/edit-ensalada-individual.component';
import { EditWaffleComponent } from './waffles/edit-waffle/edit-waffle.component';
import { EditWaffleCanastaComponent } from './waffleCanasta/edit-waffle-canasta/edit-waffle-canasta.component';
import { LoggedInStyleDirective } from './logged-in-style.directive';
import { WafflesMenuComponent } from './waffles-menu/waffles-menu.component';
import { TranslateModule } from './translate/translate.module';
import { TranslateService } from './translate/translate.service';
import { AccountConfigComponent } from './acount/account-config/account-config.component';


export function translateFactory(provider: TranslateService) {
  return () => provider.getData('/assets/i18n/');
}

@NgModule({
  declarations: [
    AppComponent,
    MenuPrincipalComponent,
    MenuCrepasComponent,
    CrepaDulceComponent,
    CrepaSaladaComponent,

    BotanasComponent,
     BebidasCalientesComponent,
     BebidasFriasComponent,
     EnsaladaIndividualComponent,
     CajaComponent,
     MenuBebidasComponent,
     CarritoComponent,
     WaffleComponent,
     WaffleCanastaComponent,
     AlertDialogComponent,
     NavbarComponent,
     EditCrepaDulceComponent,
     EditCrepaSaladaComponent,
     EditBebidasFriasComponent,
     EditBebidasCalientesComponent,
     EditBotanasComponent,
     EditEnsaladaIndividualComponent,
     EditWaffleComponent,
     EditWaffleCanastaComponent,
     LoggedInStyleDirective,
     WafflesMenuComponent,
     AccountConfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSlideToggleModule,
    MatDialogModule,
    TranslateModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: translateFactory,
      deps: [TranslateService],
      multi: true
    },
    AlertDialogService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
