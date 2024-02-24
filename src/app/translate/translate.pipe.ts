import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from './translate.service';

@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {
  constructor(private translateService: TranslateService) { }
  transform(value: string, params?:any):string  {
    let translate = this.translateService.getTranslate(value);

    if(!params){
      return translate;
    }
    for (const key in params) {
      translate = translate.replaceAll('{'+ key +'}', params[key]);
    }

    return translate;
  
  }


}
