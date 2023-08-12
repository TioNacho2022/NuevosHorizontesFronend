import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiBackendService } from 'src/app/servicios/backend/api-backend.service';

@Component({
  selector: 'app-notas-estudiante',
  templateUrl: './notas-estudiante.page.html',
  styleUrls: ['./notas-estudiante.page.scss'],
})
export class NotasEstudiantePage implements OnInit {

  constructor(private route:ActivatedRoute, private api:ApiBackendService) { }
  id!: any;

  datosEstudiante:any;
  misAsignaturasData:any;

  notas:any;

  asignaturaVista:any;
  profesorVista:any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['Id'];
      console.log(this.id);
    });

    this.api.obtenerEstudiante(this.id).subscribe(res => {
      this.datosEstudiante = res;

      this.api.obtenerDetallesCurso(this.datosEstudiante?.usuario?.curso?.id).subscribe(res=>{
        this.misAsignaturasData = res;

      })
    })

  }

  public verNotas(id:any):any{
    this.api.obtenerNotas(id,this.datosEstudiante?.usuario?.id).subscribe(res=>{
     this.notas = res;
     this.misAsignaturasData.detalles_curso.forEach((element:any) => {
      if(element.asignatura.id == id){
        this.asignaturaVista = element.asignatura.nombre;
        this.profesorVista = element.asignatura.profesor.p_nombre +" "+ element.asignatura.profesor.ap_paterno;
      }
    });
    })
  }

}
