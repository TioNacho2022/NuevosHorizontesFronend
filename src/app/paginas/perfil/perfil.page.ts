import { Component, OnInit } from '@angular/core';
import { ApiBackendService } from 'src/app/servicios/backend/api-backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  id!:string|null;
  estudiante:any;

  examenes:any;

  tutor:boolean = false;
  apoderado:boolean = false;

  datosApoderado0:any;
  datosApoderado1:any;

  datosTutor0:any;
  datosTutor1:any;

  apoderado0:any={
    id:0,
    tutor:''

  };

  apoderado1:any={
    id:0,
    tutor:''

  };

  tutor0:any={
    id:0,
    tutor:''

  };

  tutor1:any={
    id:0,
    tutor:''

  };





  constructor(private api:ApiBackendService,private route:ActivatedRoute, private router:Router,private alertController: AlertController) {


  }

  ngOnInit() {

    this.id= this.route.snapshot.queryParamMap.get('id');

    this.api.obtenerExamenes(this.id).subscribe(res=>{
      if(res.diagnostico_asignatura_id == 1){
        res.diagnostico_asignatura_id = 'Matematicas';
      }else if(res.diagnostico_asignatura_id == 2){
        res.diagnostico_asignatura_id = 'Lenguaje';
      }

      this.examenes = res;
    })

    this.api.obtenerEstudiante(this.id).subscribe(res=>{

      this.estudiante=res.usuario;
      console.log(this.estudiante)

      this.api.obtenerDetalleApoderado(this.estudiante.id).subscribe(res=>{

        if(res.get == true){

          this.apoderado = true;
          this.apoderado0.id = res.detalleApoderado[0].apoderadoId;
          this.apoderado0.tutor = res.detalleApoderado[0].tutor;
          this.apoderado1.id =res.detalleApoderado[1].apoderadoId;
          this.apoderado1.tutor =res.detalleApoderado[1].tutor;

          this.api.obtenerApoderado(this.apoderado0.id).subscribe(res=>{
            this.datosApoderado0 = res.usuario;

          })

          this.api.obtenerApoderado(this.apoderado1.id).subscribe(res=>{
            this.datosApoderado1 = res.usuario;


          })
        }if(res.get == false){

          this.tutor = true;
          this.api.obtenerDetalleTutor(this.estudiante.id).subscribe(res=>{
            if(res.get == true){
              this.tutor0.id = res.detalleTutor[0].tutorId;
              this.tutor0.tutor = res.detalleTutor[0].tutor;
              this.tutor1.id =res.detalleTutor[1].tutorId;
              this.tutor1.tutor =res.detalleTutor[1].tutor;

              this.api.obtenerTutor(this.tutor0.id).subscribe(res=>{

                this.datosTutor0 = res.usuario;
              })

              this.api.obtenerTutor(this.tutor1.id).subscribe(res=>{

                this.datosTutor1 = res.usuario;
              })
            }
          })
        }
      })
    })


  }






}
