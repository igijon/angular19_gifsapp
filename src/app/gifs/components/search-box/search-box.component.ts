import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar: </h5>
    <input type="text" 
      class="form-control" 
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput>
  `,
  standalone: false
})
export class SearchBoxComponent {

  //Podemos tomar una referencia local, en este caso de un input
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  searchTag( ) {
    const newTag = this.tagInput.nativeElement.value;
    console.log({ newTag });
    
  }

}
