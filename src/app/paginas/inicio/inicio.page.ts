import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiBackendService } from 'src/app/servicios/backend/api-backend.service';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {


  id!:any;
  rol!: string | null;

  estudianteOpciones:boolean = false;
  asistenteAdmision:boolean = false;

  formularioContinuidad:FormGroup|any;

  continuidad:boolean = false;

  numeroMensajes:number = 0;

  mostrarMensajes:boolean = false;

  progresoConfirmacion:boolean = false;

  denegacion:any;

  denegacionInformacion:any;


  constructor(private route:ActivatedRoute, private alertController: AlertController, private fb: FormBuilder,private api: ApiBackendService, private navCtrl: NavController, private toast: ToastController,) {
    this.formularioContinuidad = this.fb.group({
      'respuesta': new FormControl("", [Validators.required]),
    })
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async ngOnInit() {

    this.rol = this.route.snapshot.queryParamMap.get('rol');
    this.id = this.route.snapshot.queryParamMap.get('id');



    if(this?.rol == 'estudiante'){

      this.api.obtenerDenegacion(this.id).subscribe(res=>{



        if(res.get == true){

          this.denegacionInformacion = res?.denegacion;
          this.numeroMensajes++;
          this.mostrarMensajes = true;
          this.denegacion = true;

        }if(res.get == false){

          this.api.obtenerEstudiante(this.id).subscribe(res=>{

            if(res?.continuidad == 'pendiente'){
              this.mostrarMensajes = true;
              this.numeroMensajes++;
              this.continuidad = true;
            }
          })
        }

      })
    }if(this?.rol === 'Asistente de Admisión y Matrícula'){
      this.asistenteAdmision = true;
    }


  }

  public async confirmar(){

    this.progresoConfirmacion = true;

    if(this.formularioContinuidad.valid){
      this.api.confirmarContinuidad(this.id,this.formularioContinuidad.value.respuesta).subscribe(async res=>{
      if(res?.put == true){

        const alert = await this.alertController.create({
          header: `Confirmación de continuidad`,
          message: `Gracias por tu respuesta`,
          mode:'ios',
        });

        await alert.present();

        this.progresoConfirmacion = false;



        this.continuidad = false;
        this.numeroMensajes--;

        if(this.numeroMensajes == 0){
          this.mostrarMensajes = false;
        }


      }else{
        const alert = await this.alertController.create({
          header: `Error de confirmación`,
          message: `No se pudo confirmar tu continuidad`,
          mode:'ios',
        });

        await alert.present();

        this.progresoConfirmacion = false;


      }

      })
    }else{
      const alert = await this.alertController.create({
        header: `Error de confirmación`,
        message: `Por favor seleccione una opción`,
      })

      await alert.present();

    }


  }

  public campo(control: string) {
    return this.formularioContinuidad.get(control);
  }
  public fueTocado(control: string){
    return this.formularioContinuidad.get(control).touched;
  }


}
