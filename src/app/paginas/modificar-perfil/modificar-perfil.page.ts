import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiBackendService } from 'src/app/servicios/backend/api-backend.service';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.page.html',
  styleUrls: ['./modificar-perfil.page.scss'],
})
export class ModificarPerfilPage implements OnInit {

  id: string | null = '';

  progreso:boolean = false;

  formularioEstudiante!: FormGroup;
  formularioApoderado0:FormGroup | any;
  formularioApoderado1:FormGroup | any;
  formularioTutor0:FormGroup | any;
  formularioTutor1:FormGroup | any;

  formularioOpciones:FormGroup | any;
  formularioOpcionesTutor:FormGroup | any;

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

  constructor(private route:ActivatedRoute,private alertController: AlertController, private fb: FormBuilder, private router:Router,private api:ApiBackendService) {

    this.formularioEstudiante = this.fb.group({
      'rut': new FormControl("", [Validators.required,Validators.pattern(/^([0-9]+-[0-9kK]{1})+$/)]),
      'p_nombre': new FormControl("",[Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      's_nombre': new FormControl("", [Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      'ap_paterno': new FormControl("",[Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      'ap_materno': new FormControl("",[Validators.required,Validators.pattern(/^([A-Z]{1}[a-z]+)+$/),Validators.maxLength(20)]),
      'edad': new FormControl("", [Validators.required,Validators.max(20),Validators.min(11)]),
      'curso_ingreso': new FormControl("", [Validators.required]),
      'genero': new FormControl("", [Validators.required]),

    })
  }

  ngOnInit() {

    this.id= this.route.snapshot.queryParamMap.get('id');

    this.progreso = true;

    this.api.obtenerEstudiante(this.id).subscribe(res=>{
      res = res.usuario;

      this.formularioEstudiante.setValue({
        rut:res.rut,
        p_nombre:res.p_nombre,
        s_nombre:res.s_nombre,
        ap_paterno:res.ap_paterno,
        ap_materno:res.ap_materno,
        edad:res.edad,
        curso_ingreso:res.curso_ingreso,
        genero:res.genero
      })

      this.progreso = false;

    })
  }

  public async guardar(){

    if(this.formularioEstudiante.valid){

      this.progreso = true;

      this.api.modificarEstudiante(this.id,this.formularioEstudiante.value).subscribe(async res =>{

        if(res.put == true){

          const alert = await this.alertController.create({
            header: 'Exito',
            subHeader: "Cambios guardados",
            mode:'ios',

          });

          await alert.present();

          this.progreso = false;

        }else{

          const alert = await this.alertController.create({
            header: 'Error',
            subHeader: "Los cambios no se pudieron guardar",
            mode:'ios',

          });

          await alert.present();

          this.progreso = false;
        }

      })

    }else{

      const alert = await this.alertController.create({
        header: 'Campos incorrectos',
        subHeader: "Revise el formulario estudiante",
        mode:'ios',

      });

      await alert.present();
    }
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

}
