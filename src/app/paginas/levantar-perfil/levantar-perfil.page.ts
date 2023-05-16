import { Component, Input, OnInit, } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiBackendService } from 'src/app/servicios/backend/api-backend.service';

@Component({
  selector: 'app-levantar-perfil',
  templateUrl: './levantar-perfil.page.html',
  styleUrls: ['./levantar-perfil.page.scss'],
})
export class LevantarPerfilPage implements OnInit {

  formularioEstudiante: FormGroup | any;
  formularioApoderado0:FormGroup | any;
  formularioApoderado1:FormGroup | any;
  formularioTutor0:FormGroup | any;
  formularioTutor1:FormGroup | any;

  formularioOpciones:FormGroup | any;
  formularioOpcionesTutor:FormGroup | any;

  opcion:boolean = true;

  cursos:Array<any>=[
    {nombre:"1 Basico"},
    {nombre:"2 Basico"},
    {nombre:"3 Basico"},
    {nombre:"4 Basico"},
    {nombre:"5 Basico"},
    {nombre:"6 Basico"},
    {nombre:"7 Basico"},
    {nombre:"8 Basico"},
    {nombre:"1 Medio"},
    {nombre:"2 Medio"},
    {nombre:"3 Medio"},
    {nombre:"4 Medio"}
  ]

  genero:Array<any>=[
    {nombre:"Femenino"},
    {nombre:"Masculino"},
    {nombre:"Otro"},

  ]

  constructor(private alertController: AlertController, private fb: FormBuilder, private router:Router,private api:ApiBackendService){
    this.formularioEstudiante = this.fb.group({
      'rut': new FormControl("", [Validators.required,Validators.pattern(/^([0-9]+-[0-9kK]{1})+$/)]),
      'p_nombre': new FormControl("",[Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      's_nombre': new FormControl("", [Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      'ap_paterno': new FormControl("",[Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      'ap_materno': new FormControl("",[Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      'edad': new FormControl("", [Validators.required,Validators.max(20),Validators.min(11)]),
      'curso_ingreso': new FormControl("", [Validators.required]),
      'genero': new FormControl("", [Validators.required]),
      'activo': new FormControl("f"),
    })

    this.formularioApoderado0 = this.fb.group({
      'rut': new FormControl("", [Validators.required,Validators.pattern(/^([0-9]+-[0-9kK]{1})+$/)]),
      'p_nombre': new FormControl("",[Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      's_nombre': new FormControl("", [Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      'ap_paterno': new FormControl("",[Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      'ap_materno': new FormControl("",[Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      'celular': new FormControl("",[Validators.required,Validators.pattern(/^([0-9]{8})$/)]),
      'tutor': new FormControl("",[Validators.required]),

    })

    this.formularioApoderado1 = this.fb.group({
      'rut': new FormControl("", [Validators.required,Validators.pattern(/^([0-9]+-[0-9kK]{1})+$/)]),
      'p_nombre': new FormControl("",[Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      's_nombre': new FormControl("", [Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      'ap_paterno': new FormControl("",[Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      'ap_materno': new FormControl("",[Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      'celular': new FormControl("",[Validators.required,Validators.pattern(/^([0-9]{8})$/)]),
      'tutor': new FormControl("",[Validators.required]),

    })

    this.formularioTutor0 = this.fb.group({
      'rut': new FormControl("", [Validators.required,Validators.pattern(/^([0-9]+-[0-9kK]{1})+$/)]),
      'p_nombre': new FormControl("",[Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      's_nombre': new FormControl("", [Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      'ap_paterno': new FormControl("",[Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      'ap_materno': new FormControl("",[Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      'celular': new FormControl("",[Validators.required,Validators.pattern(/^([0-9]{8})$/)]),
      'tutor': new FormControl("",[Validators.required]),
    })

    this.formularioTutor1 = this.fb.group({
      'rut': new FormControl("", [Validators.required,Validators.pattern(/^([0-9]+-[0-9kK]{1})+$/)]),
      'p_nombre': new FormControl("",[Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      's_nombre': new FormControl("", [Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      'ap_paterno': new FormControl("",[Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      'ap_materno': new FormControl("",[Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      'celular': new FormControl("",[Validators.required,Validators.pattern(/^([0-9]{8})$/)]),
      'tuto': new FormControl("",[Validators.required]),
    })

    this.formularioOpciones = this.fb.group({
      'opcion': new FormControl("", [Validators.required]),

    })

    this.formularioOpcionesTutor = this.fb.group({
      'opcion': new FormControl("", [Validators.required]),

    })

  }

  public opciones(){
    if(this.formularioOpciones.value.opcion == 'true'){
      this.opcion = true;

    }if(this.formularioOpciones.value.opcion == 'false'){
      this.opcion = false;
    }

  }

  public opcionesTutor(tipo:number){
    if(tipo == 0){
      if(this.formularioOpcionesTutor.value.opcion == 't'){
        this.formularioApoderado0.value.tutor = 't';
        this.formularioApoderado1.value.tutor = 'f';
        console.log(this.formularioApoderado0.value.tutor)
        console.log(this.formularioApoderado1.value.tutor)

      }if(this.formularioOpcionesTutor.value.opcion == 'f'){
        this.formularioApoderado1.value.tutor = 't';
        this.formularioApoderado0.value.tutor = 'f';
        console.log(this.formularioApoderado0.value.tutor)
        console.log(this.formularioApoderado1.value.tutor)
      }

    }if(tipo == 1){
      if(this.formularioOpcionesTutor.value.opcion == 't'){
        this.formularioTutor0.value.tutor = 't';
        this.formularioTutor1.value.tutor = 'f';
        console.log(this.formularioTutor0.value.tutor)
        console.log(this.formularioTutor1.value.tutor)
      }if(this.formularioOpcionesTutor.value.opcion == 'f'){
        this.formularioTutor1.value.tutor = 't';
        this.formularioTutor0.value.tutor = 'f';
        console.log(this.formularioTutor0.value.tutor)
        console.log(this.formularioTutor1.value.tutor)
      }
    }
  }

  public prueba(){
    console.log(parseInt("9"+this.formularioApoderado0.value.celular))
    console.log(this.formularioOpciones.value.opcion)
  }
  ngOnInit(){
  }

  public campo(control: string, tipo: number) {
    if(tipo == 0){
      return this.formularioEstudiante.get(control);
    }if(tipo == 1){
      return this.formularioApoderado0.get(control);
    }if(tipo == 2){
      return this.formularioApoderado1.get(control);
    }if(tipo == 3){
      return this.formularioTutor0.get(control);
    }if(tipo == 4){
      return this.formularioTutor1.get(control);
    }

  }
  public fueTocado(control: string, tipo: number) {
    if(tipo == 0){
      return this.formularioEstudiante.get(control)?.touched;
    }if(tipo == 1){
      return this.formularioApoderado0.get(control)?.touched;
    }if(tipo == 2){
      return this.formularioApoderado1.get(control)?.touched;
    }if(tipo == 3){
      return this.formularioTutor0.get(control)?.touched;
    }if(tipo == 4){
      return this.formularioTutor1.get(control)?.touched;
    }
  }



  public async levantar(){
    if(this.formularioEstudiante.valid){


      if(this.formularioApoderado0.valid && this.formularioApoderado1.valid){

        if(this.formularioTutor0.invalid && this.formularioTutor1.invalid){
          //mandar formulario de apoderado

          this.api.levantarEstuidante(this.formularioEstudiante.value.rut,this.formularioEstudiante.value.p_nombre,this.formularioEstudiante.value.s_nombre,this.formularioEstudiante.value.ap_paterno,this.formularioEstudiante.value.ap_materno,this.formularioEstudiante.value.edad,this.formularioEstudiante.value.curso_ingreso,this.formularioEstudiante.value.genero,this.formularioEstudiante.value.activa);
          console.log(this.api.resultadoEstudiante)

        }else{
          const alert = await this.alertController.create({
            header: `Formulario incorrecto`,
            mode:'ios',
            message:'Por favor llenar solo un fomulario'
          });

          await alert.present();
        }

      }if(this.formularioTutor0.valid && this.formularioTutor1.valid){

        if(this.formularioApoderado0.invalid && this.formularioApoderado1.invalid){

          //mandar formulario de tutores
        }else{
          const alert = await this.alertController.create({
            header: `Formulario incorrecto`,
            mode:'ios',
            message:'Por favor llenar solo un fomulario'
          });

          await alert.present();
        }
      }else{
        const alert = await this.alertController.create({
          header: `Datos invalidos`,
          mode:'ios',
          message:'Por favor llenar fomulario Padres o Tutores'
        });



        await alert.present();
      }



    }else{
      const alert = await this.alertController.create({
        header: `Datos invalidos`,
        mode:'ios',
        message:'Por favor llenar los campos de estudiante'
      });



      await alert.present();
    }
  }


}
