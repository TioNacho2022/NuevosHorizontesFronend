import { Component, OnInit } from '@angular/core';
import { Lista } from 'src/app/models/lista';
import { ApiBackendService } from 'src/app/servicios/backend/api-backend.service';
import { AlertController } from '@ionic/angular';
import { NotFoundError } from 'rxjs';


@Component({
  selector: 'app-estudiantes-pendientes',
  templateUrl: './estudiantes-pendientes.page.html',
  styleUrls: ['./estudiantes-pendientes.page.scss'],
})
export class EstudiantesPendientesPage implements OnInit {


  lista:Array<any>=[

  ];

  idApoderado0!:number;
  idApoderado1!:number;
  idTutor0!:number;
  idTutor1!:number;

  progreso:boolean = false;

  public results = [...this.lista];



  constructor(private api:ApiBackendService,private alertController: AlertController) { }

  ngOnInit() {
    this.Buscar();

  }

  async presentAlert(p_nombre:string,ap_paterno:string,id:number){

    const alert = await this.alertController.create({
      header: 'Eliminar perfil',
      message: `¿Desea eliminar el perfil de ${p_nombre} ${ap_paterno}?`,
      buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              ;
            },
          },
          {
           text: 'Si, eliminar',
            role: 'confirm',
            handler: () => {

              this.progreso = true;

              this.api.obtenerDetalleApoderado(id).subscribe(res =>{

                if(res.get == true){

                  this.idApoderado0 = res.detalleApoderado[0].apoderadoId;
                  this.idApoderado1 = res.detalleApoderado[1].apoderadoId;

                  this.api.eliminarDetalleApoderado(id).subscribe(res =>{

                    if(res.delete == true){

                      this.api.eliminarApoderado(this.idApoderado0).subscribe(res =>{

                        if(res.delete == true || res.delete == false){

                          this.api.eliminarApoderado(this.idApoderado1).subscribe(res =>{

                            if(res.delete == true || res.delete == false){

                              this.api.eliminarEstudiante(id).subscribe(async res =>{

                                if(res.delete == true){

                                  const alert = await this.alertController.create({
                                    header: `Exito`,
                                    mode:'ios',
                                    message: `Perfil ${p_nombre} ${ap_paterno} eliminado`,


                                  });

                                  await alert.present();

                                  this.progreso = false;

                                  this.Buscar();
                                }

                              });

                            }else{
                              console.log(NotFoundError);
                            };

                          });

                        }else{
                          console.log(NotFoundError);
                        };

                      });

                    }else{
                      console.log(NotFoundError);

                    };
                  });

                }if(res.get == false){

                  this.api.obtenerDetalleTutor(id).subscribe(res =>{

                    if(res.get == true){

                      this.idTutor0 = res.detalleTutor[0].tutorId;
                      this.idTutor1 = res.detalleTutor[1].tutorId;

                      this.api.eliminarDetalleTutor(id).subscribe(res =>{

                        if(res.delete == true){

                          this.api.eliminarTutor(this.idTutor0).subscribe(res =>{

                            if(res.delete == true || res.delete == false){

                              this.api.eliminarTutor(this.idTutor1).subscribe(res =>{

                                if(res.delete == true || res.delete == false){

                                  this.api.eliminarEstudiante(id).subscribe(async res =>{

                                    if(res.delete == true){

                                      const alert = await this.alertController.create({
                                        header: `Exito`,
                                        mode:'ios',
                                        message: `Perfil ${p_nombre} ${ap_paterno} eliminado`,


                                      });

                                      await alert.present();

                                      this.progreso = false;

                                      this.Buscar();
                                    }

                                  });

                                }else{
                                  console.log(NotFoundError);
                                };

                              });

                            }else{
                              console.log(NotFoundError);
                            };

                          });


                        };

                      });


                    };

                  });
                }
              });
            },
          },
        ],
      });

    await alert.present();

  }
  public Buscar(){

    this.progreso = true;

    this.api.listaEstudiantesPendientes().subscribe(async res =>{

      this.lista = res;

      this.progreso = false;

    });

  }

  handleInput(event:any){
    const query = event.target.value.toLowerCase();
    this.results = this.lista.filter((d) => d.rut.toLowerCase().indexOf(query) > -1);
  }




}

