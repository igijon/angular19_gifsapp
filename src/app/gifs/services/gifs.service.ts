import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
}) //Servicio disponible en toda la aplicación. Si no, tendríamos que añadirlo en el módulo, en providers.
export class GifsService {

  private _tagsHistory: string[] = [];

  constructor() { }

  get tagsHistory() {
    return [...this._tagsHistory]; //Copia por seguridad. Operador spread
  }

  searchTag( tag: string ): void {
    this._tagsHistory.unshift(tag);
    console.log(this._tagsHistory);
    
  } 
}
