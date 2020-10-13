import { Component, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlmacenamientoService } from 'src/app/servicios/almacenamiento.service';
import { Storage } from '@ionic/storage';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';

//import { Plugins } from '@capacitor/core';

//const { Storage } = Plugins;

//import { MapService } from '../../servicios/map.service'

@Component({
  selector: 'app-visita',
  templateUrl: './visita.page.html',
  styleUrls: ['./visita.page.scss'],
})
export class VisitaPage implements OnInit {

  //Variables para obtener coordenas del cliente
  latitud:number;
  longitud:number;
  
  //Variables para obtener mi ubicacion
  latitudMiubicacion:number;
  longitudMiubicacion:number;

  //Variables del cliente para abrir en google maps
  latitudmaps:number;
  longitudmaps:number;

  clienteVisita:any=[];
  realizado:boolean = false;
  deshabilitarTexto=false;
  deshabilitarDisable=false;

  cedula:any; nombres:any; correo:any; calleprincipal:any; callesecundaria:any; referencia:any; 
  convencional:any; celular:any; contrato:any; plan:any; ip:any; antena:any; contrasena:any; observacion:any;
  
  //asyncService:

  constructor(
    private obtenerUrl: ActivatedRoute,
    private httpCliente: HttpClient,
    private geolocation: Geolocation,
    private almacenamiento: AlmacenamientoService,
    private storage: Storage,
    private launchNavigator: LaunchNavigator

    ) { 
    
    const id=this.obtenerUrl.snapshot.paramMap.get('id');
    this.clienteVisita=id;
    console.log(id);

    this.httpCliente.get('https://rickandmortyapi.com/api/character/'+this.clienteVisita).subscribe(data => {
      this.clienteVisita = data;
      console.log(this.clienteVisita);
    });

    //this.storage.get("estado") 
    const valor = this.storage.get("estado");
    console.log(valor);

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.realizado = prefersDark.matches;
    
  }

  ngOnInit() {
    this.textoDisable();
  }

  textoDisable() {
    console.log(this.deshabilitarTexto)
    this.deshabilitarTexto = !this.deshabilitarTexto;
  }

  textoEnable() {
    console.log(this.deshabilitarTexto)
    this.deshabilitarTexto = false;
  }

  textoDeshabilitado(){
    this.deshabilitarDisable = !this.deshabilitarDisable;
  }

  textoHabilitar(){
    this.deshabilitarDisable = false;
  }
  
  temporal(){
    this.almacenamiento.almacenamientoVisita(this.cedula, this.nombres, this.correo, this.calleprincipal,
    this.callesecundaria, this.referencia, this.convencional, this.celular, this.contrato, this.plan, 
    this.ip, this.antena, this.contrasena, this.observacion, this.latitud, this.longitud);
  }

  //cambiaEstado(event: any){
  //  console.log(this.realizado);
  //}

  cambioEstado(){
    this.realizado = !this.realizado;
    
    
    //document.body.classList.toggle('realizado');
  }

  

  

  obtenerGeolocalizacion(){
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition)=>{
      this.latitud = geoposition.coords.latitude;
      this.longitud = geoposition.coords.longitude;
      console.log(this.latitud)
      console.log(this.longitud)

    }); 
  }

  doRefresh(event){
    setTimeout(() => {
      this.obtenerGeolocalizacion();
      event.target.complete();
    },1500);
  }

  miUbicacion(){
    this.geolocation.getCurrentPosition().then(position => {
      this.latitudMiubicacion = position.coords.latitude;
      this.longitudMiubicacion = position.coords.longitude;
      console.log('miubicacion:', this.latitudMiubicacion);
      console.log('miubicacion:', this.longitudMiubicacion);
    },error=>{
      console.log('error', error);
    });
  }

  navegarMapas(){
    let options: LaunchNavigatorOptions = {
      app: this.launchNavigator.APP.GOOGLE_MAPS,
      start:[this.latitudMiubicacion, this.longitudMiubicacion]
      
    };
    this.launchNavigator.navigate('Cuenca, EC',options)
    //this.launchNavigator.navigate([this.latitudmaps, this.longitudmaps],options)
    .then(success =>{
      console.log(success);
    },error=>{
      console.log(error);
    })
    //console.log('mapas', this.latitudmaps);
    //console.log('mapas', this.longitudmaps);

  }


}
