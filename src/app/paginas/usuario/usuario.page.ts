import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiBackendService } from 'src/app/servicios/backend/api-backend.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  constructor(private route:ActivatedRoute, private api:ApiBackendService) { }

  id!:any;
  rol!: string | null;

  mostrarTutores:boolean = false;
  mostrarApoderados:boolean = false;

  usuario:any;

  apoderadosDetalle:any;
  apoderados:any = [];

  tutorDetalle:any;
  tutores:any = [];


  ngOnInit() {
    this.rol = this.route.snapshot.queryParamMap.get('rol');
    this.id = this.route.snapshot.queryParamMap.get('id');

    if(this.rol == 'Estudiante'){
      this.api.obtenerEstudiante(this.id).subscribe((res:any)=>{

        if(res.get == true){
          this.usuario = res;

          this.api.obtenerDetalleApoderado(this.usuario.usuario.id).subscribe(res=>{

            if(res.get == true){
              this.api.obtenerDetalleApoderado(this.usuario.usuario.id).subscribe(res =>{
                this.apoderadosDetalle = res;

                this.apoderadosDetalle.detalleApoderado.forEach((element:any) => {
                  this.api.obtenerApoderado(element.apoderadoId).subscribe(res =>{
                    res.tutor = element.tutor
                    this.apoderados.push(res);

                  })

                });
              })

              console.log(this.apoderados);

              this.mostrarApoderados = true;

            }if(res.get == false){
              this.api.obtenerDetalleTutor(this.usuario.usuario.id).subscribe(res =>{
                this.tutorDetalle = res;



                this.tutorDetalle.detalleTutor.forEach((element:any) => {
                  this.api.obtenerTutor(element.tutorId).subscribe(res =>{
                    res.tutor = element.tutor
                    this.tutores.push(res);

                  })

                });



              })

              this.mostrarTutores = true;


            }
          });


        }
      })
    }
  }

}
