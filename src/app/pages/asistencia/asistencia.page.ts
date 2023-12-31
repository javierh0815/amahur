import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { DetalleAsignaturaPage } from '../detalle-asignatura/detalle-asignatura.page';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ModalController } from '@ionic/angular';
import { AsistentesService } from 'src/app/services/asistentes.service';
import { DatosMalla } from 'src/app/models/datosMalla';


@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  @Input() datosMalla:DatosMalla[]=[];
  
  
  
  
  
  
  
  

  constructor(private router:Router,
              private helper:HelperService,
              private auth:AngularFireAuth,
              private modalC:ModalController,
              private asistentes:AsistentesService) { }

  ngOnInit() {
    const convertido = JSON.stringify(this.datosMalla);
    console.log("Propiedades recibidas",convertido);
  }

  async botonLogout(){
    var confirm = await this.helper.showConfirm("¿Deseas cerrar la sesion?","Confirmar","Cancelar");
    if(confirm == true) {
      await this.auth.signOut();
      this.router.navigateByUrl("login");
      }
  }

  async botonPresente(){
    var confirm= await this.helper.showConfirm("¿Confirmar su registro como presente?","OK","Cancelar");

    if(confirm == true) {
      const datosAsiste = this.datosMalla;
      await this.asistentes.guardarAsistencia(datosAsiste);

      const informacionParametro = {personaPresente:datosAsiste}
      await this.helper.showModal(DetalleAsignaturaPage,informacionParametro);
      
      
      }else{
        await this.helper.showAlert("No se puede guardar la asistencia","Error");
      }
      
    }
  

  cerrarModal(){
    this.modalC.dismiss();

  }

}
