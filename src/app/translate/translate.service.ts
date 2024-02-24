import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private data: any;
  constructor(private http: HttpClient) { }

  getData(path: string, language?: string) {
    return new Promise((resolve, reject) => {
      if(!language){
        language = 'en';
      }

      const token:any = localStorage.getItem('token');

      if (!token) {
              this.http.get(path + language + '.json').subscribe({
        next: (data) => {
          this.data = data;
          resolve(true);
        }, error: (error) => {
          console.error(error);
          this.http.get(path + 'en.json').subscribe({
            next: (data) => {
              this.data = data;
              resolve(true);
            }, error: (error) => {
              resolve(false);
            }});
        }
        
      })
      }else{
      const tokenData = token.split('.')[1]; // Obtén la parte de los datos del token
      const decodedTokenData = JSON.parse(atob(tokenData)); // Decodifica y parsea los datos
     console.log(tokenData)
      // Accede a los datos del usuario
      const userData = {

        lang: decodedTokenData.lang,
        // Agrega otros datos del usuario si los necesitas
      };     
      language = userData.lang;
      this.http.get(path + language + '.json').subscribe({
        next: (data) => {
          this.data = data;
          resolve(true);
        }, error: (error) => {
          console.error(error);
          this.http.get(path + 'en.json').subscribe({
            next: (data) => {
              this.data = data;
              resolve(true);
            }, error: (error) => {
              resolve(false);
            }});
        }
        
      })   
      }



    });
  }

  getTranslate(key: string):string {
  return this.data ? this.data[key] : key;
  }
}
