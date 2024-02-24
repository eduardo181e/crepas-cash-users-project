import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from './translate.pipe';
import { TranslateService } from './translate.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    TranslatePipe
  ],
  exports: [
    TranslatePipe
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    TranslateService
  ]
})
export class TranslateModule { }
