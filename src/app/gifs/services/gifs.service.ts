import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
}) //Servicio disponible en toda la aplicación. Si no, tendríamos que añadirlo en el módulo, en providers.
export class GifsService {

  public gifList: Gif[] = [];
  
  private _tagsHistory: string[] = [];
  private _giphy_api_key: string = 'UJhtmqNexoXg8nxMJB20TFS5xltag48Z';  
  private _serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

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
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    const temporal = localStorage.getItem('history');
    if (!temporal) return;
    this._tagsHistory = JSON.parse(temporal!);
    if ( this._tagsHistory.length === 0 ) return;
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag( tag: string ): void {
    if ( tag.length === 0 ) return;
    this.organizeHistory(tag);
    
    // fetch('https://api.giphy.com/v1/gifs/search?api_key=UJhtmqNexoXg8nxMJB20TFS5xltag48Z&q=valorant&limit=10')
    //   .then( resp => resp.json() )
    //   .then( data => console.log(data) );
    
    
    //Observable: objeto que a lo largo del tiempo podemos hacer que emita valores. Si nos suscribimos a un observable
    //somos alertados cuando ese objeto emite valores.
    const params = new HttpParams()
      .set('api_key', this._giphy_api_key)
      .set('limit', 10)
      .set('q', tag)
    this.http.get<SearchResponse>( `${this._serviceUrl}/search`, {params} )
      .subscribe( resp => {
        this.gifList = resp.data;
      } );
      
  } 
}
