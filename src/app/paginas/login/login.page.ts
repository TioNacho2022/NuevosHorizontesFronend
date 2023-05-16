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

      await this.api.login(this.formularioLogin.value.correo,this.formularioLogin.value.password);
      var res = this.api.res;
      console.log(res?.usuario);
      if(res?.usuario != undefined){
        if(res?.usuario == true){
          const alert = await this.alertController.create({
            header: `Bienvenido ${res?.tipo}`,
            mode:'ios',


          });

          this.progreso = false;

          await alert.present();

          this.formularioLogin.reset();


          this.router.navigate(['/inicio'],{queryParams:{
              tipo:res?.tipo,
              id:res?.id
          }});


        }else{
          const alert = await this.alertController.create({
            header: `Contraseña o correo incorrecto`,
            mode:'ios',
          });

          this.progreso = false;

          await alert.present();

          this.formularioLogin.reset();

        }
      }

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
