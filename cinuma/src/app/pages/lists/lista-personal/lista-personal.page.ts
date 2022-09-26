import { Component, OnInit } from '@angular/core';
import {ElementoService} from "../../../core/services/elemento.service";
import {ModalController} from "@ionic/angular";
import {PerfilService} from "../../../core/services/perfil.service";
import {Perfil} from "../../../core/models/Perfil";
import {ElementoEnlistado} from "../../../core/models/ElementoEnlistado";
import {ElementoDetallesPage} from "../../elementos/elemento-detalles/elemento-detalles.page";
import {ElementoEnlistadoService} from "../../../core/services/elemento-enlistado.service";
import {Elemento} from "../../../core/models/Elemento";
import {ListaPersonalAgregarPage} from "../lista-personal-agregar/lista-personal-agregar.page";
import {
  ListaPersonalElementoDetallesPage
} from "../lista-personal-elemento-detalles/lista-personal-elemento-detalles.page";
import {ListaPersonal} from "../../../core/models/ListaPersonal";
import {ListaPersonalService} from "../../../core/services/lista-personal.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lista-personal',
  templateUrl: './lista-personal.page.html',
  styleUrls: ['./lista-personal.page.scss'],
})
export class ListaPersonalPage implements OnInit {
  perfil: Perfil;
  listaPersonal: ListaPersonal;

  private detailsModal: HTMLIonModalElement;

  constructor(public  elementoEnlistadoService: ElementoEnlistadoService,
              public  elementoService: ElementoService,
              public  perfilService: PerfilService,
              public  listaPersonalService: ListaPersonalService,
              private router: Router,
              private modalController: ModalController,) { }

  ngOnInit() {
  }

  ionViewWillEnter(){

    if(this.getUsername() != undefined){
      this.loadPerfil();
    }else{
      this.router.navigate(['/user-login']);
    }

  }

  private loadPerfil(){
    this.perfilService.getPerfilEspecifico(this.getPerfil()).subscribe(perfil => {
      console.log("elementos TODOS");
      console.log(perfil);
      this.perfil = perfil;
      console.log("perfil TODOS");
      console.log(this.perfil);
      this.listaPersonalService.getListaPersonal(this.perfil.listaPersonalId).subscribe(listaP => {
        console.log("listaP");
        console.log(listaP);
        this.listaPersonal = listaP;
      });
    });
  }

  getUsername() {
    return sessionStorage.getItem('username');
  }

  getPerfil() {
    return sessionStorage.getItem('perfilId');
  }

  verDetallesElementoEnlistadoModal(elementoEnlistado: ElementoEnlistado) {
    this.detallesModalElementoEnlistado(elementoEnlistado).then(() => this.detailsModal.present());
  }

  async detallesModalElementoEnlistado(elementoEnlistado: ElementoEnlistado) {
    this.detailsModal = await this.modalController.create({
      componentProps: {
        elementoEnlistado: elementoEnlistado
      },
      component: ListaPersonalElementoDetallesPage,
      swipeToClose: true
    });
  }



  agregarElementoEnlistadoModal() {
    this.elementoService.getAllElementos().subscribe(data => {
      const elementos = data;
      let index = 0;
      elementos.forEach(elemento=>{
        this.listaPersonal.elementosVistos.forEach(elementoVisto=>{
          if(elementoVisto.elementoId == elemento.elementoId){
            elementos.splice(index,1);
          }
        })
        index = index+1;
      })
      this.crearModalElementoEnlistado(elementos).then(() => this.detailsModal.present());
    });

  }

  async crearModalElementoEnlistado(elementos: Elemento[]) {
    this.detailsModal = await this.modalController.create({
      componentProps: {
        todosElementos: elementos,
        listaPersonalId: this.perfil.listaPersonalId
      },
      component: ListaPersonalAgregarPage,
      swipeToClose: true
    });
  }
}
