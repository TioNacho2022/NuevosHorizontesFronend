import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiBackendService } from 'src/app/servicios/backend/api-backend.service';
import { RespuestaLogin } from 'src/app/models/respuesta-login';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup | any;

  progreso:boolean= false;
  res: any;


  constructor( private alertController: AlertController, private fb: FormBuilder,private api: ApiBackendService, private router:Router, private navCtrl: NavController, private toast: ToastController,) {
    this.formularioLogin = this.fb.group({
      'correo': new FormControl("", [Validators.email,Validators.required]),
      'password': new FormControl("",[Validators.required,Validators.maxLength(20)])
    })

  }

  ngOnInit() {
  }

  public async ingresar(){

    if(this.formularioLogin.valid){

      this.progreso = true;

      this.api.login(this.formularioLogin.value.correo,this.formularioLogin.value.password).subscribe(async res => {

        if(res.auth == true){

          const alert = await this.alertController.create({
            header: `Bienvenido ${res.rol}`,
            mode:'ios',
            message: `${res.usuario?.p_nombre} ${res.usuario?.ap_paterno}`,


          });

          this.progreso = false;

          await alert.present();

          this.formularioLogin.reset();


          this.router.navigate(['/inicio'],{queryParams:{
            rol:this.res?.rol,
          }});

        }if(res.auth == false){
          const alert = await this.alertController.create({
            header: `Contraseña o correo incorrecto`,
            mode:'ios',
          });

          this.progreso = false;

          await alert.present();

          this.formularioLogin.reset();
        };

      });




    }else{
      const alert = await this.alertController.create({
        header: 'Campos invalidos',
        mode:'ios',

      });

      await alert.present();

    }

  }

  public campo(control: string) {
    return this.formularioLogin.get(control);
  }
  public fueTocado(control: string){
    return this.formularioLogin.get(control).touched;
  }

}
