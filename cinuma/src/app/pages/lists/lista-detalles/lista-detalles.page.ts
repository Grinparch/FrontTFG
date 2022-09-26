import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsuarioService} from "../../../core/services/usuario.service";
import {ElementoService} from "../../../core/services/elemento.service";
import {ElementoEnlistadoService} from "../../../core/services/elemento-enlistado.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ModalController} from "@ionic/angular";
import {ElementoEnlistado} from "../../../core/models/ElementoEnlistado";
import {ListaService} from "../../../core/services/lista.service";
import {Lista} from "../../../core/models/Lista";
import {Elemento} from "../../../core/models/Elemento";
import {ElementoDetallesPage} from "../../elementos/elemento-detalles/elemento-detalles.page";
import {AutenticacionService} from "../../../core/services/autenticacion.service";

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
  username: string;

  private elementoModal: HTMLIonModalElement;

  constructor(
    private listaService: ListaService,
    private elementoService: ElementoService,
    private route: ActivatedRoute,
    private modalController: ModalController,
    private autenticacionService: AutenticacionService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.route.queryParams
      .subscribe(params => {
          if (params.listaId != undefined) {
            this.listaId = params.listaId;
            this.listaService.getListaEspecifica(params.listaId).subscribe((lista) => {
              this.lista = lista;
              this.elementosModificados = lista.elementos;
              this.elementoService.getAllElementos().subscribe( (elementos) =>{
                this.elementosTodos= elementos;
              })
            });
          }
        }
      );
    if(this.getUsername()!=null && this.getUsername()!= undefined)
      this.username=this.getUsername();
  }

  ionViewDidEnter() {
  }

  ionViewDidLeave() {
  }

  async eliminarLista() {
    this.listaService.eliminarLista(this.lista.listaId);
  }

  activarEdicionElemento() {
    this.edicion = !this.edicion;
  }

  async agregarElemento(elementoNuevo: Elemento) {
    let esNuevo = true;
    this.elementosModificados.forEach(elemento=>{
      if(elemento.elementoId==elementoNuevo.elementoId){
        esNuevo = false;
      }
    })
    if(esNuevo){
      this.elementosModificados.push(elementoNuevo);
    }

  }

  quitarElementoDeLista(elementoAQuitar: Elemento){
    this.elementosModificados = this.lista.elementos.filter((elemento) => {
      return elemento.elementoId != elementoAQuitar.elementoId;
    });
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
      this.listaService.editarLista(nuevaLista);
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

  getUsername() {
    return sessionStorage.getItem('username');
  }
  getRol() {
    return sessionStorage.getItem('rol');
  }
}
