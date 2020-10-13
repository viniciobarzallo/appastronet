import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AlmacenamientoService {

  constructor() { }

  // JSON "set" example
  async almacenamientoVisita(cedula:any, nombres:any, correo:any, calleprincipal:any, 
    callesecundaria:any, referencia:any, convencional:any, celular:any, contrato:any, plan:any, ip:any,
    antena:any, contrasena:any, observacion:any, latitud:number, longitud:number) {
    const id = new Date().getTime();

    await Storage.set({
      //vamos a obtener datos 
      key: `${id}`, 
      value: JSON.stringify({
        id,
        cedula, 
        nombres, 
        correo,
        calleprincipal,
        callesecundaria,
        referencia,
        convencional,
        celular,
        contrato,
        plan,
        ip,
        antena,
        contrasena,
        observacion, 
        latitud,
        longitud
      })
    });
  }

  async almacenamientoInstalacion(fecha:any, cedula:any, nombres:any, correo:any, calleprincipal:any, 
    callesecundaria:any, referencia:any, contrato:any, convencional:any, celular:any, plan:any, ip:any,
    antena:any, observacion:any, latitud:any, longitud:any) {
    const id = new Date().getTime();

    await Storage.set({
      //vamos a obtener datos 
      key: `${id}`, 
      value: JSON.stringify({
        id,
        fecha, 
        cedula, 
        nombres, 
        correo,
        calleprincipal,
        callesecundaria,
        referencia,
        contrato,
        convencional,
        celular,
        plan,
        ip,
        antena,
        observacion, 
        latitud,
        longitud
      })
    });
  }

}
