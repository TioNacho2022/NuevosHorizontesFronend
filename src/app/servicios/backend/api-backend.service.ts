import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credencial } from 'src/app/models/credencial';
import { RespuestaLogin } from 'src/app/models/respuesta-login';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiBackendService {

  url:string = 'https://localhost:7160/api/'


  respuestaLogin: any;
  resultadoEstudiante: any;

  constructor(private http:HttpClient){ }

  login(correo:string, password:string):Observable<any>{
    var credencial:Credencial={
      "Correo":correo,
      "Password":password
    };

    return this.http.post<JSON>(this.url+'Login',credencial,{headers: {
      'Content-Type': 'application/json'
    }})
  }

  public obtenerEstudiante(id:string|null):Observable<any>{
    return this.http.get(this.url+"Estudiante/"+id,{headers: {
      'Content-Type': 'application/json'
      }
    });
  }

  public obtenerApoderado(id:string|null):Observable<any>{
    return this.http.get(this.url+"Apoderado/"+id,{headers: {
      'Content-Type': 'application/json'
      }
    });
  }

  public obtenerTutor(id:string|null):Observable<any>{
    return this.http.get(this.url+"Tutor/"+id,{headers: {
      'Content-Type': 'application/json'
      }
    });
  }

  public obtenerExamenes(id:string|null):Observable<any>{
    return this.http.get(this.url+"Examen/"+id,{headers: {
      'Content-Type': 'application/json'
      }
    });
  }

  public modificarEstudiante(id:string|null,estudiante:any):Observable<any>{
    var estudiante:any={
      'rut': estudiante.rut,
      'p_nombre':estudiante.p_nombre,
      's_nombre': estudiante.s_nombre,
      'ap_paterno':estudiante.ap_paterno,
      'ap_materno': estudiante.ap_materno,
      'edad': estudiante.edad,
      'curso_ingreso' :estudiante.curso_ingreso,
      'genero': estudiante.genero
    };
    return this.http.put(this.url+"Estudiante/"+id,estudiante,{headers: {
      'Content-Type': 'application/json'
      }
    });
  }
  public levantarEstudiante(estudiante:any):Observable<any>{
    var estudiante:any={
      'rut': estudiante.rut,
      'p_nombre':estudiante.p_nombre,
      's_nombre': estudiante.s_nombre,
      'ap_paterno':estudiante.ap_paterno,
      'ap_materno': estudiante.ap_materno,
      'edad': estudiante.edad,
      'curso_ingreso' :estudiante.curso_ingreso,
      'genero': estudiante.genero
    };

    return this.http.post(this.url+"Estudiante",estudiante,{headers: {
      'Content-Type': 'application/json'
      }
    });
  }

  public levantarApoderado(apoderado:any):Observable<any>{
    var apoderado:any={
      'rut': apoderado.rut,
      'p_nombre':apoderado.p_nombre,
      's_nombre': apoderado.s_nombre,
      'ap_paterno':apoderado.ap_paterno,
      'ap_materno': apoderado.ap_materno,
      'celular' : "9"+apoderado.celular
    };

    return this.http.post(this.url+"Apoderado",apoderado,{headers: {
      'Content-Type': 'application/json'
      }
    });
  }

  public levantarTutor(tutor:any):Observable<any>{
    var tutor:any={
      'rut': tutor.rut,
      'p_nombre':tutor.p_nombre,
      's_nombre': tutor.s_nombre,
      'ap_paterno':tutor.ap_paterno,
      'ap_materno': tutor.ap_materno,
      'celular' : "9"+tutor.celular
    };

    return this.http.post(this.url+"Tutor",tutor,{headers: {
      'Content-Type': 'application/json'
      }
    });
  }

  public levantarDetalleApoderado(estudiante_id:number,apoderado_id:number,tutor:string):Observable<any>{
    var detalleApoderado:any={
      'estudianteId':estudiante_id,
      'apoderadoId': apoderado_id,
      'tutor':tutor
    };

    return this.http.post(this.url+"DetalleApoderado",detalleApoderado,{headers: {
      'Content-Type': 'application/json'
      }
    });
  }

  public levantarDetalleTutor(estudiante_id:number,tutor_id:number,tutor:string):Observable<any>{
    var detalleTutor:any={
      'estudianteId':estudiante_id,
      'tutorId': tutor_id,
      'tutor':tutor
    };

    return this.http.post(this.url+"DetalleTutor",detalleTutor,{headers: {
      'Content-Type': 'application/json'
      }
    });
  }

  public levantarExamen(examen:any,id:any):Observable<any>{
    var examen:any={
      'correcta_pregunta':examen.correcta_pregunta,
      'incorrecta_pregunta': examen.incorrecta_pregunta,
      'total_pregunta':examen.total_pregunta,
      'nota': examen.nota,
      'diagnostico_asignatura_id': examen.diagnostico_asignatura_id,
      'estudiante_id': parseInt(id)

    };

    return this.http.post(this.url+"Examen",examen,{headers: {
      'Content-Type': 'application/json'
      }
    });
  }

  public obtenerDetalleApoderado(id:number):Observable<any>{


    return this.http.get(this.url+"DetalleApoderado/"+id,{headers: {
      'Content-Type': 'application/json'
      }
    });
  }

  public obtenerDetalleTutor(id:number):Observable<any>{


    return this.http.get(this.url+"DetalleTutor/"+id,{headers: {
      'Content-Type': 'application/json'
      }
    });
  }


  public listaEstudiantesPendientes():Observable<any>{


    return this.http.get(this.url+"Estudiante/Pendientes",{headers: {
      'Content-Type': 'application/json'
      }
    });
  }



  public eliminarDetalleApoderado(id:number):Observable<any>{

    return this.http.delete(this.url+"DetalleApoderado/"+id,{headers: {
      'Content-Type': 'application/json'
      }
    });
  }

  public eliminarDetalleTutor(id:number):Observable<any>{

    return this.http.delete(this.url+"DetalleTutor/"+id,{headers: {
      'Content-Type': 'application/json'
      }
    });
  }

  public eliminarApoderado(id:number):Observable<any>{

    return this.http.delete(this.url+"Apoderado/"+id,{headers: {
      'Content-Type': 'application/json'
      }
    });
  }

  public eliminarTutor(id:number):Observable<any>{

    return this.http.delete(this.url+"Tutor/"+id,{headers: {
      'Content-Type': 'application/json'
      }
    });
  }

  public eliminarEstudiante(id:number):Observable<any>{

    return this.http.delete(this.url+"Estudiante/"+id,{headers: {
      'Content-Type': 'application/json'
      }
    });
  }

  public obtenerCursos():Observable<any>{

    return this.http.get(this.url+"Curso",{headers: {
      'Content-Type': 'application/json'
      }
    });
  }

  public asignarCurso(id:string|null, curso_id:string):Observable<any>{

    parseInt(curso_id);

    return this.http.put(this.url+"Estudiante/"+id+"/Asignacion/"+curso_id,{headers: {
      'Content-Type': 'application/json'
      }
    });
  }

  public confirmarContinuidad(id:string|null, respuesta:string):Observable<any>{


    return this.http.put(this.url+"Estudiante/"+id+"/Continuidad?respuesta="+respuesta,{headers: {
      'Content-Type': 'application/json'
      }
    });
  }

  public obtenerDenegacion(id:string):Observable<any>{


    return this.http.get(this.url+"Denegacion/"+id,{headers: {
      'Content-Type': 'application/json'
      }
    });
  }



}
