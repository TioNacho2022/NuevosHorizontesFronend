import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiBackendService } from 'src/app/servicios/backend/api-backend.service';

@Component({
  selector: 'app-asistencia-estudiante',
  templateUrl: './asistencia-estudiante.page.html',
  styleUrls: ['./asistencia-estudiante.page.scss'],
})
export class AsistenciaEstudiantePage implements OnInit {

  constructor(private route:ActivatedRoute, private api:ApiBackendService, private fb: FormBuilder,) {
    this.formularioAsistenciaEstudiante = this.fb.group({
      'asignatura_id': new FormControl("", []),

    })
  }
  id!: any;

  datosEstudiante:any;
  datosAsistenciaEstudiante:any;
  misAsignaturasData:any;

  formularioAsistenciaEstudiante:FormGroup|any;

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

  public verAsistencia():any{
    this.api.obtenerAsistenciaEstudiante(this.formularioAsistenciaEstudiante.value.asignatura_id,this.datosEstudiante?.usuario?.curso?.id,this.datosEstudiante?.usuario?.id).subscribe(res=>{
      this.datosAsistenciaEstudiante = res;
    })
  }

}
