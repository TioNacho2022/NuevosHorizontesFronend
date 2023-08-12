import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiBackendService } from 'src/app/servicios/backend/api-backend.service';
import { AlertController } from '@ionic/angular';
import { Icon } from 'ionicons/dist/types/components/icon/icon';




@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.page.html',
  styleUrls: ['./matricula.page.scss'],
})
export class MatriculaPage implements OnInit {

  constructor(private route:ActivatedRoute, private api:ApiBackendService, private alertController: AlertController) { }

  id!: any;
  matricula:any;
  token_ws:any;
  TBK_TOKEN:any;
  datosCargados = false;

  isModalOpen = false;
  isModalOpenFalse = false;
  isModalOpenNulo = false;

  valor = 0;
  fecha = "";
  numero_orden = "";




  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = params['Id'];
      console.log(this.id);
    });

    this.api.obtenerMatriculaEstudiante(this.id).subscribe(res=>{
      this.matricula = res;
      this.datosCargados = true;

    })

    this.route.queryParamMap.subscribe(params => {
      this.token_ws = params.get('token_ws');
      if (this.token_ws) {
        this.consultarPagoMatricula();
      } else {
        console.log("El parámetro 'token_ws' no está presente en la URL.");
      }
    });

    this.route.queryParamMap.subscribe(params => {
      this.TBK_TOKEN = params.get('TBK_TOKEN');
      if (this.TBK_TOKEN) {
        this.isModalOpenNulo = true;
      } else {
        console.log("El parámetro 'token_ws' no está presente en la URL.");
      }
    });


  }






  public async pagar(){





    var pago_matricula = {
      id:this.matricula.matricula.id,
      valor:this.matricula.matricula.valor,
      estudiante_id:this.id,
    };


    this.api.pagarMatricula(pago_matricula).subscribe(res=>{
      var url = res.url;
      var token =  res.token;

      const redirectUrl =  `${url}?token_ws=${token}`;

      window.location.href = redirectUrl;

    })




  }

  public consultarPagoMatricula(){

    this.api.resultadoPagoMatricula(this.id, this.token_ws).subscribe(async res=>{

      this.api.obtenerMatriculaEstudiante(this.id).subscribe(res=>{
        this.matricula = res;

      })

      if(res.pago == true){


        this.valor =  res.datos.valor ;
        this.fecha = res.datos.fecha;
        this.numero_orden = res.datos.numero_orden;
        this.isModalOpen = true;


      }else{

        this.isModalOpenFalse = true;
      }
    })


  }

}
