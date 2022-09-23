import { Component, OnInit } from '@angular/core';
import {ElementoService} from "../../../core/services/elemento.service";
import {Elemento} from "../../../core/models/Elemento";
import {ModalController} from "@ionic/angular";
import {ElementoDetallesPage} from "../elemento-detalles/elemento-detalles.page";
import {AutenticacionService} from "../../../core/services/autenticacion.service";

@Component({
  selector: 'app-elemento-listado',
  templateUrl: './elemento-listado.page.html',
  styleUrls: ['./elemento-listado.page.scss'],
})
export class ElementoListadoPage implements OnInit {
  colleccionElementos: Elemento[];
  username: string;

  private detailsModal: HTMLIonModalElement;

  constructor(public elementoService: ElementoService,
              private modalController: ModalController,
              private autenticacionService: AutenticacionService,) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.loadElementos();
    if(this.getUsername()!=null && this.getUsername()!=undefined)
      this.username = this.getUsername();
  }

  ionViewDidEnter(){
    this.loadElementos();
  }

  private loadElementos(){
    this.elementoService.getAllElementos().subscribe(data => {
      console.log("elementos TODOS");
      console.log(data);
      this.colleccionElementos = data;
    });
  }

  async crearModalElemento(elemento: Elemento) {
    this.detailsModal = await this.modalController.create({
      componentProps: {
        elemento: elemento
      },
      component: ElementoDetallesPage,
      swipeToClose: true
    });
  }

  showTermsModal(elemento: Elemento) {
    this.crearModalElemento(elemento).then(() => this.detailsModal.present());
  }

  getRol() {
    return Number(sessionStorage.getItem('rol'));
  }

  getUsername() {
    return sessionStorage.getItem('username');
  }

}
