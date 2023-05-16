import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credencial } from 'src/app/models/credencial';
import { RespuestaLogin } from 'src/app/models/respuesta-login';
@Injectable({
  providedIn: 'root'
})
export class ApiBackendService {

  url:string = 'https://localhost:7001/'

  public res? : RespuestaLogin;
  resultadoEstudiante: any;

  constructor(private http:HttpClient) { }

  public async login(correo:string, password:string):Promise<any>{

    var credencial:Credencial={
      "correo":correo,
      "password":password
    };

    await this.http.post<RespuestaLogin>(this.url+'login',credencial,{headers: {
      'Content-Type': 'application/json'
    }}).subscribe( res =>{
      this.res = res
    })
  }

  public levantarEstuidante(rut:any,p_nombre:any, s_nombre:any, ap_paterno:any, ap_materno:any, edad:any, curso_ingreso:any,genero:any,activo:any){
    var estudiante:any={
      'rut': rut,
      'p_nombre':p_nombre,
      's_nombre': s_nombre,
      'ap_paterno': ap_paterno,
      'ap_materno': ap_materno,
      'edad': edad,
      'curso_ingreso' :curso_ingreso,
      'genero': genero ,
      'activo': activo,
      'tipo':'estudiante'
    };

    this.http.post(this.url+"usuarios",estudiante,{headers: {
      'Content-Type': 'application/json'
      }
    }).subscribe(res =>{
      this.resultadoEstudiante = res;
    })
  }
}
