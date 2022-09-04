import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../core/services/user.service";
import {ElementoService} from "../../../core/services/elemento.service";
import {ElementoEnlistadoService} from "../../../core/services/elemento-enlistado.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalController} from "@ionic/angular";
import {ElementoEnlistado} from "../../../core/models/ElementoEnlistado";
import {ListaService} from "../../../core/services/lista.service";
import {Lista} from "../../../core/models/Lista";
import {Elemento} from "../../../core/models/Elemento";
import {ElementoDetallesPage} from "../../elementos/elemento-detalles/elemento-detalles.page";

@Component({
  selector: 'app-lista-detalles',
  templateUrl: './lista-detalles.page.html',
  styleUrls: ['./lista-detalles.page.scss'],
})
export class ListaDetallesPage implements OnInit {
  editarElementoForm: FormGroup;
  listaId: string;
  lista: Lista;
  elementosModificados: Elemento[] = [];
  elementosTodos: Elemento[];
  edicion: boolean = false;

  private elementoModal: HTMLIonModalElement;

  constructor(
    private listaService: ListaService,
    private elementoService: ElementoService,
    private route: ActivatedRoute,
    private modalController: ModalController
  ) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.route.queryParams
      .subscribe(params => {
          console.log("params");
          console.log(params);
          if (params.listaId != undefined) {
            this.listaId = params.listaId;
            this.listaService.getListaEspecifica(params.listaId).subscribe((lista) => {
              this.lista = lista;
              this.elementoService.getAllElementos().subscribe( (elementos) =>{
                elementos.forEach((elemento,index) =>{
                  if(lista.elementos.map(e => e.elementoId).indexOf(elemento.elementoId) != -1){
                    elementos.splice(index,1);
                  }
                })
                this.elementosTodos= elementos;
              })
            });
          }
        }
      );
  }

  ionViewDidEnter() {
  }

  ionViewDidLeave() {
  }

  async eliminarLista() {
    console.log("eliminar lista")
    this.listaService.eliminarLista(this.lista.listaId);
  }

  activarEdicionElemento() {
    this.edicion = !this.edicion;
  }

  quitarElementoDeLista(elementoAQuitar: Elemento){
    this.elementosModificados = this.lista.elementos.filter((elemento) => {
      return elemento.elementoId != elementoAQuitar.elementoId;
    });
    console.log("quitado")
  }

  async editarElemento() {
    this.asignacionValorElemento();
  }

  private async asignacionValorElemento() {
    let nuevaLista: Lista;
    nuevaLista = {
        listaId: this.lista.listaId,
        perfilId: this.lista.perfilId,
        elementos: this.elementosModificados,
        creador: this.lista.creador,
        votos: this.lista.votos
      };
      console.log("nuevaLista");
      console.log(nuevaLista);
      this.listaService.editarLista(nuevaLista);
  }

  getUsername() {
    return sessionStorage.getItem('username');
  }

  getRol() {
    return sessionStorage.getItem('rol');
  }

  getPerfil() {
    return sessionStorage.getItem('perfilId');
  }

  async crearModalElemento(elemento: Elemento) {
    this.elementoModal = await this.modalController.create({
      componentProps: {
        elemento: elemento
      },
      component: ElementoDetallesPage,
      swipeToClose: true
    });
  }

  elementoDetallesModal(elemento: Elemento) {
    this.crearModalElemento(elemento).then(() => this.elementoModal.present());
  }
}
