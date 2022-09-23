import { Component, OnInit } from '@angular/core';
import {ElementoService} from "../../core/services/elemento.service";
import {Elemento} from "../../core/models/Elemento";
import {ElementoDetallesPage} from "../elementos/elemento-detalles/elemento-detalles.page";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.page.html',
  styleUrls: ['./pagina-principal.page.scss'],
})
export class PaginaPrincipalPage implements OnInit {
  rol: number;
  username: string;
  elementosRecomendados: Elemento[];

  private detailsModal: HTMLIonModalElement;

  constructor(public elementoService: ElementoService,
              private modalController: ModalController,) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    console.log(this.getUsername());
    console.log(this.getRol());
    if(this.getUsername()!=null && this.getUsername()!=undefined){
      this.username = this.getUsername();
      this.rol = Number(this.getRol());
      this.elementoService.getElementosRecomendados(this.getPerfilId()).subscribe(elementos=>{
        this.elementosRecomendados = elementos;
      })
    }
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

  getUsername() {
    return sessionStorage.getItem('username');
  }
  getRol() {
    return sessionStorage.getItem('rol');
  }
  getPerfilId() {
    return sessionStorage.getItem('perfilId');
  }
}
