import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiBackendService } from 'src/app/servicios/backend/api-backend.service';
import { formatDate } from '@angular/common';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {


  id!:any;
  rol!: string | null;

  color:boolean= false;

  cargaNotas:boolean= false;
  cargaAsistencia:boolean= false;
  cargaDatosUsuario:boolean= false;
  cargaAsistenciaEstudinte:boolean= false;
  cargaEstudiantes:boolean= false;
  cargaAgregarNotas:boolean= false;
  cargaHorarioEstudiante:boolean= false;
  cargaHorarioProfesor:boolean=false;



  estudianteOpciones:boolean = false;
  asistenteAdmision:boolean = false;
  profesorOpciones:boolean = false;
  apoderadoOpciones:boolean = false;

  formularioContinuidad:FormGroup|any;
  formularioAsistencia:FormGroup|any;
  formularioAsistenciaEstudiante:FormGroup|any;
  formularioNotasEstudiante:FormGroup|any;

  continuidad:boolean = false;


  numeroMensajes:number = 0;

  mostrarMensajes:boolean = false;
  mostrarNotas:boolean = false;
  mostrarTomarAsistencia:boolean = false;
  mostrarBoton:boolean = false;
  mostrarAsistenciaEstudiante:boolean = false;
  mostrarEstudiantes:boolean = false;
  mostrarAgregarNotas:boolean = false;
  mostrarHorarioEstudiante:boolean = false;
  mostrarHorarioProfesor:boolean = false;



  progresoConfirmacion:boolean = false;

  denegacion:any;

  denegacionInformacion:any;

  datosUsuario:any;
  datosAsistenciaEstudiante:any;
  datosEstudiantes:any;

  misAsignaturasData:any;
  misAsignaturasProfesor:any;
  misCursosProfesor:any;
  misBloquesProfesor:any;
  misEstudiantesAsitenciaProfesor:any;
  misAsignaturasProfesorAgregarNotas:any;
  misCursosProfesorAgregarNotas:any;
  misEstudiantesAgregarNotasProfesor:any;
  misEvaluacionesAgregarNotasProfesor:any;
  miHorarioEstudiante:any;
  miHorarioProfesor:any;

  notas:any;

  datosAsistencia:any = {};

  estudiantesAsistencia:any=[]

  fechaAsistencia:any;

  asignaturaVista:any;
  profesorVista:any;

  horarioLunesEstudiante:any;
  horarioMartesEstudiante:any;
  horarioMiercolesEstudiante:any;
  horarioJuevesEstudiante:any;
  horarioViernesEstudiante:any;

  constructor(private route:ActivatedRoute, private alertController: AlertController, private fb: FormBuilder,public api: ApiBackendService, private navCtrl: NavController, private toast: ToastController,) {
    this.formularioContinuidad = this.fb.group({
      'respuesta': new FormControl("", [Validators.required]),
    })

    this.formularioAsistencia = this.fb.group({
      'asignatura_id': new FormControl("", []),
      'curso_id': new FormControl("", []),
      'bloque_id': new FormControl("", []),
      'estudiante_id': new FormControl("", []),

    })

    this.formularioAsistenciaEstudiante = this.fb.group({
      'asignatura_id': new FormControl("", []),

    })

    this.formularioNotasEstudiante = this.fb.group({
      'asignatura_id': new FormControl("", []),
      'estudiante_id': new FormControl("", []),
      'evaluacion_id': new FormControl("", []),
      'curso_id': new FormControl("", []),
      'nota': new FormControl("", [Validators.required, Validators.min(1), Validators.max(7)]),

    })
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async ngOnInit() {

    this.rol = this.route.snapshot.queryParamMap.get('rol');
    this.id = this.route.snapshot.queryParamMap.get('id');



    if(this?.rol == 'Estudiante'){

      this.estudianteOpciones = true;
      this.api.obtenerEstudiante(this.id).subscribe(res=>{

        this.datosUsuario = res;
        this.cargaDatosUsuario= true;


      })

      this.api.obtenerDenegacion(this.id).subscribe(res=>{



        if(res.get == true){

          this.denegacionInformacion = res?.denegacion;
          this.numeroMensajes++;
          this.mostrarMensajes = true;
          this.denegacion = true;

        }if(res.get == false){



          if(this.datosUsuario?.usuario?.continuidad == 'Pendiente'){
            console.log('paso')
            this.mostrarMensajes = true;
            this.numeroMensajes++;
            this.continuidad = true;
          }

        }

      })
    }if(this?.rol === 'Asistente de admision'){

      this.asistenteAdmision = true;

      this.api.obtenerEmpleado(this.id).subscribe(res=>{


        this.datosUsuario = res;
        this.cargaDatosUsuario= true;


      })
    }if(this?.rol == "Profesor"){

      this.api.obtenerProfesor(this.id).subscribe(res =>{

        this.datosUsuario = res;
        this.cargaDatosUsuario= true;
      })

      this.profesorOpciones = true;
    }if(this?.rol == "Apoderado"){

      this.api.obtenerApoderado(this.id).subscribe(res =>{

        this.datosUsuario = res;
        this.cargaDatosUsuario= true;
      })

      this.apoderadoOpciones = true;
    }if(this?.rol == "Tutor"){

      this.api.obtenerTutor(this.id).subscribe(res =>{

        this.datosUsuario = res;
        this.cargaDatosUsuario= true;
      })

      this.apoderadoOpciones = true;
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

  public misAsignaturas(){

    if(this.mostrarNotas == true){
       this.mostrarNotas= false;
       return;
    }

    this.cargaNotas = true;

    this.api.obtenerDetallesCurso(this.datosUsuario?.usuario?.curso?.id).subscribe(res=>{
      this.misAsignaturasData = res;
      this.mostrarNotas = true;
      this.cargaNotas = false;



    })
  }

  public verNotas(id:any):any{
    this.api.obtenerNotas(id,this.datosUsuario?.usuario?.id).subscribe(res=>{
     this.notas = res;
     this.misAsignaturasData.detalles_curso.forEach((element:any) => {
      if(element.asignatura.id == id){
        this.asignaturaVista = element.asignatura.nombre;
        this.profesorVista = element.asignatura.profesor.p_nombre +" "+ element.asignatura.profesor.ap_paterno;
      }
    });
    })
  }

  public tomarAsistencia(){

    this.fechaAsistencia = formatDate(new Date(), 'dd-MM-YYYY', 'en-US')

    if(this.mostrarTomarAsistencia == true){

      this.mostrarTomarAsistencia = false;
      return;
    }



    this.cargaAsistencia = true;

    this.api.obtenerAsignaturaProfesor(this.datosUsuario?.usuario?.id).subscribe(res =>{
      this.misAsignaturasProfesor = res;
      this.mostrarTomarAsistencia = true;
      this.cargaAsistencia = false;
    })

    this.api.obtenerDetallesCursoAsignatura(this.datosUsuario?.usuario?.curso?.id).subscribe(res=>{})
  }

  public buscarCurso() {
    this.api.obtenerDetallesCursoAsignatura(this.formularioAsistencia.value.asignatura_id).subscribe(res=>{
      this.misCursosProfesor = res;
    })
  }

  public buscarBloques() {
    this.api.obtenerAsignaturaBloques(this.formularioAsistencia.value.asignatura_id,this.formularioAsistencia.value.curso_id).subscribe(res=>{
      this.misBloquesProfesor = res.detallesHorario;
      this.datosAsistencia.horario_id = res.horario;

    })
  }

  public buscarEstudiantesCurso() {
    this.api.obtenerEstudiantesCurso(this.formularioAsistencia.value.curso_id).subscribe(res=>{
      this.misEstudiantesAsitenciaProfesor = res;
      this.mostrarBoton = true;

      this.misEstudiantesAsitenciaProfesor.forEach((element:any) => {
        element.estado = { id: 1 };
      });


    })




  }

  public cambiarEstado(id:any,estado_id:any){
    this.misEstudiantesAsitenciaProfesor.forEach((element:any) => {
      if(element.id == id){
        if(estado_id == 1){
          element.estado = { id: 2 };
        }if(estado_id == 2){
          element.estado = { id: 1 };
        }
        console.log(element.estado);
      }
    });
  }

  public guardarAsistencia(){
    this.datosAsistencia.bloque_id = this.formularioAsistencia.value.bloque_id;
   this.datosAsistencia.estudiantes = this.misEstudiantesAsitenciaProfesor.map(({ id, estado }: { id: number, estado: { id: number } }) => ({
    estudiante_id: id,
    estado_id: estado.id,
    }));

    this.api.guardarAsistencia(this.datosAsistencia).subscribe(async res=>{
      if(res.add == true){
        var asignatura = this.misAsignaturasProfesor.asignaturas.find((element:any) => element.id == this.formularioAsistencia.value.asignatura_id);
        var bloque = this.misBloquesProfesor.find((element:any) => element.bloque.id == this.formularioAsistencia.value.bloque_id);
        const alert = await this.alertController.create({
          header: `Asistencia guardada`,
          subHeader: `${asignatura?.nombre}`,
          message: `${bloque?.bloque?.dia?.nombre} ${bloque?.bloque?.horarioInicio} - ${bloque.bloque?.horarioFin}`,
          mode:'ios',

        })

        await alert.present();
      }if(res.add == false){
        var asignatura = this.misAsignaturasProfesor.asignaturas.find((element:any) => element.id == this.formularioAsistencia.value.asignatura_id);
        var bloque = this.misBloquesProfesor.find((element:any) => element.bloque.id == this.formularioAsistencia.value.bloque_id);
        const alert = await this.alertController.create({
          header: `Error de guardado`,
          subHeader: `${bloque?.bloque?.dia?.nombre} ${bloque?.bloque?.horarioInicio} - ${bloque.bloque?.horarioFin}`,
          message: `El bloque ya tiene asistencia`,
          mode:'ios',

        })

        await alert.present();
      }
    })
  };

  public miAsistencia(){


    if(this.mostrarAsistenciaEstudiante == true){
      this.mostrarAsistenciaEstudiante = false;
      return;
    }

    this.cargaAsistenciaEstudinte = true;

    this.api.obtenerDetallesCurso(this.datosUsuario?.usuario?.curso?.id).subscribe(res=>{
      this.misAsignaturasData = res;
      this.mostrarAsistenciaEstudiante = true;
      this.cargaAsistenciaEstudinte = false;
    })
  }

  public verAsistencia():any{
    this.api.obtenerAsistenciaEstudiante(this.formularioAsistenciaEstudiante.value.asignatura_id,this.datosUsuario?.usuario?.curso?.id,this.datosUsuario?.usuario?.id).subscribe(res=>{
      this.datosAsistenciaEstudiante = res;
    })
  }

  misEstuidantes(){
    if(this.mostrarEstudiantes == true){
      this.mostrarEstudiantes = false;
      return;
    }

    this.cargaEstudiantes = true;

    if(this.rol == "Apoderado"){
      this.api.obtenerEstudiantesApoderado(this.datosUsuario?.usuario?.id).subscribe(res=>{
        this.datosEstudiantes = res;
        this.cargaEstudiantes = false;
        this.mostrarEstudiantes = true;
      })
    }if(this.rol == "Tutor"){
      this.api.obtenerEstudiantesTutor(this.datosUsuario?.usuario?.id).subscribe(res=>{
        this.datosEstudiantes = res;
        this.cargaEstudiantes = false;
        this.mostrarEstudiantes = true;
      })
    }


  }

  public agregarNotas(){

    if(this.mostrarAgregarNotas == true){
      this.mostrarAgregarNotas = false;
      return;
    }

    this.cargaAgregarNotas = true;

    this.api.obtenerAsignaturaProfesor(this.datosUsuario?.usuario?.id).subscribe(res =>{
      this.misAsignaturasProfesorAgregarNotas = res;
      this.mostrarAgregarNotas = true;
      this.cargaAgregarNotas = false;
    })

    this.api.obtenerEvaluaciones().subscribe(res=>{
      this.misEvaluacionesAgregarNotasProfesor = res;
    })
  }

  buscarCursoAgregarNotas(){

    this.api.obtenerDetallesCursoAsignatura(this.formularioNotasEstudiante.value.asignatura_id).subscribe(res=>{
      this.misCursosProfesorAgregarNotas = res;
    })

  }

  public buscarEstudiantesCursoAgregarNotas(){

    this.api.obtenerEstudiantesCurso(this.formularioNotasEstudiante.value.curso_id).subscribe(res=>{
      this.misEstudiantesAgregarNotasProfesor = res;

    })

  }

  public async guardarNota(id:any){
    var nota = {
      evaluacion_id : this.formularioNotasEstudiante.value.evaluacion_id,
      estudiante_id : id,
      asignatura_id : this.formularioNotasEstudiante.value.asignatura_id,
      nota : this.formularioNotasEstudiante.value.nota
    }

    var evaluacion = this.misEvaluacionesAgregarNotasProfesor?.evaluaciones.find((element:any) => element.id == this.formularioNotasEstudiante.value.evaluacion_id);

    if(this.formularioNotasEstudiante.valid){
      this.api.agregarNota(nota).subscribe(async res=>{

        if(res.add == true){



          const alert = await this.alertController.create({
            header: `Nota guardada`,
            subHeader: `${this.misEstudiantesAgregarNotasProfesor.find((element:any) => element.id == id)?.p_nombre} ${this.misEstudiantesAgregarNotasProfesor.find((element:any) => element.id == id)?.ap_paterno} `,
            message: `${evaluacion?.nombre}, Nota ${this.formularioNotasEstudiante.value.nota}`,
            mode:'ios',

          })

          await alert.present();
        }else{
          const alert = await this.alertController.create({
            header: `Error de guardado`,
            subHeader: `${this.misEstudiantesAgregarNotasProfesor.find((element:any) => element.id == id)?.p_nombre} ${this.misEstudiantesAgregarNotasProfesor.find((element:any) => element.id == id)?.ap_paterno} `,
            message: `Ya tiene una nota asignada${evaluacion?.nombre}`,
            mode:'ios',

          })
          await alert.present();
        };
      })
    }else{
      const alert = await this.alertController.create({
        header: `Error de guardado`,
        subHeader: `Ingrese todo los datos `,
        message: `Verifique los datos`,
        mode:'ios',

      })
      await alert.present();
    }


  }

  public horarioEstudiante(){
    if(this.mostrarHorarioEstudiante == true){
      this.mostrarHorarioEstudiante = false;
      return;
    }

    this.cargaHorarioEstudiante = true;

    this.api.obtenerHorarioEstudiante(this.datosUsuario?.usuario?.id).subscribe(res=>{
      this.miHorarioEstudiante = res;
      this.mostrarHorarioEstudiante = true;
      this.cargaHorarioEstudiante = false;
    })

  }

  public horarioProfesor(){
    if(this.mostrarHorarioProfesor == true){
      this.mostrarHorarioProfesor = false;
      return;
    }

    this.cargaHorarioProfesor = true;

    this.api.obtenerHorarioProfesor(this.datosUsuario?.usuario?.id).subscribe(res=>{
      this.miHorarioProfesor = res;
      this.mostrarHorarioProfesor = true;
      this.cargaHorarioProfesor = false;
    })

  }


}
