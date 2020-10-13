import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  datos:any=[];
  public realizado:boolean = true;

  constructor(public httpCliente:HttpClient) {
    this.lista();
    //this.login();
  }

  public lista(){
    this.httpCliente.get('https://rickandmortyapi.com/api/character').subscribe(data => {
      this.datos = data;
      console.log(this.datos);
    });
   }


   cambiaEstado(){
     console.log(this.realizado);
   }
  

//   function cambiarColor() {
//     var element = document.body;
//     element.classList.toggle("dark-mode");
//     
//   }

  
  

}
