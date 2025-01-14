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

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    //Voy a ver si el tag existe y si existe sólo lo quiero al principio
    if ( this._tagsHistory.includes(tag) ) {
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag );
    }

    this._tagsHistory.unshift(tag);

    //Quiero tener un máximo de 10 en el histórico
    this._tagsHistory = this._tagsHistory.splice(0, 10);
  }

  searchTag( tag: string ): void {
    if ( tag.length === 0 ) return;
    this.organizeHistory(tag);
    
    
  } 
}
