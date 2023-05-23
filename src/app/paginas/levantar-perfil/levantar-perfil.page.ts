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

  opcionApoderados:boolean = false;
  opcionTutores:boolean = false;

  idEstudiante:number = 0;
  idApoderado0:number = 0;
  idApoderado1:number = 0;
  idTutor0:number = 0;
  idTutor1:number = 0;

  progreso:boolean = false;

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
      'tutor': new FormControl(""),

    })

    this.formularioApoderado1 = this.fb.group({
      'rut': new FormControl("", [Validators.required,Validators.pattern(/^([0-9]+-[0-9kK]{1})+$/)]),
      'p_nombre': new FormControl("",[Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      's_nombre': new FormControl("", [Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      'ap_paterno': new FormControl("",[Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      'ap_materno': new FormControl("",[Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      'celular': new FormControl("",[Validators.required,Validators.pattern(/^([0-9]{8})$/)]),
      'tutor': new FormControl(""),

    })

    this.formularioTutor0 = this.fb.group({
      'rut': new FormControl("", [Validators.required,Validators.pattern(/^([0-9]+-[0-9kK]{1})+$/)]),
      'p_nombre': new FormControl("",[Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      's_nombre': new FormControl("", [Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      'ap_paterno': new FormControl("",[Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      'ap_materno': new FormControl("",[Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      'celular': new FormControl("",[Validators.required,Validators.pattern(/^([0-9]{8})$/)]),
      'tutor': new FormControl(""),
    })

    this.formularioTutor1 = this.fb.group({
      'rut': new FormControl("", [Validators.required,Validators.pattern(/^([0-9]+-[0-9kK]{1})+$/)]),
      'p_nombre': new FormControl("",[Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      's_nombre': new FormControl("", [Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      'ap_paterno': new FormControl("",[Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      'ap_materno': new FormControl("",[Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      'celular': new FormControl("",[Validators.required,Validators.pattern(/^([0-9]{8})$/)]),
      'tutor': new FormControl(""),
    })

    this.formularioOpciones = this.fb.group({
      'opcion': new FormControl("", [Validators.required]),

    })

    this.formularioOpcionesTutor = this.fb.group({
      'opcion': new FormControl("", [Validators.required]),

    })

  }

  public opciones(){
    if(this.formularioOpciones.value.opcion == 'apoderados'){
      this.opcionApoderados = true;
      this.opcionTutores = false;
    }if(this.formularioOpciones.value.opcion == 'tutores'){
      this.opcionTutores = true;
      this.opcionApoderados = false;
    }

  }

  public opcionesTutor(tipo:number){
    if(tipo == 0){
      if(this.formularioOpcionesTutor.value.opcion == 't'){
        this.formularioApoderado0.value.tutor = 't';
        this.formularioApoderado1.value.tutor = 'f';


      }if(this.formularioOpcionesTutor.value.opcion == 'f'){
        this.formularioApoderado1.value.tutor = 't';
        this.formularioApoderado0.value.tutor = 'f';

      }

    }if(tipo == 1){
      if(this.formularioOpcionesTutor.value.opcion == 't'){
        this.formularioTutor0.value.tutor = 't';
        this.formularioTutor1.value.tutor = 'f';
      }if(this.formularioOpcionesTutor.value.opcion == 'f'){
        this.formularioTutor1.value.tutor = 't';
        this.formularioTutor0.value.tutor = 'f';
      }
    }
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


    this.progreso = true;

    if(this.formularioEstudiante.valid ){

      if(this.formularioOpciones.valid){

        if(this.formularioOpciones.value.opcion == "apoderados"){

          if(this.formularioTutor0.invalid && this.formularioTutor1.invalid){


            if(this.formularioApoderado0.valid && this.formularioApoderado1.valid){

              if(this.formularioOpcionesTutor.valid){


                this.api.levantarEstudiante(this.formularioEstudiante.value).subscribe(async res =>{

                  if(res.add == true){

                    this.idEstudiante= res.id;


                    this.api.levantarApoderado(this.formularioApoderado0.value).subscribe(async res =>{


                      if(res.add == true || res.exists==true){

                        this.idApoderado0 = res.id;




                        this.api.levantarApoderado(this.formularioApoderado1.value).subscribe(async res =>{



                          if(res.add == true || res.exists == true){

                            this.idApoderado1 =  await res.id;

                            this.api.levantarDetalleApoderado(this.idEstudiante,this.idApoderado0,this.formularioApoderado0.value.tutor).subscribe(async res =>{

                              if(res.add == true){

                                this.api.levantarDetalleApoderado(this.idEstudiante,this.idApoderado1,this.formularioApoderado1.value.tutor).subscribe(async res =>{


                                  if(res.add == true){

                                    const alert = await this.alertController.create({
                                      header: `Exito`,
                                      message:`Perfil ${this.formularioEstudiante.value.p_nombre} ${this.formularioEstudiante.value.ap_paterno} levantado`,
                                      mode:'ios',
                                    })

                                    await alert.present();

                                    this.progreso = false;

                                  };
                                })


                              }
                            })


                          };

                        })

                      };

                    });

                  }if(res.add == false){
                    const alert = await this.alertController.create({
                      header: `Formulario Invalido`,
                      mode:'ios',
                      message: `El estudiante ya se encuentra registrado`,
                    });

                    await alert.present();
                  }

                })

              }else{
                const alert = await this.alertController.create({
                  header: `Formulario Invalido`,
                  mode:'ios',
                  message: `Seleccione un tutor academico`,
                });

                await alert.present();
              }


            }else{
              const alert = await this.alertController.create({
                header: `Formulario Invalido`,
                mode:'ios',
                message: `Verifique formulario de "Apoderados"`,
              });

              await alert.present();
            }

          }else{

            const alert = await this.alertController.create({
              header: `Formulario Invalido`,
              mode:'ios',
              message: `Complete un solo formulario"`,
            });

            await alert.present();
          };

        }if(this.formularioOpciones.value.opcion == "tutores"){

          if(this.formularioApoderado0.invalid && this.formularioApoderado1.invalid){

            if(this.formularioTutor0.valid && this.formularioTutor1.valid){

              if(this.formularioOpcionesTutor.valid){

                this.api.levantarEstudiante(this.formularioEstudiante.value).subscribe(async res =>{

                  if(res.add == true){

                    this.idEstudiante= res.id;


                    this.api.levantarTutor(this.formularioTutor0.value).subscribe(async res =>{


                      if(res.add == true || res.exists==true){

                        this.idTutor0 = res.id;


                        this.api.levantarTutor(this.formularioTutor1.value).subscribe(async res =>{



                          if(res.add == true || res.exists == true){

                            this.idTutor1 =  res.id;


                            this.api.levantarDetalleTutor(this.idEstudiante,this.idTutor0,this.formularioTutor0.value.tutor).subscribe(async res =>{

                              if(res.add == true){

                                this.api.levantarDetalleTutor(this.idEstudiante,this.idTutor1,this.formularioTutor1.value.tutor).subscribe(async res =>{


                                  if(res.add == true){

                                    const alert = await this.alertController.create({
                                      header: `Exito`,
                                      message:`Perfil ${this.formularioEstudiante.value.p_nombre} ${this.formularioEstudiante.value.ap_paterno} levantado`,
                                      mode:'ios',
                                    })

                                    await alert.present();

                                    this.progreso = false;

                                  };
                                })


                              }
                            })


                          };

                        })

                      };

                    });

                  }if(res.add == false){
                    const alert = await this.alertController.create({
                      header: `Formulario Invalido`,
                      mode:'ios',
                      message: `El estudiante ya se encuentra registrado`,
                    });

                    await alert.present();
                  }

                })

              }else{
                const alert = await this.alertController.create({
                  header: `Formulario Invalido`,
                  mode:'ios',
                  message: `Seleccione un tutor academico`,
                });

                await alert.present();
              }

            }else{
              const alert = await this.alertController.create({
                header: `Formulario Invalido`,
                mode:'ios',
                message: `Verifique formulario de "Tutores"`,
              });

              await alert.present();
            }

          }else{

            const alert = await this.alertController.create({
              header: `Formulario Invalido`,
              mode:'ios',
              message: `Complete un solo formulario"`,
            });

            await alert.present();
          };

        };





      }else{
        const alert = await this.alertController.create({
          header: `Formulario Incompleto`,
          mode:'ios',
          message: `Seleccione "Apoderados" o "Tutores"`,
        });

        await alert.present();
      }






    }else{

      console.log(this.formularioOpciones)

      const alert = await this.alertController.create({
        header: `Datos ivalidos`,
        mode:'ios',
        message: `Porfavor verifique el formulario de estudiantes`,


      });

      await alert.present();
    }

  }


}
