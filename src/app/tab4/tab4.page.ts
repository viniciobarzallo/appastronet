import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopinfoComponent } from '../componentes/popinfo/popinfo.component';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  datos:any=[];

  constructor(
    public popoverCtrl: PopoverController) { }

  ngOnInit() {
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
