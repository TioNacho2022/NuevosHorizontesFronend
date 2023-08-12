import { Component, OnInit } from '@angular/core';
import { ApiBackendService } from 'src/app/servicios/backend/api-backend.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-horario-estudiante',
  templateUrl: './horario-estudiante.page.html',
  styleUrls: ['./horario-estudiante.page.scss'],
})
export class HorarioEstudiantePage implements OnInit {

  constructor(private route:ActivatedRoute, private api:ApiBackendService,) { }

  id!: any;
  datosEstudiante:any;
  miHorarioEstudiante:any;
  mostrarHorario:boolean = false;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['Id'];
      console.log(this.id);
    });

    this.api.obtenerEstudiante(this.id).subscribe(res => {
      this.datosEstudiante = res;
    })

    this.api.obtenerHorarioEstudiante(this.id).subscribe(res=>{
      this.mostrarHorario = true;
      this.miHorarioEstudiante = res;

    })


  }

}
