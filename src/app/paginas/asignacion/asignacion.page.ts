import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ApiBackendService } from 'src/app/servicios/backend/api-backend.service';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.page.html',
  styleUrls: ['./asignacion.page.scss'],
})
export class AsignacionPage implements OnInit {

  id:string|null = "";

  estudiante!:any;
  cursos!:any;

  cursoAsigandoo:any;

  formularioAsignacion: FormGroup | any;

  error:boolean = false;

  progress:boolean = false;
  progress0:boolean = false;

  constructor(private route:ActivatedRoute, private alertController: AlertController, private fb: FormBuilder,private api: ApiBackendService,private router:Router) {

    this.formularioAsignacion = this.fb.group({
      'curso_id': new FormControl("", [Validators.required]),
    })
   }

  ngOnInit() {

    this.progress0 = true;

    this.id= this.route.snapshot.queryParamMap.get('id');

    this.api.obtenerEstudiante(this.id).subscribe(res=>{
      this.estudiante = res.usuario;

      this.api.obtenerCursos().subscribe(res=>{
        this.cursos = res;

        this.progress0 = false;
      })

    })

  }

  public campo(control: string) {
    return this.formularioAsignacion.get(control);
  }
  public fueTocado(control: string){
    return this.formularioAsignacion.get(control).touched;
  }

  public cursoAsignado(nombre:string,id:number):void{

    this.error = false;

    this.cursoAsigandoo = nombre;

    this.formularioAsignacion.controls['curso_id'].setValue(id);

  }

  public async asignacion(){

    if(this.formularioAsignacion.valid){

      this.progress = true;

      this.api.asignarCurso(this.id,this.formularioAsignacion.value.curso_id).subscribe(async res=>{

        if(res.put == true){

          const alerta = await this.alertController.create({
            header: 'Asignación',
            subHeader:`${this.estudiante?.p_nombre} ${this.estudiante?.ap_paterno}`,
            message: 'Se ha asignado el curso '+this.cursoAsigandoo,
            mode: 'ios',
          })

          await alerta.present();

          this.formularioAsignacion.reset();
          this.cursoAsigandoo = null;

          this.progress = false;

          this.router.navigate(['/estudiantes-pendientes']);


        }
      })




    }else{
      const alerta = await this.alertController.create({
        header: 'Error',
        message: 'Debe seleccionar un curso',
        mode: 'ios',
      })

      await alerta.present();

      this.error = true;
    }
  }

}
