import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PopoverController } from '@ionic/angular';
import { PopinfoComponent } from '../componentes/popinfo/popinfo.component';
import { MapService } from '../servicios/map.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  datos:any=[];
  estado2:any;

  constructor(
    public httpCliente:HttpClient, 
    public popoverCtrl: PopoverController,
    private valorestado:MapService,
    
    ) {
    this.lista();
  }

  ngOnInit() {
    
    this.estado2=this.valorestado.estado1;
    console.log("tab2",this.estado2);
  }

  
  public lista(){
    this.httpCliente.get('https://rickandmortyapi.com/api/character').subscribe(data => {
      this.datos = data;
      console.log(this.datos);
    });
  }

  async mostrarPop( evento ){
     const popover = await this.popoverCtrl.create({
       component: PopinfoComponent,
       event: evento,
       mode: 'ios',
       
     });
     await popover.present();

     //popover.onDidDismiss(); despues de cerrar
     //popover.onWillDismiss(); justo antes de cerrar
     const { data } = await popover.onWillDismiss();
     console.log('Padre:', data);
  }

}