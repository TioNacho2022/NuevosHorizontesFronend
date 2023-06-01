import { Component, OnInit } from '@angular/core';
import { ApiBackendService } from 'src/app/servicios/backend/api-backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.page.html',
  styleUrls: ['./examen.page.scss'],
})
export class ExamenPage implements OnInit {

  id!:string|null;

  progreso:boolean = false;

  formularioExamen: FormGroup | any;

  asignaturas: any[] = [
    {
      id:1,
      nombre:'Matematicas'
    },
    {
      id:2,
      nombre:'Lenguaje'
    }
  ]

  constructor(private api:ApiBackendService,private route:ActivatedRoute, private router:Router,private alertController: AlertController, private fb: FormBuilder) {

    this.formularioExamen = this.fb.group({
      'correcta_pregunta': new FormControl(0, [Validators.required,Validators.min(0),Validators.max(60)]),
      'incorrecta_pregunta': new FormControl(0,[Validators.required,Validators.min(0),Validators.max(60)]),
      'total_pregunta': new FormControl(1,[Validators.required,Validators.min(1),Validators.max(60)]),
      'nota': new FormControl(1,[Validators.required,Validators.min(1),Validators.max(7)]),
      'diagnostico_asignatura_id': new FormControl("",[Validators.required])

    })

  }

  ngOnInit() {
    this.id= this.route.snapshot.queryParamMap.get('id');
  }

  public async agregarExamen(){

   if(this.formularioExamen.valid){

    this.progreso = true;

    this.api.levantarExamen(this.formularioExamen.value,this.id).subscribe(async res=>{

      if(res.add==true){
        const alert = await this.alertController.create({
          header: 'Examen agregado',
          message: 'El examen fue agregado correctamente',
          mode:'ios',
        })

        await alert.present();

        this.progreso = false;

      }if(res.add==false){
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Numero maximo de examenes alcanzado',
          mode:'ios',
        })

        await alert.present();

        this.progreso = false;
      }
    })
   }else{
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Formulario incorrecto',
      mode:'ios',
    })

    await alert.present();
   }

  }

  public campo(control: string) {
    return this.formularioExamen.get(control);
  }
  public fueTocado(control: string){
    return this.formularioExamen.get(control).touched;
  }


}
